module.exports = (sequelize, DataTypes) => {
	const pcSectorTypes = sequelize.define(
		"TNRTP14_TYPE_OF_SECTOR_MASTER",
		{
			pcSectorTypeId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP14_TYPE_OF_SECTOR_MASTER_D",
			},
			name: { type: DataTypes.INTEGER, field: "TNRTP14_TYPE_OF_SECTOR_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP14_STATUS_D" },
			TNTRP14_CREATED_AT: { type: DataTypes.DATE },
			TNTRP14_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcSectorTypes.selectedFields = ["pcSectorTypeId", "name"];
	return pcSectorTypes;
};
