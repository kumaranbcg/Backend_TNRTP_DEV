module.exports = (sequelize, DataTypes) => {
	const pcApplicationStatus = sequelize.define(
		"TNRTP20_PC_APPLICATION_STATUS_MASTER",
		{
			TNRTP20_PC_APPLICATION_STATUS_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.STRING, field: "TNRTP20_PC_FORMS_MASTER_D" },
			isActivityEsmf: { type: DataTypes.BOOLEAN, field: "TNRTP20_IS_ACTIVITY_D" },
			activityCategory: { type: DataTypes.INTEGER, field: "TNRTP20_IS_ACTIVITY_ESMF_CATEGORY_N" },
			dmpuVerifyDate: { type: DataTypes.DATE, field: "TNRTP20_DPMU_VERIFICATION_DATE" },
			isSmpuVerified: { type: DataTypes.BOOLEAN, field: "TNRTP20_IS_SPMU_VERIFIED_D" },
			applicationStatus: { type: DataTypes.INTEGER, field: "TNRTP20_IS_APPLICATION_STATUS_D" },
			remarks: { type: DataTypes.STRING, field: "TNRTP20_IS_REMARK_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP20_STATUS_D" },
			TNRTP20_CREATED_AT: { type: DataTypes.DATE },
			TNRTP20_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP20_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP20_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcApplicationStatus.associate = function (models) {
		pcApplicationStatus.hasMany(models.pcRequiredDoc, {
			foreignKey: "TNRTP21_PC_FORMS_APP_DISBUSRMENT_MASTER_D",
			as: "smpuApprovalLetter",
		});
		pcApplicationStatus.hasMany(models.pcRequiredDoc, {
			foreignKey: "TNRTP21_PC_FORMS_APP_DISBUSRMENT_MASTER_D",
			as: "decMom",
		});
		pcApplicationStatus.hasMany(models.pcRequiredDoc, {
			foreignKey: "TNRTP21_PC_FORMS_APP_DISBUSRMENT_MASTER_D",
			as: "signedAssesment",
		});
	};
	pcApplicationStatus.selectedFields = [
		"isActivityEsmf",
		"activityCategory",
		"dmpuVerifyDate",
		"isSmpuVerified",
		"applicationStatus",
		"remarks",
		["TNRTP20_UPDATED_D", "approvedBy"],
	];
	return pcApplicationStatus;
};
