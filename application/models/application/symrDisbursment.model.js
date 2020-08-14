module.exports = (sequelize, DataTypes) => {
	const symrDisbursment = sequelize.define(
		"TNRTP104_SYMR_FORM_DISBURSEMENT_MASTER",
		{
			TNRTP104_SYMR_FORM_DISBURSEMENT_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP104_SYMR_FORMS_MASTER_D" },
			disbursmentType: { type: DataTypes.INTEGER, field: "TNRTP104_SYMR_FORM_DISBURSEMENT_TYPE_D" },
			isDisbursment: { type: DataTypes.BOOLEAN, field: "TNRTP104_IS_SYMR_FORM_DISBURSEMENT_D" },
			disbursmentDate: { type: DataTypes.DATE, field: "TNRTP104_SYMR_FORM_DISBURSEMENT_DATE" },
			disbursmentAmount: {
				type: DataTypes.INTEGER,
				field: "TNRTP104_SYMR_FORM_DISBURSEMENT_AMOUNT_D",
			},
			firstTrancheSubmitDate: {
				type: DataTypes.DATE,
				field: "TNRTP104_SYMR_FIRST_TRANCHE_SUBMIT_DATE",
			},
			disbursmentSubmitDate: {
				type: DataTypes.DATE,
				field: "TNRTP104_SYMR_SECOND_TRANCHE_UC_SUMBIT_DATE",
			},
			TNRTP104_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP104_CREATED_AT: { type: DataTypes.DATE },
			TNRTP104_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP104_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP104_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrDisbursment.associate = function (models) {
		symrDisbursment.hasMany(models.symrRequiredDoc, {
			foreignKey: "TNRTP97_SYMR_FORMS_APP_DISBUSRMENT_MASTER_D",
			as: "firstUcCertificate",
		});
	};
	return symrDisbursment;
};
