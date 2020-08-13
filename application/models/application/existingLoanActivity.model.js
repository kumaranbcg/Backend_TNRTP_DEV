const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const existingLoanActivity = sequelize.define(
		"TNRTP89_EXISTING_LOAN_ACTIVITY",
		{
			TNRTP89_EXISTING_LOAN_ACTIVITY_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			loanSource: { type: DataTypes.STRING, field: "TNRTP89_LOAN_SOURCE_N" },
            existingLoanId: { type: DataTypes.INTEGER, field: "TNRTP89_SYMR_EXISTING_LOAN_D" },
			loanReceivedDate: { type: DataTypes.DATE, field: "TNRTP89_LOAN_RECEIVED_DATE_D" },
            loanAmount: { type: DataTypes.INTEGER, field: "TNRTP89_LOAN_AMOUNT_D" },
			interestRate: { type: DataTypes.DOUBLE, field: "TNRTP89_INTEREST_RATE_D" },
			amountToBeRepaid: { type: DataTypes.DOUBLE, field: "TNRTP89_AMOUNT_TO_BE_REPAID_D" },
			amountRepaid: { type: DataTypes.DOUBLE, field: "TNRTP89_AMOUNT_REPAID_D" },
            balanceAmtToBeRepaid: { type: DataTypes.DOUBLE, field: "TNRTP89_BALANCE_AMOUNT_TO_REPAY_D" },
			reason: { type: DataTypes.STRING, field: "TNRTP89_REASON_N" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP89_STATUS_D",
			},
			TNRTP89_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP89_CREATED_AT: { type: DataTypes.DATE },
			TNRTP89_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP89_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP89_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	existingLoanActivity.selectedFields = [
        "loanSource", 
        "loanReceivedDate", 
        "loanAmount",
        "interestRate",
        "amountToBeRepaid",
        "amountRepaid",
        "balanceAmtToBeRepaid",
        "reason"
    ];
	return existingLoanActivity;
};
