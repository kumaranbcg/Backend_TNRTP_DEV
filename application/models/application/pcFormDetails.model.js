const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pcFormDetails = sequelize.define(
		"TNRTP08_PC_FORMS_DETAILS",
		{
			TNRTP08_PC_FORMS_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP08_PC_FORMS_MASTER_D" },
			dateFormation: { type: DataTypes.DATE, field: "TNRTP08_DATE_OF_FORMATION" },
			dateRegistration: { type: DataTypes.DATE, field: "TNRTP08_DATE_OF_REGISTRATION" },
			registrationUnder: { type: DataTypes.INTEGER, field: "TNRTP08_REGISTRATION_UNDER_MASTER_D" },
			registrationNumber: { type: DataTypes.STRING, field: "TNRTP08_REGISTRATION_NUMBER_R" },
			promotingOrgName: { type: DataTypes.STRING, field: "TNRTP08_PROMOTING_ORGANIZATION_NAME_N" },
			formSupportedBy: { type: DataTypes.INTEGER, field: "TNRTP08_FORMED_SUPPORTED_BY_MASTER_D" },
			othersName: { type: DataTypes.STRING, field: "TNRTP08_OTHERS_NAME_N" },
			noOfPG: { type: DataTypes.INTEGER, field: "TNRTP08_NO_OF_PG_N" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP08_STATUS_D",
			},
			TNRTP08_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP08_CREATED_AT: { type: DataTypes.DATE },
			TNRTP08_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP08_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP08_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcFormDetails.associate = function (models) {
		pcFormDetails.hasMany(models.selectedPc, {
			foreignKey: "TNRTP16_PC_FORMS_DETAILS_MASTER_D",
			as: "pcTypes",
		});
		pcFormDetails.hasMany(models.selectedPcCommodity, {
			foreignKey: "TNRTP18_PC_FORMS_DETAILS_MASTER_D",
			as: "pcCommodityTypes",
		});
		pcFormDetails.hasMany(models.selectedPcSector, {
			foreignKey: "TNRTP17_PC_FORMS_DETAILS_MASTER_D",
			as: "pcSectorTypes",
		});
		pcFormDetails.belongsTo(models.registrationUnder, {
			foreignKey: "TNRTP08_REGISTRATION_UNDER_MASTER_D",
			as: "registrationUnderData",
		});
		pcFormDetails.belongsTo(models.formedSupported, {
			foreignKey: "TNRTP08_FORMED_SUPPORTED_BY_MASTER_D",
			as: "formSupportedData",
		});
	};
	pcFormDetails.selectedFields = [
		"dateFormation",
		"dateRegistration",
		"registrationNumber",
		"promotingOrgName",
		"othersName",
		"noOfPG",
	];
	return pcFormDetails;
};
