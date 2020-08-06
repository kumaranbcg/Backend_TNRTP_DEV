module.exports = (sequelize, DataTypes) => {
	const panchayatMaster = sequelize.define(
		"TNRTP09_PANCHAYAT_MASTER",
		{
			panchayatId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				field: "TNRTP09_PANCHAYAT_MASTER_D",
			},
			blockId: { type: DataTypes.INTEGER, field: "TNRTP09_BLOCK_MASTER_D" },
			panchayatName: { type: DataTypes.STRING, field: "TNRTP09_PANCHAYAT_NAME" },
			TNRTP09_STATUS: { type: DataTypes.BOOLEAN },
			TNRTP09_CREATED_AT: { type: DataTypes.DATE },
			TNRTP09_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	panchayatMaster.selectedFields = ["panchayatId", "panchayatName"];
	return panchayatMaster;
};
