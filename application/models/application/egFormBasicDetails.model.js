const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const EGFormBasicDetails = sequelize.define(
		"TNRTP54_EG_FORMS_BASIC_DETAILS",
		{
			TNRTP54_EG_FORMS_BASIC_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP54_EG_FORMS_MASTER_D" },
			mobileNumber: { type: DataTypes.STRING, field: "TNRTP54_MOBILE_NUMBER_R" },
			name: { type: DataTypes.STRING, field: "TNRTP54_NAME_N" },
			EGName: { type: DataTypes.STRING, field: "TNRTP54_EG_NAME_N" },
			EGAddress: { type: DataTypes.STRING, field: "TNRTP54_EG_ADDRESS_N" },
			districtId: { type: DataTypes.INTEGER, field: "TNRTP54_US_DISTRICT_MASTER_D" },
			blockId: { type: DataTypes.INTEGER, field: "TNRTP54_US_BLOCK_MASTER_D" },
			panchayatId: { type: DataTypes.INTEGER, field: "TNRTP54_US_PANCHAYAT_MASTER_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP54_STATUS_D",
			},
			TNRTP54_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP54_CREATED_AT: { type: DataTypes.DATE },
			TNRTP54_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP54_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP54_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	EGFormBasicDetails.selectedFields = [
		"mobileNumber",
		"name",
		"EGName",
		"EGAddress",
		["TNRTP54_US_DISTRICT_MASTER_D", "district"],
		["TNRTP54_US_BLOCK_MASTER_D", "block"],
		["TNRTP54_US_PANCHAYAT_MASTER_D", "panchayat"],
	];
	return EGFormBasicDetails;
};
