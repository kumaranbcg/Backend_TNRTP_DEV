const service = require("./../services/pgApplication.service");
const errorCodes = require("./../configs/errorCodes.js");
const errMessages = require("./../configs/errorMsgs");
const { PC_FORM_MASTER_STATUS, PG_FORM_STAGE } = require("./../constants/index");
class PGFormController {}

PGFormController.prototype.pgFormCreate = async (req, res) => {
	try {
		let result = await service.pgFormCreateSerivce({ ...req.user });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PGFormController.prototype.pgFormFill = async (req, res) => {
	try {
		const { stage } = req.query;
		req.body.userData = req.user;
		let result;
		switch (stage) {
			case PG_FORM_STAGE.BASIC_DETAILS: {
				result = await service.pgFormBasicDetailsSerivce({ ...req.body });
				break;
			}
			case PG_FORM_STAGE.PC_DETAILS: {
				result = await service.pgFormDetailsSerivce({ ...req.body });
				break;
			}
			case PG_FORM_STAGE.MEMBERS: {
				result = await service.pgFormMemberSerivce({ ...req.body });
				break;
			}
			case PG_FORM_STAGE.AMOUNT_RECEVIED: {
				result = await service.pgFormAmountSerivce({ ...req.body });
				break;
			}
			case PG_FORM_STAGE.BANK_DETAILS: {
				result = await service.pgFormBankDetailsSerivce({ ...req.body });
				break;
			}
			case PG_FORM_STAGE.PROPOSED_ACTIVITY: {
				result = await service.pgFormProposedActivitySerivce([...req.body]);
				break;
			}
			case PG_FORM_STAGE.UPLOAD_DOCUMENTS: {
				result = await service.pgFormUploadDocSerivce({ ...req.body });
				break;
			}
			default: {
				return res.status(errorCodes.HTTP_NOT_FOUND).json();
			}
		}
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PGFormController.prototype.getPgForm = async (req, res) => {
	try {
		let result = await service.getPgFormService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PGFormController.prototype.submitPgForm = async (req, res) => {
	try {
		let userData = {
			userData: req.user,
		};
		let basicRes = await service.pgFormBasicDetailsSerivce({
			...req.body.basicDetails,
			...userData,
		});
		let detailsRes = await service.pgFormDetailsSerivce({ ...req.body.pgDetails, ...userData });
		let membersRes = await service.pgFormMemberSerivce({ ...req.body.pgFormMembers, ...userData });
		let amountRes = await service.pgFormAmountSerivce({
			...req.body.pgFormAmountRecevied,
			...userData,
		});
		let bankRes = await service.pgFormBankDetailsSerivce({
			...req.body.pgFormBankDetails,
			...userData,
		});
		let proposedRes = await service.pgFormProposedActivitySerivce([
			...req.body.pgFormProposedActivity,
		]);
		let uploadRes = await service.pgFormUploadDocSerivce({ ...req.body.uploadDocuments });
		if (
			basicRes.code == errorCodes.HTTP_OK &&
			detailsRes.code == errorCodes.HTTP_OK &&
			membersRes.code == errorCodes.HTTP_OK &&
			amountRes.code == errorCodes.HTTP_OK &&
			bankRes.code == errorCodes.HTTP_OK &&
			proposedRes.code == errorCodes.HTTP_OK &&
			uploadRes.code == errorCodes.HTTP_OK
		) {
			let data = {
				formId: req.body.basicDetails.formId,
				status: PC_FORM_MASTER_STATUS.OPEN_APPLICATION,
			};
			let result = await service.updatePgFormStatus({ ...data });
			res.status(result.code).json({ message: result.message, data: result.data });
		} else
			res
				.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR)
				.json({ errMessage: errMessages.technicalError });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
module.exports = new PGFormController();
