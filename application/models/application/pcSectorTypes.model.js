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
			activityId: { type: DataTypes.INTEGER, field: "TNRTP14_TYPE_OF_ACTIVITY_MASTER_D" },
			label: { type: DataTypes.STRING, field: "TNRTP14_TYPE_OF_SECTOR_NAME_N" },
			labelTamil: { type: DataTypes.STRING, field: "TNRTP14_TYPE_OF_SECTOR_TAMIL_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP14_STATUS_D" },
			TNRTP14_CREATED_AT: { type: DataTypes.DATE },
			TNRTP14_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcSectorTypes.associate = function (models) {
		pcSectorTypes.hasMany(models.pcCommodityTypes, {
			foreignKey: "TNRTP05_TYPE_OF_SECTOR_MASTER_D",
			as: "commodityTypes",
		});
		pcSectorTypes.hasMany(models.commodityHold, {
			foreignKey: "TNRTP117_SECTOR_MASTER_D",
			as: "commodityHoldTypes",
		});
		pcSectorTypes.hasMany(models.domain, {
			foreignKey: "TNRTP116_SECTOR_MASTER_D",
			as: "masterTypes",
		});
		pcSectorTypes.hasMany(models.dashboardSector, {
			foreignKey: "TNRTP106_TYPE_OF_SECTOR_MASTER_D",
			as: "sectorType",
		});
	};
	pcSectorTypes.selectedFields = ["value", "label", "labelTamil"];
	return pcSectorTypes;
};
