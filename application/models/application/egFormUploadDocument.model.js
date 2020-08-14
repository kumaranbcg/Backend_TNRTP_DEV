const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const egFormUploadDocument = sequelize.define(
		"TNRTP60_EG_FORMS_UPLOAD_DOCUMENT",
		{
			TNRTP60_EG_FORMS_UPLOAD_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP60_EG_FORMS_MASTER_D" },
			remarks: { type: DataTypes.STRING, field: "TNRTP60_EG_FORMS_REMARKS" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP60_STATUS_D",
			},
			TNRTP60_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP60_CREATED_AT: { type: DataTypes.DATE },
			TNRTP60_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP60_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP60_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egFormUploadDocument.associate = function (models) {
		egFormUploadDocument.hasMany(models.selectedEgDoc, {
			foreignKey: "TNRTP64_EG_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "minOfEGRefund",
		});
		egFormUploadDocument.hasMany(models.selectedEgDoc, {
			foreignKey: "TNRTP64_EG_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "bankPassBook",
		});
		egFormUploadDocument.hasMany(models.selectedEgDoc, {
			foreignKey: "TNRTP64_EG_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "businessPlan",
		});
	};
	egFormUploadDocument.selectedFields = ["remarks"];
	return egFormUploadDocument;
};
