module.exports = (sequelize, DataTypes) => {
	const staffAddress = sequelize.define(
		"TNRTP12_STAFF_ADDRESS",
		{
			TNTRP12_STAFF_ADDRESS_D: { type: DataTypes.INTEGER, primaryKey: true },
			TNTRP12_STAFF_MASTER_D: { type: DataTypes.INTEGER },
			TNTRP12_LINE_1_N: { type: DataTypes.STRING },
			TNTRP12_LINE_2_N: { type: DataTypes.STRING },
			TNTRP12_ADDRESS_TYPE_D: { type: DataTypes.INTEGER },
			TNTRP12_DISTRICT_MASTER_D: { type: DataTypes.INTEGER },
			TNTRP12_BLOCK_MASTER_D: { type: DataTypes.INTEGER },
			TNTRP12_PANCHAYAT_MASTER_D: { type: DataTypes.INTEGER },
			TNTRP12_POSTAL_CODE_N: { type: DataTypes.STRING },
			TNTRP12_LOCATION_LATITUDE_N: { type: DataTypes.STRING },
			TNTRP12_LOCATION_LONGITUDE_N: { type: DataTypes.STRING },
			TNTRP12_CREATED_AT: { type: DataTypes.DATE },
			TNTRP12_UPDATED_AT: { type: DataTypes.DATE },
			TNTRP12_CREATED_D: { type: DataTypes.INTEGER },
			TNTRP12_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	staffAddress.associate = function (models) {
		staffAddress.belongsTo(models["districtMaster"], {
			foreignKey: "TNTRP12_DISTRICT_MASTER_D",
			as: "district",
		});
		staffAddress.belongsTo(models["blockMaster"], {
			foreignKey: "TNTRP12_BLOCK_MASTER_D",
			as: "block",
		});
		staffAddress.belongsTo(models["panchayatMaster"], {
			foreignKey: "TNTRP12_PANCHAYAT_MASTER_D",
			as: "panchayat",
		});
	};
	return staffAddress;
};
