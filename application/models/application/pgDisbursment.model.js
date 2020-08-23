module.exports = (sequelize, DataTypes) => {
	const pgDisbursment = sequelize.define(
		"TNRTP50_PG_FORM_DISBURSEMENT_MASTER",
		{
			TNRTP50_PG_FORM_DISBURSEMENT_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP50_PG_FORMS_MASTER_D" },
			disbursmentType: { type: DataTypes.INTEGER, field: "TNRTP50_PG_FORM_DISBURSEMENT_TYPE_D" },
			isDisbursment: { type: DataTypes.BOOLEAN, field: "TNRTP50_IS_PC_FORM_DISBURSEMENT_D" },
			disbursmentDate: { type: DataTypes.DATE, field: "TNRTP50_PG_FORM_DISBURSEMENT_DATE" },
			disbursmentAmount: {
				type: DataTypes.BIGINT,
				field: "TNRTP50_PG_FORM_DISBURSEMENT_AMOUNT_D",
			},
			firstTrancheSubmitDate: {
				type: DataTypes.DATE,
				field: "TNRTP50_PG_FIRST_TRANCHE_SUBMIT_DATE",
			},
			disbursmentSubmitDate: {
				type: DataTypes.DATE,
				field: "TNRTP50_PG_SECOND_TRANCHE_UC_SUMBIT_DATE",
			},
			TNRTP50_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP50_CREATED_AT: { type: DataTypes.DATE },
			TNRTP50_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP50_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP50_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgDisbursment.associate = function (models) {
		pgDisbursment.hasMany(models.pgRequiredDoc, {
			foreignKey: "TNRTP49_PG_APPLICATION_STATUS_MASTER_D",
			as: "firstUcCertificate",
		});
	};
	return pgDisbursment;
};
