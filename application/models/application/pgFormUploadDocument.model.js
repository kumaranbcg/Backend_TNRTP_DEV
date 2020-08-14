	const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pgFormUploadDocument = sequelize.define(
		"TNRTP43_PG_FORMS_UPLOAD_DOCUMENT",
		{
			TNRTP43_PG_FORMS_UPLOAD_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP43_PG_FORMS_MASTER_D" },
			remarks: { type: DataTypes.STRING, field: "TNRTP43_PG_FORMS_REMARKS" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP43_STATUS_D",
			},
			TNRTP43_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP43_CREATED_AT: { type: DataTypes.DATE },
			TNRTP43_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP43_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP43_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgFormUploadDocument.associate = function (models) {
		pgFormUploadDocument.hasMany(models.selectedPgDoc, {
			foreignKey: "TNRTP44_PG_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "minOfPGRefund",
		});
		pgFormUploadDocument.hasMany(models.selectedPgDoc, {
			foreignKey: "TNRTP44_PG_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "bankPassBook",
		});
		pgFormUploadDocument.hasMany(models.selectedPgDoc, {
			foreignKey: "TNRTP44_PG_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "businessPlan",
		});
	};
	pgFormUploadDocument.selectedFields = ["remarks"];
	return pgFormUploadDocument;
};
