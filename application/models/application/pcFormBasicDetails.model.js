const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const db = require("../../models");
module.exports = (sequelize, DataTypes) => {
	const pcFormBasicDetails = sequelize.define(
		"TNRTP07_PC_FORMS_BASIC_DETAILS",
		{
			TNRTP07_PC_FORMS_BASIC_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP07_PC_FORMS_MASTER_D" },
			mobileNumber: { type: DataTypes.STRING, field: "TNRTP07_MOBILE_NUMBER_R" },
			name: { type: DataTypes.STRING, field: "TNRTP07_NAME_N" },
			pcName: { type: DataTypes.STRING, field: "TNRTP07_PC_NAME_N" },
			pcAddress: { type: DataTypes.STRING, field: "TNRTP07_PC_ADDRESS_N" },
			districtId: { type: DataTypes.INTEGER, field: "TNRTP07_US_DISTRICT_MASTER_D" },
			blockId: { type: DataTypes.INTEGER, field: "TNRTP07_US_BLOCK_MASTER_D" },
			panchayatId: { type: DataTypes.INTEGER, field: "TNRTP07_US_PANCHAYAT_MASTER_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP07_STATUS_D",
			},
			TNRTP07_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP07_CREATED_AT: { type: DataTypes.DATE },
			TNRTP07_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP07_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP07_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcFormBasicDetails.selectedFields = [
		"mobileNumber",
		"name",
		"pcName",
		"pcAddress",
		["TNRTP07_US_DISTRICT_MASTER_D", "district"],
		["TNRTP07_US_BLOCK_MASTER_D", "block"],
		["TNRTP07_US_PANCHAYAT_MASTER_D", "panchayat"],
	];
	return pcFormBasicDetails;
};
