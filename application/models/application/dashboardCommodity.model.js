module.exports = (sequelize, DataTypes) => {
	const dashboardCommodity = sequelize.define(
		"TNRTP107_DASHBOARD_COMMODITY_MASTER",
		{
			TNRTP107_DASHBOARD_COMMODITY_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			dashboardMasterId: { type: DataTypes.INTEGER, field: "TNRTP107_DASHBOARD_FORMS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP107_TYPE_OF_COMMODITY_MASTER_D" },
			TNRTP107_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP107_CREATED_AT: { type: DataTypes.DATE },
			TNRTP107_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	dashboardCommodity.selectedFields = ["value"];
	return dashboardCommodity;
};
