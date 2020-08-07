module.exports = (sequelize, DataTypes) => {
	const selectedPc = sequelize.define(
		"TNRTP16_SELECTED_PC",
		{
			TNRTP16_SELECTED_PC_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			basicDetailsId: { type: DataTypes.INTEGER, field: "TNRTP16_PC_FORMS_DETAILS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP16_TYPE_OF_PC_MASTER_D" },
			TNRTP16_STATUS_D: { type: DataTypes.INTEGER },
			TNTRP16_CREATED_AT: { type: DataTypes.DATE },
			TNTRP16_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	selectedPc.associate = function (models) {
		selectedPc.belongsTo(models.pcTypes, {
			foreignKey: "TNRTP16_TYPE_OF_PC_MASTER_D",
			as: "pcTypesData",
		});
	};
	selectedPc.selectedFields = ["basicDetailsId"];
	return selectedPc;
};
