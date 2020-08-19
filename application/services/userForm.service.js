const errorCodes = require("./../configs/errorCodes");
const messages = require("./../configs/errorMsgs");
const {
	pcFormMaster,
	pcFormBasicDetails,
	pgFormMaster,
	application,
	pcFormBankDetails,
	pcTypes,
	pcFormDetails,
	selectedPc,
	pcCommodityTypes,
	pcSectorTypes,
	pgFormBankDetails,
	pgFormBasicDetails,
	pgFormDetails,
	selectedPg,
	symrFormMaster,
	symrBankDetails,
	symrBasicDetails
} = require("../models");
const { DELETE_STATUS, FORM_TYPES } = require("./../constants/index");
const { Op, Sequelize } = require("sequelize");
class UserFormService {}

UserFormService.prototype.getUserApplicationsService = async (params) => {
	try {
		const { userId, mobileNumber } = params;
		let userPCFormsFilter = {
			[Op.or]: {
				userId,
				"$basicDetails.TNRTP07_MOBILE_NUMBER_R$": mobileNumber,
			},
		};
		let userPGFormsFilter = {
			[Op.or]: {
				userId,
				"$basicDetails.TNRTP37_MOBILE_NUMBER_R$": mobileNumber,
			},
		};
		const pcFormAmt = application.dialect.QueryGenerator.selectQuery(
			"TNRTP12_PC_FORMS_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP12_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				where: {
					TNRTP12_PC_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP01_PC_FORMS_MASTER.TNRTP01_PC_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		const pgFormAmt = application.dialect.QueryGenerator.selectQuery(
			"TNRTP42_PG_FORMS_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP42_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				where: {
					TNRTP42_PG_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP36_PG_FORMS_MASTER.TNRTP36_PG_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		const symrFormAmt = application.dialect.QueryGenerator.selectQuery(
			"TNRTP83_SYMR_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP83_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				where: {
					TNRTP83_SYMR_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP68_SYMR_FORMS_MASTER.TNRTP68_SYMR_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		let pcForms = await pcFormMaster.findAll({
			where: { TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED, ...userPCFormsFilter },
			attributes: [
				"formId",
				"status",
				["TNRTP01_UPDATED_AT", "appSubmitDate"],
				[application.literal("(" + pcFormAmt + ")"), "totalAmount"],
			],
			include: [
				{
					model: pcFormBasicDetails,
					as: "basicDetails",
					required: false,
					where: { TNRTP07_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: ["mobileNumber", "name", "pcName"],
				},
				{
					model: pcFormDetails,
					as: "pcDetails",
					where: { TNRTP08_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: ["dateFormation"],
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
				{
					model: pcFormBankDetails,
					as: "pcFormBankDetails",
					where: { TNRTP11_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: ["bnkName"],
				},
			],
		});
		let pgForms = await pgFormMaster.findAll({
			where: { TNRTP36_DELETED_F: DELETE_STATUS.NOT_DELETED, ...userPGFormsFilter },
			attributes: [
				"formId",
				"status",
				["TNRTP36_UPDATED_AT", "appSubmitDate"],
				[application.literal("(" + pgFormAmt + ")"), "totalAmount"],
			],
			include: [
				{
					model: pgFormBasicDetails,
					as: "basicDetails",
					where: { TNRTP37_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: ["mobileNumber", "name", "pgName"],
				},
				{
					model: pgFormDetails,
					as: "pgDetails",
					where: { TNRTP38_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: ["dateFormation"],
					include: [
						{
							model: selectedPg,
							as: "pgTypes",
							required: false,
							attributes: selectedPg.selectedFields,
							include: [
								{
									model: pcTypes,
									as: "pgTypesData",
									required: false,
									attributes: pcTypes.selectedFields,
								},
							],
						},
					],
				},
				{
					model: pgFormBankDetails,
					as: "pgFormBankDetails",
					where: { TNRTP41_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: ["bnkName"],
				},
			],
		});
		let symrForms = await symrFormMaster.findAll({
			where: { TNRTP68_DELETED_F: DELETE_STATUS.NOT_DELETED, userId },
			attributes: [
				"formId",
				"status",
				["TNRTP68_UPDATED_AT", "appSubmitDate"],
				[application.literal("(" + symrFormAmt + ")"), "totalAmount"],
			],
			include: [
				{
					model: symrBasicDetails,
					as: "basicDetails",
					required: false,
					where: { TNRTP69_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: ["mobileNumber",
						"name"
					]
				},
				{
					model: symrBankDetails,
					as: "symrBankDetails",
					where: { TNRTP82_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: ["bnkName"],
				},
			],
		});
		pcForms.map((element) => {
			element.dataValues.type = FORM_TYPES.PC_FORM;
			return element;
		});
		pgForms.map((element) => {
			element.dataValues.type = FORM_TYPES.PG_FORM;
			return element;
		});
		symrForms.map((element) => {
			element.dataValues.type = FORM_TYPES.SYMR_FORM;
			return element;
		});
		let forms = [...pcForms, ...pgForms, ...symrForms];
		return {
			code: errorCodes.HTTP_OK,
			message: messages.formCreated,
			data: { forms },
		};
	} catch (err) {
		console.log("pcFormCreateSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
UserFormService.prototype.getActivityTypesService = async (params) => {
	try {
		let activities = await pcTypes.findAll({
			attributes: pcTypes.selectedFields,
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: activities,
		};
	} catch (err) {
		console.log("getActivityTypesService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
UserFormService.prototype.getSectorTypesService = async (params) => {
	try {
		const { activityId } = params;
		let sectors = await pcSectorTypes.findAll({
			where: { activityId },
			attributes: pcSectorTypes.selectedFields,
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: sectors,
		};
	} catch (err) {
		console.log("getSectorTypesService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
UserFormService.prototype.getCommodityTypesService = async (params) => {
	try {
		const { sectorId } = params;
		let sectors = await pcCommodityTypes.findAll({
			where: { sectorId },
			attributes: pcCommodityTypes.selectedFields,
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: sectors,
		};
	} catch (err) {
		console.log("getSectorTypesService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
module.exports = new UserFormService();
