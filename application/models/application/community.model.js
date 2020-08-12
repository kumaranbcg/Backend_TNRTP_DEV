module.exports = (sequelize, DataTypes) => {
	const community = sequelize.define(
		"TNRTP05_COMMUNITY_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP05_COMMUNITY_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP05_COMMUNITY_NAME_N" },
			TNRTP05_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP05_CREATED_AT: { type: DataTypes.DATE },
			TNRTP05_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	community.selectedFields = ["value", "label"];
	return community;
};
