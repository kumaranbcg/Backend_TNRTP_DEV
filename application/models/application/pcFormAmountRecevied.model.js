const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pcFormAmountRecevied = sequelize.define(
		"TNRTP10_PC_FORMS_AMOUNT_RECEIVED",
		{
			TNRTP10_PC_FORMS_AMOUNT_RECEIVED_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP10_PC_FORMS_MASTER_D" },
			amtGrant: { type: DataTypes.BIGINT, field: "TNRTP10_AMOUNT_RECEIVED_GRANT_D" },
			amtReceviedLoan: { type: DataTypes.BIGINT, field: "TNRTP10_AMOUNT_RECEIVED_LOAN_D" },
			isLoanGrant: { type: DataTypes.BOOLEAN, field: "TNRTP10_LOAN_GRANT_LAST_SIX_MONTH_IS_D" },
			fundProvider: { type: DataTypes.STRING, field: "TNRTP10_FUND_PROVIDER_NAME_N" },
			amtRecevied: { type: DataTypes.BIGINT, field: "TNRTP10_AMOUNT_RECEIVED_D" },
			shareCapital: { type: DataTypes.BIGINT, field: "TNRTP10_SHARE_CAPITAL_D" },
			isSpecialEPO: { type: DataTypes.BOOLEAN, field: "TNRTP10_SPECIAL_FPO_D" },
			specifyEPO: { type: DataTypes.STRING, field: "TNRTP10_SPECIFY_SPECIAL_FPO_N" },
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP10_STATUS_D",
			},
			TNRTP10_DELETED_F: { type: DataTypes.INTEGER, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP10_CREATED_AT: { type: DataTypes.DATE },
			TNRTP10_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP10_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP10_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcFormAmountRecevied.selectedFields = [
		"amtGrant",
		"amtReceviedLoan",
		"isLoanGrant",
		"fundProvider",
		"amtRecevied",
		"shareCapital",
		"isSpecialEPO",
		"specifyEPO",
	];
	return pcFormAmountRecevied;
};
