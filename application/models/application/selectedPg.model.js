module.exports = (sequelize, DataTypes) => {
	const selectedPg = sequelize.define(
		"TNRTP45_SELECTED_PG",
		{
			TNRTP45_SELECTED_PG_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP45_PG_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP45_TYPE_OF_PC_MASTER_D" },
			TNRTP45_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP45_CREATED_AT: { type: DataTypes.DATE },
			TNRTP45_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPg.associate = function (models) {
		selectedPg.belongsTo(models.pcTypes, {
			foreignKey: "TNRTP45_TYPE_OF_PC_MASTER_D",
			as: "pgTypesData",
		});
	};
	selectedPg.selectedFields = ["basicDetailsId"];
	return selectedPg;
};
