export class Constants {
  public static readonly dataIds = {
    ENTER_DATA_PARK: 'enterDataPark',
    ENTER_DATA_SUB_AREA: 'enterDataSubArea',
    CURRENT_SUBAREA_LIST: 'current-subarea-list',
    ACCORDION_FRONTCOUNTRY_CAMPING: 'accordion-Frontcountry Camping',
    ACCORDION_FRONTCOUNTRY_CABINS: 'accordion-Frontcountry Cabins',
    ACCORDION_DAY_USE: 'accordion-Day Use',
    ACCORDION_GROUP_CAMPING: 'accordion-Group Camping',
    ACCORDION_BOATING: 'accordion-Boating',
    ACCORDION_BACKCOUNTRY_CAMPING: 'accordion-Backcountry Camping',
    ACCORDION_BACKCOUNTRY_CABINS: 'accordion-Backcountry Cabins',
    ACCORDION_LEGACY_DATA: 'accordion-Legacy Data',
    ACCORDION_ALL_AVAILABLE_RECORDS_LIST:
      'accordion-All Available Records List',
    ENTER_DATA_URL_PARAMS: 'enter-data-url-params',
    EXPORT_ALL_POLLING_DATA: 'export-all-polling-data',
    LOCK_RECORDS_FISCAL_YEARS_DATA: 'lock-records-fiscal-years-data',
    VARIANCE_FILTERS: 'variance-filters',
    VARIANCE_LIST: 'variance-list',
    VARIANCE_LAST_EVALUATED_KEY: 'variance-last-evaluated-key'
  };

  public static readonly ApplicationRoles: any = {
    ADMIN: 'sysadmin',
  };

  public static readonly ActivityTypes: any = [
    'Frontcountry Camping',
    'Frontcountry Cabins',
    'Day Use',
    'Group Camping',
    'Boating',
    'Backcountry Camping',
    'Backcountry Cabins',
  ];

  // March
  public static readonly FiscalYearFinalMonth: number = 3;

  public static readonly iconUrls = {
    frontcountryCamping: '../../assets/images/walk-in-camping.svg',
    frontcountryCabins: '../../assets/images/shelter.svg',
    groupCamping: '../../assets/images/group-camping.svg',
    backcountryCamping: '../../assets/images/walk-in-camping.svg',
    backcountryCabins: '../../assets/images/shelter.svg',
    boating: '../../assets/images/sailing.svg',
    dayUse: '../../assets/images/hiking.svg',
  };

  public static readonly ToastTypes: any = {
    SUCCESS: 0,
    WARNING: 1,
    INFO: 2,
    ERROR: 3,
  };

  // TODO: Retreive this from config service
  public static readonly varianceConfig = {
    backCountryCabins: {
      peopleAdult: 0.2,
      peopleChild: 0.2,
      peopleFamily: 0.2,
      revenueFamily: 0.2,
    },
    backcountryCamping: {
      people: 0.2,
      grossCampingRevenue: 0.2,
    },
    boating: {
      boatAttendanceNightsOnDock: 0.2,
      boatAttendanceNightsOnBouys: 0.2,
      boatAttendanceMiscellaneous: 0.2,
      boatRevenueGross: 0.2,
    },
    dayUse: {
      peopleAndVehiclesTrail: 0.2,
      peopleAndVehiclesVehicle: 0.2,
      peopleAndVehiclesBus: 0.2,
      picnicRevenueShelter: 0.2,
      picnicShelterPeople: 0.2,
      picnicRevenueGross: 0.2,
      otherDayUsePeopleHotSprings: 0.2,
      otherDayUseRevenueHotSprings: 0.2,
    },
    frontCountryCabins: {
      totalAttendanceParties: 0.2,
      revenueGrossCamping: 0.2,
    },
    frontCountryCamping: {
      campingPartyNightsAttendanceStandard: 0.2,
      campingPartyNightsAttendanceSenior: 0.2,
      campingPartyNightsAttendanceSocial: 0.2,
      campingPartyNightsAttendanceLongStay: 0.2,
      campingPartyNightsRevenueGross: 0.2,
      secondCarsAttendanceStandard: 0.2,
      secondCarsAttendanceSenior: 0.2,
      secondCarsAttendanceSocial: 0.2,
      secondCarsRevenueGross: 0.2,
      otherRevenueGrossSani: 0.2,
      otherRevenueElectrical: 0.2,
      otherRevenueShower: 0.2,
    },
    groupCamping: {
      standardRateGroupsTotalPeopleStandard: 0.2,
      standardRateGroupsTotalPeopleAdults: 0.2,
      standardRateGroupsTotalPeopleYouth: 0.2,
      standardRateGroupsTotalPeopleKids: 0.2,
      standardRateGroupsRevenueGross: 0.2,
      youthRateGroupsAttendanceGroupNights: 0.2,
      youthRateGroupsAttendancePeople: 0.2,
      youthRateGroupsRevenueGross: 0.2,
    },
  };
}
