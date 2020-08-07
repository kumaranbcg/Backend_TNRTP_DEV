module.exports = (sequelize, DataTypes) => {
	const selectedPcCommodity = sequelize.define(
		"TNRTP18_SELECTED_PC_COMMODITY",
		{
			TNRTP18_SELECTED_PC_COMMODITY_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP18_PC_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP18_TYPE_OF_COMMODITY_MASTER_D" },
			TNRTP18_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP18_CREATED_AT: { type: DataTypes.DATE },
			TNRTP18_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPcCommodity.associate = function (models) {
		selectedPcCommodity.belongsTo(models.pcCommodityTypes, {
			foreignKey: "TNRTP18_TYPE_OF_COMMODITY_MASTER_D",
			as: "pcCommodityTypesData",
		});
	};
	selectedPcCommodity.selectedFields = ["basicDetailsId"];
	return selectedPcCommodity;
};
