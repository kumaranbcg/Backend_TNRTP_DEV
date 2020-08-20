const { DELETE_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const egFormMaster = sequelize.define(
		"TNRTP53_EG_FORMS_MASTER",
		{
			formId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP53_EG_FORMS_MASTER_D",
			},
			userId: { type: DataTypes.INTEGER, field: "TNRTP53_US_USER_MASTER_D" },
			name: { type: DataTypes.STRING, field: "TNRTP53_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP53_IS_APPLICATION_STATUS" },
			TNRTP53_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP53_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP53_CREATED_AT: { type: DataTypes.DATE },
			TNRTP53_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP53_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP53_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egFormMaster.associate = function (models) {
		egFormMaster.hasOne(models.egFormBasicDetails, {
			foreignKey: "formId",
			as: "basicDetails",
		});
		egFormMaster.hasOne(models.egFormDetails, {
			foreignKey: "formId",
			as: "egDetails",
		});
		egFormMaster.hasOne(models.egFormMembers, {
			foreignKey: "formId",
			as: "egFormMembers",
		});
		egFormMaster.hasOne(models.egFormAmountRecevied, {
			foreignKey: "formId",
			as: "egFormAmountRecevied",
		});
		egFormMaster.hasOne(models.egFormBankDetails, {
			foreignKey: "formId",
			as: "egFormBankDetails",
		});
		egFormMaster.hasMany(models.egFormProposedActivity, {
			foreignKey: "formId",
			as: "egFormProposedActivity",
		});
		egFormMaster.hasOne(models.egFormUploadDocument, {
			foreignKey: "formId",
			as: "egFormUploadDocument",
		});
		egFormMaster.hasOne(models.egApplicationStatus, {
			foreignKey: "formId",
			as: "egBmpuApplicationStatus",
		});
		egFormMaster.hasOne(models.egApplicationStatus, {
			foreignKey: "formId",
			as: "egDmpuApplicationStatus",
		});
		egFormMaster.hasOne(models.egDisbursement, {
			foreignKey: "formId",
			as: "amountDisbursment",
		});
		egFormMaster.hasOne(models.egDisbursement, {
			foreignKey: "formId",
			as: "disbursmentUc",
		});
		egFormMaster.hasMany(models.egAssessment, {
			foreignKey: "formId",
			as: "egAssessment",
		});
	};
	return egFormMaster;
};
