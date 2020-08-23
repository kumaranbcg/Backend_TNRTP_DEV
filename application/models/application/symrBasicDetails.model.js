const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const db = require("..");
module.exports = (sequelize, DataTypes) => {
	const symrBasicDetails = sequelize.define(
		"TNRTP69_SYMR_BASIC_DETAILS",
		{
			TNRTP69_SYMR_BASIC_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP69_SYMR_FORMS_MASTER_D" },
			mobileNumber: { type: DataTypes.STRING, field: "TNRTP69_MOBILE_NUMBER_R" },
			sourceInfo: { type: DataTypes.INTEGER, field: "TNRTP69_SOURCE_OF_INFO_MASTER_D" },
			name: { type: DataTypes.STRING, field: "TNRTP69_NAME_N" },
			address: { type: DataTypes.STRING, field: "TNRTP69_ADDRESS_N" },
			fatherName: { type: DataTypes.STRING, field: "TNRTP69_FATHER_NAME_N" },
			dateOfBirth: { type: DataTypes.DATE, field: "TNRTP69_DATE_OF_BIRTH" },
			age: { type: DataTypes.INTEGER, field: "TNRTP69_AGE_D" },
			gender: { type: DataTypes.INTEGER, field: "TNRTP69_GENDER_MASTER_D" },
			religion: { type: DataTypes.INTEGER, field: "TNRTP69_RELIGION_MASTER_D" },
			community: { type: DataTypes.INTEGER, field: "TNRTP69_COMMUNITY_MASTER_D" },
			educationQualification: {
				type: DataTypes.INTEGER,
				field: "TNRTP69_EDUC_QUALIFICATION_MASTER_D",
			},
			//ID PROOF
			proofType: { type: DataTypes.INTEGER, field: "TNRTP69_PROOF_TYPE_MASTER_D" },
			govtIdNumber: { type: DataTypes.STRING, field: "TNRTP69_GOVT_ID_NUMBER_N" },
			// MIGRATIN DETAILS
			natureOfMigration: { type: DataTypes.INTEGER, field: "TNRTP69_NATURE_OF_MIGRATION_MASTER_D" },
			placeReturnFrom: { type: DataTypes.STRING, field: "TNRTP69_PLACE_RETURN_FROM_N" },
			previousOccupation: { type: DataTypes.STRING, field: "TNRTP69_PREVIOUS_OCCUPATION_N" },
			isWomeHeaded: { type: DataTypes.BOOLEAN, field: "TNRTP69_BELONGS_TO_WOMEN_HEADED_D" },
			isVulnerableCategory: {
				type: DataTypes.BOOLEAN,
				field: "TNRTP69_BELONGS_TO_VULNERABLE_CATEGORY_D",
			},

			districtId: { type: DataTypes.INTEGER, field: "TNRTP69_US_DISTRICT_MASTER_D" },
			blockId: { type: DataTypes.INTEGER, field: "TNRTP69_US_BLOCK_MASTER_D" },
			panchayatId: { type: DataTypes.INTEGER, field: "TNRTP69_US_PANCHAYAT_MASTER_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP69_STATUS_D",
			},
			TNRTP69_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP69_CREATED_AT: { type: DataTypes.DATE },
			TNRTP69_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP69_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP69_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrBasicDetails.associate = function (models) {
		symrBasicDetails.belongsTo(models.sourceOfInfo, {
			foreignKey: "TNRTP69_SOURCE_OF_INFO_MASTER_D",
			as: "sourceOfInfoData",
		});
		symrBasicDetails.belongsTo(models.gender, {
			foreignKey: "TNRTP69_GENDER_MASTER_D",
			as: "genderData",
		});
		symrBasicDetails.belongsTo(models.religion, {
			foreignKey: "TNRTP69_RELIGION_MASTER_D",
			as: "religionData",
		});
		symrBasicDetails.belongsTo(models.community, {
			foreignKey: "TNRTP69_COMMUNITY_MASTER_D",
			as: "communityData",
		});
		symrBasicDetails.belongsTo(models.educQualification, {
			foreignKey: "TNRTP69_EDUC_QUALIFICATION_MASTER_D",
			as: "educQualificationData",
		});
		symrBasicDetails.belongsTo(models.proofType, {
			foreignKey: "TNRTP69_PROOF_TYPE_MASTER_D",
			as: "proofTypeData",
		});
		symrBasicDetails.belongsTo(models.natureOfMigration, {
			foreignKey: "TNRTP69_NATURE_OF_MIGRATION_MASTER_D",
			as: "natureOfMigrationData",
		});
	};
	symrBasicDetails.selectedFields = [
		"mobileNumber",
		"name",
		"address",
		"fatherName",
		"dateOfBirth",
		"age",
		"govtIdNumber",
		"placeReturnFrom",
		"previousOccupation",
		"isWomeHeaded",
		"isVulnerableCategory",
		["TNRTP69_US_DISTRICT_MASTER_D", "district"],
		["TNRTP69_US_BLOCK_MASTER_D", "block"],
		["TNRTP69_US_PANCHAYAT_MASTER_D", "panchayat"],
	];
	return symrBasicDetails;
};
