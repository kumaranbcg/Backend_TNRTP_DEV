module.exports = (sequelize, DataTypes) => {
	const egDisbursement = sequelize.define(
		"TNRTP110_EG_FORM_DISBURSEMENT_MASTER",
		{
			TNRTP110_EG_FORM_DISBURSEMENT_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP110_EG_FORMS_MASTER_D" },
			disbursmentType: { type: DataTypes.INTEGER, field: "TNRTP110_EG_FORM_DISBURSEMENT_TYPE_D" },
			isDisbursment: { type: DataTypes.BOOLEAN, field: "TNRTP110_IS_PC_FORM_DISBURSEMENT_D" },
			disbursmentDate: { type: DataTypes.DATE, field: "TNRTP110_EG_FORM_DISBURSEMENT_DATE" },
			disbursmentAmount: {
				type: DataTypes.BIGINT,
				field: "TNRTP110_EG_FORM_DISBURSEMENT_AMOUNT_D",
			},
			firstTrancheSubmitDate: {
				type: DataTypes.DATE,
				field: "TNRTP110_EG_FIRST_TRANCHE_SUBMIT_DATE",
			},
			disbursmentSubmitDate: {
				type: DataTypes.DATE,
				field: "TNRTP110_EG_SECOND_TRANCHE_UC_SUMBIT_DATE",
			},
			TNRTP110_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP110_CREATED_AT: { type: DataTypes.DATE },
			TNRTP110_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP110_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP110_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egDisbursement.associate = function (models) {
		egDisbursement.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP109_EG_APPLICATION_STATUS_MASTER_D",
			as: "firstUcCertificate",
		});
	};
	return egDisbursement;
};
