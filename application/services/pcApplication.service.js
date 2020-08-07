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
	pcAssessmentDoc,
	pcAssessment,
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
(async () => {
	await pcAssessment.destroy({ where: { formId: 1 } });
})();
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
		await pcFormDetails.destroy({ where: { formId } }).then(() => {
			return pcFormDetails.create(
				{ ...params },
				{
					include: [
						{
							model: selectedPc,
							as: "pcTypes",
						},
						{
							model: selectedPcCommodity,
							as: "pcCommodityTypes",
						},
						{
							model: selectedPcSector,
							as: "pcSectorTypes",
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
		const { formId } = params;
		if (params.regCertificate && params.regCertificate.length) {
			params.regCertificate.map((element) => {
				element.docType = PC_UPLOAD_DOC.REG_CERTIFICATE;
			});
		}
		if (params.auditStatement && params.auditStatement.length) {
			params.auditStatement.map((element) => {
				element.docType = PC_UPLOAD_DOC.AUDIT_STATEMENT;
			});
		}
		if (params.bankPassBook && params.bankPassBook.length) {
			params.bankPassBook.map((element) => {
				element.docType = PC_UPLOAD_DOC.BANK_PASSBOOK;
			});
		}
		if (params.latestMomRes && params.latestMomRes.length) {
			params.latestMomRes.map((element) => {
				element.docType = PC_UPLOAD_DOC.LATEST_MOM;
			});
		}
		if (params.businessPlan && params.businessPlan.length) {
			params.businessPlan.map((element) => {
				element.docType = PC_UPLOAD_DOC.BUSSINESS_PLAN;
			});
		}
		await pcFormUploadDocument.destroy({ where: { formId } }).then(() => {
			return pcFormUploadDocument.create(
				{ ...params },
				{
					include: [
						{
							model: selectedPcDoc,
							as: "regCertificate",
						},
						{
							model: selectedPcDoc,
							as: "auditStatement",
						},
						{
							model: selectedPcDoc,
							as: "bankPassBook",
						},
						{
							model: selectedPcDoc,
							as: "latestMomRes",
						},
						{
							model: selectedPcDoc,
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
PCApplicationService.prototype.getPcFormService = async (params) => {
	try {
		const { formId } = params;
		// let data = await districtMaster.findAll();
		// console.log(data);
		let formData = await pcFormMaster.findOne({
			where: { formId, TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId", "name"],
			include: [
				{
					model: pcFormBasicDetails,
					as: "basicDetails",
					where: { TNRTP07_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormBasicDetails.selectedFields,
				},
				{
					model: pcFormDetails,
					as: "pcDetails",
					where: { TNRTP08_DELETED_F: DELETE_STATUS.NOT_DELETED },
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
					where: { TNRTP09_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormMembers.selectedFields,
				},
				{
					model: pcFormAmountRecevied,
					as: "pcFormAmountRecevied",
					where: { TNRTP10_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormAmountRecevied.selectedFields,
				},
				{
					model: pcFormBankDetails,
					as: "pcFormBankDetails",
					where: { TNRTP11_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormBankDetails.selectedFields,
				},
				{
					model: pcFormProposedActivity,
					as: "pcFormProposedActivity",
					where: { TNRTP12_DELETED_F: DELETE_STATUS.NOT_DELETED },
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
					where: { TNRTP13_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: pcFormUploadDocument.selectedFields,
					include: [
						{
							model: selectedPcDoc,
							as: "regCertificate",
							attributes: selectedPcDoc.selectedFields,
							where: { docType: PC_UPLOAD_DOC.REG_CERTIFICATE },
							required: false,
						},
						{
							model: selectedPcDoc,
							as: "auditStatement",
							attributes: selectedPcDoc.selectedFields,
							where: { docType: PC_UPLOAD_DOC.AUDIT_STATEMENT },
							required: false,
						},
						{
							model: selectedPcDoc,
							as: "bankPassBook",
							attributes: selectedPcDoc.selectedFields,
							where: { docType: PC_UPLOAD_DOC.BANK_PASSBOOK },
							required: false,
						},
						{
							model: selectedPcDoc,
							as: "latestMomRes",
							attributes: selectedPcDoc.selectedFields,
							where: { docType: PC_UPLOAD_DOC.LATEST_MOM },
							required: false,
						},
						{
							model: selectedPcDoc,
							as: "businessPlan",
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
			{ status, TNRTP01_UPDATED_AT: new Date() },
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
			where: { TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED, status, ...searchCondition },
			attributes: [
				"formId",
				"userId",
				"name",
				"status",
				["TNRTP01_CREATED_AT", "appDate"],
				["TNRTP01_UPDATED_AT", "appSubmitDate"],
			],
			include: [
				{
					model: pcFormBasicDetails,
					as: "basicDetails",
					where: { TNRTP07_DELETED_F: DELETE_STATUS.NOT_DELETED, districtId },
					attributes: pcFormBasicDetails.selectedFields,
				},
				{
					model: pcFormDetails,
					as: "pcDetails",
					where: { TNRTP08_DELETED_F: DELETE_STATUS.NOT_DELETED },
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
					where: { TNRTP12_DELETED_F: DELETE_STATUS.NOT_DELETED },

					attributes: pcFormProposedActivity.selectedFields,
				},
			],
			raw: false,
			nested: true,
			subQuery: false,
			limit,
			order: [["TNRTP01_CREATED_AT", sortBy == ORDERBY.ASC ? "ASC" : "DESC"]],
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
		const { formId, userData } = params;
		if (params.smpuApprovalLetter && params.smpuApprovalLetter.length) {
			params.smpuApprovalLetter.map((element) => {
				element.docType = PC_STAFF_DOC.SMPU_APPROVAL;
			});
		}
		if (params.decMom && params.decMom.length) {
			params.decMom.map((element) => {
				element.docType = PC_STAFF_DOC.DECMM;
			});
		}
		if (params.signedAssesment && params.signedAssesment.length) {
			params.signedAssesment.map((element) => {
				element.docType = PC_STAFF_DOC.SIGNED_ASSESMENT;
			});
		}
		delete params.userData;
		params.TNRTP20_CREATED_D = userData.userId;
		params.TNRTP20_UPDATED_D = userData.userId;
		await pcApplicationStatus.create(
			{ ...params },
			{
				include: [
					{
						model: pcRequiredDoc,
						as: "smpuApprovalLetter",
					},
					{
						model: pcRequiredDoc,
						as: "decMom",
					},
					{
						model: pcRequiredDoc,
						as: "signedAssesment",
					},
				],
			}
		);
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
			attributes: ["formId", "userId", "name", "status", ["TNRTP01_UPDATED_AT", "appRecievedDate"]],
			include: [
				{
					model: pcApplicationStatus,
					as: "pcApplicationStatus",
					attributes: pcApplicationStatus.selectedFields,
					include: [
						{
							model: pcRequiredDoc,
							as: "smpuApprovalLetter",
							required: false,
							where: { docType: PC_STAFF_DOC.SMPU_APPROVAL },
							attributes: pcRequiredDoc.selectedFields,
						},
						{
							model: pcRequiredDoc,
							as: "decMom",
							required: false,
							where: { docType: PC_STAFF_DOC.DECMM },
							attributes: pcRequiredDoc.selectedFields,
						},
						{
							model: pcRequiredDoc,
							as: "signedAssesment",
							required: false,
							where: { docType: PC_STAFF_DOC.SIGNED_ASSESMENT },
							attributes: pcRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: pcDisbursment,
					as: "firstTranche",
					required: false,
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
					required: false,
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
							as: "firstUcCertificate",
							required: false,
							where: { docType: PC_STAFF_DOC.FIRST_TRANCHE },
							attributes: pcRequiredDoc.selectedFields,
						},
						{
							model: pcRequiredDoc,
							as: "smpuTrancheApproval",
							required: false,
							where: { docType: PC_STAFF_DOC.SMPU_TRANCHE_APPROVAL },
							attributes: pcRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: pcDisbursment,
					as: "secondTrancheUc",
					required: false,
					where: { disbursmentType: DISBURSEMENT_STATE.SECOND_TRANCHE_UC },
					attributes: ["disbursmentSubmitDate"],
					include: [
						{
							model: pcRequiredDoc,
							as: "secondTrancheApproval",
							required: false,
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
		const { userData } = params;
		if (params.firstUcCertificate && params.firstUcCertificate.length) {
			params.firstUcCertificate.map((element) => {
				element.docType = PC_STAFF_DOC.FIRST_TRANCHE;
			});
		}
		if (params.smpuTrancheApproval && params.smpuTrancheApproval.length) {
			params.smpuTrancheApproval.map((element) => {
				element.docType = PC_STAFF_DOC.SMPU_TRANCHE_APPROVAL;
			});
		}
		delete params.userData;
		params.TNRTP22_CREATED_D = userData.userId;
		params.TNRTP22_UPDATED_D = userData.userId;
		await pcDisbursment.create(
			{ ...params },
			{
				include: [
					{
						model: pcRequiredDoc,
						as: "firstUcCertificate",
					},
					{
						model: pcRequiredDoc,
						as: "smpuTrancheApproval",
					},
				],
			}
		);
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
		const { formId, userData } = params;
		if (params.secondTrancheApproval && params.secondTrancheApproval.length) {
			params.secondTrancheApproval.map((element) => {
				element.docType = PC_STAFF_DOC.SECOND_TRANCHE;
			});
		}
		delete params.userData;
		params.TNRTP22_CREATED_D = userData.userId;
		params.TNRTP22_UPDATED_D = userData.userId;
		await pcDisbursment.create(
			{ ...params },
			{
				include: [
					{
						model: pcRequiredDoc,
						as: "secondTrancheApproval",
					},
				],
			}
		);
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
			where: { formId, TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId", "name"],
			include: [
				{
					model: pcFormMembers,
					as: "pcFormMembers",
					where: { TNRTP09_DELETED_F: DELETE_STATUS.NOT_DELETED },
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
		const { formId } = params;
		params.assessments.map((element) => {
			element.formId = formId;
		});
		await pcAssessment.bulkCreate([...params.assessments], {
			include: [
				{
					model: pcAssessmentDoc,
					as: "documents",
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("submitAssesmentService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.getAssesmentService = async (params) => {
	try {
		const { formId } = params;
		let assessmentData = await pcAssessment.findAll({
			where: { formId },
			attributes: pcAssessment.selectedFields,
			include: [
				{
					model: pcAssessmentDoc,
					as: "documents",
					attributes: pcAssessmentDoc.selectedFields,
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: assessmentData,
		};
	} catch (err) {
		console.log("getAssesmentService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
module.exports = new PCApplicationService();
