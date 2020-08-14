const messages = require("./../configs/errorMsgs.js");
const errorCodes = require("./../configs/errorCodes.js");
const {
	PG_FORM_MASTER_STATUS,
	PG_UPLOAD_DOC,
	DELETE_STATUS,
	PG_STAFF_DOC,
	ORDERBY,
	PG_APPLICATION_STATUS_TYPE,
	PG_DISBURSEMENT_STATE,
	FORM_TYPES,
	DASHBOARD_FORM_STATUS,
} = require("../constants/index");
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
	application,
	pgApplicationStatus,
	pgRequiredDoc,
	pgDisbursment,
	pgAssessment,
	pgAssessmentDoc,
	mainDashboard,
} = require("../models");
class PGApplicationService {}
PGApplicationService.prototype.pgFormCreateSerivce = async (params) => {
	try {
		const { userId } = params;
		const createMaster = {
			userId,
			status: PG_FORM_MASTER_STATUS.DRAFT,
			TNRTP36_CREATED_D: userId,
			TNRTP36_UPDATED_D: userId,
		};
		let pendingForm = await pgFormMaster.findOne({
			where: { status: [PG_FORM_MASTER_STATUS.DRAFT, PG_FORM_MASTER_STATUS.PENDING] },
		});
		// if (pendingForm) {
		// 	return {
		// 		code: errorCodes.HTTP_CONFLICT,
		// 		message: messages.pgFormPending,
		// 	};
		// }
		let formData = await pgFormMaster.create({ ...createMaster });
		await mainDashboard.create({
			formId: formData.formId,
			formTypeId: FORM_TYPES.PG_FORM,
		});
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
		await mainDashboard.update(
			{ ...params },
			{
				where: { formId, formTypeId: FORM_TYPES.PG_FORM },
			}
		);
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
		await mainDashboard.update(
			{ ...params },
			{
				where: { formId, formTypeId: FORM_TYPES.PG_FORM },
			}
		);
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
			attributes: ["formId", "userId", "name", "status", ["TNRTP36_UPDATED_AT", "appSubmitDate"]],
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
				{
					model: pgApplicationStatus,
					as: "pgBmpuApplicationStatus",
					required: false,
					where: { TNRTP48_TYPE_D: PG_APPLICATION_STATUS_TYPE.BMPU_OPEN_APPLICATION },
					attributes: [
						["TNRTP48_UPDATED_AT", "recommendedDate"],
						["TNRTP48_UPDATED_D", "recommendedBy"],
					],
				},
				{
					model: pgApplicationStatus,
					as: "pgDmpuApplicationStatus",
					required: false,
					where: { TNRTP48_TYPE_D: PG_APPLICATION_STATUS_TYPE.DMPU_OPEN_APPLICATION },
					attributes: [
						"decMeetingDate",
						["TNRTP48_UPDATED_AT", "approvedDate"],
						["TNRTP48_UPDATED_D", "approvedBy"],
					],
				},
				{
					model: pgDisbursment,
					as: "amountDisbursment",
					required: false,
					where: { disbursmentType: PG_DISBURSEMENT_STATE.AMOUNT_DISBURSMENT },
					attributes: [
						"disbursmentDate",
						"firstTrancheSubmitDate",
						["TNRTP50_UPDATED_D", "disbursedBy"],
					],
				},
				{
					model: pgDisbursment,
					as: "disbursmentUc",
					required: false,
					where: { disbursmentType: PG_DISBURSEMENT_STATE.SUBMIT_UC_DISBURSMENT },
					attributes: ["disbursmentSubmitDate", ["TNRTP50_UPDATED_D", "disbursedBy"]],
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
PGApplicationService.prototype.updatePgFormStatus = async (params) => {
	try {
		const { formId, status } = params;
		await pgFormMaster.update(
			{ status, TNRTP36_UPDATED_AT: new Date() },
			{
				where: { formId },
			}
		);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("updatePgFormStatus", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.getPgApplicationService = async (params) => {
	try {
		const { status, search, sortBy, page, limit, districtId, blockId } = params;
		const searchCondition = !!search
			? {
					[Op.and]: [
						{
							[Op.or]: [
								{ $TNRTP36_PG_FORMS_MASTER_D$: { [Op.like]: `%${search}%` } },
								{ "$basicDetails.TNRTP37_NAME_N$": { [Op.like]: `%${search}%` } },
								{ "$basicDetails.TNRTP37_PG_NAME_N$": { [Op.like]: `%${search}%` } },
							],
						},
					],
			  }
			: {};
		const totalAmount = application.dialect.QueryGenerator.selectQuery(
			"TNRTP42_PG_FORMS_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP42_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				required: false,
				where: {
					TNRTP42_PG_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP36_PG_FORMS_MASTER.TNRTP36_PG_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		const districtBlockForms = application.dialect.QueryGenerator.selectQuery(
			"TNRTP37_PG_FORMS_BASIC_DETAILS",
			{
				where: {
					[Op.or]: [
						{ TNRTP37_US_DISTRICT_MASTER_D: districtId },
						{ TNRTP37_US_BLOCK_MASTER_D: blockId },
					],
				},
				attributes: ["TNRTP37_PG_FORMS_MASTER_D"],
			}
		).slice(0, -1);
		const totalApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP36_PG_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP36_PG_FORMS_MASTER_D")),
						"totalApplication",
					],
				],
				required: true,
				where: {
					TNRTP36_PG_FORMS_MASTER_D: {
						[Op.in]: application.literal("(" + districtBlockForms + ")"),
					},
					TNRTP36_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP36_IS_APPLICATION_STATUS: { [Op.not]: PG_FORM_MASTER_STATUS.DRAFT },
				},
			}
		).slice(0, -1);
		const recommendedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP36_PG_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP36_PG_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: true,
				where: {
					TNRTP36_PG_FORMS_MASTER_D: {
						[Op.in]: application.literal("(" + districtBlockForms + ")"),
					},
					TNRTP36_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP36_IS_APPLICATION_STATUS: {
						[Op.in]: [
							PG_FORM_MASTER_STATUS.DMPU_OPEN_APPLICATION,
							PG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
							PG_FORM_MASTER_STATUS.SUBMIT_UC,
							PG_FORM_MASTER_STATUS.APPROVED,
						],
					},
				},
			}
		).slice(0, -1);
		const approvedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP36_PG_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP36_PG_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: true,
				where: {
					TNRTP36_PG_FORMS_MASTER_D: {
						[Op.in]: application.literal("(" + districtBlockForms + ")"),
					},
					TNRTP36_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP36_IS_APPLICATION_STATUS: {
						[Op.in]: [
							PG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
							PG_FORM_MASTER_STATUS.SUBMIT_UC,
							PG_FORM_MASTER_STATUS.APPROVED,
						],
					},
				},
			}
		).slice(0, -1);
		const rejectedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP36_PG_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP36_PG_FORMS_MASTER_D")),
						"rejectedApplication",
					],
				],
				required: true,
				where: {
					TNRTP36_PG_FORMS_MASTER_D: {
						[Op.in]: application.literal("(" + districtBlockForms + ")"),
					},
					TNRTP36_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP36_IS_APPLICATION_STATUS: {
						[Op.in]: [PG_FORM_MASTER_STATUS.DECLINED],
					},
				},
			}
		).slice(0, -1);
		let applicationCount = await pgFormMaster.findOne({
			attributes: [
				[application.literal("(" + totalApplication + ")"), "totalApplication"],
				[application.literal("(" + approvedApplication + ")"), "approvedApplication"],
				[application.literal("(" + recommendedApplication + ")"), "recommendedApplication"],
				[application.literal("(" + rejectedApplication + ")"), "rejectedApplication"],
			],
		});
		let { rows, count } = await pgFormMaster.findAndCountAll({
			where: {
				TNRTP36_DELETED_F: DELETE_STATUS.NOT_DELETED,
				status,
				...searchCondition,
			},
			attributes: [
				"formId",
				"userId",
				"status",
				["TNRTP36_UPDATED_AT", "appSubmitDate"],
				[application.literal("(" + totalAmount + ")"), "totalAmount"],
			],
			include: [
				{
					model: pgFormBasicDetails,
					as: "basicDetails",
					required: true,
					where: {
						TNRTP37_DELETED_F: DELETE_STATUS.NOT_DELETED,
						[Op.or]: [{ districtId }, { blockId }],
					},

					attributes: ["name", "pgName", "blockId", "districtId", "panchayatId"],
				},
				{
					model: pgFormDetails,
					as: "pgDetails",
					required: false,
					where: { TNRTP38_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: pgFormDetails.selectedFields,
					include: [
						{
							model: selectedPgCommodity,
							as: "pgCommodityTypes",
							required: true,
							attributes: selectedPgCommodity.selectedFields,
							include: [
								{
									model: pcCommodityTypes,
									as: "pgCommodityTypesData",
									required: true,
									attributes: pcCommodityTypes.selectedFields,
								},
							],
						},
					],
				},
			],
			raw: false,
			nested: true,
			subQuery: false,
			limit,
			order: [["TNRTP36_CREATED_AT", sortBy == ORDERBY.ASC ? "ASC" : "DESC"]],
			distinct: "TNRTP36_PG_FORMS_MASTER_D",
			offset: (page - 1) * limit,
		});
		let blockData = await blockMaster.findAll({
			where: {
				value: rows.map((x) =>
					x.dataValues.basicDetails ? x.dataValues.basicDetails.dataValues.blockId : ""
				),
			},
			attributes: blockMaster.selectedFields,
			raw: true,
		});
		let panchayatData = await panchayatMaster.findAll({
			where: {
				value: rows.map((x) =>
					x.dataValues.basicDetails ? x.dataValues.basicDetails.dataValues.panchayatId : ""
				),
			},
			attributes: panchayatMaster.selectedFields,
			raw: true,
		});
		rows.map((element) => {
			if (element.dataValues.basicDetails) {
				element.dataValues.basicDetails.dataValues.block = blockData.find(
					(x) => x.value == element.dataValues.basicDetails.dataValues.blockId
				);
				element.dataValues.basicDetails.dataValues.panchayat = panchayatData.find(
					(x) => x.value == element.dataValues.basicDetails.dataValues.panchayatId
				);
			}
			delete element.dataValues.basicDetails.dataValues.blockId;
			delete element.dataValues.basicDetails.dataValues.panchayatId;
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
				applicationCount,
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
PGApplicationService.prototype.updateBmpuOpenApplicationService = async (params) => {
	try {
		const { formId, userData } = params;
		if (params.blockLevelForm && params.blockLevelForm.length) {
			params.blockLevelForm.map((element) => {
				element.docType = PG_STAFF_DOC.BLECMM;
			});
		}
		if (params.signedAssesment && params.signedAssesment.length) {
			params.signedAssesment.map((element) => {
				element.docType = PG_STAFF_DOC.SIGNED_ASSESMENT;
			});
		}
		params.TNRTP48_TYPE_D = PG_APPLICATION_STATUS_TYPE.BMPU_OPEN_APPLICATION;
		delete params.userData;
		params.TNRTP48_CREATED_D = userData.userId;
		params.TNRTP48_UPDATED_D = userData.userId;
		await pgApplicationStatus.create(
			{ ...params },
			{
				include: [
					{
						model: pgRequiredDoc,
						as: "signedAssesment",
					},
					{
						model: pgRequiredDoc,
						as: "blockLevelForm",
					},
				],
			}
		);
		await pgFormMaster.update(
			{ status: params.applicationStatus },
			{
				where: { formId },
			}
		);
		let dashBoardFormStatus;
		if (params.applicationStatus == PG_FORM_MASTER_STATUS.DECLINED) {
			dashBoardFormStatus = DASHBOARD_FORM_STATUS.REJECTED;
		}
		if (dashBoardFormStatus) {
			await mainDashboard.update(
				{ applicationStatus: dashBoardFormStatus },
				{
					where: { formId, formTypeId: FORM_TYPES.PG_FORM },
				}
			);
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("getPgApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.getPgApplicationStatusService = async (params) => {
	try {
		const { formId } = params;
		const totalAmount = application.dialect.QueryGenerator.selectQuery(
			"TNRTP42_PG_FORMS_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP42_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				required: false,
				where: {
					TNRTP42_PG_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP36_PG_FORMS_MASTER.TNRTP36_PG_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		let applicationStatus = await pgFormMaster.findOne({
			where: { formId },
			attributes: [
				"formId",
				"userId",
				"name",
				"status",
				["TNRTP36_UPDATED_AT", "appRecievedDate"],
				[application.literal("(" + totalAmount + ")"), "totalAmount"],
			],
			include: [
				{
					model: pgApplicationStatus,
					as: "pgBmpuApplicationStatus",
					required: false,
					where: { TNRTP48_TYPE_D: PG_APPLICATION_STATUS_TYPE.BMPU_OPEN_APPLICATION },
					attributes: [
						"isActivityEsmf",
						"activityCategory",
						"approvedAmount",
						["TNRTP48_UPDATED_AT", "recommendedDate"],
						["TNRTP48_UPDATED_D", "recommendedBy"],
					],
					include: [
						{
							model: pgRequiredDoc,
							as: "blockLevelForm",
							required: false,
							where: { docType: PG_STAFF_DOC.BLECMM },
							attributes: pgRequiredDoc.selectedFields,
						},
						{
							model: pgRequiredDoc,
							as: "signedAssesment",
							required: false,
							where: { docType: PG_STAFF_DOC.SIGNED_ASSESMENT },
							attributes: pgRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: pgApplicationStatus,
					as: "pgDmpuApplicationStatus",
					required: false,
					where: { TNRTP48_TYPE_D: PG_APPLICATION_STATUS_TYPE.DMPU_OPEN_APPLICATION },
					attributes: [
						"decMeetingDate",
						"isSmpuVerified",
						["TNRTP48_UPDATED_AT", "approvedDate"],
						["TNRTP48_UPDATED_D", "approvedBy"],
					],
					include: [
						{
							model: pgRequiredDoc,
							as: "decmm",
							required: false,
							where: { docType: PG_STAFF_DOC.DECMM },
							attributes: pgRequiredDoc.selectedFields,
						},
						{
							model: pgRequiredDoc,
							as: "smpuApprovalLetter",
							required: false,
							where: { docType: PG_STAFF_DOC.SMPU_APPROVAL },
							attributes: pgRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: pgDisbursment,
					as: "amountDisbursment",
					required: false,
					where: { disbursmentType: PG_DISBURSEMENT_STATE.AMOUNT_DISBURSMENT },
					attributes: [
						"isDisbursment",
						"disbursmentDate",
						"disbursmentAmount",
						"firstTrancheSubmitDate",
						["TNRTP50_UPDATED_D", "disbursedBy"],
					],
				},
				{
					model: pgDisbursment,
					as: "disbursmentUc",
					required: false,
					where: { disbursmentType: PG_DISBURSEMENT_STATE.SUBMIT_UC_DISBURSMENT },
					attributes: ["disbursmentSubmitDate", ["TNRTP50_UPDATED_D", "disbursedBy"]],
					include: [
						{
							model: pgRequiredDoc,
							as: "firstUcCertificate",
							required: false,
							where: { docType: PG_STAFF_DOC.FIRST_TRANCHE_UC },
							attributes: pgRequiredDoc.selectedFields,
						},
					],
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: applicationStatus,
		};
	} catch (err) {
		console.log("getPcApplicationStatusService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.updateDmpuOpenApplicationService = async (params) => {
	try {
		const { formId, userData } = params;
		if (params.decmm && params.decmm.length) {
			params.decmm.map((element) => {
				element.docType = PG_STAFF_DOC.DECMM;
			});
		}
		if (params.smpuApprovalLetter && params.smpuApprovalLetter.length) {
			params.smpuApprovalLetter.map((element) => {
				element.docType = PG_STAFF_DOC.SMPU_APPROVAL;
			});
		}
		params.TNRTP48_TYPE_D = PG_APPLICATION_STATUS_TYPE.DMPU_OPEN_APPLICATION;
		delete params.userData;
		params.TNRTP48_CREATED_D = userData.userId;
		params.TNRTP48_UPDATED_D = userData.userId;
		await pgApplicationStatus.create(
			{ ...params },
			{
				include: [
					{
						model: pgRequiredDoc,
						as: "smpuApprovalLetter",
					},
					{
						model: pgRequiredDoc,
						as: "decmm",
					},
				],
			}
		);
		await pgFormMaster.update(
			{ status: params.applicationStatus },
			{
				where: { formId },
			}
		);
		let dashBoardFormStatus;
		switch (params.applicationStatus) {
			case PG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.APPROVED;
			}
			case PG_FORM_MASTER_STATUS.PENDING: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.PENDING;
			}
			case PG_FORM_MASTER_STATUS.DECLINED: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.REJECTED;
			}
		}
		if (dashBoardFormStatus) {
			await mainDashboard.update(
				{ applicationStatus: dashBoardFormStatus },
				{
					where: { formId, formTypeId: FORM_TYPES.PG_FORM },
				}
			);
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("getPgApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.updateAmountDisbursmentService = async (params) => {
	try {
		const { formId, userData } = params;
		params.disbursmentType = PG_DISBURSEMENT_STATE.AMOUNT_DISBURSMENT;
		delete params.userData;
		params.TNRTP50_CREATED_D = userData.userId;
		params.TNRTP50_UPDATED_D = userData.userId;
		await pgDisbursment.create({ ...params });
		await pgFormMaster.update(
			{ status: PG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT },
			{
				where: { formId },
			}
		);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("getPgApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.updateDisbursmentUcService = async (params) => {
	try {
		const { formId, userData } = params;
		if (params.firstUcCertificate && params.firstUcCertificate.length) {
			params.firstUcCertificate.map((element) => {
				element.docType = PG_STAFF_DOC.FIRST_TRANCHE_UC;
			});
		}
		params.disbursmentType = PG_DISBURSEMENT_STATE.SUBMIT_UC_DISBURSMENT;
		delete params.userData;
		params.TNRTP50_CREATED_D = userData.userId;
		params.TNRTP50_UPDATED_D = userData.userId;
		await pgDisbursment.create(
			{ ...params },
			{
				include: [
					{
						model: pgRequiredDoc,
						as: "firstUcCertificate",
					},
				],
			}
		);
		await pgFormMaster.update(
			{ status: PG_FORM_MASTER_STATUS.SUBMIT_UC },
			{
				where: { formId },
			}
		);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("getPgApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.startPgAssesmentService = async (params) => {
	try {
		const { formId } = params;
		let membersData = await pgFormMaster.findOne({
			where: { formId, TNRTP36_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId", "name"],
			include: [
				{
					model: pgFormMembers,
					as: "pgFormMembers",
					where: { TNRTP39_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: pgFormMembers.selectedFields,
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: { membersData },
		};
	} catch (err) {
		console.log("startAssesmentService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PGApplicationService.prototype.submitPgAssesmentService = async (params) => {
	try {
		const { formId } = params;
		params.assessments.map((element) => {
			element.formId = formId;
		});
		await pgAssessment.destroy({ where: { formId } }).then(() => {
			return pgAssessment.bulkCreate([...params.assessments], {
				include: [
					{
						model: pgAssessmentDoc,
						as: "documents",
					},
				],
			});
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
PGApplicationService.prototype.getPgAssesmentService = async (params) => {
	try {
		const { formId } = params;
		let assessmentData = await pgAssessment.findAll({
			where: { formId },
			attributes: pgAssessment.selectedFields,
			include: [
				{
					model: pgAssessmentDoc,
					as: "documents",
					required: false,
					attributes: pgAssessmentDoc.selectedFields,
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
module.exports = new PGApplicationService();
