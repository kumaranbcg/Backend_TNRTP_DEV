module.exports = (sequelize, DataTypes) => {
	const egRequiredDoc = sequelize.define(
		"TNRTP109_SELECTED_EG_REQUIRED_DOCUMENT",
		{
			TNRTP109_SELECTED_EG_REQUIRED_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			appStatusId: {
				type: DataTypes.INTEGER,
				field: "TNRTP109_EG_APPLICATION_STATUS_MASTER_D",
			},
			docName: { type: DataTypes.STRING, field: "TNRTP109_EG_REQUIRED_DOCUMENT_NAME_N" },
			docUrl: { type: DataTypes.STRING, field: "TNRTP109_EG_REQUIRED_DOCUMENT_URL_N" },
			docType: { type: DataTypes.INTEGER, field: "TNRTP109_REQUIRED_DOCUMENT_TYPE_D" },
			docStatus: { type: DataTypes.INTEGER, field: "TNRTP109_STATUS_D" },
			TNRTP109_CREATED_AT: { type: DataTypes.DATE },
			TNRTP109_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egRequiredDoc.selectedFields = ["docName", "docUrl"];
	return egRequiredDoc;
};
