module.exports = (sequelize, DataTypes) => {
	const educQualification = sequelize.define(
		"TNRTP74_EDUC_QUALIFICATION_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP74_EDUC_QUALIFICATION_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP74_EDUC_QUALIFICATION_NAME_N" },
			isOthers: { type: DataTypes.BOOLEAN, field: "TNRTP74_IS_OTHERS_D" },
			TNRTP74_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP74_CREATED_AT: { type: DataTypes.DATE },
			TNRTP74_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	educQualification.selectedFields = ["value", "label", "isOthers"];
	return educQualification;
};
