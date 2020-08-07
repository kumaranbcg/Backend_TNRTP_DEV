module.exports = (sequelize, DataTypes) => {
	const registrationUnder = sequelize.define(
		"TNRTP02_REGISTRATION_UNDER_MASTER",
		{
			regUnderId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP02_REGISTRATION_UNDER_MASTER_D",
			},
			regUnderName: { type: DataTypes.STRING, field: "TNRTP02_REGISTRATION_UNDER_NAME_N" },
			TNRTP02_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP02_CREATED_AT: { type: DataTypes.DATE },
			TNRTP02_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	registrationUnder.selectedFields = ["regUnderId", "regUnderName"];
	return registrationUnder;
};
