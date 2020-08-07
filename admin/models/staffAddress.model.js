module.exports = (sequelize, DataTypes) => {
	const staffAddress = sequelize.define(
		"TNRTP12_STAFF_ADDRESS",
		{
			TNRTP12_STAFF_ADDRESS_D: { type: DataTypes.INTEGER, primaryKey: true },
			TNRTP12_STAFF_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP12_LINE_1_N: { type: DataTypes.STRING },
			TNRTP12_LINE_2_N: { type: DataTypes.STRING },
			TNRTP12_ADDRESS_TYPE_D: { type: DataTypes.INTEGER },
			TNRTP12_DISTRICT_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP12_BLOCK_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP12_PANCHAYAT_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP12_POSTAL_CODE_N: { type: DataTypes.STRING },
			TNRTP12_LOCATION_LATITUDE_N: { type: DataTypes.STRING },
			TNRTP12_LOCATION_LONGITUDE_N: { type: DataTypes.STRING },
			TNRTP12_CREATED_AT: { type: DataTypes.DATE },
			TNRTP12_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP12_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP12_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	staffAddress.associate = function (models) {
		staffAddress.belongsTo(models["districtMaster"], {
			foreignKey: "TNRTP12_DISTRICT_MASTER_D",
			as: "district",
		});
		staffAddress.belongsTo(models["blockMaster"], {
			foreignKey: "TNRTP12_BLOCK_MASTER_D",
			as: "block",
		});
		staffAddress.belongsTo(models["panchayatMaster"], {
			foreignKey: "TNRTP12_PANCHAYAT_MASTER_D",
			as: "panchayat",
		});
	};
	return staffAddress;
};
