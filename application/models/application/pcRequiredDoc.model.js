module.exports = (sequelize, DataTypes) => {
	const pcRequiredDoc = sequelize.define(
		"TNRTP21_SELECTED_PC_REQUIRED_DOCUMENT",
		{
			TNRTP21_SELECTED_PC_REQUIRED_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP21_PC_FORMS_MASTER_D" },
			docName: { type: DataTypes.STRING, field: "TNRTP21_PC_REQUIRED_DOCUMENT_NAME_N" },
			docUrl: { type: DataTypes.STRING, field: "TNRTP21_PC_REQUIRED_DOCUMENT_URL_N" },
			docType: { type: DataTypes.INTEGER, field: "TNRTP21_REQUIRED_DOCUMENT_TYPE_D" },
			docStatus: { type: DataTypes.INTEGER, field: "TNRTP21_REQUIRED_DOCUMENT_STATUS_D" },
			TNRTP21_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP21_CREATED_AT: { type: DataTypes.DATE },
			TNRTP21_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcRequiredDoc.selectedFields = ["docName", "docUrl", "docType"];
	return pcRequiredDoc;
};
