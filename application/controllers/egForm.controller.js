const service = require("./../services/egApplication.service");
const errorCodes = require("./../configs/errorCodes.js");
const errMessages = require("./../configs/errorMsgs");
const { EG_FORM_MASTER_STATUS, EG_FORM_STAGE } = require("../constants/index");

class EGFormController {}

EGFormController.prototype.egFormCreate = async (req, res) => {
	try {
		let result = await service.egFormCreateSerivce({ ...req.user });

		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
EGFormController.prototype.egFormFill = async (req, res) => {
	try {
		const { stage } = req.query;
		req.body.userData = req.user;
		let result;
		switch (stage) {
			case EG_FORM_STAGE.BASIC_DETAILS: {
				result = await service.egFormBasicDetailsSerivce({ ...req.body });
				break;
			}
			case EG_FORM_STAGE.EG_DETAILS: {
				result = await service.egFormDetailsSerivce({ ...req.body });
				break;
			}
			case EG_FORM_STAGE.MEMBERS: {
				result = await service.egFormMemberSerivce({ ...req.body });
				break;
			}
			case EG_FORM_STAGE.AMOUNT_RECEVIED: {
				result = await service.egFormAmountSerivce({ ...req.body });
				break;
			}
			case EG_FORM_STAGE.BANK_DETAILS: {
				result = await service.egFormBankDetailsSerivce({ ...req.body });
				break;
			}
			case EG_FORM_STAGE.PROPOSED_ACTIVITY: {
				result = await service.egFormProposedActivitySerivce([...req.body]);
				break;
			}
			case EG_FORM_STAGE.UPLOAD_DOCUMENTS: {
				result = await service.egFormUploadDocSerivce({ ...req.body });
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

EGFormController.prototype.getEgForm = async (req, res) => {
	try {
		let result = await service.getEgFormService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};

EGFormController.prototype.submitPgForm = async (req, res) => {
	try {
		let userData = {
			userData: req.user,
		};
		let basicRes = await service.egFormBasicDetailsSerivce({
			...req.body.basicDetails,
			...userData,
		});
		let detailsRes = await service.egFormDetailsSerivce({ ...req.body.egDetails, ...userData });
		let membersRes = await service.egFormMemberSerivce({ ...req.body.egFormMembers, ...userData });
		let amountRes = await service.egFormAmountSerivce({
			...req.body.egFormAmountRecevied,
			...userData,
		});
		let bankRes = await service.egFormBankDetailsSerivce({
			...req.body.egFormBankDetails,
			...userData,
		});
		let proposedRes = await service.egFormProposedActivitySerivce([
			...req.body.egFormProposedActivity,
		]);
		let uploadRes = await service.egFormUploadDocSerivce({ ...req.body.uploadDocuments });
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
				status: EG_FORM_MASTER_STATUS.BMPU_OPEN_APPLICATION,
			};
			let result = await service.updateEgFormStatus({ ...data });
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

EGFormController.prototype.getEGMasters = async (req, res) => {
	try {
		let result = await service.getEgMasterService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};

EGFormController.prototype.submitEgForm = async (req, res) => {
	try {
		let userData = {
			userData: req.user,
		};

		let basicRes = await service.egFormBasicDetailsSerivce({
			...req.body.basicDetails,
			...userData,
		});
		let detailsRes = await service.egFormDetailsSerivce({ ...req.body.egDetails, ...userData });
		let membersRes = await service.egFormMemberSerivce({ ...req.body.egFormMembers, ...userData });
		let amountRes = await service.egFormAmountSerivce({
			...req.body.egFormAmountRecevied,
			...userData,
		});
		let bankRes = await service.egFormBankDetailsSerivce({
			...req.body.egFormBankDetails,
			...userData,
		});
		let proposedRes = await service.egFormProposedActivitySerivce([
			...req.body.egFormProposedActivity,
		]);
		let uploadRes = await service.egFormUploadDocSerivce({ ...req.body.uploadDocuments });
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
				status: EG_FORM_MASTER_STATUS.BMPU_OPEN_APPLICATION,
				appSubmitDate: req.body.basicDetails.appSubmitDate,
			};
			let result = await service.updateEgFormStatus({ ...data });
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

EGFormController.prototype.getEgApplication = async (req, res) => {
	try {
		req.body.user = req.user;
		let result = await service.getEgApplicationService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
EGFormController.prototype.updateEgBmpuOpenApplication = async (req, res) => {
	try {
		req.body.userData = req.user;
		let result = await service.updateBmpuOpenApplicationService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
EGFormController.prototype.getEgApplicationStatus = async (req, res) => {
	try {
		let result = await service.getEgApplicationStatusService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
EGFormController.prototype.updateEgDmpuOpenApplication = async (req, res) => {
	try {
		req.body.userData = req.user;
		let result = await service.updateDmpuOpenApplicationService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
EGFormController.prototype.updateEgAmountDisbursment = async (req, res) => {
	try {
		req.body.userData = req.user;
		console.log(req.body);
		let result = await service.updateAmountDisbursmentService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
EGFormController.prototype.updateEgDisbursmentUc = async (req, res) => {
	try {
		req.body.userData = req.user;
		let result = await service.updateDisbursmentUcService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
EGFormController.prototype.startEgAssesment = async (req, res) => {
	try {
		let result = await service.startEgAssesmentService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
EGFormController.prototype.submitEgAssesment = async (req, res) => {
	try {
		let result = await service.submitEgAssesmentService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
EGFormController.prototype.getEgAssesment = async (req, res) => {
	try {
		let result = await service.getEgAssesmentService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};

module.exports = new EGFormController();
