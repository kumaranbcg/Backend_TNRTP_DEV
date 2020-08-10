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
} = require("../models");
const { DELETE_STATUS, FORM_TYPES } = require("./../constants/index");
const { Op, Sequelize } = require("sequelize");
class UserFormService {}

UserFormService.prototype.getUserApplicationsService = async (params) => {
	try {
		const { userId } = params;
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
		let pcForms = await pcFormMaster.findAll({
			where: { TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED, userId },
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
			where: { TNRTP36_DELETED_F: DELETE_STATUS.NOT_DELETED, userId },
			attributes: [
				"formId",
				"status",
				["TNRTP36_UPDATED_AT", "appSubmitDate"],
				// [application.literal("(" + assignedCount + ")"), "totalAmount"],
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
		let forms = [...pcForms, ...pgForms];
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
module.exports = new UserFormService();
