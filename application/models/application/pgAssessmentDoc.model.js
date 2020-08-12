module.exports = (sequelize, DataTypes) => {
	const pgAssessmentDoc = sequelize.define(
		"TNRTP52_SELECTED_PG_ASSESSMENT_DOCUMENT",
		{
			TNRTP52_SELECTED_PG_ASSESSMENT_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			assessmentId: { type: DataTypes.STRING, field: "TNRTP52_PG_APPLICATION_ASSESSMENT_MASTER_D" },
			docName: { type: DataTypes.STRING, field: "TNRTP52_PG_DOCUMENT_NAME_N" },
			docUrl: {
				type: DataTypes.STRING,
				field: "TNRTP52_PG_DOCUMENT_URL_N",
			},
			TNRTP52_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP52_CREATED_AT: { type: DataTypes.DATE },
			TNRTP52_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgAssessmentDoc.selectedFields = ["docName", "docUrl"];
	return pgAssessmentDoc;
};
