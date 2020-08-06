const { DELETE_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pcFormMaster = sequelize.define(
		"TNRTP01_PC_FORMS_MASTER",
		{
			formId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP01_PC_FORMS_MASTER_D",
			},
			userId: { type: DataTypes.INTEGER, field: "TNTRP01_US_TNTRP01_USER_MASTER_D" },
			name: { type: DataTypes.STRING, field: "TNTRP01_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNTRP01_STATUS_D" },
			TNTRP01_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNTRP01_CREATED_AT: { type: DataTypes.DATE },
			TNTRP01_UPDATED_AT: { type: DataTypes.DATE },
			TNTRP01_CREATED_D: { type: DataTypes.INTEGER },
			TNTRP01_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcFormMaster.associate = function (models) {
		pcFormMaster.hasOne(models.pcFormBasicDetails, {
			foreignKey: "formId",
			as: "basicDetails",
		});
		pcFormMaster.hasOne(models.pcFormDetails, {
			foreignKey: "formId",
			as: "pcDetails",
		});
		pcFormMaster.hasOne(models.pcFormMembers, {
			foreignKey: "formId",
			as: "pcFormMembers",
		});
		pcFormMaster.hasOne(models.pcFormAmountRecevied, {
			foreignKey: "formId",
			as: "pcFormAmountRecevied",
		});
		pcFormMaster.hasOne(models.pcFormBankDetails, {
			foreignKey: "formId",
			as: "pcFormBankDetails",
		});
		pcFormMaster.hasMany(models.pcFormProposedActivity, {
			foreignKey: "formId",
			as: "pcFormProposedActivity",
		});
		pcFormMaster.hasOne(models.pcFormUploadDocument, {
			foreignKey: "formId",
			as: "pcFormUploadDocument",
		});
		pcFormMaster.hasOne(models.pcApplicationStatus, {
			foreignKey: "formId",
			as: "pcApplicationStatus",
		});
		pcFormMaster.hasOne(models.pcDisbursment, {
			foreignKey: "formId",
			as: "firstTranche",
		});
		pcFormMaster.hasOne(models.pcDisbursment, {
			foreignKey: "formId",
			as: "secondTranche",
		});
		pcFormMaster.hasOne(models.pcDisbursment, {
			foreignKey: "formId",
			as: "secondTrancheUc",
		});
	};
	return pcFormMaster;
};
