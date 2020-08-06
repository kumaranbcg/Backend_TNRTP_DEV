const BaseJoi = require("joi");
const errorMessages = require("../configs/errorMsgs");
const errorCodes = require("../configs/errorCodes");

const schemas = {
	pcFormSubmit: BaseJoi.object({
		basicDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			districtId: BaseJoi.number().required(),
			blockId: BaseJoi.number().required(),
			panchayatId: BaseJoi.number().required(),
			pcName: BaseJoi.string().required(),
			pcAddress: BaseJoi.string().required(),
			name: BaseJoi.string().required(),
			mobileNumber: BaseJoi.string().required(),
		}).required(),
		pcDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			dateFormation: BaseJoi.date().required(),
			dateRegistration: BaseJoi.date().required(),
			registrationUnder: BaseJoi.number().required(),
			registrationNumber: BaseJoi.string().required(),
			promotingOrgName: BaseJoi.string().required(),
			formSupportedBy: BaseJoi.number().required(),
			noOfPG: BaseJoi.number().required(),
			typesOfPc: BaseJoi.array()
				.items({
					formId: BaseJoi.number().required(),
					typePc: BaseJoi.number().required(),
				})
				.required(),
			typesOfCommodity: BaseJoi.array()
				.items({
					formId: BaseJoi.number().required(),
					typeCommodity: BaseJoi.number().required(),
				})
				.required(),
			typesOfSector: BaseJoi.array()
				.items({
					formId: BaseJoi.number().required(),
					typeSector: BaseJoi.number().required(),
				})
				.required(),
			othersName: BaseJoi.optional(),
		}).required(),
		pcFormMembers: BaseJoi.object({
			formId: BaseJoi.number().required(),
			noOfMale: BaseJoi.number().required(),
			noOfFemale: BaseJoi.number().required(),
			noOfTransGender: BaseJoi.number().required(),
			genderTotal: BaseJoi.number().required(),
			noOfActive: BaseJoi.number().required(),
			noOfInActive: BaseJoi.number().required(),
			activeInactiveTotal: BaseJoi.number().required(),
			noOfSHGMembers: BaseJoi.number().required(),
			noOfSHGTotal: BaseJoi.number().required(),
			shgTotal: BaseJoi.number().required(),
			noOfDiffAbled: BaseJoi.number().required(),
			noOfWidow: BaseJoi.number().required(),
			noOfDesitute: BaseJoi.number().required(),
			noOfDeserted: BaseJoi.number().required(),
			noOfVulTransGender: BaseJoi.number().required(),
			noOfEiderly: BaseJoi.number().required(),
			vulnerableTotal: BaseJoi.number().required(),
			noOfSC: BaseJoi.number().required(),
			noOfST: BaseJoi.number().required(),
			noOfMBC: BaseJoi.number().required(),
			noOfBC: BaseJoi.number().required(),
			noOfCommunityOthers: BaseJoi.number().required(),
			communityTotal: BaseJoi.number().required(),
			noOfMuslim: BaseJoi.number().required(),
			noOfChristians: BaseJoi.number().required(),
			noOfMinorityOthers: BaseJoi.number().required(),
			minorityTotal: BaseJoi.number().required(),
		}).required(),
		pcFormAmountRecevied: BaseJoi.object({
			formId: BaseJoi.number().required(),
			amtGrant: BaseJoi.number().required(),
			amtReceviedLoan: BaseJoi.number().required(),
			isLoanGrant: BaseJoi.boolean().required(),
			fundProvider: BaseJoi.when("isLoanGrant", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			amtRecevied: BaseJoi.when("isLoanGrant", {
				is: true,
				then: BaseJoi.number().required(),
				otherwise: BaseJoi.optional(),
			}),
			shareCapital: BaseJoi.number().required(),
			isSpecialEPO: BaseJoi.boolean().required(),
			specifyEPO: BaseJoi.when("isSpecialEPO", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
		}).required(),
		pcFormBankDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			accNumber: BaseJoi.string().required(),
			accName: BaseJoi.string().required(),
			bnkName: BaseJoi.string().required(),
			branchName: BaseJoi.string().required(),
			ifscCode: BaseJoi.string().required(),
		}).required(),
		pcFormProposedActivity: BaseJoi.array()
			.items({
				formId: BaseJoi.number().required(),
				activityName: BaseJoi.string().required(),
				activityTimeLine: BaseJoi.number().required(),
				activityTimeLineVal: BaseJoi.number().required(),
				amtReq: BaseJoi.number().required(),
			})
			.required(),
		uploadDocuments: BaseJoi.object({
			formId: BaseJoi.number().required(),
			regCertificate: BaseJoi.array()
				.items({
					formId: BaseJoi.number().required(),
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
					docType: BaseJoi.number().required(),
				})
				.required(),
			auditStatement: BaseJoi.array()
				.items({
					formId: BaseJoi.number().required(),
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
					docType: BaseJoi.number().required(),
				})
				.required(),
			bankPassBook: BaseJoi.array()
				.items({
					formId: BaseJoi.number().required(),
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
					docType: BaseJoi.number().required(),
				})
				.required(),
			latestMomRes: BaseJoi.array()
				.items({
					formId: BaseJoi.number().required(),
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
					docType: BaseJoi.number().required(),
				})
				.required(),
			businessPlan: BaseJoi.array()
				.items({
					formId: BaseJoi.number().required(),
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
					docType: BaseJoi.number().required(),
				})
				.required(),
			remarks: BaseJoi.string().required(),
		}).required(),
	}),
};

const options = {
	basic: {
		abortEarly: false,
		convert: true,
		allowUnknown: false,
		stripUnknown: true,
	},
	array: {
		abortEarly: false,
		convert: true,
		allowUnknown: true,
		stripUnknown: {
			objects: true,
		},
	},
};

const pcFormSubmit = async (req, res, next) => {
	var schema = schemas.pcFormSubmit;
	let option = options.basic;
	try {
		await schema.validateAsync({ ...req.body }, option);
		next();
	} catch (err) {
		let error = err.details.reduce((prev, curr) => {
			prev[curr.path[0]] = curr.message.replace(/"/g, "");
			return prev;
		}, {});
		console.log(error);
		let message = errorMessages[errorCodes.HTTP_UNPROCESSABLE_ENTITY];
		let status = errorCodes.HTTP_UNPROCESSABLE_ENTITY;

		return res.status(status).json({
			status,
			message,
			error,
		});
	}
	// schema
	// 	.validate(
	// 		{
	// 			...req.body,
	// 			type: req.headers["user-type"],
	// 		},
	// 		option
	// 	)
	// 	.then(() => {
	// 		next();
	// 	})
	// 	.catch((err) => {
	// 		let error = err.details.reduce((prev, curr) => {
	// 			prev[curr.path[0]] = curr.message.replace(/"/g, "");
	// 			return prev;
	// 		}, {});
	// 		let message = msg
	// 			? Object.values(error).join(", ") + ", " + messageTypes.errorMessages.badRequest
	// 			: messageTypes.errorMessages.badRequest;
	// 		let status = responseStatus.HTTP_UNPROCESSABLE_ENTITY;
	// 		req.appLogger.error(
	// 			`URL : ${req.protocol}://${req.get("host")}${req.originalUrl} | Request : ${JSON.stringify(
	// 				req.value ? req.value : {}
	// 			)} | BadRequestError : ${JSON.stringify(error)}`
	// 		);

	// 		return res.status(status).json({
	// 			status,
	// 			message,
	// 			error,
	// 		});
	// 	});
};
module.exports.pcFormSubmit = pcFormSubmit;
