const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const symrUploadDocument = sequelize.define(
		"TNRTP85_SYMR_UPLOAD_DOCUMENT",
		{
			TNRTP85_SYMR_UPLOAD_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP85_SYMR_FORMS_MASTER_D" },
			remarks: { type: DataTypes.STRING, field: "TNRTP85_SYMR_REMARKS" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP85_STATUS_D",
			},
			TNRTP85_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP85_CREATED_AT: { type: DataTypes.DATE },
			TNRTP85_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP85_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP85_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrUploadDocument.associate = function (models) {
		symrUploadDocument.hasMany(models.selectedSymrDoc, {
			foreignKey: "TNRTP19_SYMR_UPLOAD_DOCUMENT_MASTER_D",
			as: "proofOfMigration",
		});
		symrUploadDocument.hasMany(models.selectedSymrDoc, {
			foreignKey: "TNRTP19_SYMR_UPLOAD_DOCUMENT_MASTER_D",
			as: "applicationLetter",
		});
		symrUploadDocument.hasMany(models.selectedSymrDoc, {
			foreignKey: "TNRTP19_SYMR_UPLOAD_DOCUMENT_MASTER_D",
			as: "bankPassBook",
		});
		symrUploadDocument.hasMany(models.selectedSymrDoc, {
			foreignKey: "TNRTP19_SYMR_UPLOAD_DOCUMENT_MASTER_D",
			as: "idProofPhoto",
		});
		symrUploadDocument.hasMany(models.selectedSymrDoc, {
			foreignKey: "TNRTP19_SYMR_UPLOAD_DOCUMENT_MASTER_D",
			as: "businessPlan",
        });
        symrUploadDocument.hasMany(models.selectedSymrDoc, {
			foreignKey: "TNRTP19_SYMR_UPLOAD_DOCUMENT_MASTER_D",
			as: "trainingCertificate",
		});
	};
	symrUploadDocument.selectedFields = ["remarks"];
	return symrUploadDocument;
};
