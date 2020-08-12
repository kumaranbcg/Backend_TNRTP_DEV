module.exports = (sequelize, DataTypes) => {
	const pgRequiredDoc = sequelize.define(
		"TNRTP49_SELECTED_PG_REQUIRED_DOCUMENT",
		{
			TNRTP49_SELECTED_PG_REQUIRED_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			appStatusId: {
				type: DataTypes.INTEGER,
				field: "TNRTP49_PG_APPLICATION_STATUS_MASTER_D",
			},
			docName: { type: DataTypes.STRING, field: "TNRTP49_PG_REQUIRED_DOCUMENT_NAME_N" },
			docUrl: { type: DataTypes.STRING, field: "TNRTP49_PG_REQUIRED_DOCUMENT_URL_N" },
			docType: { type: DataTypes.INTEGER, field: "TNRTP49_REQUIRED_DOCUMENT_TYPE_D" },
			docStatus: { type: DataTypes.INTEGER, field: "TNRTP49_STATUS_D" },
			TNRTP49_CREATED_AT: { type: DataTypes.DATE },
			TNRTP49_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgRequiredDoc.selectedFields = ["docName", "docUrl"];
	return pgRequiredDoc;
};
