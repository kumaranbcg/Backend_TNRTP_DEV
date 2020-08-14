module.exports = (sequelize, DataTypes) => {
	const courseCompletionYear = sequelize.define(
		"TNRTP95_COURSE_COMPLETION_YEAR_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP95_COURSE_COMPLETION_YEAR_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP95_COURSE_COMPLETION_YEAR_NAME_N" },
			TNRTP95_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP95_CREATED_AT: { type: DataTypes.DATE },
			TNRTP95_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	courseCompletionYear.selectedFields = ["value", "label"];
	return courseCompletionYear;
};
