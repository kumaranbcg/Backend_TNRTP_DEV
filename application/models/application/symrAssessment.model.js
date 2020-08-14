module.exports = (sequelize, DataTypes) => {
	const symrAssessment = sequelize.define(
		"TNRTP101_SYMR_APPLICATION_ASSESSMENT_MASTER",
		{
			assessmentId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP101_SYMR_APPLICATION_ASSESSMENT_MASTER_D",
			},
			formId: { type: DataTypes.STRING, field: "TNRTP101_SYMR_FORMS_MASTER_D" },
			assessmentName: { type: DataTypes.STRING, field: "TNRTP101_SYMR_APPLICATION_ASSESSMENT_NAME_N" },
			assessmentValue: {
				type: DataTypes.INTEGER,
				field: "TNRTP101_SYMR_APPLICATION_ASSESSMENT_VALUE_D",
			},
			assessmentScore: {
				type: DataTypes.INTEGER,
				field: "TNRTP101_SYMR_APPLICATION_ASSESSMENT_SCORE_D",
			},
			assessmentTotalScore: {
				type: DataTypes.INTEGER,
				field: "TNRTP101_SYMR_APPLICATION_ASSESSMENT_TOTAL_SCORE_D",
			},
			isSupportive: { type: DataTypes.BOOLEAN, field: "TNRTP101_IS_SUPPORTIVE_DOCUMENT_D" },
			reason: { type: DataTypes.STRING, field: "TNRTP101_REASON_N" },
			TNRTP101_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP101_CREATED_AT: { type: DataTypes.DATE },
			TNRTP101_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrAssessment.associate = function (models) {
		// associations can be defined here
		symrAssessment.hasMany(models.symrAssessmentDoc, {
			foreignKey: "TNRTP102_SYMR_APPLICATION_ASSESSMENT_MASTER_D",
			as: "documents",
		});
	};
	symrAssessment.selectedFields = [
		"assessmentName",
		"assessmentValue",
		"assessmentScore",
		"isSupportive",
		"reason",
	];
	return symrAssessment;
};
