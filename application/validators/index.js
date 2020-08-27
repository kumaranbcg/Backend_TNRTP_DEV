const BaseJoi = require("joi");
const errorMessages = require("../configs/errorMsgs");
const errorCodes = require("../configs/errorCodes");

const schemas = {
	pcFormSubmit: BaseJoi.object({
		basicDetails: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			districtId: BaseJoi.number().positive().allow(0).required(),
			blockId: BaseJoi.number().positive().allow(0).required(),
			panchayatId: BaseJoi.number().positive().allow(0).required(),
			pcName: BaseJoi.string().required(),
			pcAddress: BaseJoi.string().required(),
			name: BaseJoi.string().required(),
			mobileNumber: BaseJoi.string().required(),
			appSubmitDate: BaseJoi.optional(),
		}).required(),
		pcDetails: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			dateFormation: BaseJoi.date().required(),
			dateRegistration: BaseJoi.date().required(),
			registrationUnder: BaseJoi.number().positive().allow(0).required(),
			registrationUnderOthers: BaseJoi.optional(),
			registrationNumber: BaseJoi.string().required(),
			promotingOrgName: BaseJoi.number().positive().allow(0).required(),
			orgOthersName: BaseJoi.optional(),
			otherCommodity: BaseJoi.optional(),
			formSupportedBy: BaseJoi.number().positive().allow(0).required(),
			noOfPG: BaseJoi.string().required(),
			pcTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
			pcCommodityTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
			pcSectorTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
			othersName: BaseJoi.optional(),
		}).required(),
		pcFormMembers: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			totalMembers: BaseJoi.number().positive().allow(0).required(),
			noOfMale: BaseJoi.number().positive().allow(0).required(),
			noOfFemale: BaseJoi.number().positive().allow(0).required(),
			noOfTransGender: BaseJoi.number().positive().allow(0).required(),
			genderTotal: BaseJoi.number().positive().allow(0).required(),
			noOfActive: BaseJoi.number().positive().allow(0).required(),
			noOfInActive: BaseJoi.number().positive().allow(0).required(),
			activeInactiveTotal: BaseJoi.number().positive().allow(0).required(),
			noOfSHGMembers: BaseJoi.number().positive().allow(0).required(),
			noOfSHGTotal: BaseJoi.number().positive().allow(0).required(),
			noOfNonSHGTotal: BaseJoi.number().positive().allow(0).required(),
			shgTotal: BaseJoi.number().positive().allow(0).required(),
			noOfDiffAbled: BaseJoi.number().positive().allow(0).required(),
			noOfWidow: BaseJoi.number().positive().allow(0).required(),
			noOfDesitute: BaseJoi.number().positive().allow(0).required(),
			noOfDeserted: BaseJoi.number().positive().allow(0).required(),
			noOfVulTransGender: BaseJoi.number().positive().allow(0).required(),
			noOfEiderly: BaseJoi.number().positive().allow(0).required(),
			vulnerableTotal: BaseJoi.number().positive().allow(0).required(),
			noOfSC: BaseJoi.number().positive().allow(0).required(),
			noOfST: BaseJoi.number().positive().allow(0).required(),
			noOfMBC: BaseJoi.number().positive().allow(0).required(),
			noOfBC: BaseJoi.number().positive().allow(0).required(),
			noOfCommunityOthers: BaseJoi.number().positive().allow(0).required(),
			communityTotal: BaseJoi.number().positive().allow(0).required(),
			noOfMuslim: BaseJoi.number().positive().allow(0).required(),
			noOfChristians: BaseJoi.number().positive().allow(0).required(),
			noOfMinorityOthers: BaseJoi.number().positive().allow(0).required(),
			minorityTotal: BaseJoi.number().positive().allow(0).required(),
		}).required(),
		pcFormAmountRecevied: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			amtGrant: BaseJoi.number().positive().allow(0).required(),
			amtReceviedLoan: BaseJoi.number().positive().allow(0).required(),
			isLoanGrant: BaseJoi.boolean().required(),
			fundProvider: BaseJoi.when("isLoanGrant", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			amtRecevied: BaseJoi.when("isLoanGrant", {
				is: true,
				then: BaseJoi.number().positive().allow(0).required(),
				otherwise: BaseJoi.optional(),
			}),
			shareCapital: BaseJoi.number().positive().allow(0).required(),
			isSpecialEPO: BaseJoi.boolean().required(),
			specifyEPO: BaseJoi.when("isSpecialEPO", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
		}).required(),
		pcFormBankDetails: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			accNumber: BaseJoi.string().required(),
			accName: BaseJoi.string().required(),
			bnkName: BaseJoi.string().required(),
			branchName: BaseJoi.string().required(),
			ifscCode: BaseJoi.string().required(),
		}).required(),
		pcFormProposedActivity: BaseJoi.array()
			.items({
				formId: BaseJoi.number().positive().allow(0).required(),
				activityName: BaseJoi.string().required(),
				activityTimeLine: BaseJoi.number().positive().allow(0).required(),
				activityTimeLineVal: BaseJoi.number().positive().allow(0).required(),
				amtReq: BaseJoi.number().positive().allow(0).required(),
			})
			.required(),
		uploadDocuments: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
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
			formId: BaseJoi.number().positive().allow(0).required(),
			districtId: BaseJoi.number().positive().allow(0).required(),
			blockId: BaseJoi.number().positive().allow(0).required(),
			panchayatId: BaseJoi.number().positive().allow(0).required(),
			pgName: BaseJoi.string().required(),
			pgAddress: BaseJoi.string().required(),
			name: BaseJoi.string().required(),
			mobileNumber: BaseJoi.string().required(),
			appSubmitDate: BaseJoi.optional(),
		}).required(),
		pgDetails: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			dateFormation: BaseJoi.date().required(),
			dateRegistration: BaseJoi.date().required(),
			registrationUnder: BaseJoi.number().positive().allow(0).required(),
			registrationUnderOthers: BaseJoi.optional(),
			registrationNumber: BaseJoi.string().required(),
			promotingOrgName: BaseJoi.number().positive().allow(0).required(),
			orgOthersName: BaseJoi.optional(),
			otherCommodity: BaseJoi.optional(),
			formSupportedBy: BaseJoi.number().positive().allow(0).required(),
			// noOfPG: BaseJoi.string().required(),
			othersName: BaseJoi.optional(),
			pgTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
			pgCommodityTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
			pgSectorTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
		}).required(),
		pgFormMembers: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			totalMembers: BaseJoi.number().positive().allow(0).required(),
			noOfMale: BaseJoi.number().positive().allow(0).required(),
			noOfFemale: BaseJoi.number().positive().allow(0).required(),
			noOfTransGender: BaseJoi.number().positive().allow(0).required(),
			genderTotal: BaseJoi.number().positive().allow(0).required(),
			noOfActive: BaseJoi.number().positive().allow(0).required(),
			noOfInActive: BaseJoi.number().positive().allow(0).required(),
			activeInactiveTotal: BaseJoi.number().positive().allow(0).required(),
			noOfSHGMembers: BaseJoi.number().positive().allow(0).required(),
			noOfSHGTotal: BaseJoi.number().positive().allow(0).required(),
			noOfNonSHGTotal: BaseJoi.number().positive().allow(0).required(),
			shgTotal: BaseJoi.number().positive().allow(0).required(),
			noOfDiffAbled: BaseJoi.number().positive().allow(0).required(),
			noOfWidow: BaseJoi.number().positive().allow(0).required(),
			noOfDesitute: BaseJoi.number().positive().allow(0).required(),
			noOfDeserted: BaseJoi.number().positive().allow(0).required(),
			noOfVulTransGender: BaseJoi.number().positive().allow(0).required(),
			noOfEiderly: BaseJoi.number().positive().allow(0).required(),
			vulnerableTotal: BaseJoi.number().positive().allow(0).required(),
			noOfSC: BaseJoi.number().positive().allow(0).required(),
			noOfST: BaseJoi.number().positive().allow(0).required(),
			noOfMBC: BaseJoi.number().positive().allow(0).required(),
			noOfBC: BaseJoi.number().positive().allow(0).required(),
			noOfCommunityOthers: BaseJoi.number().positive().allow(0).required(),
			communityTotal: BaseJoi.number().positive().allow(0).required(),
			noOfMuslim: BaseJoi.number().positive().allow(0).required(),
			noOfChristians: BaseJoi.number().positive().allow(0).required(),
			noOfMinorityOthers: BaseJoi.number().positive().allow(0).required(),
			minorityTotal: BaseJoi.number().positive().allow(0).required(),
		}).required(),
		pgFormAmountRecevied: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			amtGrant: BaseJoi.number().positive().allow(0).required(),
			amtReceviedLoan: BaseJoi.number().positive().allow(0).required(),
			isLoanGrant: BaseJoi.boolean().required(),
			fundProvider: BaseJoi.when("isLoanGrant", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			amtRecevied: BaseJoi.when("isLoanGrant", {
				is: true,
				then: BaseJoi.number().positive().allow(0).required(),
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
			formId: BaseJoi.number().positive().allow(0).required(),
			accNumber: BaseJoi.string().required(),
			accName: BaseJoi.string().required(),
			bnkName: BaseJoi.string().required(),
			branchName: BaseJoi.string().required(),
			ifscCode: BaseJoi.string().required(),
			noOfLastTransaction: BaseJoi.number().positive().allow(0).required(),
		}).required(),
		pgFormProposedActivity: BaseJoi.array()
			.items({
				formId: BaseJoi.number().positive().allow(0).required(),
				activityName: BaseJoi.string().required(),
				activityTimeLine: BaseJoi.number().positive().allow(0).required(),
				activityTimeLineVal: BaseJoi.number().positive().allow(0).required(),
				amtReq: BaseJoi.number().positive().allow(0).required(),
			})
			.required(),
		uploadDocuments: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
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
			formId: BaseJoi.number().positive().allow(0).required(),
			districtId: BaseJoi.number().positive().allow(0).required(),
			blockId: BaseJoi.number().positive().allow(0).required(),
			panchayatId: BaseJoi.number().positive().allow(0).required(),
			egName: BaseJoi.string().required(),
			egAddress: BaseJoi.string().required(),
			name: BaseJoi.string().required(),
			mobileNumber: BaseJoi.string().required(),
			appSubmitDate: BaseJoi.optional(),
		}).required(),
		egDetails: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			dateFormation: BaseJoi.date().required(),
			dateRegistration: BaseJoi.date().required(),
			registrationUnder: BaseJoi.number().positive().allow(0).required(),
			registrationUnderOthers: BaseJoi.optional(),
			registrationNumber: BaseJoi.string().required(),
			promotingOrgName: BaseJoi.number().positive().allow(0).required(),
			orgOthersName: BaseJoi.optional(),
			otherCommodity: BaseJoi.optional(),
			formSupportedBy: BaseJoi.number().positive().allow(0).required(),
			// noOfPG: BaseJoi.number().positive().allow(0).required(),
			othersName: BaseJoi.optional(),
			egTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
			egCommodityTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
			egSectorTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
		}).required(),
		egFormMembers: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			totalMembers: BaseJoi.number().positive().allow(0).required(),
			noOfStaffEngaged: BaseJoi.number().positive().allow(0).required(),
			noOfMale: BaseJoi.number().positive().allow(0).required(),
			noOfFemale: BaseJoi.number().positive().allow(0).required(),
			noOfTransGender: BaseJoi.number().positive().allow(0).required(),
			genderTotal: BaseJoi.number().positive().allow(0).required(),
			noOfActive: BaseJoi.number().positive().allow(0).required(),
			noOfInActive: BaseJoi.number().positive().allow(0).required(),
			activeInactiveTotal: BaseJoi.number().positive().allow(0).required(),
			noOfSHGMembers: BaseJoi.number().positive().allow(0).required(),
			noOfSHGTotal: BaseJoi.number().positive().allow(0).required(),
			noOfNonSHGTotal: BaseJoi.number().positive().allow(0).required(),
			shgTotal: BaseJoi.number().positive().allow(0).required(),
			noOfDiffAbled: BaseJoi.number().positive().allow(0).required(),
			noOfWidow: BaseJoi.number().positive().allow(0).required(),
			noOfDesitute: BaseJoi.number().positive().allow(0).required(),
			noOfDeserted: BaseJoi.number().positive().allow(0).required(),
			noOfVulTransGender: BaseJoi.number().positive().allow(0).required(),
			noOfEiderly: BaseJoi.number().positive().allow(0).required(),
			vulnerableTotal: BaseJoi.number().positive().allow(0).required(),
			noOfSC: BaseJoi.number().positive().allow(0).required(),
			noOfST: BaseJoi.number().positive().allow(0).required(),
			noOfMBC: BaseJoi.number().positive().allow(0).required(),
			noOfBC: BaseJoi.number().positive().allow(0).required(),
			noOfCommunityOthers: BaseJoi.number().positive().allow(0).required(),
			communityTotal: BaseJoi.number().positive().allow(0).required(),
			noOfMuslim: BaseJoi.number().positive().allow(0).required(),
			noOfChristians: BaseJoi.number().positive().allow(0).required(),
			noOfMinorityOthers: BaseJoi.number().positive().allow(0).required(),
			minorityTotal: BaseJoi.number().positive().allow(0).required(),
		}).required(),
		egFormAmountRecevied: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			amtGrant: BaseJoi.number().positive().allow(0).required(),
			amtReceviedLoan: BaseJoi.number().positive().allow(0).required(),
			isLoanGrant: BaseJoi.boolean().required(),
			fundProvider: BaseJoi.when("isLoanGrant", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			amtRecevied: BaseJoi.when("isLoanGrant", {
				is: true,
				then: BaseJoi.number().positive().allow(0).required(),
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
			formId: BaseJoi.number().positive().allow(0).required(),
			accNumber: BaseJoi.string().required(),
			accName: BaseJoi.string().required(),
			bnkName: BaseJoi.string().required(),
			branchName: BaseJoi.string().required(),
			ifscCode: BaseJoi.string().required(),
			noOfLastTransaction: BaseJoi.number().positive().allow(0).required(),
		}).required(),
		egFormProposedActivity: BaseJoi.array()
			.items({
				formId: BaseJoi.number().positive().allow(0).required(),
				activityName: BaseJoi.string().required(),
				activityTimeLine: BaseJoi.number().positive().allow(0).required(),
				activityTimeLineVal: BaseJoi.number().positive().allow(0).required(),
				amtReq: BaseJoi.number().positive().allow(0).required(),
			})
			.required(),
		uploadDocuments: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
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
			formId: BaseJoi.number().positive().allow(0).required(),
			sourceInfo: BaseJoi.number().positive().allow(0).required(),
			name: BaseJoi.string().required(),
			mobileNumber: BaseJoi.string().required(),
			address: BaseJoi.string().required(),
			fatherName: BaseJoi.string().required(),
			dateOfBirth: BaseJoi.date().required(),
			age: BaseJoi.number().positive().allow(0).required(),
			gender: BaseJoi.number().positive().allow(0).required(),
			religion: BaseJoi.number().positive().allow(0).required(),
			otherReligion: BaseJoi.optional(),
			community: BaseJoi.number().positive().allow(0).required(),
			otherCommunity: BaseJoi.optional(),
			educationQualification: BaseJoi.number().positive().allow(0).required(),
			otherEduQualification: BaseJoi.optional(),
			proofType: BaseJoi.number().positive().allow(0).required(),
			govtIdNumber: BaseJoi.string().required(),
			natureOfMigration: BaseJoi.number().positive().allow(0).required(),
			placeReturnFrom: BaseJoi.string().required(),
			previousOccupation: BaseJoi.string().required(),
			isWomeHeaded: BaseJoi.boolean().required(),
			isVulnerableCategory: BaseJoi.boolean().required(),
			districtId: BaseJoi.number().positive().allow(0).required(),
			blockId: BaseJoi.number().positive().allow(0).required(),
			panchayatId: BaseJoi.number().positive().allow(0).required(),
			appSubmitDate: BaseJoi.optional(),
		}).required(),
		symrShgDetails: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			shgMemberType: BaseJoi.number().positive().allow(0).required(),
			relationshipType: BaseJoi.number().positive().allow(0).required(),
			shgName: BaseJoi.string().required(),
			eMathiCode: BaseJoi.string().required(),
		}).required(),
		symrSkillTraining: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			isSkillTrained: BaseJoi.boolean().required(),
			trainingInstitute: BaseJoi.when("isSkillTrained", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
			skillTrainingScheme: BaseJoi.when("isSkillTrained", {
				is: true,
				then: BaseJoi.number().positive().allow(0).required(),
				otherwise: BaseJoi.optional(),
			}),
			otherSkillTrainingScheme: BaseJoi.optional(),
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
				then: BaseJoi.number().positive().allow(0).required(),
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
				then: BaseJoi.number().positive().allow(0).required(),
				otherwise: BaseJoi.optional(),
			}),
			otherEdpScheme: BaseJoi.optional(),
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
				then: BaseJoi.number().positive().allow(0).required(),
				otherwise: BaseJoi.optional(),
			}),
			otherRegisteredEdpScheme: BaseJoi.optional(),
		}).required(),
		symrEnterprise: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			grantenterpriseName: BaseJoi.string().required(),
			enterpriseType: BaseJoi.number().positive().allow(0).required(),
			grantActivityName: BaseJoi.string().required(),
			symrTypes: BaseJoi.array().items({
				value: BaseJoi.number().positive().allow(0).required(),
			}),
			symrSectorTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
			symrCommodityTypes: BaseJoi.array()
				.items({
					value: BaseJoi.number().positive().allow(0).required(),
				})
				.required(),
			otherCommodity: BaseJoi.optional(),
			summary: BaseJoi.string().required(),
			noOfPersons: BaseJoi.number().positive().allow(0).required(),
			isExperiencedEnterpreneur: BaseJoi.boolean().required(),
			enterpreneurExpYears: BaseJoi.when("isExperiencedEnterpreneur", {
				is: true,
				then: BaseJoi.number().positive().allow(0).required(),
				otherwise: BaseJoi.optional(),
			}),
			isEmployedInActivity: BaseJoi.boolean().required(),
			activityExpYears: BaseJoi.when("isEmployedInActivity", {
				is: true,
				then: BaseJoi.number().positive().allow(0).required(),
				otherwise: BaseJoi.optional(),
			}),
			designation: BaseJoi.optional(),
			location: BaseJoi.optional(),
			isLoanAppliedPreviously: BaseJoi.boolean().required(),
			schemeAmount: BaseJoi.when("isLoanAppliedPreviously", {
				is: true,
				then: BaseJoi.number().positive().allow(0).required(),
				otherwise: BaseJoi.optional(),
			}),
			schemeName: BaseJoi.when("isLoanAppliedPreviously", {
				is: true,
				then: BaseJoi.string().required(),
				otherwise: BaseJoi.optional(),
			}),
		}).required(),
		symrBankDetails: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
			accNumber: BaseJoi.string().required(),
			accName: BaseJoi.string().required(),
			bnkName: BaseJoi.string().required(),
			branchName: BaseJoi.string().required(),
			ifscCode: BaseJoi.string().required(),
		}).required(),
		symrProposedActivity: BaseJoi.array()
			.items({
				formId: BaseJoi.number().positive().allow(0).required(),
				activityName: BaseJoi.string().required(),
				activityTimeLine: BaseJoi.number().positive().allow(0).required(),
				activityTimeLineVal: BaseJoi.number().positive().allow(0).required(),
				amtReq: BaseJoi.number().positive().allow(0).required(),
			})
			.required(),
		symrExistingLoan: BaseJoi.object({
			isExistingLoan: BaseJoi.boolean().required(),
			formId: BaseJoi.number().positive().allow(0).required(),
			loanDetails: BaseJoi.when("isExistingLoan", {
				is: true,
				then: BaseJoi.array().items({
					isExistingLoan: BaseJoi.boolean().required(),
					loanSource: BaseJoi.string().required(),
					loanReceivedDate: BaseJoi.date().required(),
					loanAmount: BaseJoi.number().positive().allow(0).required(),
					interestRate: BaseJoi.number().positive().allow(0).required(),
					amountToBeRepaid: BaseJoi.number().positive().allow(0).required(),
					amountRepaid: BaseJoi.number().positive().allow(0).required(),
					balanceAmtToBeRepaid: BaseJoi.number().positive().allow(0).required(),
					reason: BaseJoi.string().required(),
				}),
				otherwise: BaseJoi.optional(),
			}),
		}).required(),
		uploadDocuments: BaseJoi.object({
			formId: BaseJoi.number().positive().allow(0).required(),
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
