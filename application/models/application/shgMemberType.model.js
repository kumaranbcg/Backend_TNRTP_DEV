module.exports = (sequelize, DataTypes) => {
	const shgMemberType = sequelize.define(
		"TNRTP94_SHG_MEMBER_TYPE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP94_SHG_MEMBER_TYPE_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP94_SHG_MEMBER_TYPE_N" },
			isOthers: { type: DataTypes.BOOLEAN, field: "TNRTP94_IS_OTHERS_D" },
			TNRTP94_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP94_CREATED_AT: { type: DataTypes.DATE },
			TNRTP94_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	shgMemberType.selectedFields = ["value", "label", "isOthers"];
	return shgMemberType;
};
