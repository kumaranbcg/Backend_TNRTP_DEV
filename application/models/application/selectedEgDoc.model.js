module.exports = (sequelize, DataTypes) => {
	const selectedPgDoc = sequelize.define(
		"TNRTP64_SELECTED_EG_UPLOAD_DOCUMENT",
		{
			TNRTP64_SELECTED_EG_UPLOAD_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			uploadDocumentId: {
				type: DataTypes.INTEGER,
				field: "TNRTP64_EG_FORMS_UPLOAD_DOCUMENT_MASTER_D",
			},
			docName: { type: DataTypes.STRING, field: "TNRTP64_EG_UPLOAD_DOCUMENT_NAME_N" },
			docUrl: { type: DataTypes.STRING, field: "TNRTP64_EG_UPLOAD_DOCUMENT_URL_N" },
			docType: { type: DataTypes.INTEGER, field: "TNRTP64_UPLOAD_DOCUMENT_TYPE_D" },
			TNRTP64_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP64_CREATED_AT: { type: DataTypes.DATE },
			TNRTP64_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPgDoc.selectedFields = ["docName", "docUrl"];
	return selectedPgDoc;
};
