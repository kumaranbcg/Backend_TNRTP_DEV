const service = require("./../services/pcApplication.service");
const errorCodes = require("./../configs/errorCodes.js");
const errMessages = require("./../configs/errorMsgs");
const { FORM_MASTER_STATUS, PC_FORM_STAGE } = require("./../constants/index");
class PCFormController {}

PCFormController.prototype.pcFormCreate = async (req, res) => {
	try {
		req.body.userId = req.user.userId;
		let result = await service.pcFormCreateSerivce({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};

PCFormController.prototype.pcFormFill = async (req, res) => {
	try {
		const { stage } = req.query;
		let result;
		switch (stage) {
			case PC_FORM_STAGE.BASIC_DETAILS: {
				result = await service.pcFormBasicDetailsSerivce({ ...req.body });
				break;
			}
			case PC_FORM_STAGE.PC_DETAILS: {
				result = await service.pcFormDetailsSerivce({ ...req.body });
				break;
			}
			case PC_FORM_STAGE.MEMBERS: {
				result = await service.pcFormMemberSerivce({ ...req.body });
				break;
			}
			case PC_FORM_STAGE.AMOUNT_RECEVIED: {
				result = await service.pcFormAmountSerivce({ ...req.body });
				break;
			}
			case PC_FORM_STAGE.BANK_DETAILS: {
				result = await service.pcFormBankDetailsSerivce({ ...req.body });
				break;
			}
			case PC_FORM_STAGE.PROPOSED_ACTIVITY: {
				result = await service.pcFormProposedActivitySerivce({ ...req.body });
				break;
			}
			case PC_FORM_STAGE.UPLOAD_DOCUMENTS: {
				result = await service.pcFormUploadDocSerivce({ ...req.body });
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
PCFormController.prototype.submitPcForm = async (req, res) => {
	try {
		let basicRes = await service.pcFormBasicDetailsSerivce({ ...req.body.basicDetails });
		let detailsRes = await service.pcFormDetailsSerivce({ ...req.body.pcDetails });
		let membersRes = await service.pcFormMemberSerivce({ ...req.body.pcFormMembers });
		let amountRes = await service.pcFormAmountSerivce({ ...req.body.pcFormAmountRecevied });
		let bankRes = await service.pcFormBankDetailsSerivce({ ...req.body.pcFormBankDetails });
		let proposedRes = await service.pcFormProposedActivitySerivce([
			...req.body.pcFormProposedActivity,
		]);
		let uploadRes = await service.pcFormUploadDocSerivce({ ...req.body.uploadDocuments });
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
				status: FORM_MASTER_STATUS.OPEN_APPLICATION,
			};
			let result = await service.updatePcFormStatus({ ...data });
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
PCFormController.prototype.getPcForm = async (req, res) => {
	try {
		let result = await service.getPcFormService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PCFormController.prototype.getPCMasters = async (req, res) => {
	try {
		let result = await service.getPcMasterService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PCFormController.prototype.uploadDoc = async (req, res) => {
	try {
		if (req.body && req.body.error) {
			return res.status(errorCodes.HTTP_BAD_REQUEST).json({ message: errMessages.docUploadFailed });
		}
		return res
			.status(errorCodes.HTTP_OK)
			.json({ message: errMessages.docUploadSuccess, data: req.body.documentUrls });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};

PCFormController.prototype.getPcApplication = async (req, res) => {
	try {
		let result = await service.getPcApplicationService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PCFormController.prototype.updateOpenApplication = async (req, res) => {
	try {
		req.body.userData = req.user;
		let result = await service.updateOpenApplicationService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PCFormController.prototype.getPcApplicationStatus = async (req, res) => {
	try {
		let result = await service.getPcApplicationStatusService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PCFormController.prototype.updateFirstTranche = async (req, res) => {
	try {
		req.body.userData = req.user;
		let result = await service.updateFirstTrancheService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PCFormController.prototype.updateSecondTranche = async (req, res) => {
	try {
		req.body.userData = req.user;
		let result = await service.updateSecondTrancheService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PCFormController.prototype.updateSecondTrancheUc = async (req, res) => {
	try {
		req.body.userData = req.user;
		let result = await service.updateSecondTrancheUcService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PCFormController.prototype.startAssesment = async (req, res) => {
	try {
		let result = await service.startAssesmentService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
PCFormController.prototype.submitAssesment = async (req, res) => {
	try {
		let result = await service.submitAssesmentService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
module.exports = new PCFormController();
