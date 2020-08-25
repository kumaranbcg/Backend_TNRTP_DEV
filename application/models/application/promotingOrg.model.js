module.exports = (sequelize, DataTypes) => {
	const promotingOrg = sequelize.define(
		"TNRTP113_PROMOTING_ORGANISATION_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP113_PROMOTING_ORGANISATION_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP113_NAME_N" },
			isOthers: { type: DataTypes.BOOLEAN, field: "TNRTP113_IS_OTHERS_D" },
			TNRTP113_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP113_CREATED_AT: { type: DataTypes.DATE },
			TNRTP113_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	promotingOrg.selectedFields = ["value", "label", "isOthers"];
	return promotingOrg;
};
