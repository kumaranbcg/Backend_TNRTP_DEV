module.exports = (sequelize, DataTypes) => {
	const shgMemberType = sequelize.define(
		"TNRTP09_SHG_MEMBER_TYPE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP09_SHG_MEMBER_TYPE_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP09_SHG_MEMBER_TYPE_N" },
			TNRTP09_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP09_CREATED_AT: { type: DataTypes.DATE },
			TNRTP09_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	shgMemberType.selectedFields = ["value", "label"];
	return shgMemberType;
};
