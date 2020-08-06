const {
	pcFormMaster,
	pcFormBasicDetails,
	pcFormDetails,
	pcFormMembers,
	pcFormAmountRecevied,
	pcFormBankDetails,
	pcFormProposedActivity,
	pcFormUploadDocument,
	selectedPcSector,
	selectedPcCommodity,
	selectedPc,
	pcTypes,
	pcCommodityTypes,
	pcSectorTypes,
	registrationUnder,
	formedSupported,
	activityTimeline,
	districtMaster,
	blockMaster,
	panchayatMaster,
	selectedPcDoc,
	application,
	pcApplicationStatus,
	pcRequiredDoc,
	pcDisbursment,
} = require("../models");
const messages = require("./../configs/errorMsgs.js");
const errorCodes = require("./../configs/errorCodes.js");
const {
	FORM_MASTER_STATUS,
	DELETE_STATUS,
	PC_UPLOAD_DOC,
	ORDERBY,
	PC_STAFF_DOC,
	DISBURSEMENT_STATE,
} = require("../constants/index");
const { Op } = require("sequelize");
class PCApplicationService {}

PCApplicationService.prototype.pcFormCreateSerivce = async (params) => {
	try {
		const { userId } = params;
		const createMaster = {
			userId,
			status: FORM_MASTER_STATUS.DRAFT,
		};
		let formData = await pcFormMaster.create({ ...createMaster });
		return {
			code: errorCodes.HTTP_OK,
			message: messages.formCreated,
			data: { formId: formData.formId },
		};
	} catch (err) {
		console.log("pcFormCreateSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.pcFormBasicDetailsSerivce = async (params) => {
	try {
		const { formId } = params;
		let formData = await pcFormBasicDetails.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await pcFormBasicDetails.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pcFormBasicDetailsSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.pcFormDetailsSerivce = async (params) => {
	try {
		const { formId } = params;
		let formData = await pcFormDetails.findOne({
			where: { formId },
		});
		let selectedPcData = params.typesOfPc;
		let selectedPcSectorData = params.typesOfSector;
		let selectedPcCommodityData = params.typesOfCommodity;
		params.typesOfPC = formId;
		params.typesOfSector = formId;
		params.typesOfCommodity = formId;
		if (formData) {
			await formData.update({ ...params });
			await selectedPc.destroy({ where: { formId } }).then(() => {
				return selectedPc.bulkCreate([...selectedPcData]);
			});
			await selectedPcSector.destroy({ where: { formId } }).then(() => {
				return selectedPcSector.bulkCreate([...selectedPcSectorData]);
			});
			await selectedPcCommodity.destroy({ where: { formId } }).then(() => {
				return selectedPcCommodity.bulkCreate([...selectedPcCommodityData]);
			});
		} else {
			await pcFormDetails.create({ ...params });
			await selectedPc.bulkCreate([...selectedPcData]);
			await selectedPcSector.bulkCreate([...selectedPcSectorData]);
			await selectedPcCommodity.bulkCreate([...selectedPcCommodityData]);
		}
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
PCApplicationService.prototype.pcFormMemberSerivce = async (params) => {
	try {
		const { formId } = params;
		let formData = await pcFormMembers.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await pcFormMembers.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pcFormMemberSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.pcFormAmountSerivce = async (params) => {
	try {
		const { formId } = params;
		let formData = await pcFormAmountRecevied.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await pcFormAmountRecevied.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pcFormAmountSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.pcFormBankDetailsSerivce = async (params) => {
	try {
		const { formId } = params;
		let formData = await pcFormBankDetails.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await pcFormBankDetails.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pcFormBankDetailsSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.pcFormProposedActivitySerivce = async (params) => {
	try {
		if (params && params.length) {
			const { formId } = params[0];
			await pcFormProposedActivity.destroy({ where: { formId } }).then(() => {
				return pcFormProposedActivity.bulkCreate([...params]);
			});
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pcFormProposedActivitySerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.pcFormUploadDocSerivce = async (params) => {
	try {
		const {
			formId,
			regCertificate,
			auditStatement,
			bankPassBook,
			latestMomRes,
			businessPlan,
		} = params;
		let docData = [
			...regCertificate,
			...auditStatement,
			...bankPassBook,
			...latestMomRes,
			...businessPlan,
		];
		params.regCertificate = params.regCertificate.length ? formId : null;
		params.auditStatement = params.auditStatement.length ? formId : null;
		params.bankPassBook = params.bankPassBook.length ? formId : null;
		params.latestMomRes = params.latestMomRes.length ? formId : null;
		params.businessPlan = params.businessPlan.length ? formId : null;
		let formData = await pcFormUploadDocument.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
			await selectedPcDoc.destroy({ where: { formId } }).then(() => {
				return selectedPcDoc.bulkCreate([...docData]);
			});
		} else {
			await pcFormUploadDocument.create({ ...params });
			await selectedPcDoc.bulkCreate([...docData]);
		}
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
PCApplicationService.prototype.getPcFormService = async (params) => {
	try {
		const { formId } = params;
		// let data = await districtMaster.findAll();
		// console.log(data);
		let formData = await pcFormMaster.findOne({
			where: { formId, TNTRP01_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId", "name"],
			include: [
				{
					model: pcFormBasicDetails,
					as: "basicDetails",
					where: { TNTRP07_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormBasicDetails.selectedFields,
				},
				{
					model: pcFormDetails,
					as: "pcDetails",
					where: { TNTRP08_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormDetails.selectedFields,
					include: [
						{
							model: selectedPc,
							as: "pcTypes",
							attributes: selectedPc.selectedFields,
							include: [
								{
									model: pcTypes,
									as: "pcTypesData",
									attributes: pcTypes.selectedFields,
								},
							],
						},
						{
							model: selectedPcCommodity,
							as: "pcCommodityTypes",
							attributes: selectedPcCommodity.selectedFields,
							include: [
								{
									model: pcCommodityTypes,
									as: "pcCommodityTypesData",
									attributes: pcCommodityTypes.selectedFields,
								},
							],
						},
						{
							model: selectedPcSector,
							as: "pcSectorTypes",
							attributes: selectedPcSector.selectedFields,
							include: [
								{
									model: pcSectorTypes,
									as: "pcSectorTypesData",
									attributes: pcSectorTypes.selectedFields,
								},
							],
						},
						{
							model: registrationUnder,
							as: "registrationUnderData",
							attributes: registrationUnder.selectedFields,
						},
						{
							model: formedSupported,
							as: "formSupportedData",
							attributes: formedSupported.selectedFields,
						},
					],
				},
				{
					model: pcFormMembers,
					as: "pcFormMembers",
					where: { TNTRP09_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormMembers.selectedFields,
				},
				{
					model: pcFormAmountRecevied,
					as: "pcFormAmountRecevied",
					where: { TNTRP10_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormAmountRecevied.selectedFields,
				},
				{
					model: pcFormBankDetails,
					as: "pcFormBankDetails",
					where: { TNTRP11_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormBankDetails.selectedFields,
				},
				{
					model: pcFormProposedActivity,
					as: "pcFormProposedActivity",
					where: { TNTRP12_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormProposedActivity.selectedFields,
					include: [
						{
							model: activityTimeline,
							as: "activityTimelineData",
							attributes: activityTimeline.selectedFields,
						},
					],
				},
				{
					model: pcFormUploadDocument,
					as: "pcFormUploadDocument",
					where: { TNTRP13_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormUploadDocument.selectedFields,
					include: [
						{
							model: selectedPcDoc,
							as: "regCertificateList",
							attributes: selectedPcDoc.selectedFields,
							where: { docType: PC_UPLOAD_DOC.REG_CERTIFICATE },
							required: false,
						},
						{
							model: selectedPcDoc,
							as: "auditStatementList",
							attributes: selectedPcDoc.selectedFields,
							where: { docType: PC_UPLOAD_DOC.AUDIT_STATEMENT },
							required: false,
						},
						{
							model: selectedPcDoc,
							as: "bankPassBookList",
							attributes: selectedPcDoc.selectedFields,
							where: { docType: PC_UPLOAD_DOC.BANK_PASSBOOK },
							required: false,
						},
						{
							model: selectedPcDoc,
							as: "latestMomResList",
							attributes: selectedPcDoc.selectedFields,
							where: { docType: PC_UPLOAD_DOC.LATEST_MOM },
							required: false,
						},
						{
							model: selectedPcDoc,
							as: "businessPlanList",
							attributes: selectedPcDoc.selectedFields,
							where: { docType: PC_UPLOAD_DOC.BUSSINESS_PLAN },
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
					where: { districtId: formData.basicDetails.district },
					attributes: districtMaster.selectedFields,
				});
				formData.basicDetails.block = await blockMaster.findOne({
					where: { blockId: formData.basicDetails.block },
					attributes: blockMaster.selectedFields,
				});
				formData.basicDetails.panchayat = await panchayatMaster.findOne({
					where: { panchayatId: formData.basicDetails.panchayat },
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
		console.log("getPcFormService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.getPcMasterService = async (params) => {
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
		console.log("getPcMasterService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.updatePcFormStatus = async (params) => {
	try {
		const { formId, status } = params;
		await pcFormMaster.update(
			{ status, TNTRP01_UPDATED_AT: new Date() },
			{
				where: { formId },
			}
		);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("updatePcFormStatus", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};

PCApplicationService.prototype.getPcApplicationService = async (params) => {
	try {
		const { status, search, sortBy, page, limit, districtId } = params;
		const searchCondition = !!search
			? {
					[Op.or]: [
						{
							$TNRTP01_PC_FORMS_MASTER_D$: {
								[Op.like]: `%${search}%`,
							},
						},
						{
							"$basicDetails.TNRTP07_NAME_N$": {
								[Op.like]: `%${search}%`,
							},
						},
						{
							"$basicDetails.TNRTP07_PC_NAME_N$": {
								[Op.like]: `%${search}%`,
							},
						},
					],
			  }
			: {};
		let { rows, count } = await pcFormMaster.findAndCountAll({
			where: { TNTRP01_DELETED_F: DELETE_STATUS.NOT_DELETED, status, ...searchCondition },
			attributes: [
				"formId",
				"userId",
				"name",
				"status",
				["TNTRP01_CREATED_AT", "appDate"],
				["TNTRP01_UPDATED_AT", "appSubmitDate"],
			],
			include: [
				{
					model: pcFormBasicDetails,
					as: "basicDetails",
					where: { TNTRP07_DELETED_F: DELETE_STATUS.NOT_DELETED, districtId },
					attributes: pcFormBasicDetails.selectedFields,
				},
				{
					model: pcFormDetails,
					as: "pcDetails",
					where: { TNTRP08_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: pcFormDetails.selectedFields,
					include: [
						{
							model: selectedPcCommodity,
							as: "pcCommodityTypes",
							attributes: selectedPcCommodity.selectedFields,
							include: [
								{
									model: pcCommodityTypes,
									as: "pcCommodityTypesData",
									attributes: pcCommodityTypes.selectedFields,
								},
							],
						},
					],
				},
				{
					model: pcFormProposedActivity,
					as: "pcFormProposedActivity",
					where: { TNTRP12_DELETED_F: DELETE_STATUS.NOT_DELETED },

					attributes: pcFormProposedActivity.selectedFields,
				},
			],
			raw: false,
			nested: true,
			subQuery: false,
			limit,
			order: [["TNTRP01_CREATED_AT", sortBy == ORDERBY.ASC ? "ASC" : "DESC"]],
			distinct: "TNRTP01_PC_FORMS_MASTER_D",
			offset: (page - 1) * limit,
		});
		let blockData = await blockMaster.findAll({
			where: {
				blockId: rows.map((x) => x.dataValues.basicDetails.dataValues.block),
			},
			attributes: blockMaster.selectedFields,
			raw: true,
		});
		rows.map((element) => {
			let amount = 0;
			element.dataValues.basicDetails.dataValues.block = blockData.find(
				(x) => x.blockId == element.dataValues.basicDetails.dataValues.block
			);
			element.dataValues.pcFormProposedActivity.forEach((eachData) => {
				amount = amount + eachData.amtReq;
			});
			element.dataValues.totalAmount = amount;
			delete element.dataValues.pcFormProposedActivity;
			return element;
		});
		let meta = {
			pagination: {
				limit,
				page,
				count,
				total_pages: Math.ceil(count / limit),
			},
		};
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: {
				list: rows,
				meta,
			},
		};
	} catch (err) {
		console.log("getPcApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.updateOpenApplicationService = async (params) => {
	try {
		const { formId, smpuApprovalLetter, decMom, signedAssesment, userData } = params;
		let docData = [...smpuApprovalLetter, ...decMom, ...signedAssesment];
		params.smpuApprovalLetter = params.smpuApprovalLetter.length ? formId : null;
		params.decMom = params.decMom.length ? formId : null;
		params.signedAssesment = params.signedAssesment.length ? formId : null;
		delete params.userData;
		params.TNRTP20_CREATED_D = userData.userId;
		params.TNRTP20_UPDATED_D = userData.userId;
		await pcApplicationStatus.create({ ...params });
		await pcRequiredDoc.bulkCreate([...docData]);
		await pcFormMaster.update(
			{ status: params.applicationStatus },
			{
				where: { formId },
			}
		);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("updateOpenApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.getPcApplicationStatusService = async (params) => {
	try {
		const { formId } = params;
		let openApplicationDetails = await pcFormMaster.findOne({
			where: { formId },
			attributes: ["formId", "userId", "name", "status", ["TNTRP01_UPDATED_AT", "appRecievedDate"]],
			include: [
				{
					model: pcApplicationStatus,
					as: "pcApplicationStatus",
					attributes: pcApplicationStatus.selectedFields,
					include: [
						{
							model: pcRequiredDoc,
							as: "smpuApprovalLetterList",
							where: { docType: PC_STAFF_DOC.SMPU_APPROVAL },
							attributes: pcRequiredDoc.selectedFields,
						},
						{
							model: pcRequiredDoc,
							as: "decMomList",
							where: { docType: PC_STAFF_DOC.DECMM },
							attributes: pcRequiredDoc.selectedFields,
						},
						{
							model: pcRequiredDoc,
							as: "signedAssesmentList",
							where: { docType: PC_STAFF_DOC.SIGNED_ASSESMENT },
							attributes: pcRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: pcDisbursment,
					as: "firstTranche",
					where: { disbursmentType: DISBURSEMENT_STATE.FIRST_TRANCHE },
					attributes: [
						"disbursmentType",
						"isDisbursment",
						"disbursmentDate",
						"disbursmentAmount",
						["TNRTP22_UPDATED_D", "disbursedBy"],
					],
				},
				{
					model: pcDisbursment,
					as: "secondTranche",
					where: { disbursmentType: DISBURSEMENT_STATE.SECOND_TRANCHE },
					attributes: [
						"disbursmentType",
						"isDisbursment",
						"disbursmentDate",
						"disbursmentSubmitDate",
						"disbursmentAmount",
						["TNRTP22_UPDATED_D", "disbursedBy"],
					],
					include: [
						{
							model: pcRequiredDoc,
							as: "firstUcCertificateList",
							// where: { docType: PC_STAFF_DOC.FIRST_TRANCHE },
							attributes: pcRequiredDoc.selectedFields,
						},
						{
							model: pcRequiredDoc,
							as: "smpuTrancheApprovalList",
							// where: { docType: PC_STAFF_DOC.SMPU_APPROVAL },
							attributes: pcRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: pcDisbursment,
					as: "secondTrancheUc",
					where: { disbursmentType: DISBURSEMENT_STATE.SECOND_TRANCHE_UC },
					attributes: ["disbursmentSubmitDate"],
					include: [
						{
							model: pcRequiredDoc,
							as: "secondTrancheApprovalList",
							// where: { docType: PC_STAFF_DOC.FIRST_TRANCHE },
							attributes: pcRequiredDoc.selectedFields,
						},
					],
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: openApplicationDetails,
		};
	} catch (err) {
		console.log("getPcApplicationStatusService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.updateFirstTrancheService = async (params) => {
	try {
		let { userData } = params;
		params.TNRTP22_CREATED_D = userData.userId;
		params.TNRTP22_UPDATED_D = userData.userId;
		delete params.userData;
		await pcDisbursment.create({ ...params });
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("updateFirstTrancheService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.updateSecondTrancheService = async (params) => {
	try {
		const { formId, firstUcCertificate, smpuTrancheApproval, userData } = params;
		let docData = [...firstUcCertificate, ...smpuTrancheApproval];
		params.firstUcCertificate = params.firstUcCertificate.length ? formId : null;
		params.smpuTrancheApproval = params.smpuTrancheApproval.length ? formId : null;
		params.TNRTP22_CREATED_D = userData.userId;
		params.TNRTP22_UPDATED_D = userData.userId;
		delete params.userData;
		await pcDisbursment.create({ ...params });
		await pcRequiredDoc.bulkCreate([...docData]);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("updateSecondTrancheService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.updateSecondTrancheUcService = async (params) => {
	try {
		const { formId, secondTrancheApproval, userData } = params;
		let docData = [...secondTrancheApproval];
		params.secondTrancheApproval = params.secondTrancheApproval.length ? formId : null;
		params.TNRTP22_CREATED_D = userData.userId;
		params.TNRTP22_UPDATED_D = userData.userId;
		delete params.userData;
		await pcDisbursment.create({ ...params });
		await pcRequiredDoc.bulkCreate([...docData]);
		await pcFormMaster.update(
			{ status: params.applicationStatus },
			{
				where: { formId },
			}
		);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("updateSecondTrancheUcService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.startAssesmentService = async (params) => {
	try {
		const { formId } = params;
		let formData = await pcFormMaster.findOne({
			where: { formId, TNTRP01_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId", "name"],
			include: [
				{
					model: pcFormMembers,
					as: "pcFormMembers",
					where: { TNTRP09_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: pcFormMembers.selectedFields,
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: formData,
		};
	} catch (err) {
		console.log("startAssesmentService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.submitAssesmentService = async (params) => {
	try {
		const { assessmentData, assessmentDoc } = params;
	} catch (err) {
		console.log("submitAssesmentService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
module.exports = new PCApplicationService();
