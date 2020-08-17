module.exports = (sequelize, DataTypes) => {
	const pgAssessment = sequelize.define(
		"TNRTP51_PG_APPLICATION_ASSESSMENT_MASTER",
		{
			assessmentId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP51_PG_APPLICATION_ASSESSMENT_MASTER_D",
			},
			formId: { type: DataTypes.STRING, field: "TNRTP51_PG_FORMS_MASTER_D" },
			assessmentName: { type: DataTypes.STRING, field: "TNRTP51_PG_APPLICATION_ASSESSMENT_NAME_N" },
			assessmentValue: {
				type: DataTypes.STRING,
				field: "TNRTP51_PG_APPLICATION_ASSESSMENT_VALUE_N",
			},
			assessmentScore: {
				type: DataTypes.INTEGER,
				field: "TNRTP51_PG_APPLICATION_ASSESSMENT_SCORE_D",
			},
			assessmentTotalScore: {
				type: DataTypes.INTEGER,
				field: "TNRTP51_PG_APPLICATION_ASSESSMENT_TOTAL_SCORE_D",
			},
			isSupportive: { type: DataTypes.BOOLEAN, field: "TNRTP51_IS_SUPPORTIVE_DOCUMENT_D" },
			reason: { type: DataTypes.STRING, field: "TNRTP51_REASON_N" },
			TNRTP51_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP51_CREATED_AT: { type: DataTypes.DATE },
			TNRTP51_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgAssessment.associate = function (models) {
		// associations can be defined here
		pgAssessment.hasMany(models.pgAssessmentDoc, {
			foreignKey: "TNRTP52_PG_APPLICATION_ASSESSMENT_MASTER_D",
			as: "documents",
		});
	};
	pgAssessment.selectedFields = [
		"assessmentName",
		"assessmentValue",
		"assessmentScore",
		"assessmentTotalScore",
		"isSupportive",
		"reason",
	];
	return pgAssessment;
};
