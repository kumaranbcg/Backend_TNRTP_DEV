module.exports = (sequelize, DataTypes) => {
	const egAssessmentDoc = sequelize.define(
		"TNRTP111_SELECTED_EG_ASSESSMENT_DOCUMENT",
		{
			TNRTP111_SELECTED_EG_ASSESSMENT_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			assessmentId: { type: DataTypes.STRING, field: "TNRTP111_EG_APPLICATION_ASSESSMENT_MASTER_D" },
			docName: { type: DataTypes.STRING, field: "TNRTP111_EG_DOCUMENT_NAME_N" },
			docUrl: {
				type: DataTypes.STRING,
				field: "TNRTP111_EG_DOCUMENT_URL_N",
			},
			TNRTP111_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP111_CREATED_AT: { type: DataTypes.DATE },
			TNRTP111_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egAssessmentDoc.selectedFields = ["docName", "docUrl"];
	return egAssessmentDoc;
};
