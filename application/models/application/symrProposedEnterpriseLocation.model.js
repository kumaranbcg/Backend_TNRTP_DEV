module.exports = (sequelize, DataTypes) => {
	const symrProposedEnterpriseLocation = sequelize.define(
		"TNRTP99_SYMR_PROPOSED_ENTERPRISE_LOCAITON_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP99_SYMR_PROPOSED_ENTERPRISE_LOCAITON_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP99_ENTERPRISE_LOCATION_NAME_N" },
			TNRTP99_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP99_CREATED_AT: { type: DataTypes.DATE },
			TNRTP99_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrProposedEnterpriseLocation.selectedFields = ["value", "label"];
	return symrProposedEnterpriseLocation;
};
