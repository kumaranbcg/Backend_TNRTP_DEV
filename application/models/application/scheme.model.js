module.exports = (sequelize, DataTypes) => {
	const scheme = sequelize.define(
		"TNRTP80_SCHEME_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP80_SCHEME_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP80_SCHEME_NAME_N" },
			TNRTP80_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP80_CREATED_AT: { type: DataTypes.DATE },
			TNRTP80_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	scheme.selectedFields = ["value", "label"];
	return scheme;
};
