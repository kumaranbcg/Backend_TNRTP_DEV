module.exports = (sequelize, DataTypes) => {
	const enterpriseType = sequelize.define(
		"TNRTP15_ENTERPRISE_TYPE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP15_ENTERPRISE_TYPE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP15_ENTERPRISE_TYPE_NAME_N" },
			TNRTP15_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP15_CREATED_AT: { type: DataTypes.DATE },
			TNRTP15_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	enterpriseType.selectedFields = ["value", "label"];
	return enterpriseType;
};
