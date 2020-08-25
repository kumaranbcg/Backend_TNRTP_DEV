module.exports = (sequelize, DataTypes) => {
	const religion = sequelize.define(
		"TNRTP72_RELIGION_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP72_RELIGION_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP72_RELIGION_NAME_N" },
			isOthers: { type: DataTypes.BOOLEAN, field: "TNRTP72_IS_OTHERS_D" },
			TNRTP72_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP72_CREATED_AT: { type: DataTypes.DATE },
			TNRTP72_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	religion.selectedFields = ["value", "label", "isOthers"];
	return religion;
};
