module.exports = (sequelize, DataTypes) => {
	const address = sequelize.define(
		"TNRTP03_ADDRESS",
		{
			TNRTP03_ADDRESS_D: { type: DataTypes.INTEGER, primaryKey: true },
			TNRTP03_USER_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP03_LINE_1_N: { type: DataTypes.STRING },
			TNRTP03_LINE_2_N: { type: DataTypes.STRING },
			TNRTP03_ADDRESS_TYPE_D: { type: DataTypes.INTEGER },
			TNRTP03_DISTRICT_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP03_BLOCK_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP03_PANCHAYAT_MASTER_D: { type: DataTypes.INTEGER },
			TNRTP03_POSTAL_CODE_N: { type: DataTypes.STRING },
			TNRTP03_LOCATION_LATITUDE_N: { type: DataTypes.STRING },
			TNRTP03_LOCATION_LONGITUDE_N: { type: DataTypes.STRING },
			TNRTP03_CREATED_AT: { type: DataTypes.DATE },
			TNRTP03_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP03_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP03_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	address.associate = function (models) {
		address.belongsTo(models["districtMaster"], {
			foreignKey: "TNRTP03_DISTRICT_MASTER_D",
			as: "district",
		});
		address.belongsTo(models["blockMaster"], {
			foreignKey: "TNRTP03_BLOCK_MASTER_D",
			as: "block",
		});
		address.belongsTo(models["panchayatMaster"], {
			foreignKey: "TNRTP03_PANCHAYAT_MASTER_D",
			as: "panchayat",
		});
	};
	return address;
};
