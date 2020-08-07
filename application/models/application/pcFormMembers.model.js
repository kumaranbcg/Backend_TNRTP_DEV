const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pcFormMembers = sequelize.define(
		"TNRTP09_PC_FORMS_MEMBERS",
		{
			TNRTP09_PC_FORMS_MEMBERS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP09_PC_FORMS_MASTER_D" },
			totalMembers: { type: DataTypes.INTEGER, field: "TNRTP09_TOTAL_MEMBERS_D" },
			noOfActive: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_ACTIVE_D" },
			noOfInActive: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_INACTIVE_D" },
			activeInactiveTotal: { type: DataTypes.INTEGER, field: "TNRTP09_ACTIVE_INACTIVE_TOTAL_D" },
			noOfMale: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_MALE_D" },
			noOfFemale: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_FEMALE_D" },
			noOfTransGender: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_TRANSGENDER_D" },
			genderTotal: { type: DataTypes.INTEGER, field: "TNRTP09_GENDER_TOTAL_D" },
			noOfBC: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_BC_D" },
			noOfMBC: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_MBC_D" },
			noOfSC: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_SC_D" },
			noOfST: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_ST_D" },
			noOfCommunityOthers: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_COMMUNITY_OTHERS_D" },
			communityTotal: { type: DataTypes.INTEGER, field: "TNRTP09_COMMUNITY_TOTAL_D" },
			noOfMuslim: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_MUSLIMS_D" },
			noOfChristians: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_CHRISTIANS_D" },
			noOfMinorityOthers: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_MINORITY_OTHERS_D" },
			minorityTotal: { type: DataTypes.INTEGER, field: "TNRTP09_MINORITY_TOTAL_D" },
			noOfDiffAbled: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_DIFFERENTLY_ABLED_D" },
			noOfWidow: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_WIDOW_D" },
			noOfDesitute: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_DESTITUTE_WOMEN_D" },
			noOfDeserted: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_DESERTED_WOMEN_D" },
			noOfVulTransGender: {
				type: DataTypes.INTEGER,
				field: "TNRTP09_NO_OF_VULNERABLE_TRANSGENDER_D",
			},
			noOfEiderly: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_EIDERLY_D" },
			vulnerableTotal: { type: DataTypes.INTEGER, field: "TNRTP09_VULNERABLE_TOTAL_D" },
			noOfSHGMembers: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_SHG_MEMBERS_D" },
			noOfSHGTotal: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_SHG_HOUSE_HOLDS_D" },
			noOfNonSHGTotal: { type: DataTypes.INTEGER, field: "TNRTP09_NO_OF_NON_SHG_HOUSE_HOLDS_D" },
			shgTotal: { type: DataTypes.INTEGER, field: "TNRTP09_SHG_TOTAL_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP09_STATUS_D",
			},
			TNRTP09_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP09_CREATED_AT: { type: DataTypes.DATE },
			TNRTP09_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP09_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP09_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcFormMembers.selectedFields = [
		"totalMembers",
		"noOfActive",
		"noOfInActive",
		"activeInactiveTotal",
		"noOfMale",
		"noOfFemale",
		"noOfTransGender",
		"genderTotal",
		"noOfBC",
		"noOfMBC",
		"noOfSC",
		"noOfST",
		"noOfCommunityOthers",
		"communityTotal",
		"noOfMuslim",
		"noOfChristians",
		"noOfMinorityOthers",
		"minorityTotal",
		"noOfDiffAbled",
		"noOfWidow",
		"noOfDesitute",
		"noOfDeserted",
		"noOfVulTransGender",
		"noOfEiderly",
		"vulnerableTotal",
		"noOfSHGMembers",
		"noOfSHGTotal",
		"noOfNonSHGTotal",
		"shgTotal",
	];
	return pcFormMembers;
};
