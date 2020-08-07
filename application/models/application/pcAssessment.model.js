module.exports = (sequelize, DataTypes) => {
	const pcAssessment = sequelize.define(
		"TNRTP23_PC_APPLICATION_ASSESSMENT_MASTER",
		{
			assessmentId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP23_PC_APPLICATION_ASSESSMENT_MASTER_D",
			},
			formId: { type: DataTypes.STRING, field: "TNRTP23_PC_FORMS_MASTER_D" },
			assessmentName: { type: DataTypes.STRING, field: "TNRTP23_PC_APPLICATION_ASSESSMENT_NAME_N" },
			assessmentValue: {
				type: DataTypes.INTEGER,
				field: "TNRTP23_PC_APPLICATION_ASSESSMENT_VALUE_D",
			},
			assessmentScore: {
				type: DataTypes.INTEGER,
				field: "TNRTP23_PC_APPLICATION_ASSESSMENT_SCORE_D",
			},
			assessmentTotalScore: {
				type: DataTypes.INTEGER,
				field: "TNRTP23_PC_APPLICATION_ASSESSMENT_TOTAL_SCORE_D",
			},
			isSupportive: { type: DataTypes.BOOLEAN, field: "TNRTP23_IS_SUPPORTIVE_DOCUMENT_D" },
			reason: { type: DataTypes.STRING, field: "TNRTP23_REASON_N" },
			TNRTP23_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP23_CREATED_AT: { type: DataTypes.DATE },
			TNRTP23_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcAssessment.associate = function (models) {
		// associations can be defined here
		pcAssessment.hasMany(models.pcAssessmentDoc, {
			foreignKey: "TNRTP29_PC_APPLICATION_ASSESSMENT_MASTER_D",
			as: "documents",
			onDelete: "CASCADE",
			hooks: true,
		});
	};
	pcAssessment.selectedFields = [
		"assessmentName",
		"assessmentValue",
		"assessmentScore",
		"isSupportive",
		"reason",
	];
	return pcAssessment;
};
