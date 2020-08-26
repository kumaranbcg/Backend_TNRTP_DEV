module.exports = (sequelize, DataTypes) => {
	const domain = sequelize.define(
		"TNRTP116_DOMAIN_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP116_DOMAIN_MASTER",
			},
			sectorId: { type: DataTypes.INTEGER, field: "TNRTP116_SECTOR_MASTER_D" },
			label: { type: DataTypes.STRING, field: "TNRTP116_DOMAIN_NAME_N" },
			labelTamil: { type: DataTypes.STRING, field: "TNRTP116_DOMAIN_TAMIL_NAME_N" },
			TNRTP116_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP116_CREATED_AT: { type: DataTypes.DATE },
			TNRTP116_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	domain.associate = function (models) {
		// domain.hasMany(models.pcCommodityTypes, {
		// 	foreignKey: "TNRTP04_DOMAIN_MASTER_D",
		// 	as: "allCommodityTypes",
		// });
	};
	domain.selectedFields = ["value", "label", "labelTamil"];
	return domain;
};
