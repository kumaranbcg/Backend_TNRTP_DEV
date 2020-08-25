module.exports = (sequelize, DataTypes) => {
	const proofType = sequelize.define(
		"TNRTP75_PROOF_TYPE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP75_PROOF_TYPE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP75_PROOF_TYPE_NAME_N" },
			isOthers: { type: DataTypes.BOOLEAN, field: "TNRTP75_IS_OTHERS_D" },
			TNRTP75_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP75_CREATED_AT: { type: DataTypes.DATE },
			TNRTP75_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	proofType.selectedFields = ["value", "label", "isOthers"];
	return proofType;
};
