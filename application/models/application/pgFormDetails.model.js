const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pgFormDetails = sequelize.define(
		"TNRTP38_PG_FORMS_DETAILS",
		{
			TNRTP38_PG_FORMS_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP38_PG_FORMS_MASTER_D" },
			dateFormation: { type: DataTypes.DATE, field: "TNRTP38_DATE_OF_FORMATION" },
			dateRegistration: { type: DataTypes.DATE, field: "TNRTP38_DATE_OF_REGISTRATION" },
			registrationUnder: { type: DataTypes.INTEGER, field: "TNRTP38_REGISTRATION_UNDER_MASTER_D" },
			registrationNumber: { type: DataTypes.STRING, field: "TNRTP38_REGISTRATION_NUMBER_R" },
			promotingOrgName: { type: DataTypes.INTEGER, field: "TNRTP38_PROMOTING_ORGANIZATION_NAME_D" },
			orgOthersName: { type: DataTypes.STRING, field: "TNRTP38_OTHERS_ORGANISATION_NAME_N" },
			formSupportedBy: { type: DataTypes.INTEGER, field: "TNRTP38_FORMED_SUPPORTED_BY_MASTER_D" },
			othersName: { type: DataTypes.STRING, field: "TNRTP38_OTHERS_NAME_N" },
			noOfPG: { type: DataTypes.INTEGER, field: "TNRTP38_NO_OF_PG_N" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP38_STATUS_D",
			},
			TNRTP38_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP38_CREATED_AT: { type: DataTypes.DATE },
			TNRTP38_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP38_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP38_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgFormDetails.associate = function (models) {
		pgFormDetails.hasMany(models.selectedPg, {
			foreignKey: "TNRTP45_PG_FORMS_DETAILS_MASTER_D",
			as: "pgTypes",
		});
		pgFormDetails.hasMany(models.selectedPgCommodity, {
			foreignKey: "TNRTP47_PG_FORMS_DETAILS_MASTER_D",
			as: "pgCommodityTypes",
		});
		pgFormDetails.hasMany(models.selectedPgSector, {
			foreignKey: "TNRTP46_PG_FORMS_DETAILS_MASTER_D",
			as: "pgSectorTypes",
		});
		pgFormDetails.belongsTo(models.registrationUnder, {
			foreignKey: "TNRTP38_REGISTRATION_UNDER_MASTER_D",
			as: "registrationUnderData",
		});
		pgFormDetails.belongsTo(models.formedSupported, {
			foreignKey: "TNRTP38_FORMED_SUPPORTED_BY_MASTER_D",
			as: "formSupportedData",
		});
		pgFormDetails.belongsTo(models.promotingOrg, {
			foreignKey: "TNRTP38_PROMOTING_ORGANIZATION_NAME_D",
			as: "promotingOrg",
		});
	};
	pgFormDetails.selectedFields = [
		"dateFormation",
		"dateRegistration",
		"registrationNumber",
		"othersName",
		"noOfPG",
		"orgOthersName",
	];
	return pgFormDetails;
};
