module.exports = (sequelize, DataTypes) => {
	const symrExperience = sequelize.define(
		"TNRTP100_SYMR_EXPERIENCE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP100_SYMR_EXPERIENCE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP100_SYMR_EXPERIENCE_NAME_N" },
			TNRTP100_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP100_CREATED_AT: { type: DataTypes.DATE },
			TNRTP100_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrExperience.selectedFields = ["value", "label"];
	return symrExperience;
};
