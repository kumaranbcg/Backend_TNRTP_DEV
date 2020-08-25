module.exports = (sequelize, DataTypes) => {
	const blockMaster = sequelize.define(
		"TNRTP08_BLOCK_MASTER",
		{
			TNRTP08_BLOCK_MASTER_D: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			TNRTP08_DISTRICT_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP08_BLOCK_CODE_D: { type: DataTypes.BIGINT },
			TNRTP08_BLOCK_NAME_TAMIL_N: { type: DataTypes.STRING },
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
	blockMaster.associate = function (models) {
		blockMaster.hasMany(models.panchayatMaster, {
			foreignKey: "TNRTP09_BLOCK_MASTER_D",
			as: "panchayats",
		});
	};
	blockMaster.selectedFields = [
		["TNRTP08_BLOCK_MASTER_D", "value"],
		["TNRTP08_BLOCK_NAME", "label"],
		["TNRTP08_BLOCK_CODE_D", "code"],
		["TNRTP08_BLOCK_NAME_TAMIL_N", "labelTamil"],
	];
	return blockMaster;
};
