const errorCodes = require("./../configs/errorCodes");
const messages = require("./../configs/errorMsgs");
const { mainDashboard, application, pcFormDetails, pcTypes, selectedPc } = require("../models");
const { DASHBOARD_FORM_STATUS, DELETE_STATUS } = require("./../constants/index");
const { Op } = require("sequelize");
class DashboardService {}

DashboardService.prototype.dashboardStatisticService = async (params) => {
	try {
		const { district, formType } = params;
		let searchCondition = {
			[Op.or]: [
				{
					TNRTP95_US_DISTRICT_MASTER_D: {
						[Op.in]: district,
					},
				},
				{
					TNRTP95_FORMS_TYPE_D: {
						[Op.in]: formType,
					},
				},
			],
		};
		const approvedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP95_DASHBOARD_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: false,
				where: {
					...searchCondition,
					TNRTP95_IS_APPLICATION_STATUS_D: DASHBOARD_FORM_STATUS.APPROVED,
				},
			}
		).slice(0, -1);
		const pendingApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP95_DASHBOARD_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: false,
				where: {
					...searchCondition,
					TNRTP95_IS_APPLICATION_STATUS_D: DASHBOARD_FORM_STATUS.PENDING,
				},
			}
		).slice(0, -1);
		const rejectedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP95_DASHBOARD_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: false,
				where: {
					...searchCondition,
					TNRTP95_IS_APPLICATION_STATUS_D: DASHBOARD_FORM_STATUS.REJECTED,
				},
			}
		).slice(0, -1);
		let dashBoardData = await mainDashboard.findOne({
			where: { ...searchCondition },
			attributes: [
				{ include: [application.col("TNRTP95_DASHBOARD_FORMS_MASTER_D"), "formIDD"] },
				[
					application.fn("COUNT", application.col("TNRTP95_DASHBOARD_FORMS_MASTER_D")),
					"totalApplication",
				],
				[
					application.fn("MIN", application.col("TNRTP95_TOTAL_DISBURSEMENT_AMOUNT_D")),
					"lowestAmount",
				],
				[
					application.fn("MAX", application.col("TNRTP95_TOTAL_DISBURSEMENT_AMOUNT_D")),
					"highestAmount",
				],
				[
					application.fn("AVG", application.col("TNRTP95_TOTAL_DISBURSEMENT_AMOUNT_D")),
					"averageAmount",
				],
				[
					application.fn("SUM", application.col("TNRTP95_TOTAL_DISBURSEMENT_AMOUNT_D")),
					"totalDisbursmentAmount",
				],
				[application.literal("(" + approvedApplication + ")"), "approvedApplication"],
				[application.literal("(" + pendingApplication + ")"), "pendingApplication"],
				[application.literal("(" + rejectedApplication + ")"), "rejectedApplication"],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_MEMBERS_D")), "totalBeneficiaries"],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_MALE_D")), "totalMale"],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_FEMALE_D")), "totalFemale"],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_TRANSGENDER_D")), "totalTransgender"],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_BC_D")), "totalBC"],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_MBC_D")), "totalMBC"],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_SC_D")), "totalSC"],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_ST_D")), "totalST"],
				[
					application.fn("SUM", application.col("TNRTP95_TOTAL_COMMUNITY_OTHERS_D")),
					"totalCommunityOthers",
				],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_SHG_MEMBERS_D")), "totalSHGMember"],
				[
					application.fn("SUM", application.col("TNRTP95_TOTAL_SHG_HOUSE_HOLDS_D")),
					"totalSHGHouseholds",
				],
				[
					application.fn("SUM", application.col("TNRTP95_TOTAL_NON_SHG_HOUSE_HOLDS_D")),
					"totalNonSHGHouseholds",
				],
				[
					application.fn("SUM", application.col("TNRTP95_TOTAL_DIFFERENTLY_ABLED_D")),
					"TotalDifferentlyAbled",
				],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_WIDOW_D")), "TotalWidow"],
				[
					application.fn("SUM", application.col("TNRTP95_TOTAL_DESTITUTE_WOMEN_D")),
					"TotalDestituteWomen",
				],
				[
					application.fn("SUM", application.col("TNRTP95_TOTAL_DESERTED_WOMEN_D")),
					"TotalDesertedWomen",
				],
				[application.fn("SUM", application.col("TNRTP95_TOTAL_EIDERLY_D")), "TotalEiderly"],
				[
					application.fn("SUM", application.col("TNRTP95_TOTAL_VULNERABLE_TRANSGENDER_D")),
					"TotalVulnerableTransgender",
				],
			],
			include: {
				model: pcFormDetails,
				as: "pcDetails",
				where: { TNRTP08_DELETED_F: DELETE_STATUS.NOT_DELETED },
				required: false,
				attributes: ["formId"],
				include: [
					{
						model: selectedPc,
						as: "pcTypes",
						required: false,
						attributes: selectedPc.selectedFields,
						include: [
							{
								model: pcTypes,
								as: "pcTypesData",
								required: false,
								attributes: pcTypes.selectedFields,
							},
						],
					},
				],
			},
		});
		let activity = await pcTypes.findAll({
			attributes: [
				[
					application.fn("COUNT", application.col("activity.TNRTP16_PC_FORMS_DETAILS_MASTER_D")),
					"activityCount",
				],
				"value",
				"label",
			],
			// where: { "$activity.TNRTP16_PC_FORMS_DETAILS_MASTER_D$": 6 },
			include: [
				{
					model: selectedPc,
					as: "activity",
					attributes: [],
				},
			],
			group: ["TNRTP04_TYPE_OF_PC_MASTER_D"],
		});
		dashBoardData = dashBoardData.get({ plain: true });
		let obj = {
			fund: {
				target: 3000000,
				totalDisbursmentAmount: dashBoardData.totalDisbursmentAmount,
				totalDisbursmentAmount1: dashBoardData.totalDisbursmentAmount1,
			},
			loanSize: {
				lowestAmount: dashBoardData.lowestAmount,
				averageAmount: dashBoardData.averageAmount,
				highestAmount: dashBoardData.highestAmount,
			},
			applicationCount: {
				approvedApplication: dashBoardData.approvedApplication,
				pendingApplication: dashBoardData.pendingApplication,
				rejectedApplication: dashBoardData.rejectedApplication,
			},
			beneficiary: {
				target: 30000,
				totalBeneficiaries: dashBoardData.totalBeneficiaries,
			},
			gender: {
				totalGender:
					parseInt(dashBoardData.totalMale) +
					parseInt(dashBoardData.totalFemale) +
					parseInt(dashBoardData.totalTransgender),
				totalMale: dashBoardData.totalMale,
				totalFemale: dashBoardData.totalFemale,
				totalTransgender: dashBoardData.totalTransgender,
			},
			community: {
				totalCommunity:
					parseInt(dashBoardData.totalBC) +
					parseInt(dashBoardData.totalMBC) +
					parseInt(dashBoardData.totalSC) +
					parseInt(dashBoardData.totalST) +
					parseInt(dashBoardData.totalCommunityOthers),
				totalBC: dashBoardData.totalBC,
				totalMBC: dashBoardData.totalMBC,
				totalSC: dashBoardData.totalSC,
				totalST: dashBoardData.totalST,
				totalCommunityOthers: dashBoardData.totalCommunityOthers,
			},
			shg: {
				totalSHG:
					parseInt(dashBoardData.totalSHGMember) +
					parseInt(dashBoardData.totalSHGHouseholds) +
					parseInt(dashBoardData.totalNonSHGHouseholds),
				totalSHGMember: dashBoardData.totalSHGMember,
				totalSHGHouseholds: dashBoardData.totalSHGHouseholds,
				totalNonSHGHouseholds: dashBoardData.totalNonSHGHouseholds,
			},
			vulnerable: {
				totalVulnerable:
					parseInt(dashBoardData.TotalDifferentlyAbled) +
					parseInt(dashBoardData.TotalWidow) +
					parseInt(dashBoardData.TotalDestituteWomen) +
					parseInt(dashBoardData.TotalDesertedWomen) +
					parseInt(dashBoardData.TotalEiderly) +
					parseInt(dashBoardData.TotalVulnerableTransgender),
				totalDifferentlyAbled: dashBoardData.TotalDifferentlyAbled,
				totalWidow: dashBoardData.TotalWidow,
				totalDestituteWomen: dashBoardData.TotalDestituteWomen,
				totalDesertedWomen: dashBoardData.TotalDesertedWomen,
				totalEiderly: dashBoardData.TotalEiderly,
				totalVulnerableTransgender: dashBoardData.TotalVulnerableTransgender,
			},
		};
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: obj,
		};
	} catch (err) {
		console.log(err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
module.exports = new DashboardService();
