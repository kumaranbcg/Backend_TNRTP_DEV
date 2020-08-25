module.exports = (sequelize, DataTypes) => {
	const registrationUnder = sequelize.define(
		"TNRTP02_REGISTRATION_UNDER_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP02_REGISTRATION_UNDER_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP02_REGISTRATION_UNDER_NAME_N" },
			isOthers: { type: DataTypes.BOOLEAN, field: "TNRTP02_IS_OTHERS_D" },
			TNRTP02_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP02_CREATED_AT: { type: DataTypes.DATE },
			TNRTP02_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	registrationUnder.selectedFields = ["value", "label", "isOthers"];
	return registrationUnder;
};
