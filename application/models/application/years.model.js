module.exports = (sequelize, DataTypes) => {
	const years = sequelize.define(
		"TNRTP88_YEARS_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP88_YEARS_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP88_YEARS_NAME_N" },
			TNRTP88_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP88_CREATED_AT: { type: DataTypes.DATE },
			TNRTP88_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	years.selectedFields = ["value", "label"];
	return years;
};
