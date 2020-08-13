module.exports = (sequelize, DataTypes) => {
	const selectedPgCommodity = sequelize.define(
		"TNRTP62_SELECTED_EG_COMMODITY",
		{
			TNRTP62_SELECTED_EG_COMMODITY_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP62_EG_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP62_TYPE_OF_COMMODITY_MASTER_D" },
			TNRTP62_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP62_CREATED_AT: { type: DataTypes.DATE },
			TNRTP62_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPgCommodity.associate = function (models) {
		selectedPgCommodity.belongsTo(models.pcCommodityTypes, {
			foreignKey: "TNRTP62_TYPE_OF_COMMODITY_MASTER_D",
			as: "egCommodityTypesData",
		});
	};
	selectedPgCommodity.selectedFields = ["basicDetailsId"];
	return selectedPgCommodity;
};
