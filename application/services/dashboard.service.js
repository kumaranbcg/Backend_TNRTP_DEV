const errorCodes = require("./../configs/errorCodes");
const messages = require("./../configs/errorMsgs");
const { mainDashboard, application, pcFormDetails, pcTypes, selectedPc } = require("../models");
const {
	PG_FORM_MASTER_STATUS,
	PC_FORM_MASTER_STATUS,
	DELETE_STATUS,
} = require("./../constants/index");
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
		const totalDisbursmentAmount = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("SUM", application.col("TNRTP95_TOTAL_DISBURSEMENT_AMOUNT_D")),
						"totalAmount",
					],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
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
					TNRTP95_IS_APPLICATION_STATUS_D: [
						PG_FORM_MASTER_STATUS.APPROVED,
						PG_FORM_MASTER_STATUS.SUBMIT_UC,
						PC_FORM_MASTER_STATUS.SECOND_TRANCHE,
						PC_FORM_MASTER_STATUS.SECOND_TRANCHE_UC,
						PC_FORM_MASTER_STATUS.APPROVED,
					],
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
					TNRTP95_IS_APPLICATION_STATUS_D: [PG_FORM_MASTER_STATUS.PENDING],
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
					TNRTP95_IS_APPLICATION_STATUS_D: [PG_FORM_MASTER_STATUS.DECLINED],
				},
			}
		).slice(0, -1);
		const totalBeneficiaries = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP95_TOTAL_MEMBERS_D")), "totalMember"],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalMale = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [[application.fn("SUM", application.col("TNRTP95_TOTAL_MALE_D")), "totalMale"]],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalFemale = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP95_TOTAL_FEMALE_D")), "totalFemale"],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalTransgender = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("SUM", application.col("TNRTP95_TOTAL_TRANSGENDER_D")),
						"totalTransgender",
					],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalBC = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [[application.fn("SUM", application.col("TNRTP95_TOTAL_BC_D")), "totalBC"]],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalMBC = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [[application.fn("SUM", application.col("TNRTP95_TOTAL_MBC_D")), "totalMBC"]],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalSC = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [[application.fn("SUM", application.col("TNRTP95_TOTAL_SC_D")), "totalSC"]],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalST = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [[application.fn("SUM", application.col("TNRTP95_TOTAL_ST_D")), "totalST"]],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalCommunityOthers = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("SUM", application.col("TNRTP95_TOTAL_COMMUNITY_OTHERS_D")),
						"totalCommunityOthers",
					],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalSHGMember = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP95_TOTAL_SHG_MEMBERS_D")), "totalSHGMember"],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalSHGHouseholds = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("SUM", application.col("TNRTP95_TOTAL_SHG_HOUSE_HOLDS_D")),
						"totalSHGHouseholds",
					],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const totalNonSHGHouseholds = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("SUM", application.col("TNRTP95_TOTAL_NON_SHG_HOUSE_HOLDS_D")),
						"totalNonSHGHouseholds",
					],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const TotalDifferentlyAbled = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("SUM", application.col("TNRTP95_TOTAL_DIFFERENTLY_ABLED_D")),
						"TotalDifferentlyAbled",
					],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const TotalWidow = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP95_TOTAL_WIDOW_D")), "TotalWidow"],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const TotalDestituteWomen = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("SUM", application.col("TNRTP95_TOTAL_DESTITUTE_WOMEN_D")),
						"TotalDestituteWomen",
					],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const TotalDesertedWomen = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("SUM", application.col("TNRTP95_TOTAL_DESERTED_WOMEN_D")),
						"TotalDesertedWomen",
					],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const TotalEiderly = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP95_TOTAL_EIDERLY_D")), "TotalEiderly"],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const TotalVulnerableTransgender = application.dialect.QueryGenerator.selectQuery(
			"TNRTP95_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("SUM", application.col("TNRTP95_TOTAL_VULNERABLE_TRANSGENDER_D")),
						"TotalVulnerableTransgender",
					],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);

		let dashBoardData = await mainDashboard.findOne({
			where: { ...searchCondition },
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
				[application.literal("(" + totalDisbursmentAmount + ")"), "totalDisbursmentAmount"],
				[application.literal("(" + approvedApplication + ")"), "approvedApplication"],
				[application.literal("(" + pendingApplication + ")"), "pendingApplication"],
				[application.literal("(" + rejectedApplication + ")"), "rejectedApplication"],
				[application.literal("(" + totalBeneficiaries + ")"), "totalBeneficiaries"],
				[application.literal("(" + totalMale + ")"), "totalMale"],
				[application.literal("(" + totalFemale + ")"), "totalFemale"],
				[application.literal("(" + totalTransgender + ")"), "totalTransgender"],
				[application.literal("(" + totalBC + ")"), "totalBC"],
				[application.literal("(" + totalMBC + ")"), "totalMBC"],
				[application.literal("(" + totalSC + ")"), "totalSC"],
				[application.literal("(" + totalST + ")"), "totalST"],
				[application.literal("(" + totalCommunityOthers + ")"), "totalCommunityOthers"],
				[application.literal("(" + totalSHGMember + ")"), "totalSHGMember"],
				[application.literal("(" + totalSHGHouseholds + ")"), "totalSHGHouseholds"],
				[application.literal("(" + totalNonSHGHouseholds + ")"), "totalNonSHGHouseholds"],
				[application.literal("(" + TotalDifferentlyAbled + ")"), "TotalDifferentlyAbled"],
				[application.literal("(" + TotalWidow + ")"), "TotalWidow"],
				[application.literal("(" + TotalDestituteWomen + ")"), "TotalDestituteWomen"],
				[application.literal("(" + TotalDesertedWomen + ")"), "TotalDesertedWomen"],
				[application.literal("(" + TotalEiderly + ")"), "TotalEiderly"],
				[application.literal("(" + TotalVulnerableTransgender + ")"), "TotalVulnerableTransgender"],
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
		dashBoardData = dashBoardData.get({ plain: true });
		let obj = {
			fund: {
				target: 3000000,
				totalDisbursmentAmount: dashBoardData.totalDisbursmentAmount,
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
			data: dashBoardData,
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
