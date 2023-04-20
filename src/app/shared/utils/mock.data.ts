export class MockData {
  // For testing
  public static readonly mockPark_1 = {
    pk: 'park',
    sk: 'MOC1',
    parkName: 'Mock Park 1',
    roles: ['sysadmin', 'MOC1'],
    orcs: 'MOC1',
    subAreas: [
      {
        id: 'MOC1',
        name: 'Mock SubArea 1',
      },
      {
        id: 'MLS1',
        name: 'Mock Legacy SubArea 1',
        isLegacy: true
      }
    ]
  }

  public static readonly mockPark_2 = {
    pk: 'park',
    sk: 'MOC2',
    parkName: 'Mock Park 2',
    roles: ['sysadmin', 'MOC2'],
    orcs: 'MOC2',
    subAreas: [
      {
        id: 'MOC2',
        name: 'Mock SubArea 2',
      },
    ]
  }

  public static readonly mockLegacyPark = {
    pk: 'park',
    sk: 'MLP1',
    isLegacy: true,
    parkName: 'Mock Legacy Park 1',
    roles: ['sysadmin', 'MLP1'],
    orcs: 'MLP1',
    subAreas: [
      {
        id: 'MLS2',
        name: 'Mock Legacy SubArea 2',
        isLegacy: true
      }
    ]
  }

  public static readonly mockSubArea_1 = {
    pk: 'park::MOC1',
    sk: 'MOC1',
    parkName: 'Mock Park 1',
    subAreaName: 'Mock SubArea 1',
    roles: ['sysadmin', 'MOC1:MOC1'],
    activities: ['Backcountry Cabins', 'Backcountry Camping', 'Boating', 'Day Use', 'Frontcountry Cabins', 'Frontcountry Camping', 'Group Camping'],
    orcs: 'MOC1',
    managementArea: 'Mock Management Area 1',
    section: 'Mock Section 1',
    region: 'Mock Region 1',
    bundle: 'Mock Bundle 1',
  }

  public static readonly mockSubArea_2 = {
    pk: 'park::MOC2',
    sk: 'MOC2',
    parkName: 'Mock Park 2',
    subAreaName: 'Mock SubArea 2',
    roles: ['sysadmin', 'MOC2:MOC2'],
    activities: ['Backcountry Cabins', 'Backcountry Camping', 'Boating', 'Day Use', 'Frontcountry Cabins', 'Frontcountry Camping', 'Group Camping'],
    orcs: 'MOC2',
    managementArea: 'Mock Management Area 2',
    section: 'Mock Section 2',
    region: 'Mock Region 2',
    bundle: 'Mock Bundle 2',
  }

  public static readonly mockLegacySubArea = {
    pk: 'park::MLP1',
    sk: 'MLS1',
    parkName: 'Mock Legacy Park 1',
    subAreaName: 'Mock Legacy SubArea 1',
    roles: ['sysadmin', 'MLP1:MLS1'],
    activities: ['Backcountry Cabins', 'Backcountry Camping', 'Boating', 'Day Use', 'Frontcountry Cabins', 'Frontcountry Camping', 'Group Camping'],
    orcs: 'MLP1',
    managementArea: 'Mock Management Area 3',
    section: 'Mock Section 3',
    region: 'Mock Region 3',
    bundle: 'Mock Bundle 3',
    isLegacy: true
  }

  public static readonly mockBackcountryCabinRecord_1 = {
    pk: 'MOC1::Backcountry Cabins',
    sk: '202301',
    date: '202301',
    parkName: 'Mock Park 1',
    subAreaName: 'Mock SubArea 1',
    orcs: 'MOC1',
    lastUpdated: '2023-01-01T00:00:00.000Z',
    isLocked: false,
    revenueFamily: 1.11,
    peopleAdult: 1,
    peopleFamily: 1,
    peopleChild: 1,
    notes: 'Mock notes',
    // TODO: update config
    config: {}
  }

  public static readonly mockBackcountryCabinRecord_Legacy = {
    pk: 'MLS1::Backcountry Cabins',
    sk: '201901',
    date: '201901',
    parkName: 'Mock Legacy Park 1',
    subAreaName: 'Mock Legacy SubArea 1',
    orcs: 'MLP1',
    lastUpdated: '2019-01-01T00:00:00.000Z',
    isLocked: true,
    isLegacy: true,
    revenueFamily: 9.99,
    peopleAdult: 9,
    peopleFamily: 9,
    peopleChild: 9,
    notes: 'Mock legacy notes',
    legacyData: {
      legacy_backcountryCabinsTotalAttendancePeople: 9,
      legacy_backcountryCabinsNetRevenue: 9
    }
  }

  public static readonly mockBackcountryCampingRecord_1 = {
    pk: 'MOC1::Backcountry Camping',
    sk: '202301',
    date: '202301',
    parkName: 'Mock Park 1',
    subAreaName: 'Mock SubArea 1',
    orcs: 'MOC1',
    lastUpdated: '2023-01-01T00:00:00.000Z',
    isLocked: false,
    people: 1,
    grossCampingRevenue: 1.11,
    notes: 'Mock notes',
    // TODO: update config
    config: {}
  }

  public static readonly mockBackcountryCampingRecord_Legacy = {
    pk: 'MLS1::Backcountry Camping',
    sk: '201901',
    date: '201901',
    parkName: 'Mock Legacy Park 1',
    subAreaName: 'Mock Legacy SubArea 1',
    orcs: 'MLP1',
    lastUpdated: '2019-01-01T00:00:00.000Z',
    isLocked: true,
    isLegacy: true,
    grossCampingRevenue: 9.99,
    notes: 'Mock legacy notes',
  }

  public static readonly mockBoatingRecord_1 = {
    pk: 'MOC1::Boating',
    sk: '202301',
    date: '202301',
    parkName: 'Mock Park 1',
    subAreaName: 'Mock SubArea 1',
    orcs: 'MOC1',
    lastUpdated: '2023-01-01T00:00:00.000Z',
    isLocked: false,
    boatAttendaceNightsOnBouys: 1,
    boatRevenueGross: 1.11,
    boatAttendanceMiscellaneous: 1,
    boatAttendanceNightsOnDock: 1,
    notes: 'Mock notes',
    // TODO: update config
    config: {}
  }

  public static readonly mockBoatingRecord_Legacy = {
    pk: 'MLS1::Boating',
    sk: '201901',
    date: '201901',
    parkName: 'Mock Legacy Park 1',
    subAreaName: 'Mock Legacy SubArea 1',
    orcs: 'MLP1',
    lastUpdated: '2019-01-01T00:00:00.000Z',
    isLocked: true,
    isLegacy: true,
    boatAttendaceNightsOnBouys: 9,
    boatAttendanceMiscellaneous: 9,
    boatAttendanceNightsOnDock: 9,
    boatRevenueGross: 9.99,
    notes: 'Mock legacy notes',
    legacyData: {
      legacy_boatingTotalAttendancePeople: 9,
      legacy_boatingTotalNetRevenue: 9.99
    }
  }

  public static readonly mockDayUseRecord_1 = {
    pk: 'MOC1::Day Use',
    sk: '202301',
    date: '202301',
    parkName: 'Mock Park 1',
    subAreaName: 'Mock SubArea 1',
    orcs: 'MOC1',
    lastUpdated: '2023-01-01T00:00:00.000Z',
    isLocked: false,
    picnicRevenueShelter: 1.11,
    peopleAndVehiclesBus: 1,
    picnicShelterPeople: 1,
    picnicRevenueGross: 1.11,
    notes: 'Mock notes',
    // TODO: update config
    config: {}
  }

  public static readonly mockDayUseRecord_Legacy = {
    pk: 'MLS1::Day Use',
    sk: '201901',
    date: '201901',
    parkName: 'Mock Legacy Park 1',
    subAreaName: 'Mock Legacy SubArea 1',
    orcs: 'MLP1',
    lastUpdated: '2019-01-01T00:00:00.000Z',
    isLocked: true,
    isLegacy: true,
    picnicRevenueShelter: 9.99,
    peopleAndVehiclesBus: 9,
    picnicShelterPeople: 9,
    picnicRevenueGross: 9.99,
    notes: 'Mock legacy notes',
    legacyData: {
      legacy_dayUseTotalPeopleAndVehiclesAttendancePeople: 9,
      legacy_dayUseMiscGrossRevenue: 9.99,
      legacy_dayUseMiscNetRevenue: 9.99,
      legacy_dayUsePicnicShelterNetRevenue: 9.99,
      legacy_dayUsePicnicShelterVarianceNote: 'Mock picnic shelter notes',
      legacy_dayUseTotalNetRevenue: 9.99,
      legacy_dayUseTotalGrossRevenue: 9.99,
      legacy_dayUseTotalAttendancePeople: 9,
    }
  }

  public static readonly mockFrontcountryCabinsRecord_1 = {
    pk: 'MOC1::Frontcountry Cabins',
    sk: '202301',
    date: '202301',
    parkName: 'Mock Park 1',
    subAreaName: 'Mock SubArea 1',
    orcs: 'MOC1',
    lastUpdated: '2023-01-01T00:00:00.000Z',
    isLocked: false,
    totalAttendanceParties: 1,
    revenueGrossCamping: 1.11,
    notes: 'Mock notes',
    // TODO: update config
    config: {}
  }

  public static readonly mockFrontcountryCabinsRecord_Legacy = {
    pk: 'MLS1::Frontcountry Cabins',
    sk: '201901',
    date: '201901',
    parkName: 'Mock Legacy Park 1',
    subAreaName: 'Mock Legacy SubArea 1',
    orcs: 'MLP1',
    lastUpdated: '2019-01-01T00:00:00.000Z',
    isLocked: true,
    isLegacy: true,
    totalAttendanceParties: 9,
    revenueGrossCamping: 9.99,
    notes: 'Mock legacy notes',
    legacyData: {}
  }

  public static readonly mockFrontcountryCampingRecord_1 = {
    pk: 'MOC1::Frontcountry Camping',
    sk: '202301',
    date: '202301',
    parkName: 'Mock Park 1',
    subAreaName: 'Mock SubArea 1',
    orcs: 'MOC1',
    lastUpdated: '2023-01-01T00:00:00.000Z',
    isLocked: false,
    campingPartyNightsAttendanceStandard: 1,
    campingPartyNightsAttendanceSenior: 1,
    campingPartyNightsAttendanceSocial: 1,
    campingPartyNightsAttendanceLongStay: 1,
    secondCarsAttendanceStandard: 1,
    secondCarsAttendanceSenior: 1,
    secondCarsAttendanceSocial: 1,
    secondCarsRevenueGross: 1.11,
    notes: 'Mock notes',
    otherRevenueGrossSani: 1.11,
    otherRevenueShower: 1.11,
    otherRevenueElectrical: 1.11,
    // TODO: update config
    config: {}
  }

  public static readonly mockFrontcountryCampingRecord_Legacy = {
    pk: 'MLS1::Frontcountry Camping',
    sk: '201901',
    date: '201901',
    parkName: 'Mock Legacy Park 1',
    subAreaName: 'Mock Legacy SubArea 1',
    orcs: 'MLP1',
    lastUpdated: '2019-01-01T00:00:00.000Z',
    isLocked: true,
    isLegacy: true,
    campingPartyNightsAttendanceStandard: 9,
    campingPartyNightsAttendanceSenior: 9,
    campingPartyNightsAttendanceSocial: 9,
    campingPartyNightsAttendanceLongStay: 9,
    secondCarsAttendanceStandard: 9,
    secondCarsAttendanceSenior: 9,
    secondCarsAttendanceSocial: 9,
    secondCarsRevenueGross: 9.99,
    notes: 'Mock legacy notes',
    otherRevenueGrossSani: 9.99,
    otherRevenueShower: 9.99,
    otherRevenueElectrical: 9.99,
    legacyData: {
      legacy_frontcountryCampingTotalCampingParties: 9,
      legacy_frontcountryCampingTotalCampingGrossRevenue: 9.99,
      legacy_frontcountryCampingTotalCampingNetRevenue: 9.99,
      legacy_frontcountryCampingTotalSecondCarsAttendance: 9,
      legacy_frontcountryCampingSecondCarsNetRevenue: 9.99,
      legacy_dayUseMiscSaniStationNetRevenue: 9.99,
      legacy_dayUseMiscShowerNetRevenue: 9.99,
    }
  }

  public static readonly mockGroupCampingRecord_1 = {
    pk: 'MOC1::Group Camping',
    sk: '202301',
    date: '202301',
    parkName: 'Mock Park 1',
    subAreaName: 'Mock SubArea 1',
    orcs: 'MOC1',
    lastUpdated: '2023-01-01T00:00:00.000Z',
    isLocked: false,
    youthRateGroupsAttendancePeople: 1,
    youthRateGroupsAttendanceGroupNights: 1,
    youthRateGroupsRevenueGross: 1.11,
    standardRateGroupsTotalPeopleAdults: 1,
    standardRateGroupsTotalPeopleYouth: 1,
    standardRateGroupsTotalPeopleKids: 1,
    standardRateGroupsTotalPeopleStandard: 1,
    standardRateGroupsRevenueGross: 1.11,
    notes: 'Mock notes',
    // TODO: update config
    config: {}
  }

  public static readonly mockGroupCampingRecord_Legacy = {
    pk: 'MLS1::Group Camping',
    sk: '201901',
    date: '201901',
    parkName: 'Mock Legacy Park 1',
    subAreaName: 'Mock Legacy SubArea 1',
    orcs: 'MLP1',
    lastUpdated: '2019-01-01T00:00:00.000Z',
    isLocked: true,
    isLegacy: true,
    youthRateGroupsAttendancePeople: 9,
    youthRateGroupsAttendanceGroupNights: 9,
    youthRateGroupsRevenueGross: 9.99,
    standardRateGroupsTotalPeopleAdults: 9,
    standardRateGroupsTotalPeopleYouth: 9,
    standardRateGroupsTotalPeopleKids: 9,
    standardRateGroupsTotalPeopleStandard: 9,
    standardRateGroupsRevenueGross: 9.99,
    notes: 'Mock legacy notes',
    legacyData: {
      legacy_groupCampingStandardTotalAttendancePeople: 9,
      legacy_groupCampingTotalNetRevenue: 9.99,
      legacy_groupCampingTotalGrossRevenue: 9.99,
    }
  }
}