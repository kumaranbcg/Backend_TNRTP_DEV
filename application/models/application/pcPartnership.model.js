module.exports = (sequelize, DataTypes) => {
	const pcPartnership = sequelize.define(
		"TNRTP33_PC_NO_OF_PARTNERSHIP_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP33_PC_NO_OF_PARTNERSHIP_MASTER_D",
			},
			label: { type: DataTypes.INTEGER, field: "TNRTP33_PC_NO_OF_PARTNERSHIP_D" },
			TNRTP33_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP33_CREATED_AT: { type: DataTypes.DATE },
			TNRTP33_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcPartnership.selectedFields = ["value", "label"];
	return pcPartnership;
};
