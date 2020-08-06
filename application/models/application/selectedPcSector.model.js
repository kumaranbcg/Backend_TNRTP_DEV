module.exports = (sequelize, DataTypes) => {
	const selectedPcSector = sequelize.define(
		"TNRTP17_SELECTED_PC_SECTOR",
		{
			TNRTP17_SELECTED_PC_SECTOR_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP17_PC_FORMS_MASTER_D" },
			typeSector: { type: DataTypes.INTEGER, field: "TNRTP17_TYPE_OF_SECTOR_MASTER_D" },
			TNRTP17_STATUS_D: { type: DataTypes.INTEGER },
			TNTRP17_CREATED_AT: { type: DataTypes.DATE },
			TNTRP17_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPcSector.associate = function (models) {
		selectedPcSector.belongsTo(models.pcSectorTypes, {
			foreignKey: "TNRTP17_TYPE_OF_SECTOR_MASTER_D",
			as: "pcSectorTypesData",
		});
	};
	selectedPcSector.selectedFields = ["formId"];
	return selectedPcSector;
};
