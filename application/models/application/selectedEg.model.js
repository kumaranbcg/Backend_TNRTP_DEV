module.exports = (sequelize, DataTypes) => {
	const selectedPg = sequelize.define(
		"TNRTP61_SELECTED_EG",
		{
			TNRTP61_SELECTED_EG_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP61_EG_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP61_TYPE_OF_PC_MASTER_D" },
			TNRTP61_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP61_CREATED_AT: { type: DataTypes.DATE },
			TNRTP61_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPg.associate = function (models) {
		selectedPg.belongsTo(models.pcTypes, {
			foreignKey: "TNRTP61_TYPE_OF_PC_MASTER_D",
			as: "egTypesData",
		});
	};
	selectedPg.selectedFields = ["basicDetailsId"];
	return selectedPg;
};
