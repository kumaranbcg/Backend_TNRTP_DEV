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
			label: { type: DataTypes.INTEGER, field: "TNRTP05_TYPE_OF_COMMODITY_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP05_STATUS_D" },
			TNTRP05_CREATED_AT: { type: DataTypes.DATE },
			TNTRP05_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcCommodityTypes.selectedFields = ["value", "label"];
	return pcCommodityTypes;
};
