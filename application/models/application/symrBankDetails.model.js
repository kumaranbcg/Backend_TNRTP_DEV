const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.AES_KEY);
module.exports = (sequelize, DataTypes) => {
	const symrBankDetails = sequelize.define(
		"TNRTP82_SYMR_FORMS_BANK_DETAILS",
		{
			TNRTP82_SYMR_FORMS_BANK_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP82_SYMR_FORMS_MASTER_D" },
			accNumber: { type: DataTypes.STRING, field: "TNRTP82_ACCOUNT_NUMBER_N" },
			accName: { type: DataTypes.STRING, field: "TNRTP82_ACCOUNT_NAME_N" },
			bnkName: { type: DataTypes.STRING, field: "TNRTP82_BANK_NAME_N" },
			branchName: { type: DataTypes.STRING, field: "TNRTP82_BRANCH_NAME_N" },
			ifscCode: { type: DataTypes.STRING, field: "TNRTP82_IFSC_CODE_N" },
			isAccLinkAadhar: {
				type: DataTypes.BOOLEAN,
				field: "TNRTP82_IS_ACCOUNT_LINKED_WITH_AADHAR_D",
			},
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP82_STATUS_D",
			},
			TNRTP82_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP82_CREATED_AT: { type: DataTypes.DATE },
			TNRTP82_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP82_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP82_UPDATED_D: { type: DataTypes.INTEGER },
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
				}
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
			},
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrBankDetails.selectedFields = [
		"accNumber",
		"accName",
		"bnkName",
		"branchName",
		"ifscCode",
		"isAccLinkAadhar",
	];
	return symrBankDetails;
};
