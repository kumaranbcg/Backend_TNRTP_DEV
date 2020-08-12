module.exports = (sequelize, DataTypes) => {
	const natureOfMigration = sequelize.define(
		"TNRTP08_NATURE_OF_MIGRATION_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP08_NATURE_OF_MIGRATION_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP08_NATURE_OF_MIGRATION_NAME_N" },
			TNRTP08_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP08_CREATED_AT: { type: DataTypes.DATE },
			TNRTP08_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	natureOfMigration.selectedFields = ["value", "label"];
	return natureOfMigration;
};
