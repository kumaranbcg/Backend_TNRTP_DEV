module.exports = (sequelize, DataTypes) => {
	const activityType = sequelize.define(
		"TNRTP87_ACTIVITY_TYPE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP87_ACTIVITY_TYPE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP87_ACTIVITY_TYPE_NAME_N" },
			TNRTP87_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP87_CREATED_AT: { type: DataTypes.DATE },
			TNRTP87_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	activityType.selectedFields = ["value", "label"];
	return activityType;
};
