module.exports = (sequelize, DataTypes) => {
	const panchayatMaster = sequelize.define(
		"TNRTP09_PANCHAYAT_MASTER",
		{
			TNRTP09_PANCHAYAT_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			TNRTP09_BLOCK_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP09_PANCHAYAT_CODE_D: { type: DataTypes.BIGINT },
			TNRTP09_PANCHAYAT_TAMIL_NAME_N: { type: DataTypes.STRING },
			TNRTP09_PANCHAYAT_NAME: { type: DataTypes.STRING },
			TNRTP09_IS_TNRTP_D: { type: DataTypes.BOOLEAN },
			TNRTP09_STATUS: { type: DataTypes.BOOLEAN },
			TNRTP09_CREATED_AT: { type: DataTypes.DATE },
			TNRTP09_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	panchayatMaster.selectedFields = [
		["TNRTP09_PANCHAYAT_MASTER_D", "value"],
		["TNRTP09_PANCHAYAT_NAME", "label"],
		["TNRTP09_PANCHAYAT_CODE_D", "code"],
		["TNRTP09_PANCHAYAT_TAMIL_NAME_N", "labelTamil"],
		["TNRTP09_IS_TNRTP_D", "isTNRTP"],
	];
	return panchayatMaster;
};
