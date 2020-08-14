module.exports = (sequelize, DataTypes) => {
	const symrRequiredDoc = sequelize.define(
		"TNRTP97_SELECTED_SYMR_REQUIRED_DOCUMENT",
		{
			TNRTP97_SELECTED_SYMR_REQUIRED_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			appDisbursmentId: {
				type: DataTypes.INTEGER,
				field: "TNRTP97_SYMR_FORMS_APP_DISBUSRMENT_MASTER_D",
			},
			docName: { type: DataTypes.STRING, field: "TNRTP97_SYMR_REQUIRED_DOCUMENT_NAME_N" },
			docUrl: { type: DataTypes.STRING, field: "TNRTP97_SYMR_REQUIRED_DOCUMENT_URL_N" },
			docType: { type: DataTypes.INTEGER, field: "TNRTP97_REQUIRED_DOCUMENT_TYPE_D" },
			docStatus: { type: DataTypes.INTEGER, field: "TNRTP97_REQUIRED_DOCUMENT_STATUS_D" },
			TNRTP97_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP97_CREATED_AT: { type: DataTypes.DATE },
			TNRTP97_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrRequiredDoc.selectedFields = ["docName", "docUrl"];
	return symrRequiredDoc;
};
