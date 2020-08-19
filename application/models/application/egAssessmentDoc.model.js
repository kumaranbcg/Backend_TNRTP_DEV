module.exports = (sequelize, DataTypes) => {
	const egAssessmentDoc = sequelize.define(
		"TNRTP112_SELECTED_EG_ASSESSMENT_DOCUMENT",
		{
			TNRTP112_SELECTED_EG_ASSESSMENT_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			assessmentId: { type: DataTypes.STRING, field: "TNRTP112_EG_APPLICATION_ASSESSMENT_MASTER_D" },
			docName: { type: DataTypes.STRING, field: "TNRTP112_EG_DOCUMENT_NAME_N" },
			docUrl: {
				type: DataTypes.STRING,
				field: "TNRTP112_EG_DOCUMENT_URL_N",
			},
			TNRTP112_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP112_CREATED_AT: { type: DataTypes.DATE },
			TNRTP112_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egAssessmentDoc.selectedFields = ["docName", "docUrl"];
	return egAssessmentDoc;
};
