const { DELETE_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const symrFormMaster = sequelize.define(
		"TNRTP20_SYMR_FORMS_MASTER",
		{
			formId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP20_SYMR_FORMS_MASTER_D",
			},
			userId: { type: DataTypes.INTEGER, field: "TNRTP20_US_USER_MASTER_D" },
			name: { type: DataTypes.STRING, field: "TNRTP20_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP20_STATUS_D" },
			TNRTP20_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP20_CREATED_AT: { type: DataTypes.DATE },
			TNRTP20_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP20_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP20_UPDATED_D: { type: DataTypes.INTEGER },
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
			as: "symrshgDetails",
		});
		symrFormMaster.hasOne(models.symrSkillTraining, {
			foreignKey: "formId",
			as: "symrSkillTraining",
		});
		symrFormMaster.hasOne(models.symrEnterprise, {
			foreignKey: "formId",
			as: "symrEnterprisedetail",
		});
		symrFormMaster.hasOne(models.symrBankDetails, {
			foreignKey: "formId",
			as: "symrBankDetails",
		});
		symrFormMaster.hasMany(models.symrProposedActivity, {
			foreignKey: "formId",
			as: "symrProposedActivity",
		});
		// symrFormMaster.hasOne(models.symrFormUploadDocument, {
		// 	foreignKey: "formId",
		// 	as: "symrFormUploadDocument",
		// });
		// symrFormMaster.hasOne(models.symrApplicationStatus, {
		// 	foreignKey: "formId",
		// 	as: "symrApplicationStatus",
		// });
		// symrFormMaster.hasOne(models.symrDisbursment, {
		// 	foreignKey: "formId",
		// 	as: "firstTranche",
		// });
		// symrFormMaster.hasOne(models.symrDisbursment, {
		// 	foreignKey: "formId",
		// 	as: "secondTranche",
		// });
	};
	return symrFormMaster;
};
