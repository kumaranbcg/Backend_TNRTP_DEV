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
	symrDisbursment,
	symrAssessmentDoc,
	symrAssessment,
	mainDashboard,
	dashboardActivity,
	dashboardSector,
	dashboardCommodity,
} = require("../models");
const messages = require("./../configs/errorMsgs.js");
const errorCodes = require("./../configs/errorCodes.js");
const {
	SYMR_FORM_MASTER_STATUS,
	SYMR_UPLOAD_DOC,
	SYMR_DISBURSEMENT_STATE,
	DELETE_STATUS,
	ORDERBY,
	SYMR_STAFF_DOC,
	FORM_TYPES,
	STAFF_ROLE,
	DASHBOARD_FORM_STATUS,
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
		await mainDashboard.create({
			formId: formData.formId,
			userId,
			formTypeId: FORM_TYPES.SYMR_FORM,
		});
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
		await mainDashboard.update(
			{ ...params },
			{
				where: { formId, formTypeId: FORM_TYPES.SYMR_FORM },
			}
		);
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
		await mainDashboard.update(
			{ ...params },
			{
				where: { formId, formTypeId: FORM_TYPES.SYMR_FORM },
			}
		);
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
		let enterprise = await symrEnterprise.destroy({ where: { formId } }).then(() => {
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
		let dashBoardData = await mainDashboard.findOne({
			where: { formId, formTypeId: FORM_TYPES.SYMR_FORM },
			raw: true,
		});
		if (dashBoardData) {
			await mainDashboard.destroy({ where: { formId, formTypeId: FORM_TYPES.SYMR_FORM } });
			dashBoardData.dashboardActivity = params.symrTypes;
			dashBoardData.dashboardSector = params.symrSectorTypes;
			dashBoardData.dashboardCommodity = params.symrCommodityTypes;
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
				return symrExistingLoan.create(
					{ ...params },
					{
						include: [
							{
								model: existingLoanActivity,
								as: "existingLoanList",
							},
						],
					}
				);
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
							attributes: sourceOfInfo.selectedFields,
						},
						{
							model: gender,
							as: "genderData",
							required: false,
							attributes: gender.selectedFields,
						},
						{
							model: religion,
							as: "religionData",
							required: false,
							attributes: religion.selectedFields,
						},
						{
							model: community,
							as: "communityData",
							required: false,
							attributes: community.selectedFields,
						},
						{
							model: educQualification,
							as: "educQualificationData",
							required: false,
							attributes: educQualification.selectedFields,
						},
						{
							model: proofType,
							as: "proofTypeData",
							required: false,
							attributes: proofType.selectedFields,
						},
						{
							model: natureOfMigration,
							as: "natureOfMigrationData",
							required: false,
							attributes: natureOfMigration.selectedFields,
						},
					],
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
							attributes: shgMemberType.selectedFields,
						},
						{
							model: relationshipType,
							as: "relationshipTypeData",
							required: false,
							attributes: relationshipType.selectedFields,
						},
					],
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
							attributes: scheme.selectedFields,
						},
						{
							model: scheme,
							as: "edpschemeData",
							required: false,
							attributes: scheme.selectedFields,
						},
						{
							model: scheme,
							as: "registeredEdpSchemeData",
							required: false,
							attributes: scheme.selectedFields,
						},
						{
							model: courseCompletionYear,
							as: "courseCompletionTypeData",
							required: false,
							attributes: courseCompletionYear.selectedFields,
						},
					],
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
				{
					model: symrApplicationStatus,
					as: "symrApplicationStatus",
					required: false,
					attributes: [
						"vprcAssessmentDate",
						"approvedLoanAmount",
						["TNRTP96_CREATED_AT", "approvedOn"],
						["TNRTP96_UPDATED_D", "approvedBy"],
					],
				},
				{
					model: symrDisbursment,
					as: "amountDisbursment",
					required: false,
					where: { disbursmentType: SYMR_DISBURSEMENT_STATE.AMOUNT_DISBURSMENT },
					attributes: [
						"disbursmentDate",
						"disbursmentAmount",
						["TNRTP104_UPDATED_D", "disbursedBy"],
					],
				},
				{
					model: symrDisbursment,
					as: "disbursmentUc",
					required: false,
					where: { disbursmentType: SYMR_DISBURSEMENT_STATE.SUBMIT_UC_DISBURSMENT },
					attributes: ["disbursmentSubmitDate", ["TNRTP104_UPDATED_D", "disbursedBy"]],
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
		const { formId, status, appSubmitDate } = params;
		await symrFormMaster.update(
			{ status, TNRTP68_UPDATED_AT: appSubmitDate ? appSubmitDate : new Date() },
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
		let districtFilter = {}; //
		if (user.role != STAFF_ROLE.SPMU) districtFilter = { TNRTP69_US_DISTRICT_MASTER_D: districtId };
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
				where: { ...districtFilter },
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
							SYMR_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
							SYMR_FORM_MASTER_STATUS.SUBMIT_UC,
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
					where: { TNRTP69_DELETED_F: DELETE_STATUS.NOT_DELETED, ...districtFilter },
					attributes: symrBasicDetails.selectedFields,
					include: [
						{
							model: sourceOfInfo,
							as: "sourceOfInfoData",
							required: false,
							attributes: sourceOfInfo.selectedFields,
						},
						{
							model: gender,
							as: "genderData",
							required: false,
							attributes: gender.selectedFields,
						},
						{
							model: religion,
							as: "religionData",
							required: false,
							attributes: religion.selectedFields,
						},
						{
							model: community,
							as: "communityData",
							required: false,
							attributes: community.selectedFields,
						},
						{
							model: educQualification,
							as: "educQualificationData",
							required: false,
							attributes: educQualification.selectedFields,
						},
						{
							model: proofType,
							as: "proofTypeData",
							required: false,
							attributes: proofType.selectedFields,
						},
						{
							model: natureOfMigration,
							as: "natureOfMigrationData",
							required: false,
							attributes: natureOfMigration.selectedFields,
						},
					],
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
							attributes: shgMemberType.selectedFields,
						},
						{
							model: relationshipType,
							as: "relationshipTypeData",
							required: false,
							attributes: relationshipType.selectedFields,
						},
					],
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
							attributes: scheme.selectedFields,
						},
						{
							model: scheme,
							as: "edpschemeData",
							required: false,
							attributes: scheme.selectedFields,
						},
						{
							model: scheme,
							as: "registeredEdpSchemeData",
							required: false,
							attributes: scheme.selectedFields,
						},
						{
							model: courseCompletionYear,
							as: "courseCompletionTypeData",
							required: false,
							attributes: courseCompletionYear.selectedFields,
						},
					],
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
					},
				],
			}
		);
		await symrFormMaster.update(
			{ status: params.applicationStatus },
			{
				where: { formId },
			}
		);
		let dashBoardFormStatus;
		switch (params.applicationStatus) {
			case SYMR_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.APPROVED;
			}
			case SYMR_FORM_MASTER_STATUS.PENDING: {
				dashBoardFormStatus = DASHBOARD_FORM_STATUS.PENDING;
			}
		}
		if (dashBoardFormStatus) {
			await mainDashboard.update(
				{ applicationStatus: dashBoardFormStatus },
				{
					where: { formId, formTypeId: FORM_TYPES.SYMR_FORM },
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
					TNRTP83_SYMR_FORMS_MASTER_D: {
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
					model: symrApplicationStatus,
					as: "symrApplicationStatus",
					required: false,
					attributes: symrApplicationStatus.selectedFields,
					include: [
						{
							model: symrRequiredDoc,
							as: "vprcCommitteeMom",
							required: false,
							where: { docType: SYMR_STAFF_DOC.VPRC_COMMITTEE_MOM },
							attributes: symrRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: symrDisbursment,
					as: "amountDisbursment",
					required: false,
					where: { disbursmentType: SYMR_DISBURSEMENT_STATE.AMOUNT_DISBURSMENT },
					attributes: [
						"isDisbursment",
						"disbursmentDate",
						"disbursmentAmount",
						["TNRTP104_UPDATED_D", "disbursedBy"],
					],
				},
				{
					model: symrDisbursment,
					as: "disbursmentUc",
					required: false,
					where: { disbursmentType: SYMR_DISBURSEMENT_STATE.SUBMIT_UC_DISBURSMENT },
					attributes: ["disbursmentSubmitDate", ["TNRTP104_UPDATED_D", "disbursedBy"]],
					include: [
						{
							model: symrRequiredDoc,
							as: "firstUcCertificate",
							required: false,
							where: { docType: SYMR_STAFF_DOC.VPRC_COMMITTEE_MOM },
							attributes: symrRequiredDoc.selectedFields,
						},
					],
				},
				{
					model: symrAssessment,
					as: "symrAssessment",
					required: false,
					attributes: symrAssessment.selectedFields,
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
SYMRApplicationService.prototype.updateSymrAmountDisbursmentService = async (params) => {
	try {
		const { formId, userData } = params;
		params.disbursmentType = SYMR_DISBURSEMENT_STATE.AMOUNT_DISBURSMENT;
		delete params.userData;
		params.TNRTP104_CREATED_D = userData.userId;
		params.TNRTP104_UPDATED_D = userData.userId;
		console.log(params);
		await symrDisbursment.create({ ...params });
		await symrFormMaster.update(
			{ status: SYMR_FORM_MASTER_STATUS.SUBMIT_UC },
			{
				where: { formId },
			}
		);
		let dashBoardData = await mainDashboard.findOne({
			where: { formId, formTypeId: FORM_TYPES.SYMR_FORM },
		});
		dashBoardData.totalDisburement = dashBoardData.totalDisburement + params.disbursmentAmount;
		dashBoardData.save();
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("getSymrApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
SYMRApplicationService.prototype.updateSymrDisbursmentUcService = async (params) => {
	try {
		const { formId, userData } = params;
		if (params.firstUcCertificate && params.firstUcCertificate.length) {
			params.firstUcCertificate.map((element) => {
				element.docType = SYMR_STAFF_DOC.VPRC_COMMITTEE_MOM;
			});
		}
		params.disbursmentType = SYMR_DISBURSEMENT_STATE.SUBMIT_UC_DISBURSMENT;
		delete params.userData;
		params.TNRTP104_CREATED_D = userData.userId;
		params.TNRTP104_UPDATED_D = userData.userId;
		console.log(params);
		await symrDisbursment.create(
			{ ...params },
			{
				include: [
					{
						model: symrRequiredDoc,
						as: "firstUcCertificate",
					},
				],
			}
		);
		await symrFormMaster.update(
			{ status: SYMR_FORM_MASTER_STATUS.APPROVED },
			{
				where: { formId },
			}
		);
		return {
			code: errorCodes.HTTP_OK,
			message: messages.success,
		};
	} catch (err) {
		console.log("getSymrApplicationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
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
			data: {
				membersData,
				shgMemberTypeMaster,
				symrRepayOfExistingLoanMaster,
				symrProposedEnterpriseLocationMaster,
				symrExperienceMaster,
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
SYMRApplicationService.prototype.submitSymrAssesmentService = async (params) => {
	try {
		const { formId } = params;
		params.assessments.map((element) => {
			element.formId = formId;
		});
		await symrAssessment.destroy({ where: { formId } }).then(() => {
			return symrAssessment.bulkCreate([...params.assessments], {
				include: [
					{
						model: symrAssessmentDoc,
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

module.exports = new SYMRApplicationService();
