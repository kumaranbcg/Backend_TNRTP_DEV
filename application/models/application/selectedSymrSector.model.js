module.exports = (sequelize, DataTypes) => {
	const selectedSymrSector = sequelize.define(
		"TNRTP93_SELECTED_SYMR_SECTOR",
		{
			TNRTP93_SELECTED_SYMR_SECTOR_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP93_SYMR_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP93_TYPE_OF_SECTOR_MASTER_D" },
			TNRTP93_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP93_CREATED_AT: { type: DataTypes.DATE },
			TNRTP93_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedSymrSector.associate = function (models) {
		selectedSymrSector.belongsTo(models.pcSectorTypes, {
			foreignKey: "TNRTP93_TYPE_OF_SECTOR_MASTER_D",
			as: "symrSectorTypesData",
		});
	};
	selectedSymrSector.selectedFields = ["basicDetailsId"];
	return selectedSymrSector;
};
