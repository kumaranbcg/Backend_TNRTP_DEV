const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const symrExistingLoan = sequelize.define(
		"TNRTP24_SYMR_EXISTING_LOAN",
		{
			TNRTP24_SYMR_EXISTING_LOAN_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP24_SYMR_FORMS_MASTER_D" },
			loanSource: { type: DataTypes.STRING, field: "TNRTP24_SYMR_LOAN_SOURCE_N" },
			loanReceivedDate: { type: DataTypes.DATE, field: "TNRTP24_SYMR_LOAN_RECEIVED_DATE_D" },
            loanAmount: { type: DataTypes.INTEGER, field: "TNRTP24_SYMR_LOAN_AMOUNT_D" },
			interestRate: { type: DataTypes.DOUBLE, field: "TNRTP24_SYMR_INTEREST_RATE_D" },
			amountToBeRepaid: { type: DataTypes.DOUBLE, field: "TNRTP24_SYMR_AMOUNT_TO_BE_REPAID_D" },
			amountRepaid: { type: DataTypes.DOUBLE, field: "TNRTP24_SYMR_AMOUNT_REPAID_D" },
            balanceAmtToBeRepaid: { type: DataTypes.DOUBLE, field: "TNRTP24_BALANCE_AMOUNT_TO_REPAY_D" },
			reason: { type: DataTypes.STRING, field: "TNRTP24_SYMR_REASON_N" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP24_STATUS_D",
			},
			TNRTP24_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP24_CREATED_AT: { type: DataTypes.DATE },
			TNRTP24_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP24_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP24_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrExistingLoan.selectedFields = [
        "loanSource", 
        "loanReceivedDate", 
        "loanAmount",
        "interestRate",
        "amountToBeRepaid",
        "amountRepaid",
        "balanceAmtToBeRepaid",
        "reason"
    ];
	return symrExistingLoan;
};
