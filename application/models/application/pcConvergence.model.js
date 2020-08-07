module.exports = (sequelize, DataTypes) => {
	const pcConvergence = sequelize.define(
		"TNRTP32_PC_NO_OF_CONVERGENCE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP32_PC_NO_OF_CONVERGENCE_MASTER_D",
			},
			label: { type: DataTypes.INTEGER, field: "TNRTP32_PC_NO_OF_CONVERGENCE_D" },
			TNRTP32_PC_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP32_CREATED_AT: { type: DataTypes.DATE },
			TNRTP32_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcConvergence.selectedFields = ["value", "label"];
	return pcConvergence;
};
