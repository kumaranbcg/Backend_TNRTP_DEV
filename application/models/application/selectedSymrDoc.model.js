module.exports = (sequelize, DataTypes) => {
	const selectedSymrDoc = sequelize.define(
		"TNRTP90_SELECTED_SYMR_UPLOAD_DOCUMENT",
		{
			TNRTP90_SELECTED_SYMR_UPLOAD_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			uploadDocumentId: {
				type: DataTypes.INTEGER,
				field: "TNRTP90_SYMR_UPLOAD_DOCUMENT_MASTER_D",
			},
			docName: { type: DataTypes.STRING, field: "TNRTP90_SYMR_UPLOAD_DOCUMENT_NAME_N" },
			docUrl: { type: DataTypes.STRING, field: "TNRTP90_SYMR_UPLOAD_DOCUMENT_URL_N" },
			docType: { type: DataTypes.INTEGER, field: "TNRTP90_UPLOAD_DOCUMENT_TYPE_D" },
			TNRTP90_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP90_CREATED_AT: { type: DataTypes.DATE },
			TNRTP90_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedSymrDoc.selectedFields = ["docName", "docUrl"];
	return selectedSymrDoc;
};
