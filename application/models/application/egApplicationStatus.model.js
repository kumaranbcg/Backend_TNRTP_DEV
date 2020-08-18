module.exports = (sequelize, DataTypes) => {
	const egApplicationStatus = sequelize.define(
		"TNRTP108_EG_APPLICATION_STATUS_MASTER",
		{
			TNRTP108_EG_APPLICATION_STATUS_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.STRING, field: "TNRTP108_EG_FORMS_MASTER_D" },
			isActivityEsmf: { type: DataTypes.BOOLEAN, field: "TNRTP108_IS_ACTIVITY_D" },
			activityCategory: { type: DataTypes.INTEGER, field: "TNRTP108_IS_ACTIVITY_ESMF_CATEGORY_N" },
            approvedAmount: { type: DataTypes.INTEGER, field: "TNRTP108_APPROVED_AMOUNT_D" },
			blcAssessmentDate: { type: DataTypes.DATE, field: "TNRTP108_BLC_ASSESSMENT_DATE" },
			dmpuVerifyDate: { type: DataTypes.DATE, field: "TNRTP108_DPMU_VERIFICATION_DATE" },
			decMeetingDate: { type: DataTypes.DATE, field: "TNRTP108_DEC_MEETING_DATE" },
			isSmpuVerified: { type: DataTypes.BOOLEAN, field: "TNRTP108_IS_SPMU_VERIFIED_D" },
			applicationStatus: { type: DataTypes.INTEGER, field: "TNRTP108_IS_APPLICATION_STATUS_D" },
			remarks: { type: DataTypes.STRING, field: "TNRTP108_IS_REMARK_N" },
			TNRTP108_TYPE_D: { type: DataTypes.STRING },
			status: { type: DataTypes.INTEGER, field: "TNRTP108_STATUS_D" },
			TNRTP108_CREATED_AT: { type: DataTypes.DATE },
			TNRTP108_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP108_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP108_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egApplicationStatus.associate = function (models) {
		egApplicationStatus.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP109_EG_APPLICATION_STATUS_MASTER_D",
			as: "signedAssesment",
		});
		egApplicationStatus.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP109_EG_APPLICATION_STATUS_MASTER_D",
			as: "blockLevelForm",
		});
		egApplicationStatus.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP109_EG_APPLICATION_STATUS_MASTER_D",
			as: "smpuApprovalLetter",
		});
		egApplicationStatus.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP109_EG_APPLICATION_STATUS_MASTER_D",
			as: "decmm",
		});
		egApplicationStatus.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP109_EG_APPLICATION_STATUS_MASTER_D",
			as: "firstTrancheUc",
		});
	};
	return egApplicationStatus;
};
