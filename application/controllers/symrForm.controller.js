const service = require("../services/symrApplication.service");
const errorCodes = require("../configs/errorCodes.js");
const errMessages = require("../configs/errorMsgs");
const { SYMR_FORM_MASTER_STATUS, SYMR_FORM_STAGE } = require("../constants/index");
class SYMRFormController {}

SYMRFormController.prototype.symrFormCreate = async (req, res) => {
	try {
		let result = await service.symrFormCreateSerivce({ ...req.user });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};

SYMRFormController.prototype.symrFormFill = async (req, res) => {
	try {
		const { stage } = req.query;
		let result;
		switch (stage) {
			case SYMR_FORM_STAGE.BASIC_DETAILS: {
				result = await service.symrBasicDetailsSerivce({ ...req.body });
				break;
			}
			case SYMR_FORM_STAGE.SHG_DETAILS: {
				result = await service.symrShgDetailService({ ...req.body });
				break;
			}
			case SYMR_FORM_STAGE.SKILL_EDP: {
				result = await service.symrSkillDetailService({ ...req.body });
				break;
			}
			case SYMR_FORM_STAGE.ENTERPRISE_ACTIVITY: {
				result = await service.symrEnterpriseDetailService({ ...req.body });
				break;
			}
			case SYMR_FORM_STAGE.BANK_DETAILS: {
				result = await service.symrBankDetailsSerivce({ ...req.body });
				break;
			}
			case SYMR_FORM_STAGE.PROPOSED_ACTIVITY: {
				result = await service.symrProposedActivitySerivce([...req.body]);
				break;
			}
			case SYMR_FORM_STAGE.EXISTING_LOAN: {
				result = await service.symrExistingLoanSerivce({ ...req.body });
				break;
			}
			case SYMR_FORM_STAGE.UPLOAD_DOCUMENTS: {
				result = await service.symrUploadDocSerivce({ ...req.body });
				break;
			}
			default: {
				return res.status(errorCodes.HTTP_NOT_FOUND).json();
			}
		}
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.submitSymrForm = async (req, res) => {
	try {
		let basicRes = await service.symrBasicDetailsSerivce({ ...req.body.basicDetails });
		let shgRes = await service.symrShgDetailService({ ...req.body.symrShgDetails });
		let skillRes = await service.symrSkillDetailService({ ...req.body.symrSkillTraining });
		let enterpriseRes = await service.symrEnterpriseDetailService({ ...req.body.symrEnterprise });
		let bankRes = await service.symrBankDetailsSerivce({ ...req.body.symrBankDetails });
		let proposedRes = await service.symrProposedActivitySerivce([...req.body.symrProposedActivity]);
		let ExistingRes = await service.symrExistingLoanSerivce({
			...req.body.symrExistingLoan,
		});
		let uploadRes = await service.symrUploadDocSerivce({ ...req.body.uploadDocuments });
		if (
			basicRes.code == errorCodes.HTTP_OK &&
			shgRes.code == errorCodes.HTTP_OK &&
			skillRes.code == errorCodes.HTTP_OK &&
			enterpriseRes.code == errorCodes.HTTP_OK &&
			bankRes.code == errorCodes.HTTP_OK &&
			proposedRes.code == errorCodes.HTTP_OK &&
			ExistingRes.code == errorCodes.HTTP_OK &&
			uploadRes.code == errorCodes.HTTP_OK
		) {
			let data = {
				formId: req.body.basicDetails.formId,
				status: SYMR_FORM_MASTER_STATUS.OPEN_APPLICATION,
				appSubmitDate: req.body.basicDetails.appSubmitDate,
			};
			let result = await service.updateSymrFormStatus({ ...data });
			res.status(result.code).json({ message: result.message, data: result.data });
		} else
			res
				.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR)
				.json({ errMessage: errMessages.technicalError });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.getSymrForm = async (req, res) => {
	try {
		let result = await service.getSymrFormService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.getSymrMasters = async (req, res) => {
	try {
		let result = await service.getSymrMasterService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.uploadDoc = async (req, res) => {
	try {
		if (req.files && req.files.errors) {
			return res.status(errorCodes.HTTP_BAD_REQUEST).json({ message: errMessages.invalidDocType });
		}
		if (req.body && req.body.errors) {
			return res.status(errorCodes.HTTP_BAD_REQUEST).json({ message: errMessages.docUploadFailed });
		}
		return res
			.status(errorCodes.HTTP_OK)
			.json({ message: errMessages.docUploadSuccess, data: req.body.documentUrls });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};

SYMRFormController.prototype.getSymrApplication = async (req, res) => {
	try {
		req.body.user = req.user;
		let result = await service.getSymrApplicationService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.symrUpdateOpenApplication = async (req, res) => {
	try {
		req.body.userData = req.user;
		let result = await service.updateOpenApplicationService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.getSymrApplicationStatus = async (req, res) => {
	try {
		let result = await service.getSymrApplicationStatusService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.updateSymrAmountDisbursment = async (req, res) => {
	try {
		req.body.userData = req.user;
		let result = await service.updateSymrAmountDisbursmentService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.updateSymrDisbursmentUc = async (req, res) => {
	try {
		req.body.userData = req.user;
		let result = await service.updateSymrDisbursmentUcService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.startSymrAssesment = async (req, res) => {
	try {
		let result = await service.startSymrAssesmentService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.submitSymrAssesment = async (req, res) => {
	try {
		let result = await service.submitSymrAssesmentService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
SYMRFormController.prototype.getSymrAssesment = async (req, res) => {
	try {
		let result = await service.getSymrAssesmentService({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};

module.exports = new SYMRFormController();
