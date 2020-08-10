module.exports = (sequelize, DataTypes) => {
	const districtMaster = sequelize.define(
		"TNRTP07_DISTRICT_MASTER",
		{
			TNRTP07_DISTRICT_MASTER_D: { type: DataTypes.INTEGER, primaryKey: true },
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
	districtMaster.selectedFields = [
		["TNRTP07_DISTRICT_MASTER_D", "value"],
		["TNRTP07_DISTRICT_NAME", "label"],
	];
	return districtMaster;
};
