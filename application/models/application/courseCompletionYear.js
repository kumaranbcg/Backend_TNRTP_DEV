module.exports = (sequelize, DataTypes) => {
	const courseCompletionYear = sequelize.define(
		"TNRTP103_COURSE_COMPLETION_YEAR_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP103_COURSE_COMPLETION_YEAR_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP103_COURSE_COMPLETION_YEAR_NAME_N" },
			TNRTP103_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP103_CREATED_AT: { type: DataTypes.DATE },
			TNRTP103_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	courseCompletionYear.selectedFields = ["value", "label"];
	return courseCompletionYear;
};
