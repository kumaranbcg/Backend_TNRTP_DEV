const service = require("./../services/pgApplication.service");
const errorCodes = require("./../configs/errorCodes.js");
const errMessages = require("./../configs/errorMsgs");
const { FORM_MASTER_STATUS, PG_FORM_STAGE } = require("./../constants/index");
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
module.exports = new PGFormController();
