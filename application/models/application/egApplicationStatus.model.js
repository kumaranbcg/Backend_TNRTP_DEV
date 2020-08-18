module.exports = (sequelize, DataTypes) => {
	const egApplicationStatus = sequelize.define(
		"TNRTP105_PG_APPLICATION_STATUS_MASTER",
		{
			TNRTP105_PG_APPLICATION_STATUS_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.STRING, field: "TNRTP105_PG_FORMS_MASTER_D" },
			isActivityEsmf: { type: DataTypes.BOOLEAN, field: "TNRTP105_IS_ACTIVITY_D" },
			activityCategory: { type: DataTypes.INTEGER, field: "TNRTP105_IS_ACTIVITY_ESMF_CATEGORY_N" },
            approvedAmount: { type: DataTypes.INTEGER, field: "TNRTP105_APPROVED_AMOUNT_D" },
			blcAssessmentDate: { type: DataTypes.DATE, field: "TNRTP105_BLC_ASSESSMENT_DATE" },
			dmpuVerifyDate: { type: DataTypes.DATE, field: "TNRTP105_DPMU_VERIFICATION_DATE" },
			decMeetingDate: { type: DataTypes.DATE, field: "TNRTP105_DEC_MEETING_DATE" },
			isSmpuVerified: { type: DataTypes.BOOLEAN, field: "TNRTP105_IS_SPMU_VERIFIED_D" },
			applicationStatus: { type: DataTypes.INTEGER, field: "TNRTP105_IS_APPLICATION_STATUS_D" },
			remarks: { type: DataTypes.STRING, field: "TNRTP105_IS_REMARK_N" },
			TNRTP105_TYPE_D: { type: DataTypes.STRING },
			status: { type: DataTypes.INTEGER, field: "TNRTP105_STATUS_D" },
			TNRTP105_CREATED_AT: { type: DataTypes.DATE },
			TNRTP105_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP105_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP105_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egApplicationStatus.associate = function (models) {
		egApplicationStatus.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP106_EG_APPLICATION_STATUS_MASTER_D",
			as: "signedAssesment",
		});
		egApplicationStatus.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP106_EG_APPLICATION_STATUS_MASTER_D",
			as: "blockLevelForm",
		});
		egApplicationStatus.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP106_EG_APPLICATION_STATUS_MASTER_D",
			as: "smpuApprovalLetter",
		});
		egApplicationStatus.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP106_EG_APPLICATION_STATUS_MASTER_D",
			as: "decmm",
		});
		egApplicationStatus.hasMany(models.egRequiredDoc, {
			foreignKey: "TNRTP106_EG_APPLICATION_STATUS_MASTER_D",
			as: "firstTrancheUc",
		});
	};
	return egApplicationStatus;
};
