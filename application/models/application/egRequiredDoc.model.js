module.exports = (sequelize, DataTypes) => {
	const egRequiredDoc = sequelize.define(
		"TNRTP106_SELECTED_EG_REQUIRED_DOCUMENT",
		{
			TNRTP106_SELECTED_EG_REQUIRED_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			appStatusId: {
				type: DataTypes.INTEGER,
				field: "TNRTP106_EG_APPLICATION_STATUS_MASTER_D",
			},
			docName: { type: DataTypes.STRING, field: "TNRTP106_EG_REQUIRED_DOCUMENT_NAME_N" },
			docUrl: { type: DataTypes.STRING, field: "TNRTP106_EG_REQUIRED_DOCUMENT_URL_N" },
			docType: { type: DataTypes.INTEGER, field: "TNRTP106_REQUIRED_DOCUMENT_TYPE_D" },
			docStatus: { type: DataTypes.INTEGER, field: "TNRTP106_STATUS_D" },
			TNRTP106_CREATED_AT: { type: DataTypes.DATE },
			TNRTP106_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egRequiredDoc.selectedFields = ["docName", "docUrl"];
	return egRequiredDoc;
};
