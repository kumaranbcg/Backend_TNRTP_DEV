module.exports = (sequelize, DataTypes) => {
	const pcLinkage = sequelize.define(
		"TNRTP26_PC_ASSESSMENT_LINKAGE_MASTER",
		{
			TNRTP26_PC_ASSESSMENT_LINKAGE_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			linkageName: { type: DataTypes.STRING, field: "TNRTP26_PC_LINKAGE_NAME_N" },
			TNRTP26_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP26_CREATED_AT: { type: DataTypes.DATE },
			TNRTP26_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcLinkage.selectedFields = ["activityId", "activityName"];
	return pcLinkage;
};
