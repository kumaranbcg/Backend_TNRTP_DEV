module.exports = (sequelize, DataTypes) => {
	const selectedPcDoc = sequelize.define(
		"TNRTP19_SELECTED_PC_UPLOAD_DOCUMENT",
		{
			TNRTP19_SELECTED_PC_UPLOAD_DOCUMENT_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP19_PC_FORMS_MASTER_D" },
			docName: { type: DataTypes.STRING, field: "TNRTP19_PC_UPLOAD_DOCUMENT_NAME_N" },
			docUrl: { type: DataTypes.STRING, field: "TNRTP19_PC_UPLOAD_DOCUMENT_URL_N" },
			docType: { type: DataTypes.INTEGER, field: "TNRTP19_UPLOAD_DOCUMENT_TYPE_D" },
			TNRTP19_STATUS_D: { type: DataTypes.INTEGER },
			TNTRP19_CREATED_AT: { type: DataTypes.DATE },
			TNTRP19_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPcDoc.selectedFields = ["docName", "docUrl", "docType"];
	return selectedPcDoc;
};
