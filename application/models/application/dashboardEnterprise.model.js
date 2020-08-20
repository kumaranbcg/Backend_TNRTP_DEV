module.exports = (sequelize, DataTypes) => {
	const dashboardEnterprise = sequelize.define(
		"TNRTP114_DASHBOARD_ENTERPRISE_MASTER",
		{
			TNRTP114_DASHBOARD_ENTERPRISE_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			dashboardMasterId: { type: DataTypes.INTEGER, field: "TNRTP114_DASHBOARD_FORMS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP114_ENTERPRISE_TYPE_MASTER_D" },
			TNRTP114_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP114_CREATED_AT: { type: DataTypes.DATE },
			TNRTP114_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	dashboardEnterprise.selectedFields = ["value"];
	return dashboardEnterprise;
};
