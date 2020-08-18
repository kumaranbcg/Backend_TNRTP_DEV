module.exports = (sequelize, DataTypes) => {
	const pcCommodityTypes = sequelize.define(
		"TNRTP05_TYPE_OF_COMMODITY_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP05_TYPE_OF_COMMODITY_MASTER_D",
			},
			sectorId: { type: DataTypes.INTEGER, field: "TNRTP05_TYPE_OF_SECTOR_MASTER_D" },
			label: { type: DataTypes.STRING, field: "TNRTP05_TYPE_OF_COMMODITY_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP05_STATUS_D" },
			TNRTP05_CREATED_AT: { type: DataTypes.DATE },
			TNRTP05_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcCommodityTypes.associate = function (models) {
		pcCommodityTypes.hasMany(models.dashboardCommodity, {
			foreignKey: "TNRTP107_TYPE_OF_COMMODITY_MASTER_D",
			as: "commodityType",
		});
	};
	pcCommodityTypes.selectedFields = ["value", "label"];
	return pcCommodityTypes;
};
