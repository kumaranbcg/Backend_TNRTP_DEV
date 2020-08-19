module.exports = (sequelize, DataTypes) => {
	const egAssessment = sequelize.define(
		"TNRTP111_EG_APPLICATION_ASSESSMENT_MASTER",
		{
			assessmentId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP111_EG_APPLICATION_ASSESSMENT_MASTER_D",
			},
			formId: { type: DataTypes.STRING, field: "TNRTP111_EG_FORMS_MASTER_D" },
			assessmentName: { type: DataTypes.STRING, field: "TNRTP111_EG_APPLICATION_ASSESSMENT_NAME_N" },
			assessmentValue: {
				type: DataTypes.STRING,
				field: "TNRTP111_EG_APPLICATION_ASSESSMENT_VALUE_N",
			},
			assessmentScore: {
				type: DataTypes.INTEGER,
				field: "TNRTP111_EG_APPLICATION_ASSESSMENT_SCORE_D",
			},
			assessmentTotalScore: {
				type: DataTypes.INTEGER,
				field: "TNRTP111_EG_APPLICATION_ASSESSMENT_TOTAL_SCORE_D",
			},
			isSupportive: { type: DataTypes.BOOLEAN, field: "TNRTP111_IS_SUPPORTIVE_DOCUMENT_D" },
			reason: { type: DataTypes.STRING, field: "TNRTP111_REASON_N" },
			TNRTP111_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP111_CREATED_AT: { type: DataTypes.DATE },
			TNRTP111_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egAssessment.associate = function (models) {
		// associations can be defined here
		egAssessment.hasMany(models.egAssessmentDoc, {
			foreignKey: "TNRTP112_EG_APPLICATION_ASSESSMENT_MASTER_D",
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
