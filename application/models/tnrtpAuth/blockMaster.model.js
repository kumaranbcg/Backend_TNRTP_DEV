module.exports = (sequelize, DataTypes) => {
	const blockMaster = sequelize.define(
		"TNRTP08_BLOCK_MASTER",
		{
			value: { type: DataTypes.INTEGER, primaryKey: true, field: "TNRTP08_BLOCK_MASTER_D" },
			districtId: { type: DataTypes.INTEGER, field: "TNRTP08_DISTRICT_MASTER_D" },
			code: { type: DataTypes.BIGINT, field: "TNRTP08_BLOCK_CODE_D" },
			labelTamil: { type: DataTypes.STRING, field: "TNRTP08_BLOCK_NAME_TAMIL_N" },
			label: { type: DataTypes.STRING, field: "TNRTP08_BLOCK_NAME" },
			TNRTP08_STATUS: { type: DataTypes.BOOLEAN },
			TNRTP08_CREATED_AT: { type: DataTypes.DATE },
			TNRTP08_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	blockMaster.selectedFields = ["value", "label", "code", "labelTamil"];
	return blockMaster;
};
