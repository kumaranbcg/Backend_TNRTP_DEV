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
	DASHBOARD_FORM_STATUS,
	FORM_TYPES,
	STAFF_ROLE,
} = require("../constants/index");

const { Op } = require("sequelize");

const {
	egFormMaster, // 1
	egFormBasicDetails, // 2
	egFormDetails, // 3
	selectedEg, // 9
	selectedEgCommodity, // 10
	selectedEgSector, // 11
	egFormMembers, // 4
	egFormAmountRecevied, // 5
	egFormBankDetails, // 6
	egFormProposedActivity, // 7
	egFormUploadDocument, // 8
	selectedEgDoc, // 12
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
	egDisbursement,
	egAssessment,
	egAssessmentDoc,
	mainDashboard,
	promotingOrg,
} = require("../models");

class EGApplicationService {}

EGApplicationService.prototype.egFormCreateSerivce = async (params) => {
	try {
		const { userId } = params;

		const createMaster = {
			userId,
			status: EG_FORM_MASTER_STATUS.DRAFT,
			TNRTP53_CREATED_D: userId,
			TNRTP53_UPDATED_D: userId,
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
		await mainDashboard.create({
			formId: formData.formId,
			userId,
			formTypeId: FORM_TYPES.EG_FORM,
		});
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
		const { formId, appSubmitDate } = params;
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
		await egFormMaster.update(
			{ TNRTP53_UPDATED_AT: appSubmitDate ? appSubmitDate : new Date() },
			{
				where: { formId },
			}
		);
		await mainDashboard.update(
			{ ...params },
			{
				where: { formId, formTypeId: FORM_TYPES.EG_FORM },
			}
		);
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
		let dashBoardData = await mainDashboard.findOne({
			where: { formId, formTypeId: FORM_TYPES.PG_FORM },
			raw: true,
		});
		if (dashBoardData) {
			await mainDashboard.destroy({ where: { formId, formTypeId: FORM_TYPES.EG_FORM } });
			dashBoardData.dashboardActivity = params.egTypes;
			dashBoardData.dashboardSector = params.egSectorTypes;
			dashBoardData.dashboardCommodity = params.egCommodityTypes;
			await mainDashboard.create(
				{ ...dashBoardData },
				{
					include: [
						{
							model: dashboardActivity,
							as: "dashboardActivity",
						},
						{
							model: dashboardSector,
							as: "dashboardSector",
						},
						{
							model: dashboardCommodity,
							as: "dashboardCommodity",
						},
					],
				}
			);
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
		await mainDashboard.update(
			{ ...params },
			{
				where: { formId, formTypeId: FORM_TYPES.EG_FORM },
			}
		);
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
		const { formId, status, appSubmitDate } = params;
		await egFormMaster.update(
			{ status, TNRTP53_UPDATED_AT: appSubmitDate ? appSubmitDate : new Date() },
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
						{
							model: promotingOrg,
							as: "promotingOrg",
							required: false,
							attributes: promotingOrg.selectedFields,
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
				{
					model: egApplicationStatus,
					as: "egBmpuApplicationStatus",
					required: false,
					where: { TNRTP108_TYPE_D: EG_APPLICATION_STATUS_TYPE.BMPU_OPEN_APPLICATION },
					attributes: [
						"activityCategory",
						"approvedAmount",
						["TNRTP108_UPDATED_AT", "recommendedDate"],
						["TNRTP108_UPDATED_D", "recommendedBy"],
					],
				},
				{
					model: egApplicationStatus,
					as: "egDmpuApplicationStatus",
					required: false,
					where: { TNRTP108_TYPE_D: EG_APPLICATION_STATUS_TYPE.DMPU_OPEN_APPLICATION },
					attributes: [
						"decMeetingDate",
						["TNRTP108_UPDATED_AT", "approvedDate"],
						["TNRTP108_UPDATED_D", "approvedBy"],
					],
				},
				{
					model: egDisbursement,
					as: "amountDisbursment",
					required: false,
					where: { disbursmentType: EG_DISBURSEMENT_STATE.AMOUNT_DISBURSMENT },
					attributes: [
						"disbursmentDate",
						"disbursmentAmount",
						"firstTrancheSubmitDate",
						["TNRTP110_UPDATED_D", "disbursedBy"],
					],
				},
				{
					model: egDisbursement,
					as: "disbursmentUc",
					required: false,
					where: { disbursmentType: EG_DISBURSEMENT_STATE.SUBMIT_UC_DISBURSMENT },
					attributes: ["disbursmentSubmitDate", ["TNRTP110_UPDATED_D", "disbursedBy"]],
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

EGApplicationService.prototype.getEgApplicationService = async (params) => {
	try {
		const { status, search, sortBy, page, limit, districtId, blockId, panchayatId, user } = params;
		let locationFilter = {};
		if (user.role != STAFF_ROLE.SPMU) {
			locationFilter = {
				[Op.or]: [
					{ TNRTP54_US_DISTRICT_MASTER_D: districtId || [] },
					{ TNRTP54_US_BLOCK_MASTER_D: blockId || [] },
					{ TNRTP54_US_PANCHAYAT_MASTER_D: panchayatId || [] },
				],
			};
		}
		const searchCondition = !!search
			? {
					[Op.and]: [
						{
							[Op.or]: [
								{ $TNRTP53_EG_FORMS_MASTER_D$: { [Op.like]: `%${search}%` } },
								{ "$basicDetails.TNRTP54_NAME_N$": { [Op.like]: `%${search}%` } },
								{ "$basicDetails.TNRTP54_EG_NAME_N$": { [Op.like]: `%${search}%` } },
							],
						},
					],
			  }
			: {};
		const totalAmount = application.dialect.QueryGenerator.selectQuery(
			"TNRTP59_EG_FORMS_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP59_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				required: false,
				where: {
					TNRTP59_EG_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP53_EG_FORMS_MASTER.TNRTP53_EG_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		const districtBlockForms = application.dialect.QueryGenerator.selectQuery(
			"TNRTP54_EG_FORMS_BASIC_DETAILS",
			{
				where: { ...locationFilter },
				attributes: ["TNRTP53_EG_FORMS_MASTER_D"],
			}
		).slice(0, -1);

		const totalApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP53_EG_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP53_EG_FORMS_MASTER_D")),
						"totalApplication",
					],
				],
				required: true,
				where: {
					TNRTP53_EG_FORMS_MASTER_D: {
						[Op.in]: application.literal("(" + districtBlockForms + ")"),
					},
					TNRTP53_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP53_IS_APPLICATION_STATUS: { [Op.not]: EG_FORM_MASTER_STATUS.DRAFT },
				},
			}
		).slice(0, -1);
		const recommendedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP53_EG_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP53_EG_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: true,
				where: {
					TNRTP53_EG_FORMS_MASTER_D: {
						[Op.in]: application.literal("(" + districtBlockForms + ")"),
					},
					TNRTP53_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP53_IS_APPLICATION_STATUS: {
						[Op.in]: [
							EG_FORM_MASTER_STATUS.DMPU_OPEN_APPLICATION,
							EG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
							EG_FORM_MASTER_STATUS.SUBMIT_UC,
							EG_FORM_MASTER_STATUS.APPROVED,
						],
					},
				},
			}
		).slice(0, -1);
		const approvedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP53_EG_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP53_EG_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: true,
				where: {
					TNRTP53_EG_FORMS_MASTER_D: {
						[Op.in]: application.literal("(" + districtBlockForms + ")"),
					},
					TNRTP53_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP53_IS_APPLICATION_STATUS: {
						[Op.in]: [
							EG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
							EG_FORM_MASTER_STATUS.SUBMIT_UC,
							EG_FORM_MASTER_STATUS.APPROVED,
						],
					},
				},
			}
		).slice(0, -1);
		const rejectedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP53_EG_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP53_EG_FORMS_MASTER_D")),
						"rejectedApplication",
					],
				],
				required: true,
				where: {
					TNRTP53_EG_FORMS_MASTER_D: {
						[Op.in]: application.literal("(" + districtBlockForms + ")"),
					},
					TNRTP53_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP53_IS_APPLICATION_STATUS: {
						[Op.in]: [EG_FORM_MASTER_STATUS.DECLINED],
					},
				},
			}
		).slice(0, -1);
		let applicationCount = await egFormMaster.findOne({
			attributes: [
				[application.literal("(" + totalApplication + ")"), "totalApplication"],
				[application.literal("(" + approvedApplication + ")"), "approvedApplication"],
				[application.literal("(" + recommendedApplication + ")"), "recommendedApplication"],
				[application.literal("(" + rejectedApplication + ")"), "rejectedApplication"],
			],
		});
		let { rows, count } = await egFormMaster.findAndCountAll({
			where: {
				TNRTP53_DELETED_F: DELETE_STATUS.NOT_DELETED,
				status,
				...searchCondition,
			},
			attributes: [
				"formId",
				"userId",
				"status",
				["TNRTP53_UPDATED_AT", "appSubmitDate"],
				[application.literal("(" + totalAmount + ")"), "totalAmount"],
			],
			include: [
				{
					model: egFormBasicDetails,
					as: "basicDetails",
					required: true,
					where: {
						TNRTP54_DELETED_F: DELETE_STATUS.NOT_DELETED,
						...locationFilter,
					},

					attributes: ["name", "egName", "blockId", "districtId", "panchayatId"],
				},
				{
					model: egFormDetails,
					as: "egDetails",
					required: false,
					where: { TNRTP55_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: egFormDetails.selectedFields,
					include: [
						{
							model: selectedEgCommodity,
							as: "egCommodityTypes",
							required: true,
							attributes: selectedEgCommodity.selectedFields,
							include: [
								{
									model: pcCommodityTypes,
									as: "egCommodityTypesData",
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
			order: [["TNRTP53_CREATED_AT", sortBy == ORDERBY.ASC ? "ASC" : "DESC"]],
			distinct: "TNRTP53_EG_FORMS_MASTER_D",
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
		console.log("getEgApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.updateBmpuOpenApplicationService = async (params) => {
	try {
		const { formId, userData } = params;
		console.log("801", params);
		if (params.blockLevelForm && params.blockLevelForm.length) {
			params.blockLevelForm.map((element) => {
				element.docType = EG_STAFF_DOC.BLECMM;
			});
		}
		if (params.signedAssesment && params.signedAssesment.length) {
			params.signedAssesment.map((element) => {
				element.docType = EG_STAFF_DOC.SIGNED_ASSESMENT;
			});
		}
		params.TNRTP108_TYPE_D = EG_APPLICATION_STATUS_TYPE.BMPU_OPEN_APPLICATION;
		delete params.userData;
		params.TNRTP108_CREATED_D = userData.userId;
		params.TNRTP108_UPDATED_D = userData.userId;
		console.log("815", params);
		let egst = await egApplicationStatus.create(
			{ ...params },
			{
				include: [
					{
						model: egRequiredDoc,
						as: "signedAssesment",
					},
					{
						model: egRequiredDoc,
						as: "blockLevelForm",
					},
				],
			}
		);
		console.log("830", egst);
		await egFormMaster.update(
			{ status: params.applicationStatus },
			{
				where: { formId },
			}
		);
		let dashBoardFormStatus;
		if (params.applicationStatus == EG_FORM_MASTER_STATUS.DECLINED) {
			dashBoardFormStatus = DASHBOARD_FORM_STATUS.REJECTED;
		}
		if (dashBoardFormStatus) {
			await mainDashboard.update(
				{ applicationStatus: dashBoardFormStatus },
				{
					where: { formId, formTypeId: FORM_TYPES.EG_FORM },
				}
			);
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("getEgApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.getEgApplicationStatusService = async (params) => {
	try {
		const { formId } = params;
		const totalAmount = application.dialect.QueryGenerator.selectQuery(
			"TNRTP59_EG_FORMS_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP59_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				required: false,
				where: {
					TNRTP59_EG_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP53_EG_FORMS_MASTER.TNRTP53_EG_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		let applicationStatus = await egFormMaster.findOne({
			where: { formId },
			attributes: [
				"formId",
				"userId",
				"name",
				"status",
				["TNRTP53_UPDATED_AT", "appRecievedDate"],
				[application.literal("(" + totalAmount + ")"), "totalAmount"],
			],
			include: [
				{
					model: egApplicationStatus,
					as: "egBmpuApplicationStatus",
					required: false,
					where: { TNRTP108_TYPE_D: EG_APPLICATION_STATUS_TYPE.BMPU_OPEN_APPLICATION },
					attributes: [
						"isActivityEsmf",
						"activityCategory",
						"approvedAmount",
						["TNRTP108_UPDATED_AT", "recommendedDate"],
						["TNRTP108_UPDATED_D", "recommendedBy"],
					],
					include: [
						{
							model: egRequiredDoc,
							as: "blockLevelForm",
							required: false,
							where: { docType: EG_STAFF_DOC.BLECMM },
							attributes: egRequiredDoc.selectedFields,
						},
						{
							model: egRequiredDoc,
							as: "signedAssesment",
							required: false,
							where: { docType: EG_STAFF_DOC.SIGNED_ASSESMENT },
							attributes: egRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: egApplicationStatus,
					as: "egDmpuApplicationStatus",
					required: false,
					where: { TNRTP108_TYPE_D: EG_APPLICATION_STATUS_TYPE.DMPU_OPEN_APPLICATION },
					attributes: [
						"decMeetingDate",
						"isSmpuVerified",
						["TNRTP108_UPDATED_AT", "approvedDate"],
						["TNRTP108_UPDATED_D", "approvedBy"],
					],
					include: [
						{
							model: egRequiredDoc,
							as: "decmm",
							required: false,
							where: { docType: EG_STAFF_DOC.DECMM },
							attributes: egRequiredDoc.selectedFields,
						},
						{
							model: egRequiredDoc,
							as: "smpuApprovalLetter",
							required: false,
							where: { docType: EG_STAFF_DOC.SMPU_APPROVAL },
							attributes: egRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: egDisbursement,
					as: "amountDisbursment",
					required: false,
					where: { disbursmentType: EG_DISBURSEMENT_STATE.AMOUNT_DISBURSMENT },
					attributes: [
						"isDisbursment",
						"disbursmentDate",
						"disbursmentAmount",
						"firstTrancheSubmitDate",
						["TNRTP110_UPDATED_D", "disbursedBy"],
					],
				},
				{
					model: egDisbursement,
					as: "disbursmentUc",
					required: false,
					where: { disbursmentType: EG_DISBURSEMENT_STATE.SUBMIT_UC_DISBURSMENT },
					attributes: ["disbursmentSubmitDate", ["TNRTP110_UPDATED_D", "disbursedBy"]],
					include: [
						{
							model: egRequiredDoc,
							as: "firstUcCertificate",
							required: false,
							where: { docType: EG_STAFF_DOC.FIRST_TRANCHE_UC },
							attributes: egRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: egAssessment,
					as: "egAssessment",
					required: false,
					attributes: egAssessment.selectedFields,
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: applicationStatus,
		};
	} catch (err) {
		console.log("getEgApplicationStatusService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.updateDmpuOpenApplicationService = async (params) => {
	try {
		const { formId, userData } = params;
		console.log(userData);
		if (params.decmm && params.decmm.length) {
			params.decmm.map((element) => {
				element.docType = EG_STAFF_DOC.DECMM;
			});
		}
		if (params.smpuApprovalLetter && params.smpuApprovalLetter.length) {
			params.smpuApprovalLetter.map((element) => {
				element.docType = EG_STAFF_DOC.SMPU_APPROVAL;
			});
		}
		params.TNRTP108_TYPE_D = EG_APPLICATION_STATUS_TYPE.DMPU_OPEN_APPLICATION;
		delete params.userData;
		params.TNRTP108_CREATED_D = userData.userId;
		params.TNRTP108_UPDATED_D = userData.userId;
		let dmpustat = await egApplicationStatus.create(
			{ ...params },
			{
				include: [
					{
						model: egRequiredDoc,
						as: "smpuApprovalLetter",
					},
					{
						model: egRequiredDoc,
						as: "decmm",
					},
				],
			}
		);
		console.log(dmpustat);
		await egFormMaster.update(
			{ status: params.applicationStatus },
			{
				where: { formId },
			}
		);
		let dashBoardFormStatus;
		switch (parseInt(params.applicationStatus)) {
			case EG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.APPROVED;
				break;
			}
			case EG_FORM_MASTER_STATUS.PENDING: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.PENDING;
				break;
			}
			case EG_FORM_MASTER_STATUS.DECLINED: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.REJECTED;
				break;
			}
		}
		if (dashBoardFormStatus) {
			await mainDashboard.update(
				{ applicationStatus: dashBoardFormStatus },
				{
					where: { formId, formTypeId: FORM_TYPES.EG_FORM },
				}
			);
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("getEgApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.updateAmountDisbursmentService = async (params) => {
	try {
		const { formId, userData } = params;
		console.log(params);
		params.disbursmentType = EG_DISBURSEMENT_STATE.AMOUNT_DISBURSMENT;
		delete params.userData;
		params.TNRTP107_CREATED_D = userData.userId;
		params.TNRTP107_UPDATED_D = userData.userId;
		await egDisbursement.create({ ...params });
		let egdis = await egFormMaster.update(
			{ status: EG_FORM_MASTER_STATUS.SUBMIT_UC },
			{
				where: { formId },
			}
		);
		console.log("1090", egdis);
		let dashBoardData = await mainDashboard.findOne({
			where: { formId, formTypeId: FORM_TYPES.EG_FORM },
		});
		dashBoardData.totalDisburement = dashBoardData.totalDisburement + params.disbursmentAmount;
		dashBoardData.save();
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("getEgApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.updateDisbursmentUcService = async (params) => {
	try {
		const { formId, userData } = params;
		if (params.firstUcCertificate && params.firstUcCertificate.length) {
			params.firstUcCertificate.map((element) => {
				element.docType = EG_STAFF_DOC.FIRST_TRANCHE_UC;
			});
		}
		params.disbursmentType = EG_DISBURSEMENT_STATE.SUBMIT_UC_DISBURSMENT;
		delete params.userData;
		params.TNRTP107_CREATED_D = userData.userId;
		params.TNRTP107_UPDATED_D = userData.userId;
		await egDisbursement.create(
			{ ...params },
			{
				include: [
					{
						model: egRequiredDoc,
						as: "firstUcCertificate",
					},
				],
			}
		);
		await egFormMaster.update(
			{ status: EG_FORM_MASTER_STATUS.APPROVED },
			{
				where: { formId },
			}
		);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("getEgApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
EGApplicationService.prototype.startEgAssesmentService = async (params) => {
	try {
		const { formId } = params;
		let membersData = await egFormMaster.findOne({
			where: { formId, TNRTP53_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId", "name"],
			include: [
				{
					model: egFormMembers,
					as: "egFormMembers",
					where: { TNRTP56_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: egFormMembers.selectedFields,
				},
			],
		});
		if (membersData) {
			membersData.dataValues["members"] = membersData.dataValues["egFormMembers"];
			delete membersData.dataValues["egFormMembers"];
		}
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
EGApplicationService.prototype.submitEgAssesmentService = async (params) => {
	try {
		console.log("working");
		const { formId } = params;
		params.assessments.map((element) => {
			element.formId = formId;
		});
		await egAssessment.destroy({ where: { formId } }).then(() => {
			return egAssessment.bulkCreate([...params.assessments], {
				include: [
					{
						model: egAssessmentDoc,
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
EGApplicationService.prototype.getEgAssesmentService = async (params) => {
	try {
		const { formId } = params;
		let assessmentData = await egAssessment.findAll({
			where: { formId },
			attributes: egAssessment.selectedFields,
			include: [
				{
					model: egAssessmentDoc,
					as: "documents",
					required: false,
					attributes: egAssessmentDoc.selectedFields,
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

module.exports = new EGApplicationService();
