const messages = require("./../configs/errorMsgs.js");
const errorCodes = require("./../configs/errorCodes.js");
const { FORM_MASTER_STATUS, PG_UPLOAD_DOC, DELETE_STATUS } = require("../constants/index");
const { Op } = require("sequelize");
const {
	pgFormMaster,
	pgFormBasicDetails,
	pgFormDetails,
	selectedPg,
	selectedPgCommodity,
	selectedPgSector,
	pgFormMembers,
	pgFormAmountRecevied,
	pgFormBankDetails,
	pgFormProposedActivity,
	pgFormUploadDocument,
	selectedPgDoc,
	pcTypes,
	pcCommodityTypes,
	pcSectorTypes,
	registrationUnder,
	formedSupported,
	activityTimeline,
	districtMaster,
	blockMaster,
	panchayatMaster,
} = require("../models");
class PGApplicationService {}
PGApplicationService.prototype.pgFormCreateSerivce = async (params) => {
	try {
		const { userId } = params;
		const createMaster = {
			userId,
			status: FORM_MASTER_STATUS.DRAFT,
			TNRTP36_CREATED_D: userId,
			TNRTP36_UPDATED_D: userId,
		};
		let formData = await pgFormMaster.create({ ...createMaster });
		return {
			code: errorCodes.HTTP_OK,
			message: messages.formCreated,
			data: { formId: formData.formId },
		};
	} catch (err) {
		console.log("pgFormCreateSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.pgFormBasicDetailsSerivce = async (params) => {
	try {
		const { formId } = params;
		params.TNRTP37_CREATED_D = params.userData.userId;
		params.TNRTP37_UPDATED_D = params.userData.userId;
		let formData = await pgFormBasicDetails.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await pgFormBasicDetails.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pgFormBasicDetailsSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.pgFormDetailsSerivce = async (params) => {
	try {
		const { formId } = params;
		params.TNRTP38_CREATED_D = params.userData.userId;
		params.TNRTP38_UPDATED_D = params.userData.userId;
		await pgFormDetails.destroy({ where: { formId } }).then(() => {
			return pgFormDetails.create(
				{ ...params },
				{
					include: [
						{
							model: selectedPg,
							as: "pgTypes",
						},
						{
							model: selectedPgCommodity,
							as: "pgCommodityTypes",
						},
						{
							model: selectedPgSector,
							as: "pgSectorTypes",
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
PGApplicationService.prototype.pgFormMemberSerivce = async (params) => {
	try {
		const { formId } = params;
		params.TNRTP39_CREATED_D = params.userData.userId;
		params.TNRTP39_UPDATED_D = params.userData.userId;
		let formData = await pgFormMembers.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await pgFormMembers.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pgFormMemberSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.pgFormAmountSerivce = async (params) => {
	try {
		const { formId } = params;
		params.TNRTP40_CREATED_D = params.userData.userId;
		params.TNRTP40_CREATED_D = params.userData.userId;
		let formData = await pgFormAmountRecevied.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await pgFormAmountRecevied.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pgFormAmountSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.pgFormBankDetailsSerivce = async (params) => {
	try {
		const { formId } = params;
		params.TNRTP41_CREATED_D = params.userData.userId;
		params.TNRTP41_UPDATED_D = params.userData.userId;
		let formData = await pgFormBankDetails.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await pgFormBankDetails.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pgFormBankDetailsSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.pgFormProposedActivitySerivce = async (params) => {
	try {
		if (params && params.length) {
			const { formId } = params[0];
			await pgFormProposedActivity.destroy({ where: { formId } }).then(() => {
				return pgFormProposedActivity.bulkCreate([...params]);
			});
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pgFormProposedActivitySerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.pgFormUploadDocSerivce = async (params) => {
	try {
		const { formId } = params;
		if (params.minOfPGRefund && params.minOfPGRefund.length) {
			params.minOfPGRefund.map((element) => {
				element.docType = PG_UPLOAD_DOC.MIN_OF_PG;
			});
		}
		if (params.bankPassBook && params.bankPassBook.length) {
			params.bankPassBook.map((element) => {
				element.docType = PG_UPLOAD_DOC.BANK_PASSBOOK;
			});
		}
		if (params.businessPlan && params.businessPlan.length) {
			params.businessPlan.map((element) => {
				element.docType = PG_UPLOAD_DOC.BUSSINESS_PLAN;
			});
		}
		await pgFormUploadDocument.destroy({ where: { formId } }).then(() => {
			return pgFormUploadDocument.create(
				{ ...params },
				{
					include: [
						{
							model: selectedPgDoc,
							as: "minOfPGRefund",
						},
						{
							model: selectedPgDoc,
							as: "bankPassBook",
						},
						{
							model: selectedPgDoc,
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
PGApplicationService.prototype.getPgFormService = async (params) => {
	try {
		const { formId } = params;
		let formData = await pgFormMaster.findOne({
			where: { formId, TNRTP36_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId", "name", "status"],
			include: [
				{
					model: pgFormBasicDetails,
					as: "basicDetails",
					where: { TNRTP37_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pgFormBasicDetails.selectedFields,
				},
				{
					model: pgFormDetails,
					as: "pgDetails",
					where: { TNRTP38_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pgFormDetails.selectedFields,
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
						{
							model: selectedPgCommodity,
							as: "pgCommodityTypes",
							required: false,
							attributes: selectedPgCommodity.selectedFields,
							include: [
								{
									model: pcCommodityTypes,
									as: "pgCommodityTypesData",
									required: false,
									attributes: pcCommodityTypes.selectedFields,
								},
							],
						},
						{
							model: selectedPgSector,
							as: "pgSectorTypes",
							required: false,
							attributes: selectedPgSector.selectedFields,
							include: [
								{
									model: pcSectorTypes,
									as: "pgSectorTypesData",
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
					model: pgFormMembers,
					as: "pgFormMembers",
					where: { TNRTP39_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pgFormMembers.selectedFields,
				},
				{
					model: pgFormAmountRecevied,
					as: "pgFormAmountRecevied",
					where: { TNRTP40_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pgFormAmountRecevied.selectedFields,
				},
				{
					model: pgFormBankDetails,
					as: "pgFormBankDetails",
					where: { TNRTP41_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pgFormBankDetails.selectedFields,
				},
				{
					model: pgFormProposedActivity,
					as: "pgFormProposedActivity",
					where: { TNRTP42_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pgFormProposedActivity.selectedFields,
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
					model: pgFormUploadDocument,
					as: "pgFormUploadDocument",
					where: { TNRTP43_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pgFormUploadDocument.selectedFields,
					include: [
						{
							model: selectedPgDoc,
							as: "minOfPGRefund",
							attributes: selectedPgDoc.selectedFields,
							where: { docType: PG_UPLOAD_DOC.MIN_OF_PG },
							required: false,
						},
						{
							model: selectedPgDoc,
							as: "bankPassBook",
							attributes: selectedPgDoc.selectedFields,
							where: { docType: PG_UPLOAD_DOC.BANK_PASSBOOK },
							required: false,
						},
						{
							model: selectedPgDoc,
							as: "businessPlan",
							attributes: selectedPgDoc.selectedFields,
							where: { docType: PG_UPLOAD_DOC.BUSSINESS_PLAN },
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
		console.log("getPgFormService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
module.exports = new PGApplicationService();
