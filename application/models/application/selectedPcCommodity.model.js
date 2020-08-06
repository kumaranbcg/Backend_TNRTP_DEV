module.exports = (sequelize, DataTypes) => {
	const selectedPcCommodity = sequelize.define(
		"TNRTP18_SELECTED_PC_COMMODITY",
		{
			TNRTP18_SELECTED_PC_COMMODITY_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP18_PC_FORMS_MASTER_D" },
			typeCommodity: { type: DataTypes.INTEGER, field: "TNRTP18_TYPE_OF_COMMODITY_MASTER_D" },
			TNRTP18_STATUS_D: { type: DataTypes.INTEGER },
			TNTRP18_CREATED_AT: { type: DataTypes.DATE },
			TNTRP18_UPDATED_AT: { type: DataTypes.DATE },
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
	selectedPcCommodity.selectedFields = ["formId"];
	return selectedPcCommodity;
};
