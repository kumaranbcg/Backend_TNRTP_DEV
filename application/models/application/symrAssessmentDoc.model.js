module.exports = (sequelize, DataTypes) => {
	const symrAssessmentDoc = sequelize.define(
		"TNRTP102_SELECTED_SYMR_ASSESSMENT_DOCUMENT",
		{
			TNRTP102_SELECTED_SYMR_ASSESSMENT_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			assessmentId: { type: DataTypes.STRING, field: "TNRTP102_SYMR_APPLICATION_ASSESSMENT_MASTER_D" },
			docName: { type: DataTypes.STRING, field: "TNRTP102_SYMR_DOCUMENT_NAME_N" },
			docUrl: {
				type: DataTypes.STRING,
				field: "TNRTP102_SYMR_DOCUMENT_URL_N",
			},
			TNRTP102_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP102_CREATED_AT: { type: DataTypes.DATE },
			TNRTP102_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrAssessmentDoc.selectedFields = ["docName", "docUrl"];
	return symrAssessmentDoc;
};
