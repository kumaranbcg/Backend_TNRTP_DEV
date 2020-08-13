module.exports = (sequelize, DataTypes) => {
	const sourceOfInfo = sequelize.define(
		"TNRTP70_SOURCE_OF_INFO_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP70_SOURCE_OF_INFO_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP70_SOURCE_OF_INFO_NAME_N" },
			TNRTP70_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP70_CREATED_AT: { type: DataTypes.DATE },
			TNRTP70_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	sourceOfInfo.selectedFields = ["value", "label"];
	return sourceOfInfo;
};
