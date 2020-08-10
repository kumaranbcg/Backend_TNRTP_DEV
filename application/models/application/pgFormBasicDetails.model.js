const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pgFormBasicDetails = sequelize.define(
		"TNRTP37_PG_FORMS_BASIC_DETAILS",
		{
			TNRTP37_PG_FORMS_BASIC_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP37_PG_FORMS_MASTER_D" },
			mobileNumber: { type: DataTypes.STRING, field: "TNRTP37_MOBILE_NUMBER_R" },
			name: { type: DataTypes.STRING, field: "TNRTP37_NAME_N" },
			pgName: { type: DataTypes.STRING, field: "TNRTP37_PG_NAME_N" },
			pgAddress: { type: DataTypes.STRING, field: "TNRTP37_PG_ADDRESS_N" },
			districtId: { type: DataTypes.INTEGER, field: "TNRTP37_US_DISTRICT_MASTER_D" },
			blockId: { type: DataTypes.INTEGER, field: "TNRTP37_US_BLOCK_MASTER_D" },
			panchayatId: { type: DataTypes.INTEGER, field: "TNRTP37_US_PANCHAYAT_MASTER_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP37_STATUS_D",
			},
			TNRTP37_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP37_CREATED_AT: { type: DataTypes.DATE },
			TNRTP37_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP37_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP37_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgFormBasicDetails.selectedFields = [
		"mobileNumber",
		"name",
		"pgName",
		"pgAddress",
		["TNRTP37_US_DISTRICT_MASTER_D", "district"],
		["TNRTP37_US_BLOCK_MASTER_D", "block"],
		["TNRTP37_US_PANCHAYAT_MASTER_D", "panchayat"],
	];
	return pgFormBasicDetails;
};
