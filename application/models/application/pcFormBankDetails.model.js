const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pcFormBankDetails = sequelize.define(
		"TNRTP11_PC_FORMS_BANK_DETAILS",
		{
			TNRTP11_PC_FORMS_BANK_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP11_PC_FORMS_MASTER_D" },
			accNumber: { type: DataTypes.STRING, field: "TNRTP11_ACCOUNT_NUMBER_N" },
			accName: { type: DataTypes.STRING, field: "TNRTP11_ACCOUNT_NAME_N" },
			bnkName: { type: DataTypes.STRING, field: "TNRTP11_BANK_NAME_N" },
			branchName: { type: DataTypes.STRING, field: "TNRTP11_BRANCH_NAME_N" },
			ifscCode: { type: DataTypes.STRING, field: "TNRTP11_IFSC_CODE_N" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP11_STATUS_D",
			},
			TNRTP11_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP11_CREATED_AT: { type: DataTypes.DATE },
			TNRTP11_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP11_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP11_UPDATED_D: { type: DataTypes.INTEGER },
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
	pcFormBankDetails.selectedFields = ["accNumber", "accName", "bnkName", "branchName", "ifscCode"];
	return pcFormBankDetails;
};
