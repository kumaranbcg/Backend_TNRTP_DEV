const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const db = require("..");
module.exports = (sequelize, DataTypes) => {
	const symrBasicDetails = sequelize.define(
		"TNRTP01_SYMR_FORMS_BASIC_DETAILS",
		{
			TNRTP01_SYMR_FORMS_BASIC_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP01_SYMR_FORMS_MASTER_D" },
            mobileNumber: { type: DataTypes.STRING, field: "TNRTP01_MOBILE_NUMBER_R" },
		    sourceInfoId: { type: DataTypes.INTEGER, field: "TNRTP01_SOURCE_OF_INFO_MASTER_D" },
			name: { type: DataTypes.STRING, field: "TNRTP01_NAME_N" },
            address: { type: DataTypes.STRING, field: "TNRTP01_SYMR_ADDRESS_N" },
            fatherName: { type: DataTypes.STRING, field: "TNRTP01_FATHER_NAME_N" },
            dateOfBirth: { type: DataTypes.DATE, field: "TNRTP01_DATE_OF_BIRTH" },
            age: { type: DataTypes.INTEGER, field: "TNRTP01_AGE_D" },
            genderId: { type: DataTypes.INTEGER, field: "TNRTP01_GENDER_MASTER_D" },
		    religionId: { type: DataTypes.INTEGER, field: "TNRTP01_RELIGION_MASTER_D" },
		    communityId: { type: DataTypes.INTEGER, field: "TNRTP01_COMMUNITY_MASTER_D" },
            educationQualificationId: { type: DataTypes.INTEGER, field: "TNRTP01_EDUC_QUALIFICATION_MASTER_D" },
            //ID PROOF 
		    proofTypeId: { type: DataTypes.INTEGER, field: "TNRTP01_PROOF_TYPE_MASTER_D" },
		    govtIdNumber: { type: DataTypes.INTEGER, field: "TNRTP01_GOVT_ID_NUMBER_D" },
            // MIGRATIN DETAILS
		    natureOfMigrationId: { type: DataTypes.INTEGER, field: "TNRTP01_NATURE_OF_MIGRATION_MASTER_D" },
            placeReturnFrom: { type: DataTypes.STRING, field: "TNRTP01_SYMR_PLACE_RETURN_FROM_N" },
            previousOccupation: { type: DataTypes.STRING, field: "TNRTP01_SYMR_PREVIOUS_OCCUPATION_N" },
			isWomeHeaded: { type: DataTypes.BOOLEAN, field: "TNRTP01_BELONGS_TO_WOMEN_HEADED_D" },
			isVulnerableCategory: { type: DataTypes.BOOLEAN, field: "TNRTP01_BELONGS_TO_VULNERABLE_CATEGORY_D" },
            
			districtId: { type: DataTypes.INTEGER, field: "TNRTP01_US_DISTRICT_MASTER_D" },
			blockId: { type: DataTypes.INTEGER, field: "TNRTP01_US_BLOCK_MASTER_D" },
			panchayatId: { type: DataTypes.INTEGER, field: "TNRTP01_US_PANCHAYAT_MASTER_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP01_STATUS_D",
			},
			TNRTP01_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP01_CREATED_AT: { type: DataTypes.DATE },
			TNRTP01_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP01_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP01_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
    );
    symrBasicDetails.associate = function (models) {
		symrBasicDetails.belongsTo(models.sourceOfInfo, {
			foreignKey: "TNRTP01_SOURCE_OF_INFO_MASTER_D",
			as: "sourceOfInfoData",
		});
		symrBasicDetails.belongsTo(models.gender, {
			foreignKey: "TNRTP01_GENDER_MASTER_D",
			as: "genderData",
		});
		symrBasicDetails.belongsTo(models.religion, {
			foreignKey: "TNRTP01_FORMED_RELIGION_MASTER_D",
			as: "religionData",
		});
		symrBasicDetails.belongsTo(models.community, {
			foreignKey: "TNRTP01_COMMUNITY_MASTER_D",
			as: "communityData",
		});
		symrBasicDetails.belongsTo(models.educQualification, {
			foreignKey: "TNRTP01_EDUC_QUALIFICATION_MASTER_D",
			as: "educQualificationData",
        });
        symrBasicDetails.belongsTo(models.proofType, {
			foreignKey: "TNRTP01_PROOF_TYPE_MASTER_D",
			as: "proofTypeData",
        });
        symrBasicDetails.belongsTo(models.natureOfMigration, {
			foreignKey: "TNRTP01_NATURE_OF_MIGRATION_MASTER_MASTER_D",
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
		["TNRTP07_US_DISTRICT_MASTER_D", "district"],
		["TNRTP07_US_BLOCK_MASTER_D", "block"],
		["TNRTP07_US_PANCHAYAT_MASTER_D", "panchayat"],
	];
	return symrBasicDetails;
};
