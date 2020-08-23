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
			promotingOrgName: BaseJoi.number().required(),
			orgOthersName: BaseJoi.optional(),
			formSupportedBy: BaseJoi.number().required(),
			noOfPG: BaseJoi.string().required(),
			pcTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
			pcCommodityTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
			pcSectorTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
			othersName: BaseJoi.optional(),
		}).required(),
		pcFormMembers: BaseJoi.object({
			formId: BaseJoi.number().required(),
			totalMembers: BaseJoi.number().required(),
			noOfMale: BaseJoi.number().required(),
			noOfFemale: BaseJoi.number().required(),
			noOfTransGender: BaseJoi.number().required(),
			genderTotal: BaseJoi.number().required(),
			noOfActive: BaseJoi.number().required(),
			noOfInActive: BaseJoi.number().required(),
			activeInactiveTotal: BaseJoi.number().required(),
			noOfSHGMembers: BaseJoi.number().required(),
			noOfSHGTotal: BaseJoi.number().required(),
			noOfNonSHGTotal: BaseJoi.number().required(),
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
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			auditStatement: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			bankPassBook: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			latestMomRes: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			businessPlan: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			remarks: BaseJoi.string().required(),
		}).required(),
	}),
	pgFormSubmit: BaseJoi.object({
		basicDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			districtId: BaseJoi.number().required(),
			blockId: BaseJoi.number().required(),
			panchayatId: BaseJoi.number().required(),
			pgName: BaseJoi.string().required(),
			pgAddress: BaseJoi.string().required(),
			name: BaseJoi.string().required(),
			mobileNumber: BaseJoi.string().required(),
		}).required(),
		pgDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			dateFormation: BaseJoi.date().required(),
			dateRegistration: BaseJoi.date().required(),
			registrationUnder: BaseJoi.number().required(),
			registrationNumber: BaseJoi.string().required(),
			promotingOrgName: BaseJoi.number().required(),
			orgOthersName: BaseJoi.optional(),
			formSupportedBy: BaseJoi.number().required(),
			// noOfPG: BaseJoi.string().required(),
			othersName: BaseJoi.optional(),
			pgTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
			pgCommodityTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
			pgSectorTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
		}).required(),
		pgFormMembers: BaseJoi.object({
			formId: BaseJoi.number().required(),
			totalMembers: BaseJoi.number().required(),
			noOfMale: BaseJoi.number().required(),
			noOfFemale: BaseJoi.number().required(),
			noOfTransGender: BaseJoi.number().required(),
			genderTotal: BaseJoi.number().required(),
			noOfActive: BaseJoi.number().required(),
			noOfInActive: BaseJoi.number().required(),
			activeInactiveTotal: BaseJoi.number().required(),
			noOfSHGMembers: BaseJoi.number().required(),
			noOfSHGTotal: BaseJoi.number().required(),
			noOfNonSHGTotal: BaseJoi.number().required(),
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
		pgFormAmountRecevied: BaseJoi.object({
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
			isSpecialEPO: BaseJoi.boolean().required(),
			specifyEPO: BaseJoi.when("isSpecialEPO", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			nameOfPc: BaseJoi.string().required(),
		}).required(),
		pgFormBankDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			accNumber: BaseJoi.string().required(),
			accName: BaseJoi.string().required(),
			bnkName: BaseJoi.string().required(),
			branchName: BaseJoi.string().required(),
			ifscCode: BaseJoi.string().required(),
			noOfLastTransaction: BaseJoi.number().required(),
		}).required(),
		pgFormProposedActivity: BaseJoi.array()
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
			minOfPGRefund: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			bankPassBook: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			businessPlan: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			remarks: BaseJoi.string().required(),
		}).required(),
	}),
	egFormSubmit: BaseJoi.object({
		basicDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			districtId: BaseJoi.number().required(),
			blockId: BaseJoi.number().required(),
			panchayatId: BaseJoi.number().required(),
			egName: BaseJoi.string().required(),
			egAddress: BaseJoi.string().required(),
			name: BaseJoi.string().required(),
			mobileNumber: BaseJoi.string().required(),
		}).required(),
		egDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			dateFormation: BaseJoi.date().required(),
			dateRegistration: BaseJoi.date().required(),
			registrationUnder: BaseJoi.number().required(),
			registrationNumber: BaseJoi.string().required(),
			promotingOrgName: BaseJoi.string().required(),
			formSupportedBy: BaseJoi.number().required(),
			// noOfPG: BaseJoi.number().required(),
			othersName: BaseJoi.optional(),
			egTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
			egCommodityTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
			egSectorTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
		}).required(),
		egFormMembers: BaseJoi.object({
			formId: BaseJoi.number().required(),
			totalMembers: BaseJoi.number().required(),
			noOfMale: BaseJoi.number().required(),
			noOfFemale: BaseJoi.number().required(),
			noOfTransGender: BaseJoi.number().required(),
			genderTotal: BaseJoi.number().required(),
			noOfActive: BaseJoi.number().required(),
			noOfInActive: BaseJoi.number().required(),
			activeInactiveTotal: BaseJoi.number().required(),
			noOfSHGMembers: BaseJoi.number().required(),
			noOfSHGTotal: BaseJoi.number().required(),
			noOfNonSHGTotal: BaseJoi.number().required(),
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
		egFormAmountRecevied: BaseJoi.object({
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
			isSpecialEPO: BaseJoi.boolean().required(),
			specifyEPO: BaseJoi.when("isSpecialEPO", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			nameOfPc: BaseJoi.string().required(),
		}).required(),
		egFormBankDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			accNumber: BaseJoi.string().required(),
			accName: BaseJoi.string().required(),
			bnkName: BaseJoi.string().required(),
			branchName: BaseJoi.string().required(),
			ifscCode: BaseJoi.string().required(),
			noOfLastTransaction: BaseJoi.number().required(),
		}).required(),
		egFormProposedActivity: BaseJoi.array()
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
			minOfEGRefund: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			bankPassBook: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			businessPlan: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			remarks: BaseJoi.string().required(),
		}).required(),
	}),
	symrFormSubmit: BaseJoi.object({
		basicDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			sourceInfo: BaseJoi.number().required(),
			name: BaseJoi.string().required(),
			mobileNumber: BaseJoi.string().required(),
			address: BaseJoi.string().required(),
			fatherName: BaseJoi.string().required(),
			dateOfBirth: BaseJoi.date().required(),
			age: BaseJoi.number().required(),
			gender: BaseJoi.number().required(),
			religion: BaseJoi.number().required(),
			community: BaseJoi.number().required(),
			educationQualification: BaseJoi.number().required(),
			proofType: BaseJoi.number().required(),
			govtIdNumber: BaseJoi.string().required(),
			natureOfMigration: BaseJoi.number().required(),
			placeReturnFrom: BaseJoi.string().required(),
			previousOccupation: BaseJoi.string().required(),
			isWomeHeaded: BaseJoi.boolean().required(),
			isVulnerableCategory: BaseJoi.boolean().required(),
			districtId: BaseJoi.number().required(),
			blockId: BaseJoi.number().required(),
			panchayatId: BaseJoi.number().required(),
		}).required(),
		symrShgDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			shgMemberType: BaseJoi.number().required(),
			relationshipType: BaseJoi.number().required(),
			shgName: BaseJoi.string().required(),
			eMathiCode: BaseJoi.string().required(),
		}).required(),
		symrSkillTraining: BaseJoi.object({
			formId: BaseJoi.number().required(),
			isSkillTrained: BaseJoi.boolean().required(),
			trainingInstitute: BaseJoi.when("isSkillTrained", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			skillTrainingScheme: BaseJoi.when("isSkillTrained", {
				is: true,
				then: BaseJoi.number().required(),
				otherwise: BaseJoi.optional(),
			}),
			specifyOther: BaseJoi.when("isSkillTrained", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			courseName: BaseJoi.when("isSkillTrained", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			courseCompletionYear: BaseJoi.when("isSkillTrained", {
				is: true,
				then: BaseJoi.number().required(),
				otherwise: BaseJoi.optional(),
			}),
			isCompletedEdpProgramme: BaseJoi.boolean().required(),
			edpCompletedInstituteName: BaseJoi.when("isCompletedEdpProgramme", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			edpCompletedCourseName: BaseJoi.when("isCompletedEdpProgramme", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			edpScheme: BaseJoi.when("isCompletedEdpProgramme", {
				is: true,
				then: BaseJoi.number().required(),
				otherwise: BaseJoi.optional(),
			}),
			isRegisteredEdpProgramme: BaseJoi.boolean().required(),
			edpRegisteredInstituteName: BaseJoi.when("isRegisteredEdpProgramme", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			edpRegisteredCourseName: BaseJoi.when("isRegisteredEdpProgramme", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			registeredEdpScheme: BaseJoi.when("isRegisteredEdpProgramme", {
				is: true,
				then: BaseJoi.number().required(),
				otherwise: BaseJoi.optional(),
			}),
		}).required(),
		symrEnterprise: BaseJoi.object({
			formId: BaseJoi.number().required(),
			grantenterpriseName: BaseJoi.string().required(),
			enterpriseType: BaseJoi.number().required(),
			grantActivityName: BaseJoi.string().required(),
			symrTypes: BaseJoi.array().items({
				value: BaseJoi.number().required(),
			}),
			symrSectorTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
			symrCommodityTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().required(),
				})
				.required(),
			summary: BaseJoi.string().required(),
			noOfPersons: BaseJoi.number().required(),
			isExperiencedEnterpreneur: BaseJoi.boolean().required(),
			enterpreneurExpYears: BaseJoi.when("isExperiencedEnterpreneur", {
				is: true,
				then: BaseJoi.number().required(),
				otherwise: BaseJoi.optional(),
			}),
			isEmployedInActivity: BaseJoi.boolean().required(),
			activityExpYears: BaseJoi.when("isEmployedInActivity", {
				is: true,
				then: BaseJoi.number().required(),
				otherwise: BaseJoi.optional(),
			}),
			designation: BaseJoi.optional(),
			location: BaseJoi.optional(),
			isLoanAppliedPreviously: BaseJoi.boolean().required(),
			schemeAmount: BaseJoi.when("isLoanAppliedPreviously", {
				is: true,
				then: BaseJoi.number().required(),
				otherwise: BaseJoi.optional(),
			}),
			schemeName: BaseJoi.when("isLoanAppliedPreviously", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
		}).required(),
		symrBankDetails: BaseJoi.object({
			formId: BaseJoi.number().required(),
			accNumber: BaseJoi.string().required(),
			accName: BaseJoi.string().required(),
			bnkName: BaseJoi.string().required(),
			branchName: BaseJoi.string().required(),
			ifscCode: BaseJoi.string().required(),
		}).required(),
		symrProposedActivity: BaseJoi.array()
			.items({
				formId: BaseJoi.number().required(),
				activityName: BaseJoi.string().required(),
				activityTimeLine: BaseJoi.number().required(),
				activityTimeLineVal: BaseJoi.number().required(),
				amtReq: BaseJoi.number().required(),
			})
			.required(),
		symrExistingLoan: BaseJoi.object({
			isExistingLoan: BaseJoi.boolean().required(),
			formId: BaseJoi.number().required(),
			loanDetails: BaseJoi.when("isExistingLoan", {
				is: true,
				then: BaseJoi.array().items({
					isExistingLoan: BaseJoi.boolean().required(),
					loanSource: BaseJoi.string().required(),
					loanReceivedDate: BaseJoi.date().required(),
					loanAmount: BaseJoi.number().required(),
					interestRate: BaseJoi.number().required(),
					amountToBeRepaid: BaseJoi.number().required(),
					amountRepaid: BaseJoi.number().required(),
					balanceAmtToBeRepaid: BaseJoi.number().required(),
					reason: BaseJoi.string().required(),
				}),
				otherwise: BaseJoi.optional(),
			}),
		}).required(),
		uploadDocuments: BaseJoi.object({
			formId: BaseJoi.number().required(),
			proofOfMigration: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			applicationLetter: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			idProofPhoto: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			bankPassBook: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			trainingCertificate: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
				})
				.required(),
			businessPlan: BaseJoi.array()
				.items({
					docUrl: BaseJoi.string().required(),
					docName: BaseJoi.string().required(),
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
const pgFormSubmit = async (req, res, next) => {
	var schema = schemas.pgFormSubmit;
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
};
const egFormSubmit = async (req, res, next) => {
	var schema = schemas.egFormSubmit;
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
};
const symrFormSubmit = async (req, res, next) => {
	var schema = schemas.symrFormSubmit;
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
};
module.exports.pcFormSubmit = pcFormSubmit;
module.exports.pgFormSubmit = pgFormSubmit;
module.exports.egFormSubmit = egFormSubmit;
module.exports.symrFormSubmit = symrFormSubmit;
