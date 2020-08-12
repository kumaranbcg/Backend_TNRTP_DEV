const { DELETE_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pgFormMaster = sequelize.define(
		"TNRTP36_PG_FORMS_MASTER",
		{
			formId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP36_PG_FORMS_MASTER_D",
			},
			userId: { type: DataTypes.INTEGER, field: "TNRTP36_US_USER_MASTER_D" },
			name: { type: DataTypes.STRING, field: "TNRTP36_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP36_IS_APPLICATION_STATUS" },
			TNRTP36_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP36_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP36_CREATED_AT: { type: DataTypes.DATE },
			TNRTP36_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP36_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP36_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgFormMaster.associate = function (models) {
		pgFormMaster.hasOne(models.pgFormBasicDetails, {
			foreignKey: "formId",
			as: "basicDetails",
		});
		pgFormMaster.hasOne(models.pgFormDetails, {
			foreignKey: "formId",
			as: "pgDetails",
		});
		pgFormMaster.hasOne(models.pgFormMembers, {
			foreignKey: "formId",
			as: "pgFormMembers",
		});
		pgFormMaster.hasOne(models.pgFormAmountRecevied, {
			foreignKey: "formId",
			as: "pgFormAmountRecevied",
		});
		pgFormMaster.hasOne(models.pgFormBankDetails, {
			foreignKey: "formId",
			as: "pgFormBankDetails",
		});
		pgFormMaster.hasMany(models.pgFormProposedActivity, {
			foreignKey: "formId",
			as: "pgFormProposedActivity",
		});
		pgFormMaster.hasOne(models.pgFormUploadDocument, {
			foreignKey: "formId",
			as: "pgFormUploadDocument",
		});
		pgFormMaster.hasOne(models.pgApplicationStatus, {
			foreignKey: "formId",
			as: "pgBmpuApplicationStatus",
		});
		pgFormMaster.hasOne(models.pgApplicationStatus, {
			foreignKey: "formId",
			as: "pgDmpuApplicationStatus",
		});
		pgFormMaster.hasOne(models.pgDisbursment, {
			foreignKey: "formId",
			as: "amountDisbursment",
		});
		pgFormMaster.hasOne(models.pgDisbursment, {
			foreignKey: "formId",
			as: "disbursmentUc",
		});
	};
	return pgFormMaster;
};
