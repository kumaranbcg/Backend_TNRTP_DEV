const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.AES_KEY);
module.exports = (sequelize, DataTypes) => {
	const egFormBankDetails = sequelize.define(
		"TNRTP58_EG_FORMS_BANK_DETAILS",
		{
			TNRTP58_EG_FORMS_BANK_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP58_EG_FORMS_MASTER_D" },
			accNumber: { type: DataTypes.STRING, field: "TNRTP58_ACCOUNT_NUMBER_N" },
			accName: { type: DataTypes.STRING, field: "TNRTP58_ACCOUNT_NAME_N" },
			bnkName: { type: DataTypes.STRING, field: "TNRTP58_BANK_NAME_N" },
			branchName: { type: DataTypes.STRING, field: "TNRTP58_BRANCH_NAME_N" },
			ifscCode: { type: DataTypes.STRING, field: "TNRTP58_IFSC_CODE_N" },
			noOfLastTransaction: {
				type: DataTypes.STRING,
				field: "TNRTP58_NO_OF_TRANSACTION_LAST_SIX_D",
			},
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP58_STATUS_D",
			},
			TNRTP58_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP58_CREATED_AT: { type: DataTypes.DATE },
			TNRTP58_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP58_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP58_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			getterMethods: {
				accNumber: function () {
					return this.getDataValue("accNumber") && cryptr.decrypt(this.getDataValue("accNumber"));
				},
				accName: function () {
					return this.getDataValue("accName") && cryptr.decrypt(this.getDataValue("accName"));
				},
				bnkName: function () {
					return this.getDataValue("bnkName") && cryptr.decrypt(this.getDataValue("bnkName"));
				},
				branchName: function () {
					return this.getDataValue("branchName") && cryptr.decrypt(this.getDataValue("branchName"));
				},
				ifscCode: function () {
					return this.getDataValue("ifscCode") && cryptr.decrypt(this.getDataValue("ifscCode"));
				},
				noOfLastTransaction: function () {
					return (
						this.getDataValue("noOfLastTransaction") &&
						cryptr.decrypt(this.getDataValue("noOfLastTransaction"))
					);
				},
			},
			setterMethods: {
				accNumber: function (value) {
					this.setDataValue("accNumber", value && cryptr.encrypt(value));
				},
				accName: function (value) {
					this.setDataValue("accName", value && cryptr.encrypt(value));
				},
				bnkName: function (value) {
					this.setDataValue("bnkName", value && cryptr.encrypt(value));
				},
				branchName: function (value) {
					this.setDataValue("branchName", value && cryptr.encrypt(value));
				},
				ifscCode: function (value) {
					this.setDataValue("ifscCode", value && cryptr.encrypt(value));
				},
				noOfLastTransaction: function (value) {
					this.setDataValue("noOfLastTransaction", value && cryptr.encrypt(value));
				},
			},
			freezeTableName: true,
			timestamps: false,
		}
	);
	egFormBankDetails.selectedFields = [
		"accNumber",
		"accName",
		"bnkName",
		"branchName",
		"ifscCode",
		"noOfLastTransaction",
	];
	return egFormBankDetails;
};
