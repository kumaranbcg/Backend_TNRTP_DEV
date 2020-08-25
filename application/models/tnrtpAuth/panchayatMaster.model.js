module.exports = (sequelize, DataTypes) => {
	const panchayatMaster = sequelize.define(
		"TNRTP09_PANCHAYAT_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				field: "TNRTP09_PANCHAYAT_MASTER_D",
			},
			blockId: { type: DataTypes.INTEGER, field: "TNRTP09_BLOCK_MASTER_D" },
			code: { type: DataTypes.BIGINT, field: "TNRTP09_PANCHAYAT_CODE_D" },
			labelTamil: { type: DataTypes.STRING, field: "TNRTP09_PANCHAYAT_TAMIL_NAME_N" },
			label: { type: DataTypes.STRING, field: "TNRTP09_PANCHAYAT_NAME" },
			isTNRTP: { type: DataTypes.BOOLEAN, field: "TNRTP09_IS_TNRTP_D" },
			TNRTP09_STATUS: { type: DataTypes.BOOLEAN },
			TNRTP09_CREATED_AT: { type: DataTypes.DATE },
			TNRTP09_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	panchayatMaster.selectedFields = ["value", "label", "code", "labelTamil", "isTNRTP"];
	return panchayatMaster;
};
