module.exports = (sequelize, DataTypes) => {
	const pgApplicationStatus = sequelize.define(
		"TNRTP48_PG_APPLICATION_STATUS_MASTER",
		{
			TNRTP48_PG_APPLICATION_STATUS_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.STRING, field: "TNRTP48_PG_FORMS_MASTER_D" },
			isActivityEsmf: { type: DataTypes.BOOLEAN, field: "TNRTP48_IS_ACTIVITY_D" },
			activityCategory: { type: DataTypes.INTEGER, field: "TNRTP48_IS_ACTIVITY_ESMF_CATEGORY_N" },
			approvedAmount: { type: DataTypes.INTEGER, field: "TNRTP48_APPROVED_AMOUNT_D" },
			dmpuVerifyDate: { type: DataTypes.DATE, field: "TNRTP48_DPMU_VERIFICATION_DATE" },
			decMeetingDate: { type: DataTypes.DATE, field: "TNRTP48_DEC_MEETING_DATE" },
			isSmpuVerified: { type: DataTypes.BOOLEAN, field: "TNRTP48_IS_SPMU_VERIFIED_D" },
			applicationStatus: { type: DataTypes.INTEGER, field: "TNRTP48_IS_APPLICATION_STATUS_D" },
			remarks: { type: DataTypes.STRING, field: "TNRTP48_IS_REMARK_N" },
			TNRTP48_TYPE_D: { type: DataTypes.STRING },
			status: { type: DataTypes.INTEGER, field: "TNRTP48_STATUS_D" },
			TNRTP48_CREATED_AT: { type: DataTypes.DATE },
			TNRTP48_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP48_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP48_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgApplicationStatus.associate = function (models) {
		pcApplicationStatus.hasMany(models.pgRequiredDoc, {
			foreignKey: "TNRTP49_PG_APPLICATION_STATUS_MASTER_D",
			as: "signedAssesment",
		});
		pcApplicationStatus.hasMany(models.pgRequiredDoc, {
			foreignKey: "TNRTP49_PG_APPLICATION_STATUS_MASTER_D",
			as: "blockLevelForm",
		});
		pcApplicationStatus.hasMany(models.pgRequiredDoc, {
			foreignKey: "TNRTP49_PG_APPLICATION_STATUS_MASTER_D",
			as: "smpuApprovalLetter",
		});
		pcApplicationStatus.hasMany(models.pgRequiredDoc, {
			foreignKey: "TNRTP49_PG_APPLICATION_STATUS_MASTER_D",
			as: "decmm",
		});
		pcApplicationStatus.hasMany(models.pgRequiredDoc, {
			foreignKey: "TNRTP49_PG_APPLICATION_STATUS_MASTER_D",
			as: "firstTrancheUc",
		});
	};
	return pcApplicationStatus;
};
