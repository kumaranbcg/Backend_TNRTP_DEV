module.exports = (sequelize, DataTypes) => {
	const gender = sequelize.define(
		"TNRTP03_GENDER_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP03_GENDER_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP03_GENDER_NAME_N" },
			TNRTP03_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP03_CREATED_AT: { type: DataTypes.DATE },
			TNRTP03_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	gender.selectedFields = ["value", "label"];
	return gender;
};
