module.exports = (sequelize, DataTypes) => {
	const blockMaster = sequelize.define(
		"TNRTP08_BLOCK_MASTER",
		{
			value: { type: DataTypes.INTEGER, primaryKey: true, field: "TNRTP08_BLOCK_MASTER_D" },
			districtId: { type: DataTypes.INTEGER, field: "TNRTP08_DISTRICT_MASTER_D" },
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
	blockMaster.selectedFields = ["value", "label"];
	return blockMaster;
};
