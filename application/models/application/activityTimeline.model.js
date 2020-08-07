module.exports = (sequelize, DataTypes) => {
	const activityTimeline = sequelize.define(
		"TNRTP15_ACTIVITY_TIMELINE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP15_ACTIVITY_TIMELINE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP15_ACTIVITY_TIMELINE_NAME_N" },
			TNRTP15_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP15_CREATED_AT: { type: DataTypes.DATE },
			TNRTP15_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	activityTimeline.selectedFields = ["value", "label"];
	return activityTimeline;
};
