const messages = require("./../configs/errorMsgs.js");
const errorCodes = require("./../configs/errorCodes.js");
const {
	EG_FORM_MASTER_STATUS,
	EG_UPLOAD_DOC,
	DELETE_STATUS,
	EG_STAFF_DOC,
	ORDERBY,
	EG_APPLICATION_STATUS_TYPE,
	EG_DISBURSEMENT_STATE,
} = require("../constants/index");

const {
	egFormMaster,				// 1
	egFormBasicDetails,			// 2
	egFormDetails,				// 3
	selectedEg,					// 9 
	selectedEgCommodity,		// 10 
	selectedEgSector,			// 11 
	egFormMembers,				// 4
	egFormAmountRecevied,		// 5
	egFormBankDetails,			// 6
	egFormProposedActivity,		// 7
	egFormUploadDocument,		// 8
	selectedEgDoc,			    // 12 
	pcTypes,
	pcCommodityTypes,
	pcSectorTypes,
	registrationUnder,
	formedSupported,
	activityTimeline,
	districtMaster,
	blockMaster,
	panchayatMaster,
	application,
	egApplicationStatus,
	egRequiredDoc,
	egDisbursment,
	egAssessment,
	egAssessmentDoc,
} = require("../models");


class EGApplicationService {}

EGApplicationService.prototype.egFormCreateSerivce = async (params) => {
	try {
		const { userId } = params;

		const createMaster = {
			userId,
			status: EG_FORM_MASTER_STATUS.DRAFT,
			TNRTP53_CREATED_D: userId,
			TNRTP53_UPDATED_D: userId
		};
		let pendingForm = await egFormMaster.findOne({
			where: { status: [EG_FORM_MASTER_STATUS.DRAFT, EG_FORM_MASTER_STATUS.PENDING] },
		});
		// if (pendingForm) {
		// 	return {
		// 		code: errorCodes.HTTP_CONFLICT,
		// 		message: messages.egFormPending,
		// 	};
		// }
		let formData = await egFormMaster.create({ ...createMaster });
		return {
			code: errorCodes.HTTP_OK,
			message: messages.formCreated,
			data: { formId: formData.formId },
		};
	} catch (err) {
		console.log("egFormCreateSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.egFormBasicDetailsSerivce = async (params) => {
	try {
		console.log('Eg form service')
		const { formId } = params;
		params.TNRTP54_CREATED_D = params.userData.userId;
		params.TNRTP54_UPDATED_D = params.userData.userId;
		let formData = await egFormBasicDetails.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await egFormBasicDetails.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("egFormBasicDetailsSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.egFormDetailsSerivce = async (params) => {
	try {
		const { formId } = params;
		params.TNRTP55_CREATED_D = params.userData.userId;
		params.TNRTP55_UPDATED_D = params.userData.userId;


		await egFormDetails.destroy({ where: { formId } }).then(() => {
			return egFormDetails.create(
				{ ...params },
				{
					include: [
						{
							model: selectedEg,
							as: "egTypes",
						},
						{
							model: selectedEgCommodity,
							as: "egCommodityTypes",
						},
						{
							model: selectedEgSector,
							as: "egSectorTypes",
						},
					],
				}
			);
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pcFormDetailsSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.egFormMemberSerivce = async (params) => {
	try {
		const { formId } = params;
		params.TNRTP56_CREATED_D = params.userData.userId;
		params.TNRTP56_UPDATED_D = params.userData.userId;
		let formData = await egFormMembers.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await egFormMembers.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("egFormMemberSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.egFormAmountSerivce = async (params) => {
	try {
		const { formId } = params;
		params.TNRTP57_CREATED_D = params.userData.userId;
		params.TNRTP57_CREATED_D = params.userData.userId;
		let formData = await egFormAmountRecevied.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await egFormAmountRecevied.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("egFormAmountSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.egFormBankDetailsSerivce = async (params) => {
	try {
		const { formId } = params;
		params.TNRTP58_CREATED_D = params.userData.userId;
		params.TNRTP58_UPDATED_D = params.userData.userId;
		let formData = await egFormBankDetails.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await egFormBankDetails.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("egFormBankDetailsSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.egFormProposedActivitySerivce = async (params) => {
	try {
		if (params && params.length) {
			const { formId } = params[0];
			await egFormProposedActivity.destroy({ where: { formId } }).then(() => {
				return egFormProposedActivity.bulkCreate([...params]);
			});
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("egFormProposedActivitySerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.egFormUploadDocSerivce = async (params) => {
	try {
		const { formId } = params;
		
		if (params.minOfEGRefund && params.minOfEGRefund.length) {
			params.minOfEGRefund.map((element) => {
				element.docType = EG_UPLOAD_DOC.MIN_OF_EG;
			});
		}
		if (params.bankPassBook && params.bankPassBook.length) {
			params.bankPassBook.map((element) => {
				element.docType = EG_UPLOAD_DOC.BANK_PASSBOOK;
			});
		}
		if (params.businessPlan && params.businessPlan.length) {
			params.businessPlan.map((element) => {
				element.docType = EG_UPLOAD_DOC.BUSSINESS_PLAN;
			});
		}

		await egFormUploadDocument.destroy({ where: { formId } }).then(() => {
			return egFormUploadDocument.create(
				{ ...params },
				{
					include: [
						{
							model: selectedEgDoc,
							as: "minOfEGRefund",
						},
						{
							model: selectedEgDoc,
							as: "bankPassBook",
						},
						{
							model: selectedEgDoc,
							as: "businessPlan",
						},
					],
				}
			);
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pcFormUploadDocSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};

EGApplicationService.prototype.updateEgFormStatus = async (params) => {
	try {
		const { formId, status } = params;
		await egFormMaster.update(
			{ status, TNRTP53_UPDATED_AT: new Date() },
			{
				where: { formId },
			}
		);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("updateEgFormStatus", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};

EGApplicationService.prototype.getEgFormService = async (params) => {
	try {
		const { formId } = params;
		let formData = await egFormMaster.findOne({
			where: { formId, TNRTP53_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId", "name", "status", ["TNRTP53_UPDATED_AT", "appSubmitDate"]],
			include: [
				{
					model: egFormBasicDetails,
					as: "basicDetails",
					where: { TNRTP54_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: egFormBasicDetails.selectedFields,
				},
				{
					model: egFormDetails,
					as: "egDetails",
					where: { TNRTP55_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: egFormDetails.selectedFields,
					include: [
						{
							model: selectedEg,
							as: "egTypes",
							required: false,
							attributes: selectedEg.selectedFields,
							include: [
								{
									model: pcTypes,
									as: "egTypesData",
									required: false,
									attributes: pcTypes.selectedFields,
								},
							],
						},
						{
							model: selectedEgCommodity,
							as: "egCommodityTypes",
							required: false,
							attributes: selectedEgCommodity.selectedFields,
							include: [
								{
									model: pcCommodityTypes,
									as: "egCommodityTypesData",
									required: false,
									attributes: pcCommodityTypes.selectedFields,
								},
							],
						},
						{
							model: selectedEgSector,
							as: "egSectorTypes",
							required: false,
							attributes: selectedEgSector.selectedFields,
							include: [
								{
									model: pcSectorTypes,
									as: "egSectorTypesData",
									required: false,
									attributes: pcSectorTypes.selectedFields,
								},
							],
						},
						{
							model: registrationUnder,
							as: "registrationUnderData",
							required: false,
							attributes: registrationUnder.selectedFields,
						},
						{
							model: formedSupported,
							as: "formSupportedData",
							required: false,
							attributes: formedSupported.selectedFields,
						},
					],
				},
				{
					model: egFormMembers,
					as: "egFormMembers",
					where: { TNRTP56_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: egFormMembers.selectedFields,
				},
				{
					model: egFormAmountRecevied,
					as: "egFormAmountRecevied",
					where: { TNRTP57_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: egFormAmountRecevied.selectedFields,
				},
				{
					model: egFormBankDetails,
					as: "egFormBankDetails",
					where: { TNRTP58_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: egFormBankDetails.selectedFields,
				},
				{
					model: egFormProposedActivity,
					as: "egFormProposedActivity",
					where: { TNRTP59_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: egFormProposedActivity.selectedFields,
					include: [
						{
							model: activityTimeline,
							as: "activityTimelineData",
							required: false,
							attributes: activityTimeline.selectedFields,
						},
					],
				},
				{
					model: egFormUploadDocument,
					as: "egFormUploadDocument",
					where: { TNRTP60_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: egFormUploadDocument.selectedFields,
					include: [
						{
							model: selectedEgDoc,
							as: "minOfEGRefund",
							attributes: selectedEgDoc.selectedFields,
							where: { docType: EG_UPLOAD_DOC.MIN_OF_EG },
							required: false,
						},
						{
							model: selectedEgDoc,
							as: "bankPassBook",
							attributes: selectedEgDoc.selectedFields,
							where: { docType: EG_UPLOAD_DOC.BANK_PASSBOOK },
							required: false,
						},
						{
							model: selectedEgDoc,
							as: "businessPlan",
							attributes: selectedEgDoc.selectedFields,
							where: { docType: EG_UPLOAD_DOC.BUSSINESS_PLAN },
							required: false,
						},
					],
				},
			],
			nested: true,
		});
		if (formData) {
			formData = formData.get({ plain: true });
			if (formData.basicDetails) {
				formData.basicDetails.district = await districtMaster.findOne({
					where: { value: formData.basicDetails.district },
					attributes: districtMaster.selectedFields,
				});
				formData.basicDetails.block = await blockMaster.findOne({
					where: { value: formData.basicDetails.block },
					attributes: blockMaster.selectedFields,
				});
				formData.basicDetails.panchayat = await panchayatMaster.findOne({
					where: { value: formData.basicDetails.panchayat },
					attributes: panchayatMaster.selectedFields,
				});
			}
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: formData,
		};
	} catch (err) {
		console.log("getEgFormService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};

EGApplicationService.prototype.getEgMasterService = async (params) => {
	try {
		let registrationUnderData = await registrationUnder.findAll({
			attributes: registrationUnder.selectedFields,
		});
		let formedByData = await formedSupported.findAll({
			attributes: formedSupported.selectedFields,
		});
		let typesOfPc = await pcTypes.findAll({
			attributes: pcTypes.selectedFields,
		});
		let typesOfCommodity = await pcCommodityTypes.findAll({
			attributes: pcCommodityTypes.selectedFields,
		});
		let typesOfSector = await pcSectorTypes.findAll({
			attributes: pcSectorTypes.selectedFields,
		});
		let activityData = await activityTimeline.findAll({
			attributes: activityTimeline.selectedFields,
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: {
				registrationUnderData,
				formedByData,
				typesOfPc,
				typesOfCommodity,
				typesOfSector,
				activityData,
			},
		};
	} catch (err) {
		console.log("getEgMasterService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};



module.exports = new EGApplicationService();


