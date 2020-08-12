module.exports = (sequelize, DataTypes) => {
	const educQualification = sequelize.define(
		"TNRTP06_EDUC_QUALIFICATION_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP06_EDUC_QUALIFICATION_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP06_EDUC_QUALIFICATION_NAME_N" },
			TNRTP06_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP06_CREATED_AT: { type: DataTypes.DATE },
			TNRTP06_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	educQualification.selectedFields = ["value", "label"];
	return educQualification;
};
