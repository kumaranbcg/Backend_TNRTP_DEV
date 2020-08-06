module.exports = (sequelize, DataTypes) => {
	const blockMaster = sequelize.define(
		"TNRTP08_BLOCK_MASTER",
		{
			TNRTP08_BLOCK_MASTER_D: { type: DataTypes.INTEGER, primaryKey: true },
			TNRTP08_DISTRICT_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP08_BLOCK_NAME: { type: DataTypes.STRING },
			TNRTP08_STATUS: { type: DataTypes.BOOLEAN },
			TNRTP08_CREATED_AT: { type: DataTypes.DATE },
			TNRTP08_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	return blockMaster;
};
