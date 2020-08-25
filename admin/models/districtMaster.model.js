module.exports = (sequelize, DataTypes) => {
	const districtMaster = sequelize.define(
		"TNRTP07_DISTRICT_MASTER",
		{
			TNRTP07_DISTRICT_MASTER_D: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			TNRTP07_DISTRICT_CODE_D: { type: DataTypes.BIGINT },
			TNRTP07_DISTRICT_TAMIL_NAME_N: { type: DataTypes.STRING },
			TNRTP07_DISTRICT_NAME: { type: DataTypes.STRING },
			TNRTP07_STATUS: { type: DataTypes.BOOLEAN },
			TNRTP07_CREATED_AT: { type: DataTypes.DATE },
			TNRTP07_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	districtMaster.associate = function (models) {
		districtMaster.hasMany(models.blockMaster, {
			foreignKey: "TNRTP08_DISTRICT_MASTER_D",
			as: "blocks",
		});
	};
	districtMaster.selectedFields = [
		["TNRTP07_DISTRICT_MASTER_D", "value"],
		["TNRTP07_DISTRICT_NAME", "label"],
		["TNRTP07_DISTRICT_CODE_D", "code"],
		["TNRTP07_DISTRICT_TAMIL_NAME_N", "labelTamil"],
	];
	return districtMaster;
};
