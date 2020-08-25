const STAFF_ROLE = {
	ADMIN: 1,
	SPMU: 2,
	DPMU: 3,
	BPMU: 4,
	PLF: 5,
	VPRC: 6,
	ALL: 7,
	PUBLIC: 8,
};
const ORDERBY = {
	ASC: 0,
	DESC: 1,
};
const STAFF_STATUS = {
	INACTIVE: 0,
	ACTIVE: 1,
	ALL: 2,
};
const LOCATION_COLUMN = {
	SNO: "S.No",
	DISTRICT_CODE: "districtCode",
	DISTRICT_ENAME: "districtENName",
	DISTRICT_TNAME: "districtTAName",
	BLOCK_CODE: "blockCode",
	BLOCK_ENAME: "blockENName",
	BLOCK_TNAME: "blockTAName",
	PANCHAYAT_CODE: "gramPanchayatCode",
	PANCHAYAT_ENAME: "gramPanchayatENName",
	PANCHAYAT_TNAME: "gramPanchayatTAName",
	IS_TNRTP: "TNRTP",
};
module.exports.STAFF_ROLE = STAFF_ROLE;
module.exports.ORDERBY = ORDERBY;
module.exports.STAFF_STATUS = STAFF_STATUS;
module.exports.LOCATION_COLUMN = LOCATION_COLUMN;
