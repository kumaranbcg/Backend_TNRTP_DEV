const errorCodes = require("./../configs/errorCodes");
const messages = require("./../configs/errorMsgs");
const {
	mainDashboard,
	application,
	pcFormDetails,
	pcTypes,
	selectedPc,
	dashboardActivity,
	pcSectorTypes,
	dashboardSector,
	pcCommodityTypes,
	dashboardCommodity,
	dashboardEnterprise,
	enterpriseType,
} = require("../models");
const { DASHBOARD_FORM_STATUS, DELETE_STATUS } = require("./../constants/index");
const { Op } = require("sequelize");

class DashboardService {}
DashboardService.prototype.dashboardStatisticService = async (params) => {
	try {
		const { district, block, panchayat, formType, limit } = params;
		let searchCondition = {
			[Op.or]: [
				{
					TNRTP95_US_DISTRICT_MASTER_D: {
						[Op.in]: district,
					},
				},
				{
					TNRTP95_US_BLOCK_MASTER_D: {
						[Op.in]: block,
					},
				},
				{
					TNRTP95_US_PANCHAYAT_MASTER_D: {
						[Op.in]: panchayat,
					},
				},
				{
					TNRTP95_FORMS_TYPE_D: {
						[Op.in]: formType,
					},
				},
			],
		};
		const dashBoardIds = await mainDashboard.findAll({
			where: {
				...searchCondition,
			},
			raw: true,
			attributes: [["TNRTP95_DASHBOARD_FORMS_MASTER_D", "dashBoardMasterId"]],
		});
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
					TNRTP95_DASHBOARD_FORMS_MASTER_D: dashBoardIds.map((x) => x.dashBoardMasterId),
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
					TNRTP95_DASHBOARD_FORMS_MASTER_D: dashBoardIds.map((x) => x.dashBoardMasterId),
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
					TNRTP95_DASHBOARD_FORMS_MASTER_D: dashBoardIds.map((x) => x.dashBoardMasterId),
					TNRTP95_IS_APPLICATION_STATUS_D: DASHBOARD_FORM_STATUS.REJECTED,
				},
			}
		).slice(0, -1);
		let dashBoardData = await mainDashboard.findOne({
			where: { TNRTP95_DASHBOARD_FORMS_MASTER_D: dashBoardIds.map((x) => x.dashBoardMasterId) },
			attributes: [
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
					application.fn("COUNT", application.col("activityType.TNRTP105_TYPE_OF_PC_MASTER_D")),
					"activityCount",
				],
				"value",
				"label",
			],
			include: [
				{
					model: dashboardActivity,
					as: "activityType",
					attributes: [],
					required: false,
					where: {
						TNRTP105_DASHBOARD_FORMS_MASTER_D: dashBoardIds.map((x) => x.dashBoardMasterId),
					},
				},
			],
			group: ["TNRTP04_TYPE_OF_PC_MASTER_D"],
			raw: true,
		});
		let sector = await pcSectorTypes.findAll({
			attributes: [
				[
					application.fn("COUNT", application.col("sectorType.TNRTP106_TYPE_OF_SECTOR_MASTER_D")),
					"sectorCount",
				],
				"value",
				"label",
			],
			include: [
				{
					model: dashboardSector,
					as: "sectorType",
					attributes: [],
					required: false,
					where: {
						TNRTP106_DASHBOARD_FORMS_MASTER_D: dashBoardIds.map((x) => x.dashBoardMasterId),
					},
				},
			],
			group: ["TNRTP14_TYPE_OF_SECTOR_MASTER_D"],
			raw: true,
		});

		let commodity = await pcCommodityTypes.findAll({
			attributes: [
				[
					application.fn(
						"COUNT",
						application.col("commodityType.TNRTP107_TYPE_OF_COMMODITY_MASTER_D")
					),
					"commodityCount",
				],
				"value",
				"label",
			],
			include: [
				{
					model: dashboardCommodity,
					as: "commodityType",
					attributes: [],
					required: false,
					where: {
						TNRTP107_DASHBOARD_FORMS_MASTER_D: dashBoardIds.map((x) => x.dashBoardMasterId),
					},
				},
			],
			group: ["TNRTP05_TYPE_OF_COMMODITY_MASTER_D"],
			order: [[application.literal("commodityCount"), "DESC"]],
			raw: true,
			subQuery: false,
			limit: limit || 0,
		});
		let enterprise = await enterpriseType.findAll({
			attributes: [
				[
					application.fn(
						"COUNT",
						application.col("enterpriseType.TNRTP114_ENTERPRISE_TYPE_MASTER_D")
					),
					"enterpriseCount",
				],
				"value",
				"label",
			],
			include: [
				{
					model: dashboardEnterprise,
					as: "enterpriseType",
					attributes: [],
					required: false,
					where: {
						TNRTP114_DASHBOARD_FORMS_MASTER_D: dashBoardIds.map((x) => x.dashBoardMasterId),
					},
				},
			],
			group: ["TNRTP86_ENTERPRISE_TYPE_MASTER_D"],
			raw: true,
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
			activitys: activity,
			sectors: sector,
			commodity: commodity,
			enterprise: enterprise,
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
