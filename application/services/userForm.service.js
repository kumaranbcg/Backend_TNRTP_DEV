const errorCodes = require("./../configs/errorCodes");
const messages = require("./../configs/errorMsgs");
const { pcFormMaster, pcFormBasicDetails, pcFormProposedActivity } = require("../models");
const { DELETE_STATUS } = require("./../constants/index");
class UserFormService {}

UserFormService.prototype.getUserApplicationsService = async (params) => {
	try {
		const { userId } = params;
		let pcForms = await pcFormMaster.findAll({
			where: { TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED, userId },
			attributes: ["formId", "status", ["TNRTP01_UPDATED_AT", "appSubmitDate"]],
			include: [
				{
					model: pcFormBasicDetails,
					as: "basicDetails",
					required: false,
					where: { TNRTP07_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: ["mobileNumber", "name", "pcName"],
				},
				{
					model: pcFormProposedActivity,
					as: "pcFormProposedActivity",
					required: false,
					where: { TNRTP12_DELETED_F: DELETE_STATUS.NOT_DELETED },

					attributes: pcFormProposedActivity.selectedFields,
				},
			],
		});
		pcForms.map((element) => {
			let amount = 0;
			element.dataValues.pcFormProposedActivity.forEach((eachData) => {
				amount = amount + eachData.amtReq;
			});
			element.dataValues.totalAmount = amount;
			delete element.dataValues.pcFormProposedActivity;
			return element;
		});
		let forms = [...pcForms];
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
