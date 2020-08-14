const errorCodes = require("./../configs/errorCodes");
const messages = require("./../configs/errorMsgs");
const { mainDashboard, application } = require("../models");
const { PG_FORM_MASTER_STATUS, PC_FORM_MASTER_STATUS } = require("./../constants/index");
const { Op } = require("sequelize");
class DashboardService {}

DashboardService.prototype.dashboardStatisticService = async (params) => {
	try {
		const { district, formType } = params;
		let searchCondition = {
			[Op.or]: [
				{
					TNRTP81_US_DISTRICT_MASTER_D: {
						[Op.in]: district,
					},
				},
				{
					TNRTP81_FORMS_TYPE_D: {
						[Op.in]: formType,
					},
				},
			],
		};
		const totalDisbursmentAmount = application.dialect.QueryGenerator.selectQuery(
			"TNRTP81_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("SUM", application.col("TNRTP81_TOTAL_DISBURSEMENT_AMOUNT_D")),
						"totalAmount",
					],
				],
				required: false,
				where: { ...searchCondition },
			}
		).slice(0, -1);
		const approvedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP81_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP81_DASHBOARD_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: false,
				where: {
					...searchCondition,
					TNRTP81_IS_APPLICATION_STATUS_D: [
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
			"TNRTP81_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP81_DASHBOARD_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: false,
				where: {
					...searchCondition,
					TNRTP81_IS_APPLICATION_STATUS_D: [PG_FORM_MASTER_STATUS.PENDING],
				},
			}
		).slice(0, -1);
		const rejectedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP81_DASHBOARD_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP81_DASHBOARD_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: false,
				where: {
					...searchCondition,
					TNRTP81_IS_APPLICATION_STATUS_D: [PG_FORM_MASTER_STATUS.DECLINED],
				},
			}
		).slice(0, -1);
		let dashBoardData = await mainDashboard.findOne({
			where: { ...searchCondition },
			attributes: [
				[
					application.fn("COUNT", application.col("TNRTP81_DASHBOARD_FORMS_MASTER_D")),
					"totalApplication",
				],
				[
					application.fn("MIN", application.col("TNRTP81_TOTAL_DISBURSEMENT_AMOUNT_D")),
					"lowestAmount",
				],
				[
					application.fn("MAX", application.col("TNRTP81_TOTAL_DISBURSEMENT_AMOUNT_D")),
					"highestAmount",
				],
				[
					application.fn("AVG", application.col("TNRTP81_TOTAL_DISBURSEMENT_AMOUNT_D")),
					"averageAmount",
				],
				[application.literal("(" + totalDisbursmentAmount + ")"), "totalDisbursmentAmount"],
				[application.literal("(" + approvedApplication + ")"), "approvedApplication"],
				[application.literal("(" + pendingApplication + ")"), "pendingApplication"],
				[application.literal("(" + rejectedApplication + ")"), "rejectedApplication"],
			],
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
		};
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: obj,
		};
	} catch (err) {
		console.log("getSectorTypesService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
module.exports = new DashboardService();
