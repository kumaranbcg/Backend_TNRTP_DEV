module.exports = (sequelize, DataTypes) => {
	const pcAuditYear = sequelize.define(
		"TNRTP28_PC_AUDIT_FINANCIAL_YEAR_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP28_PC_AUDIT_FINANCIAL_YEAR_MASTER_D",
			},
			label: { type: DataTypes.INTEGER, field: "TNRTP28_PC_AUDIT_YEAR_D" },
			TNRTP28_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP28_CREATED_AT: { type: DataTypes.DATE },
			TNRTP28_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcAuditYear.selectedFields = ["value", "label"];
	return pcAuditYear;
};
