const { FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const mainDashboard = sequelize.define(
		"TNRTP95_DASHBOARD_FORMS_MASTER",
		{
			TNRTP81_DASHBOARD_FORMS_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP81_FORMS_MASTER_D" },
			formTypeId: { type: DataTypes.INTEGER, field: "TNRTP81_FORMS_TYPE_D" },
			districtId: { type: DataTypes.INTEGER, field: "TNRTP81_US_DISTRICT_MASTER_D" },
			blockId: { type: DataTypes.INTEGER, field: "TNRTP81_US_BLOCK_MASTER_D" },
			panchayatId: { type: DataTypes.INTEGER, field: "TNRTP81_US_PANCHAYAT_MASTER_D" },
			totalDisburement: { type: DataTypes.INTEGER, field: "TNRTP81_TOTAL_DISBURSEMENT_AMOUNT_D" },
			applicationStatus: { type: DataTypes.INTEGER, field: "TNRTP81_IS_APPLICATION_STATUS_D" },
			totalMember: { type: DataTypes.INTEGER, field: "TNRTP81_TOTAL_MEMBERS_D" },
			totalGender: { type: DataTypes.INTEGER, field: "TNRTP81_TOTAL_GENDER_D" },
			totalCommunity: { type: DataTypes.INTEGER, field: "TNRTP81_TOTAL_COMMUNITY_D" },
			totalSHG: { type: DataTypes.INTEGER, field: "TNRTP81_TOTAL_SHG_D" },
			totalVulnerable: { type: DataTypes.INTEGER, field: "TNRTP81_TOTAL_VULNERABLE_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP81_STATUS_D",
			},
			TNRTP81_CREATED_AT: { type: DataTypes.DATE },
			TNRTP81_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP81_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP81_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	mainDashboard.selectedFields = [
		"formId",
		"formTypeId",
		"totalDisburement",
		"applicationStatus",
		"totalMember",
		"totalGender",
		"totalCommunity",
		"totalSHG",
		"totalVulnerable",
		["TNRTP07_US_DISTRICT_MASTER_D", "district"],
		["TNRTP07_US_BLOCK_MASTER_D", "block"],
		["TNRTP07_US_PANCHAYAT_MASTER_D", "panchayat"],
	];
	return mainDashboard;
};
