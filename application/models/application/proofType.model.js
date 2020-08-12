module.exports = (sequelize, DataTypes) => {
	const proofType = sequelize.define(
		"TNRTP07_PROOF_TYPE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP07_PROOF_TYPE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP07_PROOF_TYPE_NAME_N" },
			TNRTP07_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP07_CREATED_AT: { type: DataTypes.DATE },
			TNRTP07_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	proofType.selectedFields = ["value", "label"];
	return proofType;
};
