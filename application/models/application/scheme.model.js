module.exports = (sequelize, DataTypes) => {
	const scheme = sequelize.define(
		"TNRTP13_SCHEME_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP13_SCHEME_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP13_SCHEME_NAME_N" },
			TNRTP13_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP13_CREATED_AT: { type: DataTypes.DATE },
			TNRTP13_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	scheme.selectedFields = ["value", "label"];
	return scheme;
};
