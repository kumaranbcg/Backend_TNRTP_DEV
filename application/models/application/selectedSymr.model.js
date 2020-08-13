module.exports = (sequelize, DataTypes) => {
	const selectedSymr = sequelize.define(
		"TNRTP92_SELECTED_SYMR",
		{
			TNRTP92_SELECTED_SYMR_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP92_SYMR_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP92_TYPE_OF_SYMR_MASTER_D" },
			TNRTP92_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP92_CREATED_AT: { type: DataTypes.DATE },
			TNRTP92_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedSymr.associate = function (models) {
		selectedSymr.belongsTo(models.pcTypes, {
			foreignKey: "TNRTP92_TYPE_OF_PC_MASTER_D",
			as: "symrTypesData",
		});
	};
	selectedSymr.selectedFields = ["basicDetailsId"];
	return selectedSymr;
};
