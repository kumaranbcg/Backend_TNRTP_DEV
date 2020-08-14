const { FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const mainDashboard = sequelize.define(
		"TNRTP95_DASHBOARD_FORMS_MASTER",
		{
			TNRTP95_DASHBOARD_FORMS_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP95_FORMS_MASTER_D" },
			formTypeId: { type: DataTypes.INTEGER, field: "TNRTP95_FORMS_TYPE_D" },
			applicationStatus: { type: DataTypes.INTEGER, field: "TNRTP95_IS_APPLICATION_STATUS_D" },
			districtId: { type: DataTypes.INTEGER, field: "TNRTP95_US_DISTRICT_MASTER_D" },
			blockId: { type: DataTypes.INTEGER, field: "TNRTP95_US_BLOCK_MASTER_D" },
			panchayatId: { type: DataTypes.INTEGER, field: "TNRTP95_US_PANCHAYAT_MASTER_D" },
			totalDisburement: {
				type: DataTypes.INTEGER,
				field: "TNRTP95_TOTAL_DISBURSEMENT_AMOUNT_D",
				defaultValue: 0,
			},
			totalMembers: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_MEMBERS_D" },
			noOfMale: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_MALE_D" },
			noOfFemale: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_FEMALE_D" },
			noOfTransGender: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_TRANSGENDER_D" },
			genderTotal: { type: DataTypes.INTEGER, field: "TNRTP09_GENDER_TOTAL_D" },
			noOfBC: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_BC_D" },
			noOfMBC: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_MBC_D" },
			noOfSC: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_SC_D" },
			noOfST: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_ST_D" },
			noOfCommunityOthers: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_COMMUNITY_OTHERS_D" },
			noOfDiffAbled: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_DIFFERENTLY_ABLED_D" },
			noOfWidow: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_WIDOW_D" },
			noOfDesitute: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_DESTITUTE_WOMEN_D" },
			noOfDeserted: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_DESERTED_WOMEN_D" },
			noOfVulTransGender: {
				type: DataTypes.INTEGER,
				field: "TNRTP95_TOTAL_VULNERABLE_TRANSGENDER_D",
			},
			noOfEiderly: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_EIDERLY_D" },
			noOfSHGMembers: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_SHG_MEMBERS_D" },
			noOfSHGTotal: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_SHG_HOUSE_HOLDS_D" },
			noOfNonSHGTotal: { type: DataTypes.INTEGER, field: "TNRTP95_TOTAL_NON_SHG_HOUSE_HOLDS_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP95_STATUS_D",
			},
			TNRTP95_CREATED_AT: { type: DataTypes.DATE },
			TNRTP95_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP95_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP95_UPDATED_D: { type: DataTypes.INTEGER },
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
