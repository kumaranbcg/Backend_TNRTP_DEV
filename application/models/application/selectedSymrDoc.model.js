module.exports = (sequelize, DataTypes) => {
	const selectedSymrDoc = sequelize.define(
		"TNRTP22_SELECTED_SYMR_UPLOAD_DOCUMENT",
		{
			TNRTP22_SELECTED_SYMR_UPLOAD_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			uploadDocumentId: {
				type: DataTypes.INTEGER,
				field: "TNRTP22_SYMR_UPLOAD_DOCUMENT_MASTER_D",
			},
			docName: { type: DataTypes.STRING, field: "TNRTP22_SYMR_UPLOAD_DOCUMENT_NAME_N" },
			docUrl: { type: DataTypes.STRING, field: "TNRTP22_SYMR_UPLOAD_DOCUMENT_URL_N" },
			docType: { type: DataTypes.INTEGER, field: "TNRTP22_UPLOAD_DOCUMENT_TYPE_D" },
			TNRTP22_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP22_CREATED_AT: { type: DataTypes.DATE },
			TNRTP22_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedSymrDoc.selectedFields = ["docName", "docUrl"];
	return selectedSymrDoc;
};
