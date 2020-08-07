module.exports = (sequelize, DataTypes) => {
	const formedSupported = sequelize.define(
		"TNRTP03_FORMED_SUPPORTED_BY_MASTER",
		{
			formedById: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP03_FORMED_SUPPORTED_BY_MASTER_D",
			},
			formedByName: { type: DataTypes.STRING, field: "TNRTP03_FORMED_SUPPORTED_BY_NAME_N" },
			TNRTP03_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP03_CREATED_AT: { type: DataTypes.DATE },
			TNRTP03_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	formedSupported.selectedFields = ["formedById", "formedByName"];
	return formedSupported;
};
