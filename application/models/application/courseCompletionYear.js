module.exports = (sequelize, DataTypes) => {
	const courseCompletionYear = sequelize.define(
		"TNRTP14_COURSE_COMPLETION_YEAR_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP14_COURSE_COMPLETION_YEAR_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP14_COURSE_COMPLETION_YEAR_NAME_N" },
			TNRTP14_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP14_CREATED_AT: { type: DataTypes.DATE },
			TNRTP14_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	courseCompletionYear.selectedFields = ["value", "label"];
	return courseCompletionYear;
};
