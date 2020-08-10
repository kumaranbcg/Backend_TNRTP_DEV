const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pgFormAmountRecevied = sequelize.define(
		"TNRTP40_PG_FORMS_AMOUNT_RECEIVED",
		{
			TNRTP40_PG_FORMS_AMOUNT_RECEIVED_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP40_PG_FORMS_MASTER_D" },
			amtGrant: { type: DataTypes.INTEGER, field: "TNRTP40_AMOUNT_RECEIVED_GRANT_D" },
			amtReceviedLoan: { type: DataTypes.INTEGER, field: "TNRTP40_AMOUNT_RECEIVED_LOAN_D" },
			isLoanGrant: { type: DataTypes.BOOLEAN, field: "TNRTP40_LOAN_GRANT_LAST_SIX_MONTH_IS_D" },
			fundProvider: { type: DataTypes.STRING, field: "TNRTP40_FUND_PROVIDER_NAME_N" },
			amtRecevied: { type: DataTypes.INTEGER, field: "TNRTP40_AMOUNT_RECEIVED_D" },
			isSpecialEPO: { type: DataTypes.BOOLEAN, field: "TNRTP40_SPECIAL_PG_D" },
			specifyEPO: { type: DataTypes.STRING, field: "TNRTP40_SPECIFY_SPECIAL_PG_N" },
			nameOfPc: { type: DataTypes.STRING, field: "TNRTP40_NAME_OF_THE_PC_N" },
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP40_STATUS_D",
			},
			TNRTP40_DELETED_F: { type: DataTypes.INTEGER, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP40_CREATED_AT: { type: DataTypes.DATE },
			TNRTP40_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP40_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP40_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgFormAmountRecevied.selectedFields = [
		"amtGrant",
		"amtReceviedLoan",
		"isLoanGrant",
		"fundProvider",
		"amtRecevied",
		"nameOfPc",
		"isSpecialEPO",
		"specifyEPO",
	];
	return pgFormAmountRecevied;
};
