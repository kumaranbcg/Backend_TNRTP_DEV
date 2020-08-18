module.exports = (sequelize, DataTypes) => {
	const egAssessment = sequelize.define(
		"TNRTP109_EG_APPLICATION_ASSESSMENT_MASTER",
		{
			assessmentId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP109_EG_APPLICATION_ASSESSMENT_MASTER_D",
			},
			formId: { type: DataTypes.STRING, field: "TNRTP109_EG_FORMS_MASTER_D" },
			assessmentName: { type: DataTypes.STRING, field: "TNRTP109_EG_APPLICATION_ASSESSMENT_NAME_N" },
			assessmentValue: {
				type: DataTypes.STRING,
				field: "TNRTP109_EG_APPLICATION_ASSESSMENT_VALUE_N",
			},
			assessmentScore: {
				type: DataTypes.INTEGER,
				field: "TNRTP109_EG_APPLICATION_ASSESSMENT_SCORE_D",
			},
			assessmentTotalScore: {
				type: DataTypes.INTEGER,
				field: "TNRTP109_EG_APPLICATION_ASSESSMENT_TOTAL_SCORE_D",
			},
			isSupportive: { type: DataTypes.BOOLEAN, field: "TNRTP109_IS_SUPPORTIVE_DOCUMENT_D" },
			reason: { type: DataTypes.STRING, field: "TNRTP109_REASON_N" },
			TNRTP109_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP109_CREATED_AT: { type: DataTypes.DATE },
			TNRTP109_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egAssessment.associate = function (models) {
		// associations can be defined here
		egAssessment.hasMany(models.egAssessmentDoc, {
			foreignKey: "TNRTP108_EG_APPLICATION_ASSESSMENT_MASTER_D",
			as: "documents",
		});
	};
	egAssessment.selectedFields = [
		"assessmentName",
		"assessmentValue",
		"assessmentScore",
		"assessmentTotalScore",
		"isSupportive",
		"reason",
	];
	return egAssessment;
};
