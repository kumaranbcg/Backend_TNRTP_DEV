const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const symrExistingLoan = sequelize.define(
		"TNRTP84_SYMR_EXISTING_LOAN",
		{
			TNRTP84_SYMR_EXISTING_LOAN_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP84_SYMR_FORMS_MASTER_D" },
			isExistingLoan: { type: DataTypes.BOOLEAN, field: "TNRTP84_IS_EXISTING_LOAN_D" },
            existingLoanActivity: { type: DataTypes.INTEGER, field: "TNRTP84_EXISTING_LOAN_ACTIVITY_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP84_STATUS_D",
			},
			TNRTP84_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP84_CREATED_AT: { type: DataTypes.DATE },
			TNRTP84_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP84_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP84_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
    );
    symrExistingLoan.associate = function (models) {
		symrExistingLoan.hasMany(models.existingLoanActivity, {
			foreignKey: "TNRTP89_SYMR_EXISTING_LOAN_D",
			as: "existingLoanList",
		});
	};
	symrExistingLoan.selectedFields = [
        "isExistingLoan"
    ];
	return symrExistingLoan;
};
