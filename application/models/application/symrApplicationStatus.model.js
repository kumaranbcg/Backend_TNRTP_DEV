module.exports = (sequelize, DataTypes) => {
	const symrApplicationStatus = sequelize.define(
		"TNRTP96_SYMR_APPLICATION_STATUS_MASTER",
		{
			TNRTP96_SYMR_APPLICATION_STATUS_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.STRING, field: "TNRTP96_SYMR_FORMS_MASTER_D" },
			isActivityEsmf: { type: DataTypes.BOOLEAN, field: "TNRTP96_IS_ACTIVITY_D" },
            activityCategory: { type: DataTypes.INTEGER, field: "TNRTP96_IS_ACTIVITY_ESMF_CATEGORY_N" },
			isReverseMigrated: { type: DataTypes.BOOLEAN, field: "TNRTP96_IS_REVERSE_MIGRATED_D" },
            dateOfBirth: { type: DataTypes.DATE, field: "TNRTP96_DATE_OF_BIRTH" },
            age: { type: DataTypes.INTEGER, field: "TNRTP96_AGE_D" },
            vprcAssessmentDate: { type: DataTypes.DATE, field: "TNRTP96_VPRC_ASSESSMENT_DATE" },
            approvedLoanAmount: { type: DataTypes.INTEGER, field: "TNRTP96_APPROVED_LOAN_AMOUNT_D" },
			applicationStatus: { type: DataTypes.INTEGER, field: "TNRTP96_IS_APPLICATION_STATUS_D" },
			remarks: { type: DataTypes.STRING, field: "TNRTP96_IS_REMARK_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP96_STATUS_D" },
			TNRTP96_CREATED_AT: { type: DataTypes.DATE },
			TNRTP96_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP96_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP96_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrApplicationStatus.associate = function (models) {
		symrApplicationStatus.hasMany(models.symrRequiredDoc, {
			foreignKey: "TNRTP97_SYMR_FORMS_APP_DISBUSRMENT_MASTER_D",
			as: "vprcCommitteeMom",
		});
	};
	symrApplicationStatus.selectedFields = [
		"isActivityEsmf",
		"activityCategory",
		"isReverseMigrated",
        "dateOfBirth",
		"age",
		"vprcAssessmentDate",
		"approvedLoanAmount",
		"applicationStatus",
		"remarks",
		["TNRTP96_UPDATED_D", "approvedBy"],
	];
	return symrApplicationStatus;
};
