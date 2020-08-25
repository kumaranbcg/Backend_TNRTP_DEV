module.exports = (sequelize, DataTypes) => {
	const relationshipType = sequelize.define(
		"TNRTP78_RELATIONSHIP_TYPE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP78_RELATIONSHIP_TYPE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP78_RELATIONSHIP_TYPE_NAME_N" },
			isOthers: { type: DataTypes.BOOLEAN, field: "TNRTP78_IS_OTHERS_D" },
			TNRTP78_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP78_CREATED_AT: { type: DataTypes.DATE },
			TNRTP78_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	relationshipType.selectedFields = ["value", "label"];
	return relationshipType;
};
