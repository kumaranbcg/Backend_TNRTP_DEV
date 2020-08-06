module.exports = (sequelize, DataTypes) => {
	const panchayatMaster = sequelize.define(
		"TNRTP09_PANCHAYAT_MASTER",
		{
			TNRTP09_PANCHAYAT_MASTER_D: { type: DataTypes.INTEGER, primaryKey: true },
			TNRTP09_BLOCK_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP09_PANCHAYAT_NAME: { type: DataTypes.STRING },
			TNRTP09_STATUS: { type: DataTypes.BOOLEAN },
			TNRTP09_CREATED_AT: { type: DataTypes.DATE },
			TNRTP09_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	return panchayatMaster;
};
