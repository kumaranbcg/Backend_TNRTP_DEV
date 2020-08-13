const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const db = require("../../models");
module.exports = (sequelize, DataTypes) => {
	const symrEnterprise = sequelize.define(
		"TNRTP18_SYMR_ENTERPRISE",
		{
			TNRTP18_SYMR_ENTERPRISE_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
            formId: { type: DataTypes.INTEGER, field: "TNRTP18_SYMR_FORMS_MASTER_D" },
			grantenterpriseName: { type: DataTypes.STRING, field: "TNRTP18_GRANT_ENTERPRISE_NAME_N" },
		    enterpriseType: { type: DataTypes.INTEGER, field: "TNRTP18_ENTERPRISE_TYPE_MASTER_D" },
			grantActivityName: { type: DataTypes.STRING, field: "TNRTP18_SYMR_GRANT_ACTIVITY_NAME_N" },
		    activityType: { type: DataTypes.INTEGER, field: "TNRTP18_SYMR_ACTIVITY_TYPE_MASTER_D" },
			sectorId: { type: DataTypes.INTEGER, field: "TNRTP18_SYMR_TYPE_OF_SECTOR_MASTER_D" },
            commodityId: { type: DataTypes.INTEGER, field: "TNRTP18_SYMR_TYPE_OF_COMMODITY_MASTER_D" },
            summary: { type: DataTypes.STRING, field: "TNRTP18_SYMR_SUMMARY_N" },
			noOfPersons: { type: DataTypes.INTEGER, field: "TNRTP18_SYMR_NO_OF_PERSONS_D" },
            isExperiencedEnterpreneur: { type: DataTypes.BOOLEAN, field: "TNRTP18_SYMR_IS_EXPERIENCED_ENTERPRENEUR_N" },
            enterpreneurExpYears: { type: DataTypes.INTEGER, field: "TNRTP18_SYMR_ENTERPRENEUR_EXP_YEARS_MASTER_N" },
            isEmployedInActivity: { type: DataTypes.BOOLEAN, field: "TNRTP18_SYMR_EMPLOYED_IN_ACTIVITY_N" },
        	activityExpYears: { type: DataTypes.INTEGER, field: "TNRTP18_SYMR_ACTIVITY_EXP_YEARS_MASTER_N" },
            designation: { type: DataTypes.STRING, field: "TNRTP18_DESIGNATION_N" },
            location: { type: DataTypes.STRING, field: "TNRTP18_SYMR_LOCATION_N" },
            isLoanAppliedPreviously: { type: DataTypes.BOOLEAN, field: "TNRTP18_SYMR_LOAN_APPLIED_PREVIOUSLY_N" },
            schemeAmount: { type: DataTypes.INTEGER, field: "TNRTP18_SYMR_SCHEME_AMOUNT_N" },
            schemeName: { type: DataTypes.STRING, field: "TNRTP18_SYMR_SCHEME_NAME_N" },

			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP18_STATUS_D",
			},
			TNRTP18_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP18_CREATED_AT: { type: DataTypes.DATE },
			TNRTP18_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP18_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP18_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
    );
    symrEnterprise.associate = function (models) {
		symrEnterprise.belongsTo(models.enterpriseType, {
			foreignKey: "TNRTP18_ENTERPRISE_TYPE_MASTER_D",
			as: "enterpriseTypeData",
		});
		symrEnterprise.belongsTo(models.activityType, {
			foreignKey: "TNRTP18_ACTIVITY_TYPE_MASTER_D",
			as: "activityTypeData",
        });
        symrEnterprise.belongsTo(models.pcSectorTypes, {
			foreignKey: "TNRTP18_COURSE_TYPE_OF_SECTOR_MASTER_D",
			as: "courseCompletionTypeData",
        });
        symrEnterprise.belongsTo(models.pcCommodityTypes, {
			foreignKey: "TNRTP18_TYPE_OF_COMMODITY_MASTER_D",
			as: "pcCommodityTypeData",
        });
        symrEnterprise.belongsTo(models.years, {
			foreignKey: "TNRTP18_YEARS_MASTER_D",
			as: "yearsData",
		});
	};
	symrEnterprise.selectedFields = [
		"grantenterpriseName",
        "grantActivityName",
        "summary",
        "noOfPersons",
        "isExperiencedEnterpreneur",
        "isEmployedInActivity",
        "edpCompletedCourseName",
        "designation",
        "isLoanAppliedPreviously",
        "location",
        "schemeName",
        "schemeAmount"
	];
	return symrEnterprise;
};
