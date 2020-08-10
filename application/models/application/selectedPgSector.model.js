module.exports = (sequelize, DataTypes) => {
	const selectedPgSector = sequelize.define(
		"TNRTP46_SELECTED_PG_SECTOR",
		{
			TNRTP46_SELECTED_PG_SECTOR_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP46_PG_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP46_TYPE_OF_SECTOR_MASTER_D" },
			TNRTP46_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP46_CREATED_AT: { type: DataTypes.DATE },
			TNRTP46_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPgSector.associate = function (models) {
		selectedPgSector.belongsTo(models.pcSectorTypes, {
			foreignKey: "TNRTP46_TYPE_OF_SECTOR_MASTER_D",
			as: "pgSectorTypesData",
		});
	};
	selectedPgSector.selectedFields = ["basicDetailsId"];
	return selectedPgSector;
};
