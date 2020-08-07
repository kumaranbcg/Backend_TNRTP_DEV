module.exports = (sequelize, DataTypes) => {
	const pcAssessmentDoc = sequelize.define(
		"TNRTP29_SELECTED_PC_ASSESSMENT_DOCUMENT",
		{
			TNRTP29_SELECTED_PC_ASSESSMENT_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			assessmentId: { type: DataTypes.STRING, field: "TNRTP29_PC_APPLICATION_ASSESSMENT_MASTER_D" },
			docName: { type: DataTypes.STRING, field: "TNRTP29_PC_DOCUMENT_NAME_N" },
			docUrl: {
				type: DataTypes.STRING,
				field: "TNRTP29_PC_DOCUMENT_URL_N",
			},
			TNRTP29_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP29_CREATED_AT: { type: DataTypes.DATE },
			TNRTP29_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcAssessmentDoc.selectedFields = ["docName", "docUrl"];
	return pcAssessmentDoc;
};
