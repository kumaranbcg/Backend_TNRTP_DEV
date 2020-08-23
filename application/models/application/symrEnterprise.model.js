const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const db = require("../../models");
module.exports = (sequelize, DataTypes) => {
	const symrEnterprise = sequelize.define(
		"TNRTP81_SYMR_ENTERPRISE",
		{
			TNRTP81_SYMR_ENTERPRISE_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP81_SYMR_FORMS_MASTER_D" },
			grantenterpriseName: { type: DataTypes.STRING, field: "TNRTP81_GRANT_ENTERPRISE_NAME_N" },
			enterpriseType: { type: DataTypes.INTEGER, field: "TNRTP81_ENTERPRISE_TYPE_MASTER_D" },
			grantActivityName: { type: DataTypes.STRING, field: "TNRTP81_GRANT_ACTIVITY_NAME_N" },
			// activityType: { type: DataTypes.INTEGER, field: "TNRTP81_ACTIVITY_TYPE_MASTER_D" },
			// sector: { type: DataTypes.INTEGER, field: "TNRTP81_TYPE_OF_SECTOR_MASTER_D" },
			// commodity: { type: DataTypes.INTEGER, field: "TNRTP81_TYPE_OF_COMMODITY_MASTER_D" },
			summary: { type: DataTypes.STRING, field: "TNRTP81_SUMMARY_N" },
			noOfPersons: { type: DataTypes.INTEGER, field: "TNRTP81_NO_OF_PERSONS_D" },
			isExperiencedEnterpreneur: {
				type: DataTypes.BOOLEAN,
				field: "TNRTP81_IS_EXPERIENCED_ENTERPRENEUR_D",
			},
			enterpreneurExpYears: {
				type: DataTypes.INTEGER,
				field: "TNRTP81_ENTERPRENEUR_EXP_YEARS_MASTER_D",
			},
			isEmployedInActivity: { type: DataTypes.BOOLEAN, field: "TNRTP81_IS_EMPLOYED_IN_ACTIVITY_D" },
			activityExpYears: { type: DataTypes.INTEGER, field: "TNRTP81_ACTIVITY_EXP_YEARS_MASTER_D" },
			designation: { type: DataTypes.STRING, field: "TNRTP81_DESIGNATION_N" },
			location: { type: DataTypes.STRING, field: "TNRTP81_LOCATION_N" },
			isLoanAppliedPreviously: {
				type: DataTypes.BOOLEAN,
				field: "TNRTP81_IS_LOAN_APPLIED_PREVIOUSLY_D",
			},
			schemeAmount: { type: DataTypes.BIGINT, field: "TNRTP81_SCHEME_AMOUNT_N" },
			schemeName: { type: DataTypes.STRING, field: "TNRTP81_SCHEME_NAME_N" },

			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP81_STATUS_D",
			},
			TNRTP81_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP81_CREATED_AT: { type: DataTypes.DATE },
			TNRTP81_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP81_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP81_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrEnterprise.associate = function (models) {
		symrEnterprise.belongsTo(models.enterpriseType, {
			foreignKey: "TNRTP81_ENTERPRISE_TYPE_MASTER_D",
			as: "enterpriseTypeData",
		});
		symrEnterprise.hasMany(models.selectedSymr, {
			foreignKey: "TNRTP92_SYMR_FORMS_DETAILS_MASTER_D",
			as: "symrTypes",
		});
		symrEnterprise.hasMany(models.selectedSymrSector, {
			foreignKey: "TNRTP93_SYMR_FORMS_DETAILS_MASTER_D",
			as: "symrSectorTypes",
		});
		symrEnterprise.hasMany(models.selectedSymrCommodity, {
			foreignKey: "TNRTP91_SYMR_FORMS_DETAILS_MASTER_D",
			as: "symrCommodityTypes",
		});

		symrEnterprise.belongsTo(models.years, {
			foreignKey: "TNRTP81_ENTERPRENEUR_EXP_YEARS_MASTER_D",
			as: "enterpreneurExpYearsData",
		});
		symrEnterprise.belongsTo(models.years, {
			foreignKey: "TNRTP81_ACTIVITY_EXP_YEARS_MASTER_D",
			as: "activityExpYearsData",
		});
	};
	symrEnterprise.selectedFields = [
		"grantenterpriseName",
		"grantActivityName",
		"summary",
		"noOfPersons",
		"isExperiencedEnterpreneur",
		"isEmployedInActivity",
		"enterpreneurExpYears",
		"activityExpYears",
		"designation",
		"isLoanAppliedPreviously",
		"location",
		"schemeName",
		"schemeAmount",
	];
	return symrEnterprise;
};
