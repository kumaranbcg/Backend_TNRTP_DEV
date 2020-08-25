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
	pcAreaMember,
	pcAreaMemberBlock,
	pcCoverageArea,
	pcCoverageBlock,
	pcCoveragePanchayat,
	mainDashboard,
	promotingOrg,
	dashboardActivity,
	dashboardSector,
	dashboardCommodity,
} = require("../models");
const messages = require("./../configs/errorMsgs.js");
const errorCodes = require("./../configs/errorCodes.js");
const {
	PC_FORM_MASTER_STATUS,
	DELETE_STATUS,
	PC_UPLOAD_DOC,
	ORDERBY,
	PC_STAFF_DOC,
	STAFF_ROLE,
	PC_DISBURSEMENT_STATE,
	FORM_TYPES,
	DASHBOARD_FORM_STATUS,
} = require("../constants/index");
const { Op } = require("sequelize");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.AES_KEY);
class PCApplicationService {}
PCApplicationService.prototype.insertActvityMasterService = async (params) => {
	await pcTypes.destroy({ where: {}, truncate: true });
	await pcSectorTypes.destroy({ where: {}, truncate: true });
	await pcCommodityTypes.destroy({ where: {}, truncate: true });
	await pcTypes.bulkCreate([...params], {
		include: [
			{
				model: pcSectorTypes,
				as: "sectorTypes",
				include: [
					{
						model: pcCommodityTypes,
						as: "commodityTypes",
					},
				],
			},
		],
	});
	return {
		code: errorCodes.HTTP_OK,
		message: messages.success,
	};
};
PCApplicationService.prototype.pcFormCreateSerivce = async (params) => {
	try {
		const { userId } = params;
		const createMaster = {
			userId,
			status: PC_FORM_MASTER_STATUS.DRAFT,
		};
		let pendingForm = await pcFormMaster.findOne({
			where: { status: [PC_FORM_MASTER_STATUS.DRAFT, PC_FORM_MASTER_STATUS.PENDING] },
		});
		// if (pendingForm) {
		// 	return {
		// 		code: errorCodes.HTTP_CONFLICT,
		// 		message: messages.pcFormPending,
		// 	};
		// }
		let formData = await pcFormMaster.create({ ...createMaster });
		await mainDashboard.create({
			formId: formData.formId,
			userId,
			formTypeId: FORM_TYPES.PC_FORM,
		});
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
		await mainDashboard.update(
			{ ...params },
			{
				where: { formId, formTypeId: FORM_TYPES.PC_FORM },
			}
		);
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
		let dashBoardData = await mainDashboard.findOne({
			where: { formId, formTypeId: FORM_TYPES.PC_FORM },
			raw: true,
		});
		if (dashBoardData) {
			await mainDashboard.destroy({ where: { formId, formTypeId: FORM_TYPES.PC_FORM } });
			dashBoardData.dashboardActivity = params.pcTypes;
			dashBoardData.dashboardSector = params.pcSectorTypes;
			dashBoardData.dashboardCommodity = params.pcCommodityTypes;
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
		await mainDashboard.update(
			{ ...params },
			{
				where: { formId, formTypeId: FORM_TYPES.PC_FORM },
			}
		);
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
		let formData = await pcFormMaster.findOne({
			where: { formId, TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId", "name", "status", ["TNRTP01_UPDATED_AT", "appSubmitDate"]],
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
							required: false,
							attributes: selectedPc.selectedFields,
							include: [
								{
									model: pcTypes,
									as: "pcTypesData",
									required: false,
									attributes: pcTypes.selectedFields,
								},
							],
						},
						{
							model: selectedPcCommodity,
							as: "pcCommodityTypes",
							required: false,
							attributes: selectedPcCommodity.selectedFields,
							include: [
								{
									model: pcCommodityTypes,
									as: "pcCommodityTypesData",
									required: false,
									attributes: pcCommodityTypes.selectedFields,
								},
							],
						},
						{
							model: selectedPcSector,
							as: "pcSectorTypes",
							required: false,
							attributes: selectedPcSector.selectedFields,
							include: [
								{
									model: pcSectorTypes,
									as: "pcSectorTypesData",
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
							required: false,
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
				{
					model: pcApplicationStatus,
					as: "pcApplicationStatus",
					required: false,
					attributes: ["dmpuVerifyDate", "applicationStatus", ["TNRTP20_UPDATED_D", "approvedBy"]],
				},
				{
					model: pcDisbursment,
					as: "firstTranche",
					required: false,
					where: { disbursmentType: PC_DISBURSEMENT_STATE.FIRST_TRANCHE },
					attributes: [
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
					where: { disbursmentType: PC_DISBURSEMENT_STATE.SECOND_TRANCHE },
					attributes: [
						"isDisbursment",
						"disbursmentDate",
						"disbursmentAmount",
						["TNRTP22_UPDATED_D", "disbursedBy"],
					],
				},
				{
					model: pcDisbursment,
					as: "secondTrancheUc",
					required: false,
					where: { disbursmentType: PC_DISBURSEMENT_STATE.SECOND_TRANCHE_UC },
					attributes: ["disbursmentSubmitDate", ["TNRTP22_UPDATED_D", "disbursedBy"]],
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
		console.log("getPcFormService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.getPcMasterService = async (params) => {
	try {
		const registerUnderTable = application.dialect.QueryGenerator.selectQuery(
			"TNRTP02_REGISTRATION_UNDER_MASTER",
			{
				attributes: [
					["TNRTP02_REGISTRATION_UNDER_NAME_N", "label"],
					["TNRTP02_REGISTRATION_UNDER_MASTER_D", "value"],
					["TNRTP02_IS_OTHERS_D", "isOthers"],
				],
			}
		);
		const formedByTable = application.dialect.QueryGenerator.selectQuery(
			"TNRTP03_FORMED_SUPPORTED_BY_MASTER",
			{
				attributes: [
					["TNRTP03_FORMED_SUPPORTED_BY_NAME_N", "label"],
					["TNRTP03_FORMED_SUPPORTED_BY_MASTER_D", "value"],
					["TNRTP03_IS_OTHERS_D", "isOthers"],
				],
			}
		);
		const activityTimelineTable = application.dialect.QueryGenerator.selectQuery(
			"TNRTP15_ACTIVITY_TIMELINE_MASTER",
			{
				attributes: [
					["TNRTP15_ACTIVITY_TIMELINE_NAME_N", "label"],
					["TNRTP15_ACTIVITY_TIMELINE_MASTER_D", "value"],
				],
			}
		);
		const promotingOrganistation = application.dialect.QueryGenerator.selectQuery(
			"TNRTP113_PROMOTING_ORGANISATION_MASTER",
			{
				attributes: [
					["TNRTP113_NAME_N", "label"],
					["TNRTP113_PROMOTING_ORGANISATION_MASTER_D", "value"],
				],
			}
		);
		let concatQueries = [
			registerUnderTable,
			formedByTable,
			activityTimelineTable,
			promotingOrganistation,
		].join(" ");
		let resultSet = await application.query(concatQueries);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: {
				registrationUnderData: resultSet[0][0],
				formedByData: resultSet[0][1],
				activityData: resultSet[0][2],
				promotingOrgData: resultSet[0][3],
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
		const { formId, status, appSubmitDate } = params;
		await pcFormMaster.update(
			{ status, TNRTP01_UPDATED_AT: appSubmitDate ? appSubmitDate : new Date() },
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
		const { status, search, sortBy, page, limit, districtId, user } = params;
		let districtFilter = {}; //
		if (user.role != STAFF_ROLE.SPMU) districtFilter = { TNRTP07_US_DISTRICT_MASTER_D: districtId };
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
		const totalAmount = application.dialect.QueryGenerator.selectQuery(
			"TNRTP12_PC_FORMS_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP12_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				required: false,
				where: {
					TNRTP12_PC_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP01_PC_FORMS_MASTER.TNRTP01_PC_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		const districtForms = application.dialect.QueryGenerator.selectQuery(
			"TNRTP07_PC_FORMS_BASIC_DETAILS",
			{
				where: { ...districtFilter },
				attributes: ["TNRTP07_PC_FORMS_MASTER_D"],
			}
		).slice(0, -1);
		const totalApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP01_PC_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP01_PC_FORMS_MASTER_D")),
						"totalApplication",
					],
				],
				required: true,
				where: {
					TNRTP01_PC_FORMS_MASTER_D: { [Op.in]: application.literal("(" + districtForms + ")") },
					TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP01_STATUS_D: { [Op.not]: PC_FORM_MASTER_STATUS.DRAFT },
				},
			}
		).slice(0, -1);
		const approvedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP01_PC_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP01_PC_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: true,
				where: {
					TNRTP01_PC_FORMS_MASTER_D: { [Op.in]: application.literal("(" + districtForms + ")") },
					TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP01_STATUS_D: {
						[Op.in]: [
							PC_FORM_MASTER_STATUS.FIRST_TRANCHE,
							PC_FORM_MASTER_STATUS.SECOND_TRANCHE,
							PC_FORM_MASTER_STATUS.SECOND_TRANCHE_UC,
							PC_FORM_MASTER_STATUS.APPROVED,
						],
					},
				},
			}
		).slice(0, -1);
		const rejectedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP01_PC_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP01_PC_FORMS_MASTER_D")),
						"rejectedApplication",
					],
				],
				required: true,
				where: {
					TNRTP01_PC_FORMS_MASTER_D: { [Op.in]: application.literal("(" + districtForms + ")") },
					TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP01_STATUS_D: {
						[Op.in]: [PC_FORM_MASTER_STATUS.DECLINED],
					},
				},
			}
		).slice(0, -1);
		let applicationCount = await pcFormMaster.findOne({
			attributes: [
				[application.literal("(" + totalApplication + ")"), "totalApplication"],
				[application.literal("(" + approvedApplication + ")"), "approvedApplication"],
				[application.literal("(" + rejectedApplication + ")"), "rejectedApplication"],
			],
		});
		let { rows, count } = await pcFormMaster.findAndCountAll({
			where: {
				TNRTP01_DELETED_F: DELETE_STATUS.NOT_DELETED,
				status,
				...searchCondition,
			},
			attributes: [
				"formId",
				"userId",
				"status",
				["TNRTP01_UPDATED_AT", "appSubmitDate"],
				[application.literal("(" + totalAmount + ")"), "totalAmount"],
			],
			include: [
				{
					model: pcFormBasicDetails,
					as: "basicDetails",
					required: true,
					where: { TNRTP07_DELETED_F: DELETE_STATUS.NOT_DELETED, ...districtFilter },
					attributes: ["name", "pcName", "blockId", "districtId"],
				},
				{
					model: pcFormDetails,
					as: "pcDetails",
					required: false,
					where: { TNRTP08_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: pcFormDetails.selectedFields,
					include: [
						{
							model: selectedPcCommodity,
							as: "pcCommodityTypes",
							required: true,
							attributes: selectedPcCommodity.selectedFields,
							include: [
								{
									model: pcCommodityTypes,
									as: "pcCommodityTypesData",
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
			order: [["TNRTP01_CREATED_AT", sortBy == ORDERBY.ASC ? "ASC" : "DESC"]],
			distinct: "TNRTP01_PC_FORMS_MASTER_D",
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
		rows.map((element) => {
			if (element.dataValues.basicDetails)
				element.dataValues.basicDetails.dataValues.block = blockData.find(
					(x) => x.value == element.dataValues.basicDetails.dataValues.blockId
				);
			delete element.dataValues.basicDetails.dataValues.blockId;
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
		let dashBoardFormStatus;
		switch (parseInt(params.applicationStatus)) {
			case PC_FORM_MASTER_STATUS.FIRST_TRANCHE: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.APPROVED;
				break;
			}
			case PC_FORM_MASTER_STATUS.PENDING: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.PENDING;
				break;
			}
			case PC_FORM_MASTER_STATUS.DECLINED: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.REJECTED;
				break;
			}
		}
		if (dashBoardFormStatus) {
			await mainDashboard.update(
				{ applicationStatus: dashBoardFormStatus },
				{
					where: { formId, formTypeId: FORM_TYPES.PC_FORM },
				}
			);
		}
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
		const totalAmount = application.dialect.QueryGenerator.selectQuery(
			"TNRTP12_PC_FORMS_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP12_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				required: false,
				where: {
					TNRTP12_PC_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP01_PC_FORMS_MASTER.TNRTP01_PC_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		let openApplicationDetails = await pcFormMaster.findOne({
			where: { formId },
			attributes: [
				"formId",
				"userId",
				"name",
				"status",
				["TNRTP01_UPDATED_AT", "appRecievedDate"],
				[application.literal("(" + totalAmount + ")"), "totalAmount"],
			],
			include: [
				{
					model: pcApplicationStatus,
					as: "pcApplicationStatus",
					required: false,
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
					where: { disbursmentType: PC_DISBURSEMENT_STATE.FIRST_TRANCHE },
					attributes: [
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
					where: { disbursmentType: PC_DISBURSEMENT_STATE.SECOND_TRANCHE },
					attributes: [
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
					where: { disbursmentType: PC_DISBURSEMENT_STATE.SECOND_TRANCHE_UC },
					attributes: ["disbursmentSubmitDate", ["TNRTP22_UPDATED_D", "disbursedBy"]],
					include: [
						{
							model: pcRequiredDoc,
							as: "secondTrancheApproval",
							required: false,
							where: { docType: PC_STAFF_DOC.SECOND_TRANCHE },
							attributes: pcRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: pcAssessment,
					as: "pcAssessment",
					required: false,
					attributes: pcAssessment.selectedFields,
				},
				{
					model: pcAreaMember,
					as: "pcAreaMember",
					required: false,
					attributes: pcAreaMember.selectedFields,
					include: [
						{
							model: pcAreaMemberBlock,
							as: "areaMembersBlock",
							required: false,
							attributes: pcAreaMemberBlock.selectedFields,
						},
					],
				},
				{
					model: pcCoverageArea,
					as: "pcCoverageArea",
					required: false,
					attributes: pcCoverageArea.selectedFields,
					include: [
						{
							model: pcCoverageBlock,
							as: "coverageBlock",
							required: false,
							attributes: pcCoverageBlock.selectedFields,
							include: [
								{
									model: pcCoveragePanchayat,
									as: "coveragePanchayat",
									required: false,
									attributes: pcCoveragePanchayat.selectedFields,
								},
							],
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
		let { userData, formId } = params;
		params.TNRTP22_CREATED_D = userData.userId;
		params.TNRTP22_UPDATED_D = userData.userId;
		params.disbursmentType = PC_DISBURSEMENT_STATE.FIRST_TRANCHE;
		delete params.userData;
		await pcDisbursment.create({ ...params });
		await pcFormMaster.update(
			{ status: PC_FORM_MASTER_STATUS.SECOND_TRANCHE },
			{
				where: { formId },
			}
		);
		let dashBoardData = await mainDashboard.findOne({
			where: { formId, formTypeId: FORM_TYPES.PC_FORM },
		});
		if (dashBoardData) {
			dashBoardData.totalDisburement = dashBoardData.totalDisburement + params.disbursmentAmount;
			dashBoardData.save();
		}
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
		const { userData, formId } = params;
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
		params.disbursmentType = PC_DISBURSEMENT_STATE.SECOND_TRANCHE;
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
		await pcFormMaster.update(
			{ status: PC_FORM_MASTER_STATUS.SECOND_TRANCHE_UC },
			{
				where: { formId },
			}
		);
		let dashBoardData = await mainDashboard.findOne({
			where: { formId, formTypeId: FORM_TYPES.PC_FORM },
		});
		if (dashBoardData) {
			dashBoardData.totalDisburement = dashBoardData.totalDisburement + params.disbursmentAmount;
			dashBoardData.save();
		}
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
		params.disbursmentType = PC_DISBURSEMENT_STATE.SECOND_TRANCHE_UC;
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
		await pcFormMaster.update({ status: PC_FORM_MASTER_STATUS.APPROVED }, { where: { formId } });
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
		let membersData = await pcFormMaster.findOne({
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
		if (membersData) {
			membersData.dataValues["members"] = membersData.dataValues["pcFormMembers"];
			delete membersData.dataValues["pcFormMembers"];
		}
		const auditYearMaster = application.dialect.QueryGenerator.selectQuery(
			"TNRTP28_PC_AUDIT_FINANCIAL_YEAR_MASTER",
			{
				attributes: [
					["TNRTP28_PC_AUDIT_YEAR_N", "label"],
					["TNRTP28_PC_AUDIT_FINANCIAL_YEAR_MASTER_D", "value"],
				],
			}
		);
		const linkageMaster = application.dialect.QueryGenerator.selectQuery(
			"TNRTP26_PC_ASSESSMENT_LINKAGE_MASTER",
			{
				attributes: [
					["TNRTP26_PC_LINKAGE_N", "label"],
					["TNRTP26_PC_ASSESSMENT_LINKAGE_MASTER_D", "value"],
				],
			}
		);
		const convergenceMaster = application.dialect.QueryGenerator.selectQuery(
			"TNRTP32_PC_NO_OF_CONVERGENCE_MASTER",
			{
				attributes: [
					["TNRTP32_PC_NO_OF_CONVERGENCE_D", "label"],
					["TNRTP32_PC_NO_OF_CONVERGENCE_MASTER_D", "value"],
				],
			}
		);
		const partnershipMaster = application.dialect.QueryGenerator.selectQuery(
			"TNRTP33_PC_NO_OF_PARTNERSHIP_MASTER",
			{
				attributes: [
					["TNRTP33_PC_NO_OF_PARTNERSHIP_D", "label"],
					["TNRTP33_PC_NO_OF_PARTNERSHIP_MASTER_D", "value"],
				],
			}
		);
		let concatQueries = [auditYearMaster, convergenceMaster, linkageMaster, partnershipMaster].join(
			" "
		);
		let resultSet = await application.query(concatQueries);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: {
				membersData,
				auditYearMaster: resultSet[0][0],
				convergenceMaster: resultSet[0][1],
				linkageMaster: resultSet[0][2],
				partnershipMaster: resultSet[0][3],
			},
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
		await pcAssessment.destroy({ where: { formId } }).then(() => {
			return pcAssessment.bulkCreate([...params.assessments], {
				include: [
					{
						model: pcAssessmentDoc,
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
					required: false,
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
PCApplicationService.prototype.pcServiceAreaService = async (params) => {
	try {
		let { formId, areaMembers } = params;
		if (areaMembers && areaMembers.length) {
			areaMembers.map((element) => {
				element.formId = formId;
			});
		}
		await pcAreaMember.destroy({ where: { formId } }).then(() => {
			return pcAreaMember.bulkCreate([...areaMembers], {
				include: [
					{
						model: pcAreaMemberBlock,
						as: "areaMembersBlock",
					},
				],
			});
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pcServiceAreaService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.getPcServiceAreaService = async (params) => {
	try {
		const { formId } = params;
		let serviceArea = await pcAreaMember.findAll({
			where: { formId },
			attributes: pcAreaMember.selectedFields,
			include: [
				{
					model: pcAreaMemberBlock,
					as: "areaMembersBlock",
					required: false,
					attributes: pcAreaMemberBlock.selectedFields,
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: serviceArea,
		};
	} catch (err) {
		console.log("getPcServiceAreaService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.pcCoverageAreaService = async (params) => {
	try {
		const { formId, coverageMembers, coverageDistrict } = params;
		if (coverageDistrict && coverageDistrict.length) {
			coverageDistrict.map((element) => {
				element.formId = formId;
			});
			await pcCoverageArea.destroy({ where: { formId } }).then(() => {
				return pcCoverageArea.bulkCreate([...coverageDistrict], {
					include: [
						{
							model: pcCoverageBlock,
							as: "coverageBlock",
							include: [
								{
									model: pcCoveragePanchayat,
									as: "coveragePanchayat",
								},
							],
						},
					],
				});
			});
		}
		// if (coverageMembers) {
		// 	coverageMembers.formId = formId;
		// 	await pcCoverageMembers.create({ ...coverageMembers });
		// }
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("pcServiceAreaService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
PCApplicationService.prototype.getPcCoverageAreaService = async (params) => {
	try {
		const { formId } = params;
		let coverageData = await pcCoverageArea.findAll({
			where: { formId },
			attributes: pcCoverageArea.selectedFields,
			include: [
				{
					model: pcCoverageBlock,
					as: "coverageBlock",
					required: false,
					attributes: pcCoverageBlock.selectedFields,
					include: [
						{
							model: pcCoveragePanchayat,
							as: "coveragePanchayat",
							required: false,
							attributes: pcCoveragePanchayat.selectedFields,
						},
					],
				},
			],
		});
		// let coverageMembers = await pcCoverageMembers.findOne({
		// 	where: { formId },
		// 	attributes: pcCoverageMembers.selectedFields,
		// });
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: {
				coverageData,
				//  coverageMembers
			},
		};
	} catch (err) {
		console.log("getPcCoverageAreaService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
module.exports = new PCApplicationService();
