module.exports = (sequelize, DataTypes) => {
	const years = sequelize.define(
		"TNRTP17_YEARS_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP17_YEARS_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP17_YEARS_NAME_N" },
			TNRTP17_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP17_CREATED_AT: { type: DataTypes.DATE },
			TNRTP17_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	years.selectedFields = ["value", "label"];
	return years;
};
