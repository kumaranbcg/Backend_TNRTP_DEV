module.exports = (sequelize, DataTypes) => {
	const pcDisbursment = sequelize.define(
		"TNRTP22_PC_FORM_DISBURSEMENT_MASTER",
		{
			TNRTP22_PC_FORM_DISBURSEMENT_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP22_PC_FORMS_MASTER_D" },
			disbursmentType: { type: DataTypes.INTEGER, field: "TNRTP22_PC_FORM_DISBURSEMENT_TYPE_D" },
			isDisbursment: { type: DataTypes.BOOLEAN, field: "TNRTP22_IS_PC_FORM_DISBURSEMENT_D" },
			disbursmentDate: { type: DataTypes.DATE, field: "TNRTP22_PC_FORM_DISBURSEMENT_DATE" },
			disbursmentAmount: {
				type: DataTypes.INTEGER,
				field: "TNRTP22_PC_FORM_DISBURSEMENT_AMOUNT_D",
			},
			disbursmentSubmitDate: {
				type: DataTypes.DATE,
				field: "TNRTP22_PC_FIRST_TRANCHE_UC_SUMBIT_DATE",
			},
			firstUcCertificate: {
				type: DataTypes.INTEGER,
				field: "TNRTP22_SELECTED_PC_FIRST_UC_CERTIFICATE_D",
			},
			smpuTrancheApproval: {
				type: DataTypes.INTEGER,
				field: "TNRTP22_SELECTED_PC_SPMU_APPROVAL_LETTER_D",
			},
			secondTrancheApproval: {
				type: DataTypes.INTEGER,
				field: "TNRTP22_SELECTED_PC_SECOND_UC_CERTIFICATE_D",
			},
			TNRTP22_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP22_CREATED_AT: { type: DataTypes.DATE },
			TNRTP22_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP22_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP22_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcDisbursment.associate = function (models) {
		pcDisbursment.hasMany(models.pcRequiredDoc, {
			foreignKey: "TNRTP21_PC_FORMS_MASTER_D",
			as: "firstUcCertificateList",
		});
		pcDisbursment.hasMany(models.pcRequiredDoc, {
			foreignKey: "TNRTP21_PC_FORMS_MASTER_D",
			as: "smpuTrancheApprovalList",
		});
		pcDisbursment.hasMany(models.pcRequiredDoc, {
			foreignKey: "TNRTP21_PC_FORMS_MASTER_D",
			as: "secondTrancheApprovalList",
		});
	};
	pcDisbursment.selectedFields = [
		"disbursmentType",
		"isDisbursment",
		"disbursmentDate",
		"disbursmentAmount",
		"disbursmentSubmitDate",
		["TNRTP22_UPDATED_D", "disBursedBy"],
	];
	return pcDisbursment;
};
