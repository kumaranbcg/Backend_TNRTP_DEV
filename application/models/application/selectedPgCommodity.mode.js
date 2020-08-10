module.exports = (sequelize, DataTypes) => {
	const selectedPgCommodity = sequelize.define(
		"TNRTP47_SELECTED_PG_COMMODITY",
		{
			TNRTP47_SELECTED_PG_COMMODITY_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP47_PG_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP47_TYPE_OF_COMMODITY_MASTER_D" },
			TNRTP47_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP47_CREATED_AT: { type: DataTypes.DATE },
			TNRTP47_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPgCommodity.associate = function (models) {
		selectedPgCommodity.belongsTo(models.pcCommodityTypes, {
			foreignKey: "TNRTP47_TYPE_OF_COMMODITY_MASTER_D",
			as: "pgCommodityTypesData",
		});
	};
	selectedPgCommodity.selectedFields = ["basicDetailsId"];
	return selectedPgCommodity;
};
