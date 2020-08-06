module.exports = (sequelize, DataTypes) => {
	const address = sequelize.define(
		"TNRTP03_ADDRESS",
		{
			TNTRP03_ADDRESS_D: { type: DataTypes.INTEGER, primaryKey: true },
			TNTRP03_USER_MASTER_D: { type: DataTypes.INTEGER },
			TNTRP03_LINE_1_N: { type: DataTypes.STRING },
			TNTRP03_LINE_2_N: { type: DataTypes.STRING },
			TNTRP03_ADDRESS_TYPE_D: { type: DataTypes.INTEGER },
			TNTRP03_DISTRICT_MASTER_D: { type: DataTypes.INTEGER },
			TNTRP03_BLOCK_MASTER_D: { type: DataTypes.INTEGER },
			TNTRP03_PANCHAYAT_MASTER_D: { type: DataTypes.INTEGER },
			TNTRP03_POSTAL_CODE_N: { type: DataTypes.STRING },
			TNTRP03_LOCATION_LATITUDE_N: { type: DataTypes.STRING },
			TNTRP03_LOCATION_LONGITUDE_N: { type: DataTypes.STRING },
			TNTRP03_CREATED_AT: { type: DataTypes.DATE },
			TNTRP03_UPDATED_AT: { type: DataTypes.DATE },
			TNTRP03_CREATED_D: { type: DataTypes.INTEGER },
			TNTRP03_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	address.associate = function (models) {
		address.belongsTo(models["districtMaster"], {
			foreignKey: "TNTRP03_DISTRICT_MASTER_D",
			as: "district",
		});
		address.belongsTo(models["blockMaster"], {
			foreignKey: "TNTRP03_BLOCK_MASTER_D",
			as: "block",
		});
		address.belongsTo(models["panchayatMaster"], {
			foreignKey: "TNTRP03_PANCHAYAT_MASTER_D",
			as: "panchayat",
		});
	};
	return address;
};
