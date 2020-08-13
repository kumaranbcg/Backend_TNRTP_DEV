const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const egFormDetails = sequelize.define(
		"TNRTP55_EG_FORMS_DETAILS",
		{
			TNRTP55_EG_FORMS_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP55_EG_FORMS_MASTER_D" },
			dateFormation: { type: DataTypes.DATE, field: "TNRTP55_DATE_OF_FORMATION" },
			dateRegistration: { type: DataTypes.DATE, field: "TNRTP55_DATE_OF_REGISTRATION" },
			registrationUnder: { type: DataTypes.INTEGER, field: "TNRTP55_REGISTRATION_UNDER_MASTER_D" },
			registrationNumber: { type: DataTypes.STRING, field: "TNRTP55_REGISTRATION_NUMBER_R" },
			promotingOrgName: { type: DataTypes.STRING, field: "TNRTP55_PROMOTING_ORGANIZATION_NAME_N" },
			formSupportedBy: { type: DataTypes.INTEGER, field: "TNRTP55_FORMED_SUPPORTED_BY_MASTER_D" },
			othersName: { type: DataTypes.STRING, field: "TNRTP55_OTHERS_NAME_N" },
			noOfEG: { type: DataTypes.INTEGER, field: "TNRTP55_NO_OF_EG_N" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP55_STATUS_D",
			},
			TNRTP55_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP55_CREATED_AT: { type: DataTypes.DATE },
			TNRTP55_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP55_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP55_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egFormDetails.associate = function (models) {
		egFormDetails.hasMany(models.selectedPg, {
			foreignKey: "TNRTP45_EG_FORMS_DETAILS_MASTER_D",
			as: "egTypes",
		});
		egFormDetails.hasMany(models.selectedPgCommodity, {
			foreignKey: "TNRTP47_EG_FORMS_DETAILS_MASTER_D",
			as: "egCommodityTypes",
		});
		egFormDetails.hasMany(models.selectedPgSector, {
			foreignKey: "TNRTP46_EG_FORMS_DETAILS_MASTER_D",
			as: "egSectorTypes",
		});
		egFormDetails.belongsTo(models.registrationUnder, {
			foreignKey: "TNRTP55_REGISTRATION_UNDER_MASTER_D",
			as: "registrationUnderData",
		});
		egFormDetails.belongsTo(models.formedSupported, {
			foreignKey: "TNRTP55_FORMED_SUPPORTED_BY_MASTER_D",
			as: "formSupportedData",
		});
	};
	egFormDetails.selectedFields = [
		"dateFormation",
		"dateRegistration",
		"registrationNumber",
		"promotingOrgName",
		"othersName",
		"noOfEG",
	];
	return egFormDetails;
};
