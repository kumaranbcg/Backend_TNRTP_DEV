module.exports = (sequelize, DataTypes) => {
	const activityType = sequelize.define(
		"TNRTP16_ACTIVITY_TYPE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP16_ACTIVITY_TYPE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP16_ACTIVITY_TYPE_NAME_N" },
			TNRTP16_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP16_CREATED_AT: { type: DataTypes.DATE },
			TNRTP16_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	activityType.selectedFields = ["value", "label"];
	return activityType;
};
