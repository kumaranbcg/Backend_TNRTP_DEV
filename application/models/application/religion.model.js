module.exports = (sequelize, DataTypes) => {
	const religion = sequelize.define(
		"TNRTP04_RELIGION_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP04_RELIGION_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP04_RELIGION_NAME_N" },
			TNRTP04_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP04_CREATED_AT: { type: DataTypes.DATE },
			TNRTP04_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	religion.selectedFields = ["value", "label"];
	return religion;
};
