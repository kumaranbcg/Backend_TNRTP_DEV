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
			regCertificate: {
				type: DataTypes.INTEGER,
				field: "TNRTP13_SELECTED_PC_REGISTRATION_CERTIFICATE_D",
			},
			auditStatement: { type: DataTypes.INTEGER, field: "TNRTP13_SELECTED_PC_AUDIT_STATEMENT_D" },
			bankPassBook: { type: DataTypes.STRING, field: "TNRTP13_SELECTED_PC_BANK_PASSBOOK_FRONT_D" },
			latestMomRes: {
				type: DataTypes.INTEGER,
				field: "TNRTP13_SELECTED_PC_LATEST_MOM_RESOLUTION_D",
			},
			businessPlan: {
				type: DataTypes.INTEGER,
				field: "TNRTP13_SELECTED_PC_BUSINESS_OR_ACTIVITY_PLAN_D",
			},
			remarks: { type: DataTypes.STRING, field: "TNRTP13_PC_FORMS_REMARKS" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNTRP13_STATUS_D",
			},
			TNTRP13_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNTRP13_CREATED_AT: { type: DataTypes.DATE },
			TNTRP13_UPDATED_AT: { type: DataTypes.DATE },
			TNTRP13_CREATED_D: { type: DataTypes.INTEGER },
			TNTRP13_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcFormUploadDocument.associate = function (models) {
		pcFormUploadDocument.hasMany(models.selectedPcDoc, {
			foreignKey: "TNRTP19_PC_FORMS_MASTER_D",
			as: "regCertificateList",
		});
		pcFormUploadDocument.hasMany(models.selectedPcDoc, {
			foreignKey: "TNRTP19_PC_FORMS_MASTER_D",
			as: "auditStatementList",
		});
		pcFormUploadDocument.hasMany(models.selectedPcDoc, {
			foreignKey: "TNRTP19_PC_FORMS_MASTER_D",
			as: "bankPassBookList",
		});
		pcFormUploadDocument.hasMany(models.selectedPcDoc, {
			foreignKey: "TNRTP19_PC_FORMS_MASTER_D",
			as: "latestMomResList",
		});
		pcFormUploadDocument.hasMany(models.selectedPcDoc, {
			foreignKey: "TNRTP19_PC_FORMS_MASTER_D",
			as: "businessPlanList",
		});
	};
	pcFormUploadDocument.selectedFields = ["remarks"];
	return pcFormUploadDocument;
};
