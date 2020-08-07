const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pcFormUploadDocument = sequelize.define(
		"TNRTP13_PC_FORMS_UPLOAD_DOCUMENT",
		{
			TNRTP13_PC_FORMS_UPLOAD_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP13_PC_FORMS_MASTER_D" },
			remarks: { type: DataTypes.STRING, field: "TNRTP13_PC_FORMS_REMARKS" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP13_STATUS_D",
			},
			TNRTP13_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP13_CREATED_AT: { type: DataTypes.DATE },
			TNRTP13_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP13_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP13_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcFormUploadDocument.associate = function (models) {
		pcFormUploadDocument.hasMany(models.selectedPcDoc, {
			foreignKey: "TNRTP19_PC_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "regCertificate",
		});
		pcFormUploadDocument.hasMany(models.selectedPcDoc, {
			foreignKey: "TNRTP19_PC_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "auditStatement",
		});
		pcFormUploadDocument.hasMany(models.selectedPcDoc, {
			foreignKey: "TNRTP19_PC_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "bankPassBook",
		});
		pcFormUploadDocument.hasMany(models.selectedPcDoc, {
			foreignKey: "TNRTP19_PC_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "latestMomRes",
		});
		pcFormUploadDocument.hasMany(models.selectedPcDoc, {
			foreignKey: "TNRTP19_PC_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			as: "businessPlan",
		});
	};
	pcFormUploadDocument.selectedFields = ["remarks"];
	return pcFormUploadDocument;
};
