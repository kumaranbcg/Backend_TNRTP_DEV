module.exports = (sequelize, DataTypes) => {
	const gender = sequelize.define(
		"TNRTP71_GENDER_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP71_GENDER_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP71_GENDER_NAME_N" },
			TNRTP71_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP71_CREATED_AT: { type: DataTypes.DATE },
			TNRTP71_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	gender.selectedFields = ["value", "label"];
	return gender;
};
