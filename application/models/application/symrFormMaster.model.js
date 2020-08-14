const { DELETE_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const symrFormMaster = sequelize.define(
		"TNRTP68_SYMR_FORMS_MASTER",
		{
			formId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP68_SYMR_FORMS_MASTER_D",
			},
			userId: { type: DataTypes.INTEGER, field: "TNRTP68_US_USER_MASTER_D" },
			name: { type: DataTypes.STRING, field: "TNRTP68_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP68_STATUS_D" },
			TNRTP68_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP68_CREATED_AT: { type: DataTypes.DATE },
			TNRTP68_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP68_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP68_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrFormMaster.associate = function (models) {
		symrFormMaster.hasOne(models.symrBasicDetails, {
			foreignKey: "formId",
			as: "basicDetails",
		});
		symrFormMaster.hasOne(models.symrShgDetails, {
			foreignKey: "formId",
			as: "symrShgDetails",
		});
		symrFormMaster.hasOne(models.symrSkillTraining, {
			foreignKey: "formId",
			as: "symrSkillTraining",
		});
		symrFormMaster.hasOne(models.symrEnterprise, {
			foreignKey: "formId",
			as: "symrEnterprise",
		});
		symrFormMaster.hasOne(models.symrBankDetails, {
			foreignKey: "formId",
			as: "symrBankDetails",
		});
		symrFormMaster.hasMany(models.symrProposedActivity, {
			foreignKey: "formId",
			as: "symrProposedActivity",
		});
		symrFormMaster.hasOne(models.symrExistingLoan, {
			foreignKey: "formId",
			as: "symrExistingLoan",
		});
		symrFormMaster.hasOne(models.symrUploadDocument, {
			foreignKey: "formId",
			as: "symrUploadDocument",
		});
		symrFormMaster.hasOne(models.symrApplicationStatus, {
			foreignKey: "formId",
			as: "symrApplicationStatus",
		});
		symrFormMaster.hasOne(models.symrDisbursment, {
			foreignKey: "formId",
			as: "amountDisbursment",
		});
		symrFormMaster.hasOne(models.symrDisbursment, {
			foreignKey: "formId",
			as: "disbursmentUc"
		});
	};
	return symrFormMaster;
};
