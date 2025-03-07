/**
 * Adds region, section, management area, and bundles to the database from an excel spreadsheet.
 */

const readXlsxFile = require('read-excel-file/node');
const path = require('path');
const { marshall } = require('@aws-sdk/util-dynamodb');
const { DynamoDBClient, TransactWriteItemsCommand } = require('@aws-sdk/client-dynamodb');
const { DateTime } = require('luxon');

const DYNAMODB_ENDPOINT_URL = process.env.DYNAMODB_ENDPOINT_URL || 'http://localhost:8000';
const IS_OFFLINE = process.env.IS_OFFLINE || 'true';
const MAX_TRANSACTION_SIZE = 25;
const TABLE_NAME = process.env.TABLE_NAME || 'ParksAr';

const filePath = path.join(__dirname, './citywideregions.xlsx');


let options = {
  region: 'ca-central-1',
};

if (IS_OFFLINE === 'true') {
  options['endpoint'] = DYNAMODB_ENDPOINT_URL;
}

const client = new DynamoDBClient(options);

const schema = {
  ['Department - Region']: {
    prop: 'region',
    type: String,
  },
  ['Section']: {
    prop: 'section',
    type: String,
  },
  ['Management Area']: {
    prop: 'managementArea',
    type: String,
  },
  ['Bundle']: {
    prop: 'bundle',
    type: String,
  },
};

async function run() {
  const rows = await readXlsxFile(filePath, { schema });

  let regionsData = [];
  let sectionsData = [];
  let managementAreasData = [];

  const date = DateTime.now().toISO();

  for (const row of rows.rows) {
    let regionId, sectionId, managementAreaId, bundleId;

    // Create Regions
    regionId = regionsData.find(data => data.displayName === row.region)?.sk || 0;
    if (!regionId) {
      regionId = (regionsData.length + 1).toString();
      const data = {
        pk: 'region',
        sk: regionId.toString(),
        displayName: row.region,
        schema: 'region',
        lastUpdated: date
      };
      regionsData.push(data);
    }

    // Create Sections
    sectionId = sectionsData.find(data => data.displayName === row.section)?.sk || 0;
    if (!sectionId) {
      sectionId = (sectionsData.length + 1).toString();
      const data = {
        pk: `section::${regionId}`,
        sk: sectionId.toString(),
        displayName: row.section,
        regionId: regionId,
        schema: 'section',
        lastUpdated: date
      };
      sectionsData.push(data);
    }

    // Create Management Areas
    managementAreaId = managementAreasData.find(data => data.displayName === row.managementArea)?.sk || 0;
    if (!managementAreaId) {
      managementAreaId = (managementAreasData.length + 1).toString();
      const data = {
        pk: `managementArea::${regionId}::${sectionId}`,
        sk: managementAreaId.toString(),
        displayName: row.managementArea,
        sectionId: sectionId,
        regionId: regionId,
        schema: 'managementArea',
        lastUpdated: date
      };
      managementAreasData.push(data);
    }
  }

  // Create bundles - these are independent of the other data
  let bundlesData = [];
  let bundleId = 0;
  const bundles = new Set(rows.rows.map(row => row.bundle));
  for (const bundle of bundles) {
    bundleId++;
    const data = {
      pk: 'bundle',
      sk: bundleId.toString(),
      displayName: bundle,
      schema: 'bundle',
      lastUpdated: date
    };
    bundlesData.push(data);
  }

  console.log(`Adding ${regionsData.length} regions, ${sectionsData.length} sections, ${managementAreasData.length} management areas, and ${bundlesData.length} bundles items to the database...`);

  // Batch transact write items
  const transactionItems = regionsData.concat(sectionsData, managementAreasData, bundlesData);
  for (let i = 0; i < transactionItems.length; i += MAX_TRANSACTION_SIZE) {
    const chunk = transactionItems.slice(i, i + MAX_TRANSACTION_SIZE);
    const request = chunk.map(data => {
      return {
        Put: {
          TableName: TABLE_NAME,
          Item: marshall(data)
        }
      };
    });
    try {
      await client.send(new TransactWriteItemsCommand({TransactItems: request}));
    } catch (error) {
      console.error('Error adding items to the database:', error);
    }
  }
  console.log('Complete.');
}


run();