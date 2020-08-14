module.exports = (sequelize, DataTypes) => {
	const pcLinkage = sequelize.define(
		"TNRTP26_PC_ASSESSMENT_LINKAGE_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP26_PC_ASSESSMENT_LINKAGE_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP26_PC_LINKAGE_N" },
			TNRTP26_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP26_CREATED_AT: { type: DataTypes.DATE },
			TNRTP26_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcLinkage.selectedFields = ["value", "label"];
	return pcLinkage;
};
