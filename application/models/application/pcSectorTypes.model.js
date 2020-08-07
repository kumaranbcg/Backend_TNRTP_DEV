module.exports = (sequelize, DataTypes) => {
	const pcSectorTypes = sequelize.define(
		"TNRTP14_TYPE_OF_SECTOR_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP14_TYPE_OF_SECTOR_MASTER_D",
			},
			label: { type: DataTypes.INTEGER, field: "TNRTP14_TYPE_OF_SECTOR_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP14_STATUS_D" },
			TNRTP14_CREATED_AT: { type: DataTypes.DATE },
			TNRTP14_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcSectorTypes.selectedFields = ["value", "label"];
	return pcSectorTypes;
};
