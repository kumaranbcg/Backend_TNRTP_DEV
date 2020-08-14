const {
	symrFormMaster,
	symrBasicDetails,
	symrShgDetails,
	symrSkillTraining,
	symrEnterprise,
	symrBankDetails,
	symrProposedActivity,
	symrExistingLoan,
	existingLoanActivity,
	symrUploadDocument,
	selectedSymrDoc,
	selectedSymr,
	selectedSymrCommodity,
	selectedSymrSector,
	sourceOfInfo,
	gender,
	religion,
	community,
	educQualification,
	proofType,
	natureOfMigration,
	shgMemberType,
	relationshipType,
	pcTypes,
	pcCommodityTypes,
	pcSectorTypes,
	enterpriseType,
	years,
	courseCompletionYear,
	scheme,
	activityTimeline,
	districtMaster,
	blockMaster,
	panchayatMaster,
	application,
	symrApplicationStatus,
	symrRequiredDoc,
	symrRepayOfExistingLoan,
	symrProposedEnterpriseLocation,
	symrExperience,
	// pcDisbursment,
	// pcAssessmentDoc,
	symrAssessment,
	// pcAuditYear,
	// pcConvergence,
	// pcLinkage,
	// pcPartnership,
	// pcAreaMember,
	// pcAreaMemberBlock,
	// pcCoverageArea,
	// pcCoverageBlock,
	// pcCoveragePanchayat,
	// pcCoverageMembers,
} = require("../models");
const messages = require("./../configs/errorMsgs.js");
const errorCodes = require("./../configs/errorCodes.js");
const {
	SYMR_FORM_MASTER_STATUS,
	SYMR_UPLOAD_DOC,
	DISBURSEMENT_STATE,
	DELETE_STATUS,
	ORDERBY,
	SYMR_STAFF_DOC
} = require("../constants/index");
const { Op } = require("sequelize");
const Cryptr = require("cryptr");
const existingLoanActivityModel = require("../models/application/existingLoanActivity.model");
const { string } = require("joi");
const cryptr = new Cryptr(process.env.AES_KEY);
class SYMRApplicationService {}

SYMRApplicationService.prototype.symrFormCreateSerivce = async (params) => {
	try {
		const { userId } = params;
		const createMaster = {
			userId,
			status: SYMR_FORM_MASTER_STATUS.DRAFT,
		};
		let pendingForm = await symrFormMaster.findOne({
			where: { status: [SYMR_FORM_MASTER_STATUS.DRAFT, SYMR_FORM_MASTER_STATUS.PENDING] },
		});
		// if (pendingForm) {
		// 	return {
		// 		code: errorCodes.HTTP_CONFLICT,
		// 		message: messages.pcFormPending,
		// 	};
		// }
		let formData = await symrFormMaster.create({ ...createMaster });
		return {
			code: errorCodes.HTTP_OK,
			message: messages.formCreated,
			data: { formId: formData.formId },
		};
	} catch (err) {
		console.log("symrFormCreateSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.symrBasicDetailsSerivce = async (params) => {
	try {
		const { formId } = params;
		let formData = await symrBasicDetails.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await symrBasicDetails.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("symrBasicDetails", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.symrShgDetailService = async (params) => {
	try {
		const { formId } = params;
		let formData = await symrShgDetails.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await symrShgDetails.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("symrShgDetails", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.symrSkillDetailService = async (params) => {
	try {
		const { formId } = params;
		let formData = await symrSkillTraining.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await symrSkillTraining.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("symrSkillTraining", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.symrEnterpriseDetailService = async (params) => {
	try {
		const { formId } = params;
		await symrEnterprise.destroy({ where: { formId } }).then(() => {
			return symrEnterprise.create(
				{ ...params },
				{
					include: [
						{
							model: selectedSymr,
							as: "symrTypes",
						},
						{
							model: selectedSymrCommodity,
							as: "symrCommodityTypes",
						},
						{
							model: selectedSymrSector,
							as: "symrSectorTypes",
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
		console.log("symrEnterprise", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.symrBankDetailsSerivce = async (params) => {
	try {
		const { formId } = params;
		let formData = await symrBankDetails.findOne({
			where: { formId },
		});
		if (formData) {
			await formData.update({ ...params });
		} else {
			await symrBankDetails.create({ ...params });
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("symrBankDetails", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.symrProposedActivitySerivce = async (params) => {
	try {
		if (params && params.length) {
			const { formId } = params[0];
			await symrProposedActivity.destroy({ where: { formId } }).then(() => {
				return symrProposedActivity.bulkCreate([...params]);
			});
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("symrProposedActivity", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.symrExistingLoanSerivce = async (params) => {
	try {
		if (params) {
			const { formId } = params;
			await symrExistingLoan.destroy({ where: { formId } }).then(() => {
				return symrExistingLoan.create({...params}, {
					include: [
						{
							model: existingLoanActivity,
							as: "existingLoanList",
						}
					]
				});
			});
		}
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("symrExistingLoanSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.symrUploadDocSerivce = async (params) => {
	try {
		const { formId } = params;
		if (params.proofOfMigration && params.proofOfMigration.length) {
			params.proofOfMigration.map((element) => {
				element.docType = SYMR_UPLOAD_DOC.PROOF_OF_MIGRATION;
			});
		}
		if (params.applicationLetter && params.applicationLetter.length) {
			params.applicationLetter.map((element) => {
				element.docType = SYMR_UPLOAD_DOC.APPLICATION_LETTER;
			});
		}
		if (params.bankPassBook && params.bankPassBook.length) {
			params.bankPassBook.map((element) => {
				element.docType = SYMR_UPLOAD_DOC.BANK_PASSBOOK;
			});
		}
		if (params.idProofPhoto && params.idProofPhoto.length) {
			params.idProofPhoto.map((element) => {
				element.docType = SYMR_UPLOAD_DOC.ID_PROOF_PHOTO;
			});
		}
		if (params.businessPlan && params.businessPlan.length) {
			params.businessPlan.map((element) => {
				element.docType = SYMR_UPLOAD_DOC.BUSSINESS_PLAN;
			});
		}
		if (params.trainingCertificate && params.trainingCertificate.length) {
			params.trainingCertificate.map((element) => {
				element.docType = SYMR_UPLOAD_DOC.TRAINING_CERTIFICATE;
			});
		}
		await symrUploadDocument.destroy({ where: { formId } }).then(() => {
			return symrUploadDocument.create(
				{ ...params },
				{
					include: [
						{
							model: selectedSymrDoc,
							as: "proofOfMigration",
						},
						{
							model: selectedSymrDoc,
							as: "applicationLetter",
						},
						{
							model: selectedSymrDoc,
							as: "bankPassBook",
						},
						{
							model: selectedSymrDoc,
							as: "idProofPhoto",
						},
						{
							model: selectedSymrDoc,
							as: "businessPlan",
						},
						{
							model: selectedSymrDoc,
							as: "trainingCertificate",
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
		console.log("symrUploadDocSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.getSymrFormService = async (params) => {
	try {
		const { formId } = params;
		let formData = await symrFormMaster.findOne({
			where: { formId, TNRTP68_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId", "name", "status", ["TNRTP68_UPDATED_AT", "appSubmitDate"]],
			include: [
				{
					model: symrBasicDetails,
					as: "basicDetails",
					where: { TNRTP69_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrBasicDetails.selectedFields,
					include: [
						{
							model: sourceOfInfo,
							as: "sourceOfInfoData",
							required: false,
							attributes: sourceOfInfo.selectedFields
						},
						{
							model: gender,
							as: "genderData",
							required: false,
							attributes: gender.selectedFields
						},
						{
							model: religion,
							as: "religionData",
							required: false,
							attributes: religion.selectedFields
						},
						{
							model: community,
							as: "communityData",
							required: false,
							attributes: community.selectedFields
						},
						{
							model: educQualification,
							as: "educQualificationData",
							required: false,
							attributes: educQualification.selectedFields
						},
						{
							model: proofType,
							as: "proofTypeData",
							required: false,
							attributes: proofType.selectedFields
						},
						{
							model: natureOfMigration,
							as: "natureOfMigrationData",
							required: false,
							attributes: natureOfMigration.selectedFields
						}
					]
				},
				{
					model: symrShgDetails,
					as: "symrShgDetails",
					where: { TNRTP77_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrShgDetails.selectedFields,
					include: [
						{
							model: shgMemberType,
							as: "shgMemberTypeData",
							required: false,
							attributes: shgMemberType.selectedFields
						},
						{
							model: relationshipType,
							as: "relationshipTypeData",
							required: false,
							attributes: relationshipType.selectedFields
						}
					]
				},
				{
					model: symrEnterprise,
					as: "symrEnterprise",
					where: { TNRTP81_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrEnterprise.selectedFields,
					include: [
						{
							model: selectedSymr,
							as: "symrTypes",
							required: false,
							attributes: selectedSymr.selectedFields,
							include: [
								{
									model: pcTypes,
									as: "symrTypesData",
									required: false,
									attributes: pcTypes.selectedFields,
								},
							],
						},
						{
							model: selectedSymrCommodity,
							as: "symrCommodityTypes",
							required: false,
							attributes: selectedSymrCommodity.selectedFields,
							include: [
								{
									model: pcCommodityTypes,
									as: "symrCommodityTypesData",
									required: false,
									attributes: pcCommodityTypes.selectedFields,
								},
							],
						},
						{
							model: selectedSymrSector,
							as: "symrSectorTypes",
							required: false,
							attributes: selectedSymrSector.selectedFields,
							include: [
								{
									model: pcSectorTypes,
									as: "symrSectorTypesData",
									required: false,
									attributes: pcSectorTypes.selectedFields,
								},
							],
						},
						{
							model: enterpriseType,
							as: "enterpriseTypeData",
							required: false,
							attributes: enterpriseType.selectedFields,
						},
						{
							model: years,
							as: "enterpreneurExpYearsData",
							required: false,
							attributes: years.selectedFields,
						},
						{
							model: years,
							as: "activityExpYearsData",
							required: false,
							attributes: years.selectedFields,
						},
					],
				},
				{
					model: symrSkillTraining,
					as: "symrSkillTraining",
					where: { TNRTP79_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrSkillTraining.selectedFields,
					include: [
						{
							model: scheme,
							as: "skilltrainingData",
							required: false,
							attributes: scheme.selectedFields
						},
						{
							model: scheme,
							as: "edpschemeData",
							required: false,
							attributes: scheme.selectedFields
						},
						{
							model: scheme,
							as: "registeredEdpSchemeData",
							required: false,
							attributes: scheme.selectedFields
						},
						{
							model: courseCompletionYear,
							as: "courseCompletionTypeData",
							required: false,
							attributes: courseCompletionYear.selectedFields
						},
					]
				},
				{
					model: symrBankDetails,
					as: "symrBankDetails",
					where: { TNRTP82_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrBankDetails.selectedFields,
				},
				{
					model: symrExistingLoan,
					as: "symrExistingLoan",
					where: { TNRTP84_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrExistingLoan.selectedFields,
					include: [
						{
							model: existingLoanActivity,
							as: "existingLoanList",
							required: false,
							attributes: existingLoanActivity.selectedFields,
						},
					],
				},
				{
					model: symrProposedActivity,
					as: "symrProposedActivity",
					where: { TNRTP83_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrProposedActivity.selectedFields,
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
					model: symrUploadDocument,
					as: "symrUploadDocument",
					where: { TNRTP85_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrUploadDocument.selectedFields,
					include: [
						{
							model: selectedSymrDoc,
							as: "proofOfMigration",
							attributes: selectedSymrDoc.selectedFields,
							where: { docType: SYMR_UPLOAD_DOC.PROOF_OF_MIGRATION },
							required: false,
						},
						{
							model: selectedSymrDoc,
							as: "applicationLetter",
							attributes: selectedSymrDoc.selectedFields,
							where: { docType: SYMR_UPLOAD_DOC.APPLICATION_LETTER },
							required: false,
						},
						{
							model: selectedSymrDoc,
							as: "bankPassBook",
							attributes: selectedSymrDoc.selectedFields,
							where: { docType: SYMR_UPLOAD_DOC.BANK_PASSBOOK },
							required: false,
						},
						{
							model: selectedSymrDoc,
							as: "idProofPhoto",
							attributes: selectedSymrDoc.selectedFields,
							where: { docType: SYMR_UPLOAD_DOC.ID_PROOF_PHOTO },
							required: false,
						},
						{
							model: selectedSymrDoc,
							as: "businessPlan",
							attributes: selectedSymrDoc.selectedFields,
							where: { docType: SYMR_UPLOAD_DOC.BUSSINESS_PLAN },
							required: false,
						},
						{
							model: selectedSymrDoc,
							as: "trainingCertificate",
							attributes: selectedSymrDoc.selectedFields,
							where: { docType: SYMR_UPLOAD_DOC.TRAINING_CERTIFICATE },
							required: false,
						},
					],
				},
				// {
				// 	model: pcApplicationStatus,
				// 	as: "pcApplicationStatus",
				// 	required: false,
				// 	attributes: ["dmpuVerifyDate", "applicationStatus", ["TNRTP20_UPDATED_D", "approvedBy"]],
				// },
				// {
				// 	model: pcDisbursment,
				// 	as: "firstTranche",
				// 	required: false,
				// 	where: { disbursmentType: DISBURSEMENT_STATE.FIRST_TRANCHE },
				// 	attributes: [
				// 		"isDisbursment",
				// 		"disbursmentDate",
				// 		"disbursmentAmount",
				// 		["TNRTP22_UPDATED_D", "disbursedBy"],
				// 	],
				// },
				// {
				// 	model: pcDisbursment,
				// 	as: "secondTranche",
				// 	required: false,
				// 	where: { disbursmentType: DISBURSEMENT_STATE.SECOND_TRANCHE },
				// 	attributes: [
				// 		"isDisbursment",
				// 		"disbursmentDate",
				// 		"disbursmentAmount",
				// 		["TNRTP22_UPDATED_D", "disbursedBy"],
				// 	],
				// },
				// {
				// 	model: pcDisbursment,
				// 	as: "secondTrancheUc",
				// 	required: false,
				// 	where: { disbursmentType: DISBURSEMENT_STATE.SECOND_TRANCHE_UC },
				// 	attributes: ["disbursmentSubmitDate", ["TNRTP22_UPDATED_D", "disbursedBy"]],
				// },
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
		console.log("getSymrFormService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.getSymrMasterService = async (params) => {
	try {
		let sourceOfInfoData = await sourceOfInfo.findAll({
			attributes: sourceOfInfo.selectedFields,
		});
		let genderData = await gender.findAll({
			attributes: gender.selectedFields,
		});
		let religionData = await religion.findAll({
			attributes: religion.selectedFields,
		});
		let communityData = await community.findAll({
			attributes: community.selectedFields,
		});
		let proofTypeData = await proofType.findAll({
			attributes: proofType.selectedFields,
		});
		let educQualificationData = await educQualification.findAll({
			attributes: educQualification.selectedFields,
		});
		let natureOfMigrationData = await natureOfMigration.findAll({
			attributes: natureOfMigration.selectedFields,
		});
		let shgMemberTypeData = await shgMemberType.findAll({
			attributes: shgMemberType.selectedFields,
		});
		let relationshipTypeData = await relationshipType.findAll({
			attributes: relationshipType.selectedFields,
		});
		let enterpriseTypeData = await enterpriseType.findAll({
			attributes: enterpriseType.selectedFields,
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
		let yearsData = await years.findAll({
			attributes: years.selectedFields,
		});
		let courseCompletionYearData = await courseCompletionYear.findAll({
			attributes: courseCompletionYear.selectedFields,
		});
		let schemeData = await scheme.findAll({
			attributes: scheme.selectedFields,
		});
		let existingLoanActivityData = await existingLoanActivity.findAll({
			attributes: existingLoanActivity.selectedFields,
		});
		let activityData = await activityTimeline.findAll({
			attributes: activityTimeline.selectedFields,
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: {
				sourceOfInfoData,
				genderData,
				religionData,
				communityData,
				proofTypeData,
				natureOfMigrationData,
				educQualificationData,
				shgMemberTypeData,
				relationshipTypeData,
				enterpriseTypeData,
				courseCompletionYearData,
				yearsData,
				schemeData,
				existingLoanActivityData,
				typesOfPc,
				typesOfCommodity,
				typesOfSector,
				activityData,
			},
		};
	} catch (err) {
		console.log("getSymrMasterService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.updateSymrFormStatus = async (params) => {
	try {
		const { formId, status } = params;
		await symrFormMaster.update(
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
		console.log("updateSymrFormStatus", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};

SYMRApplicationService.prototype.getSymrApplicationService = async (params) => {
	try {
		const { status, search, sortBy, page, limit, districtId } = params;
		const searchCondition = !!search
			? {
					[Op.or]: [
						{
							$TNRTP68_SYMR_FORMS_MASTER_D$: {
								[Op.like]: `%${search}%`,
							},
						},
						{
							"$basicDetails.TNRTP69_NAME_N$": {
								[Op.like]: `%${search}%`,
							},
						},
						// {
						// 	"$basicDetails.TNRTP07_PC_NAME_N$": {
						// 		[Op.like]: `%${search}%`,
						// 	},
						// },
					],
			  }
			: {};
		const totalAmount = application.dialect.QueryGenerator.selectQuery(
			"TNRTP83_SYMR_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP83_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				required: false,
				where: {
					TNRTP83_SYMR_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP68_SYMR_FORMS_MASTER.TNRTP68_SYMR_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		const districtForms = application.dialect.QueryGenerator.selectQuery(
			"TNRTP69_SYMR_BASIC_DETAILS",
			{
				where: { TNRTP69_US_DISTRICT_MASTER_D: districtId },
				attributes: ["TNRTP68_SYMR_FORMS_MASTER_D"],
			}
		).slice(0, -1);
		const totalApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP68_SYMR_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP68_SYMR_FORMS_MASTER_D")),
						"totalApplication",
					],
				],
				required: true,
				where: {
					TNRTP68_SYMR_FORMS_MASTER_D: { [Op.in]: application.literal("(" + districtForms + ")") },
					TNRTP68_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP68_STATUS_D: { [Op.not]: SYMR_FORM_MASTER_STATUS.DRAFT },
				},
			}
		).slice(0, -1);
		const approvedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP68_SYMR_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP68_SYMR_FORMS_MASTER_D")),
						"approvedApplication",
					],
				],
				required: true,
				where: {
					TNRTP68_SYMR_FORMS_MASTER_D: { [Op.in]: application.literal("(" + districtForms + ")") },
					TNRTP68_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP68_STATUS_D: {
						[Op.in]: [
							SYMR_FORM_MASTER_STATUS.FIRST_TRANCHE,
							SYMR_FORM_MASTER_STATUS.SECOND_TRANCHE,
							SYMR_FORM_MASTER_STATUS.SECOND_TRANCHE_UC,
							SYMR_FORM_MASTER_STATUS.APPROVED,
						],
					},
				},
			}
		).slice(0, -1);
		const rejectedApplication = application.dialect.QueryGenerator.selectQuery(
			"TNRTP68_SYMR_FORMS_MASTER",
			{
				attributes: [
					[
						application.fn("COUNT", application.col("TNRTP68_SYMR_FORMS_MASTER_D")),
						"rejectedApplication",
					],
				],
				required: true,
				where: {
					TNRTP68_SYMR_FORMS_MASTER_D: { [Op.in]: application.literal("(" + districtForms + ")") },
					TNRTP68_DELETED_F: DELETE_STATUS.NOT_DELETED,
					TNRTP68_STATUS_D: {
						[Op.in]: [SYMR_FORM_MASTER_STATUS.DECLINED],
					},
				},
			}
		).slice(0, -1);
		let applicationCount = await symrFormMaster.findOne({
			attributes: [
				[application.literal("(" + totalApplication + ")"), "totalApplication"],
				[application.literal("(" + approvedApplication + ")"), "approvedApplication"],
				[application.literal("(" + rejectedApplication + ")"), "rejectedApplication"],
			],
		});
		let { rows, count } = await symrFormMaster.findAndCountAll({
			where: {
				TNRTP68_DELETED_F: DELETE_STATUS.NOT_DELETED,
				status,
				...searchCondition,
			},
			attributes: [
				"formId",
				"userId",
				"status",
				["TNRTP68_UPDATED_AT", "appSubmitDate"],
				[application.literal("(" + totalAmount + ")"), "totalAmount"],
			],
			include: [
				{
					model: symrBasicDetails,
					as: "basicDetails",
					required: true,
					where: { TNRTP69_DELETED_F: DELETE_STATUS.NOT_DELETED, districtId },
					attributes: symrBasicDetails.selectedFields,
					include: [
						{
							model: sourceOfInfo,
							as: "sourceOfInfoData",
							required: false,
							attributes: sourceOfInfo.selectedFields
						},
						{
							model: gender,
							as: "genderData",
							required: false,
							attributes: gender.selectedFields
						},
						{
							model: religion,
							as: "religionData",
							required: false,
							attributes: religion.selectedFields
						},
						{
							model: community,
							as: "communityData",
							required: false,
							attributes: community.selectedFields
						},
						{
							model: educQualification,
							as: "educQualificationData",
							required: false,
							attributes: educQualification.selectedFields
						},
						{
							model: proofType,
							as: "proofTypeData",
							required: false,
							attributes: proofType.selectedFields
						},
						{
							model: natureOfMigration,
							as: "natureOfMigrationData",
							required: false,
							attributes: natureOfMigration.selectedFields
						}
					]
				},
				{
					model: symrShgDetails,
					as: "symrShgDetails",
					where: { TNRTP77_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrShgDetails.selectedFields,
					include: [
						{
							model: shgMemberType,
							as: "shgMemberTypeData",
							required: false,
							attributes: shgMemberType.selectedFields
						},
						{
							model: relationshipType,
							as: "relationshipTypeData",
							required: false,
							attributes: relationshipType.selectedFields
						}
					]
				},
				{
					model: symrEnterprise,
					as: "symrEnterprise",
					where: { TNRTP81_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrEnterprise.selectedFields,
					include: [
						{
							model: selectedSymr,
							as: "symrTypes",
							required: false,
							attributes: selectedSymr.selectedFields,
							include: [
								{
									model: pcTypes,
									as: "symrTypesData",
									required: false,
									attributes: pcTypes.selectedFields,
								},
							],
						},
						{
							model: selectedSymrCommodity,
							as: "symrCommodityTypes",
							required: false,
							attributes: selectedSymrCommodity.selectedFields,
							include: [
								{
									model: pcCommodityTypes,
									as: "symrCommodityTypesData",
									required: false,
									attributes: pcCommodityTypes.selectedFields,
								},
							],
						},
						{
							model: selectedSymrSector,
							as: "symrSectorTypes",
							required: false,
							attributes: selectedSymrSector.selectedFields,
							include: [
								{
									model: pcSectorTypes,
									as: "symrSectorTypesData",
									required: false,
									attributes: pcSectorTypes.selectedFields,
								},
							],
						},
						{
							model: enterpriseType,
							as: "enterpriseTypeData",
							required: false,
							attributes: enterpriseType.selectedFields,
						},
						{
							model: years,
							as: "enterpreneurExpYearsData",
							required: false,
							attributes: years.selectedFields,
						},
						{
							model: years,
							as: "activityExpYearsData",
							required: false,
							attributes: years.selectedFields,
						},
					],
				},
				{
					model: symrSkillTraining,
					as: "symrSkillTraining",
					where: { TNRTP79_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrSkillTraining.selectedFields,
					include: [
						{
							model: scheme,
							as: "skilltrainingData",
							required: false,
							attributes: scheme.selectedFields
						},
						{
							model: scheme,
							as: "edpschemeData",
							required: false,
							attributes: scheme.selectedFields
						},
						{
							model: scheme,
							as: "registeredEdpSchemeData",
							required: false,
							attributes: scheme.selectedFields
						},
						{
							model: courseCompletionYear,
							as: "courseCompletionTypeData",
							required: false,
							attributes: courseCompletionYear.selectedFields
						},
					]
				},
				{
					model: symrBankDetails,
					as: "symrBankDetails",
					where: { TNRTP82_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrBankDetails.selectedFields,
				},
				{
					model: symrExistingLoan,
					as: "symrExistingLoan",
					where: { TNRTP84_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrExistingLoan.selectedFields,
					include: [
						{
							model: existingLoanActivity,
							as: "existingLoanList",
							required: false,
							attributes: existingLoanActivity.selectedFields,
						},
					],
				},
				{
					model: symrProposedActivity,
					as: "symrProposedActivity",
					where: { TNRTP83_DELETED_F: DELETE_STATUS.NOT_DELETED },
					required: false,
					attributes: symrProposedActivity.selectedFields,
					include: [
						{
							model: activityTimeline,
							as: "activityTimelineData",
							required: false,
							attributes: activityTimeline.selectedFields,
						},
					],
				}
				
			],
			raw: false,
			nested: true,
			subQuery: false,
			limit,
			order: [["TNRTP68_CREATED_AT", sortBy == ORDERBY.ASC ? "ASC" : "DESC"]],
			distinct: "TNRTP68_SYMR_FORMS_MASTER_D",
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
		console.log("getSYMRApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.updateOpenApplicationService = async (params) => {
	try {
		const { formId, userData } = params;
		if (params.vprcCommitteeMom && params.vprcCommitteeMom.length) {
			params.vprcCommitteeMom.map((element) => {
				element.docType = SYMR_STAFF_DOC.VPRC_COMMITTEE_MOM;
			});
		}
		delete params.userData;
		params.TNRTP96_CREATED_D = userData.userId;
		params.TNRTP96_UPDATED_D = userData.userId;
		await symrApplicationStatus.create(
			{ ...params },
			{
				include: [
					{
						model: symrRequiredDoc,
						as: "vprcCommitteeMom",
					}
				],
			}
		);
		await symrFormMaster.update(
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
SYMRApplicationService.prototype.getSymrApplicationStatusService = async (params) => {
	try {
		const { formId } = params;
		const totalAmount = application.dialect.QueryGenerator.selectQuery(
			"TNRTP83_SYMR_PROPOSED_ACTIVITY",
			{
				attributes: [
					[application.fn("SUM", application.col("TNRTP83_AMOUNT_REQUIRED_D")), "totalAmount"],
				],
				required: false,
				where: {
					TNRTP68_SYMR_FORMS_MASTER_D: {
						[Op.eq]: application.col("TNRTP68_SYMR_FORMS_MASTER.TNRTP68_SYMR_FORMS_MASTER_D"),
					},
				},
			}
		).slice(0, -1);
		let openApplicationDetails = await symrFormMaster.findOne({
			where: { formId },
			attributes: [
				"formId",
				"userId",
				"name",
				"status",
				["TNRTP68_UPDATED_AT", "appRecievedDate"],
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
					where: { disbursmentType: DISBURSEMENT_STATE.FIRST_TRANCHE },
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
					where: { disbursmentType: DISBURSEMENT_STATE.SECOND_TRANCHE },
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
					where: { disbursmentType: DISBURSEMENT_STATE.SECOND_TRANCHE_UC },
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
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: openApplicationDetails,
		};
	} catch (err) {
		console.log("getSymrApplicationStatusService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
// SYMRApplicationService.prototype.updateFirstTrancheService = async (params) => {
// 	try {
// 		let { userData, formId } = params;
// 		params.TNRTP22_CREATED_D = userData.userId;
// 		params.TNRTP22_UPDATED_D = userData.userId;
// 		delete params.userData;
// 		await pcDisbursment.create({ ...params });
// 		await pcFormMaster.update(
// 			{ status: PC_FORM_MASTER_STATUS.SECOND_TRANCHE },
// 			{
// 				where: { formId },
// 			}
// 		);
// 		return {
// 			code: errorCodes.HTTP_OK,
// 			message: messages.success,
// 		};
// 	} catch (err) {
// 		console.log("updateFirstTrancheService", err);
// 		return {
// 			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
// 			message: err,
// 		};
// 	}
// };
// SYMRApplicationService.prototype.updateSecondTrancheService = async (params) => {
// 	try {
// 		const { userData, formId } = params;
// 		if (params.firstUcCertificate && params.firstUcCertificate.length) {
// 			params.firstUcCertificate.map((element) => {
// 				element.docType = PC_STAFF_DOC.FIRST_TRANCHE;
// 			});
// 		}
// 		if (params.smpuTrancheApproval && params.smpuTrancheApproval.length) {
// 			params.smpuTrancheApproval.map((element) => {
// 				element.docType = PC_STAFF_DOC.SMPU_TRANCHE_APPROVAL;
// 			});
// 		}
// 		delete params.userData;
// 		params.TNRTP22_CREATED_D = userData.userId;
// 		params.TNRTP22_UPDATED_D = userData.userId;
// 		await pcDisbursment.create(
// 			{ ...params },
// 			{
// 				include: [
// 					{
// 						model: pcRequiredDoc,
// 						as: "firstUcCertificate",
// 					},
// 					{
// 						model: pcRequiredDoc,
// 						as: "smpuTrancheApproval",
// 					},
// 				],
// 			}
// 		);
// 		await pcFormMaster.update(
// 			{ status: PC_FORM_MASTER_STATUS.SECOND_TRANCHE_UC },
// 			{
// 				where: { formId },
// 			}
// 		);
// 		return {
// 			code: errorCodes.HTTP_OK,
// 			message: messages.success,
// 		};
// 	} catch (err) {
// 		console.log("updateSecondTrancheService", err);
// 		return {
// 			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
// 			message: err,
// 		};
// 	}
// };
// SYMRApplicationService.prototype.updateSecondTrancheUcService = async (params) => {
// 	try {
// 		const { formId, userData } = params;
// 		if (params.secondTrancheApproval && params.secondTrancheApproval.length) {
// 			params.secondTrancheApproval.map((element) => {
// 				element.docType = PC_STAFF_DOC.SECOND_TRANCHE;
// 			});
// 		}
// 		delete params.userData;
// 		params.TNRTP22_CREATED_D = userData.userId;
// 		params.TNRTP22_UPDATED_D = userData.userId;
// 		await pcDisbursment.create(
// 			{ ...params },
// 			{
// 				include: [
// 					{
// 						model: pcRequiredDoc,
// 						as: "secondTrancheApproval",
// 					},
// 				],
// 			}
// 		);
// 		await pcFormMaster.update({ status: PC_FORM_MASTER_STATUS.APPROVED }, { where: { formId } });
// 		return {
// 			code: errorCodes.HTTP_OK,
// 			message: messages.success,
// 		};
// 	} catch (err) {
// 		console.log("updateSecondTrancheUcService", err);
// 		return {
// 			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
// 			message: err,
// 		};
// 	}
// };
SYMRApplicationService.prototype.startSymrAssesmentService = async (params) => {
	try {
		const { formId } = params;
		let membersData = await symrFormMaster.findOne({
			where: { formId, TNRTP68_DELETED_F: DELETE_STATUS.NOT_DELETED },
			attributes: ["formId", "userId"],
			include: [
				{
					model: symrBasicDetails,
					as: "basicDetails",
					where: { TNRTP69_DELETED_F: DELETE_STATUS.NOT_DELETED },
					attributes: symrBasicDetails.selectedFields,
				},
			],
		});
		let shgMemberTypeMaster = await shgMemberType.findAll({
			attributes: shgMemberType.selectedFields,
		});
		let symrRepayOfExistingLoanMaster = await symrRepayOfExistingLoan.findAll({
			attributes: symrRepayOfExistingLoan.selectedFields,
		});
		let symrProposedEnterpriseLocationMaster = await symrProposedEnterpriseLocation.findAll({
			attributes: symrProposedEnterpriseLocation.selectedFields,
		});
		let symrExperienceMaster = await symrExperience.findAll({
			attributes: symrExperience.selectedFields,
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: { membersData, shgMemberTypeMaster, symrRepayOfExistingLoanMaster, symrProposedEnterpriseLocationMaster, symrExperienceMaster },
		};
	} catch (err) {
		console.log("startAssesmentService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.submitSymrAssesmentService = async (params) => {
	try {
		const { formId } = params;
		params.assessments.map((element) => {
			element.formId = formId;
		});
		await symrAssessment.bulkCreate([...params.assessments], {
			include: [
				{
					model: symrAssessmentDoc,
					as: "documents",
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("submitSymrAssesmentService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.getSymrAssesmentService = async (params) => {
	try {
		const { formId } = params;
		let assessmentData = await symrAssessment.findAll({
			where: { formId },
			attributes: symrAssessment.selectedFields,
			include: [
				{
					model: symrAssessmentDoc,
					as: "documents",
					required: false,
					attributes: symrAssessmentDoc.selectedFields,
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
			data: assessmentData,
		};
	} catch (err) {
		console.log("getSymrAssesmentService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
// SYMRApplicationService.prototype.pcServiceAreaService = async (params) => {
// 	try {
// 		let { formId, areaMembers } = params;
// 		if (areaMembers && areaMembers.length) {
// 			areaMembers.map((element) => {
// 				element.formId = formId;
// 			});
// 		}
// 		await pcAreaMember.bulkCreate([...areaMembers], {
// 			include: [
// 				{
// 					model: pcAreaMemberBlock,
// 					as: "areaMembersBlock",
// 				},
// 			],
// 		});
// 		return {
// 			code: errorCodes.HTTP_OK,
// 			message: messages.success,
// 		};
// 	} catch (err) {
// 		console.log("pcServiceAreaService", err);
// 		return {
// 			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
// 			message: err,
// 		};
// 	}
// };
// SYMRApplicationService.prototype.getPcServiceAreaService = async (params) => {
// 	try {
// 		const { formId } = params;
// 		let serviceArea = await pcAreaMember.findAll({
// 			where: { formId },
// 			attributes: pcAreaMember.selectedFields,
// 			include: [
// 				{
// 					model: pcAreaMemberBlock,
// 					as: "areaMembersBlock",
// 					required: false,
// 					attributes: pcAreaMemberBlock.selectedFields,
// 				},
// 			],
// 		});
// 		return {
// 			code: errorCodes.HTTP_OK,
// 			message: messages.success,
// 			data: serviceArea,
// 		};
// 	} catch (err) {
// 		console.log("getPcServiceAreaService", err);
// 		return {
// 			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
// 			message: err,
// 		};
// 	}
// };
// SYMRApplicationService.prototype.pcCoverageAreaService = async (params) => {
// 	try {
// 		const { formId, coverageMembers, coverageDistrict } = params;
// 		if (coverageDistrict && coverageDistrict.length) {
// 			coverageDistrict.map((element) => {
// 				element.formId = formId;
// 			});
// 			await pcCoverageArea.destroy({ where: { formId } }).then(() => {
// 				return pcCoverageArea.bulkCreate([...coverageDistrict], {
// 					include: [
// 						{
// 							model: pcCoverageBlock,
// 							as: "coverageBlock",
// 							include: [
// 								{
// 									model: pcCoveragePanchayat,
// 									as: "coveragePanchayat",
// 								},
// 							],
// 						},
// 					],
// 				});
// 			});
// 		}
// 		// if (coverageMembers) {
// 		// 	coverageMembers.formId = formId;
// 		// 	await pcCoverageMembers.create({ ...coverageMembers });
// 		// }
// 		return {
// 			code: errorCodes.HTTP_OK,
// 			message: messages.success,
// 		};
// 	} catch (err) {
// 		console.log("pcServiceAreaService", err);
// 		return {
// 			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
// 			message: err,
// 		};
// 	}
// };
// SYMRApplicationService.prototype.getPcCoverageAreaService = async (params) => {
// 	try {
// 		const { formId } = params;
// 		let coverageData = await pcCoverageArea.findAll({
// 			where: { formId },
// 			attributes: pcCoverageArea.selectedFields,
// 			include: [
// 				{
// 					model: pcCoverageBlock,
// 					as: "coverageBlock",
// 					required: false,
// 					attributes: pcCoverageBlock.selectedFields,
// 					include: [
// 						{
// 							model: pcCoveragePanchayat,
// 							as: "coveragePanchayat",
// 							required: false,
// 							attributes: pcCoveragePanchayat.selectedFields,
// 						},
// 					],
// 				},
// 			],
// 		});
// 		// let coverageMembers = await pcCoverageMembers.findOne({
// 		// 	where: { formId },
// 		// 	attributes: pcCoverageMembers.selectedFields,
// 		// });
// 		return {
// 			code: errorCodes.HTTP_OK,
// 			message: messages.success,
// 			data: {
// 				coverageData,
// 				//  coverageMembers
// 			},
// 		};
// 	} catch (err) {
// 		console.log("getPcCoverageAreaService", err);
// 		return {
// 			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
// 			message: err,
// 		};
// 	}
// };
module.exports = new SYMRApplicationService();
