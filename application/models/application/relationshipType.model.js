module.exports = (sequelize, DataTypes) => {
	const relationshipType = sequelize.define(
		"TNRTP10_RELATIONSHIP_TYPE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP10_RELATIONSHIP_TYPE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP10_RELATIONSHIP_TYPE_NAME_N" },
			TNRTP10_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP10_CREATED_AT: { type: DataTypes.DATE },
			TNRTP10_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	relationshipType.selectedFields = ["value", "label"];
	return relationshipType;
};
