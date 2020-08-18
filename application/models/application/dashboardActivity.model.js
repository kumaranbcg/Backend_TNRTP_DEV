module.exports = (sequelize, DataTypes) => {
	const dashboardActivity = sequelize.define(
		"TNRTP105_DASHBOARD_ACTIVITY_MASTER",
		{
			TNRTP105_DASHBOARD_ACTIVITY_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			dashboardMasterId: { type: DataTypes.INTEGER, field: "TNRTP105_DASHBOARD_FORMS_MASTER_D" },
			activityId: { type: DataTypes.INTEGER, field: "TNRTP105_TYPE_OF_PC_MASTER_D" },
			TNRTP105_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP105_CREATED_AT: { type: DataTypes.DATE },
			TNRTP105_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	dashboardActivity.selectedFields = ["activityId"];
	return dashboardActivity;
};
