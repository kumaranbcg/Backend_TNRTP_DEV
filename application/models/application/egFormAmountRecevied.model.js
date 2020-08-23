const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const egFormAmountRecevied = sequelize.define(
		"TNRTP57_EG_FORMS_AMOUNT_RECEIVED",
		{
			TNRTP57_EG_FORMS_AMOUNT_RECEIVED_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP57_EG_FORMS_MASTER_D" },
			amtGrant: { type: DataTypes.BIGINT, field: "TNRTP57_AMOUNT_RECEIVED_GRANT_D" },
			amtReceviedLoan: { type: DataTypes.BIGINT, field: "TNRTP57_AMOUNT_RECEIVED_LOAN_D" },
			isLoanGrant: { type: DataTypes.BOOLEAN, field: "TNRTP57_LOAN_GRANT_LAST_SIX_MONTH_IS_D" },
			fundProvider: { type: DataTypes.STRING, field: "TNRTP57_FUND_PROVIDER_NAME_N" },
			amtRecevied: { type: DataTypes.BIGINT, field: "TNRTP57_AMOUNT_RECEIVED_D" },
			isSpecialEPO: { type: DataTypes.BOOLEAN, field: "TNRTP57_SPECIAL_EG_D" },
			specifyEPO: { type: DataTypes.STRING, field: "TNRTP57_SPECIFY_SPECIAL_EG_N" },
			nameOfPc: { type: DataTypes.STRING, field: "TNRTP57_NAME_OF_THE_PC_N" },
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP57_STATUS_D",
			},
			TNRTP57_DELETED_F: { type: DataTypes.INTEGER, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP57_CREATED_AT: { type: DataTypes.DATE },
			TNRTP57_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP57_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP57_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egFormAmountRecevied.selectedFields = [
		"amtGrant",
		"amtReceviedLoan",
		"isLoanGrant",
		"fundProvider",
		"amtRecevied",
		"nameOfPc",
		"isSpecialEPO",
		"specifyEPO",
	];
	return egFormAmountRecevied;
};
