module.exports = (sequelize, DataTypes) => {
	const natureOfMigration = sequelize.define(
		"TNRTP76_NATURE_OF_MIGRATION_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP76_NATURE_OF_MIGRATION_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP76_NATURE_OF_MIGRATION_NAME_N" },
			TNRTP76_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP76_CREATED_AT: { type: DataTypes.DATE },
			TNRTP76_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	natureOfMigration.selectedFields = ["value", "label"];
	return natureOfMigration;
};
