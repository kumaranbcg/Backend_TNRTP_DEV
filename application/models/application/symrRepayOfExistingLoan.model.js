module.exports = (sequelize, DataTypes) => {
	const symrRepayOfExistingLoan = sequelize.define(
		"TNRTP98_SYMR_REPAY_OF_EXISTING_LOAN_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP98_SYMR_REPAY_OF_EXISTING_LOAN_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP98_EXISTING_LOAN_NAME_N" },
			isOthers: { type: DataTypes.BOOLEAN, field: "TNRTP98_IS_OTHERS_D" },
			TNRTP98_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP98_CREATED_AT: { type: DataTypes.DATE },
			TNRTP98_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrRepayOfExistingLoan.selectedFields = ["value", "label", "isOthers"];
	return symrRepayOfExistingLoan;
};
