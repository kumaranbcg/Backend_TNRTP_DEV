module.exports = (sequelize, DataTypes) => {
	const selectedSymrCommodity = sequelize.define(
		"TNRTP91_SELECTED_SYMR_COMMODITY",
		{
			TNRTP91_SELECTED_SYMR_COMMODITY_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP91_SYMR_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP91_TYPE_OF_COMMODITY_MASTER_D" },
			TNRTP91_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP91_CREATED_AT: { type: DataTypes.DATE },
			TNRTP91_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedSymrCommodity.associate = function (models) {
		selectedSymrCommodity.belongsTo(models.pcCommodityTypes, {
			foreignKey: "TNRTP91_TYPE_OF_COMMODITY_MASTER_D",
			as: "symrCommodityTypesData",
		});
	};
	selectedSymrCommodity.selectedFields = ["basicDetailsId"];
	return selectedSymrCommodity;
};
