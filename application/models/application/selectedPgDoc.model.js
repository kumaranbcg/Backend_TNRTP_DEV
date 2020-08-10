module.exports = (sequelize, DataTypes) => {
	const selectedPgDoc = sequelize.define(
		"TNRTP44_SELECTED_PG_UPLOAD_DOCUMENT",
		{
			TNRTP44_SELECTED_PG_UPLOAD_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			uploadDocumentId: {
				type: DataTypes.INTEGER,
				field: "TNRTP44_PG_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			},
			docName: { type: DataTypes.STRING, field: "TNRTP44_PG_UPLOAD_DOCUMENT_NAME_N" },
			docUrl: { type: DataTypes.STRING, field: "TNRTP44_PG_UPLOAD_DOCUMENT_URL_N" },
			docType: { type: DataTypes.INTEGER, field: "TNRTP44_UPLOAD_DOCUMENT_TYPE_D" },
			TNRTP44_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP44_CREATED_AT: { type: DataTypes.DATE },
			TNRTP44_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPgDoc.selectedFields = ["docName", "docUrl"];
	return selectedPgDoc;
};
