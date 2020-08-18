module.exports = (sequelize, DataTypes) => {
	const egAssessmentDoc = sequelize.define(
		"TNRTP108_SELECTED_EG_ASSESSMENT_DOCUMENT",
		{
			TNRTP108_SELECTED_EG_ASSESSMENT_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			assessmentId: { type: DataTypes.STRING, field: "TNRTP108_EG_APPLICATION_ASSESSMENT_MASTER_D" },
			docName: { type: DataTypes.STRING, field: "TNRTP108_EG_DOCUMENT_NAME_N" },
			docUrl: {
				type: DataTypes.STRING,
				field: "TNRTP108_EG_DOCUMENT_URL_N",
			},
			TNRTP108_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP108_CREATED_AT: { type: DataTypes.DATE },
			TNRTP108_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egAssessmentDoc.selectedFields = ["docName", "docUrl"];
	return egAssessmentDoc;
};
