module.exports = (sequelize, DataTypes) => {
	const commodityHold = sequelize.define(
		"TNRTP117_COMMODITY_HOLD_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP117_COMMODITY_HOLD_MASTER_D",
			},
			sectorId: { type: DataTypes.INTEGER, field: "TNRTP117_SECTOR_MASTER_D" },
			label: { type: DataTypes.STRING, field: "TNRTP117_COMMODITY_HOLD_NAME_N" },
			labelTamil: { type: DataTypes.STRING, field: "TNRTP117_COMMODITY_HOLD_TAMIL_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP117_STATUS_D" },
			TNRTP117_CREATED_AT: { type: DataTypes.DATE },
			TNRTP117_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	commodityHold.associate = function (models) {
		commodityHold.hasMany(models.pcCommodityTypes, {
			foreignKey: "TNRTP14_TYPE_OF_ACTIVITY_MASTER_D",
			as: "sectorTypes",
		});
	};
	commodityHold.selectedFields = ["value", "label", "labelTamil"];
	return commodityHold;
};
