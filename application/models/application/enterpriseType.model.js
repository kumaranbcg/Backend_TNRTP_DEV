module.exports = (sequelize, DataTypes) => {
	const enterpriseType = sequelize.define(
		"TNRTP86_ENTERPRISE_TYPE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP86_ENTERPRISE_TYPE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP86_ENTERPRISE_TYPE_NAME_N" },
			TNRTP86_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP86_CREATED_AT: { type: DataTypes.DATE },
			TNRTP86_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	enterpriseType.associate = function (models) {
		enterpriseType.hasMany(models.dashboardEnterprise, {
			foreignKey: "TNRTP114_ENTERPRISE_TYPE_MASTER_D",
			as: "enterpriseType",
		});
	};
	enterpriseType.selectedFields = ["value", "label"];
	return enterpriseType;
};
