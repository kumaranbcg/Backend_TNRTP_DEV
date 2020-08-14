module.exports = (sequelize, DataTypes) => {
	const selectedEgSector = sequelize.define(
		"TNRTP63_SELECTED_EG_SECTOR",
		{
			TNRTP63_SELECTED_EG_SECTOR_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP63_EG_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP63_TYPE_OF_SECTOR_MASTER_D" },
			TNRTP63_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP63_CREATED_AT: { type: DataTypes.DATE },
			TNRTP63_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedEgSector.associate = function (models) {
		selectedEgSector.belongsTo(models.pcSectorTypes, {
			foreignKey: "TNRTP63_TYPE_OF_SECTOR_MASTER_D",
			as: "egSectorTypesData",
		});
	};
	selectedEgSector.selectedFields = ["basicDetailsId"];
	return selectedEgSector;
};
