module.exports = (sequelize, DataTypes) => {
	const community = sequelize.define(
		"TNRTP73_COMMUNITY_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP73_COMMUNITY_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP73_COMMUNITY_NAME_N" },
			isOthers: { type: DataTypes.BOOLEAN, field: "TNRTP73_IS_OTHERS_D" },
			TNRTP73_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP73_CREATED_AT: { type: DataTypes.DATE },
			TNRTP73_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	community.selectedFields = ["value", "label", "isOthers"];
	return community;
};
