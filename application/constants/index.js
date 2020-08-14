const STAFF_ROLE = {
	ADMIN: 1,
	SPMU: 2,
	DPMU: 3,
	BPMU: 4,
	PLF: 5,
	VPRC: 6,
	ALL: 7,
	PUBLIC: 8,
};
const ORDERBY = {
	ASC: 0,
	DESC: 1,
};

const DASHBOARD_FORM_STATUS = {
	APPROVED: 1,
	PENDING: 2,
	REJECTED: 3,
};
const STAFF_STATUS = {
	INACTIVE: 0,
	ACTIVE: 1,
	ALL: 2,
};

const PC_FORM_MASTER_STATUS = {
	DRAFT: 1,
	OPEN_APPLICATION: 2,
	PENDING: 3,
	FIRST_TRANCHE: 4,
	SECOND_TRANCHE: 5,
	SECOND_TRANCHE_UC: 6,
	APPROVED: 7,
	DECLINED: 8,
};
// symr start
const SYMR_FORM_MASTER_STATUS = {
	DRAFT: 1,
	OPEN_APPLICATION: 2,
	PENDING: 3,
};
const SYMR_FORM_STAGE = {
	BASIC_DETAILS: "1",
	SHG_DETAILS: "2",
	SKILL_EDP: "3",
	ENTERPRISE_ACTIVITY: "4",
	BANK_DETAILS: "5",
	PROPOSED_ACTIVITY: "6",
	EXISTING_LOAN: "7",
	UPLOAD_DOCUMENTS: "8",
	FINAL: "9",
};
const SYMR_UPLOAD_DOC = {
	PROOF_OF_MIGRATION: 1,
	APPLICATION_LETTER: 2,
	BANK_PASSBOOK: 3,
	ID_PROOF_PHOTO: 4,
	BUSSINESS_PLAN: 5,
	TRAINING_CERTIFICATE: 6,
};
// symr end
const PG_FORM_MASTER_STATUS = {
	DRAFT: 1,
	BMPU_OPEN_APPLICATION: 2,
	DMPU_OPEN_APPLICATION: 3,
	AMOUNT_DISBURSMENT: 4,
	SUBMIT_UC: 5,
	APPROVED: 6,
	PENDING: 7,
	DECLINED: 8,
};

const EG_FORM_MASTER_STATUS = {
	DRAFT: 1,
	BMPU_OPEN_APPLICATION: 2,
	DMPU_OPEN_APPLICATION: 3,
	AMOUNT_DISBURSMENT: 4,
	SUBMIT_UC: 5,
	APPROVED: 6,
	PENDING: 7,
	DECLINED: 8,
};

const FORM_TYPES = {
	PC_FORM: 1,
	PG_FORM: 2,
	EG_FORM: 3,
};
const FORM_SECTION_STATUS = {
	NOTFILLED: 1,
	FILLED: 2,
};

const ACTIVITY_CATEGORY = {
	RED: 1,
	WHITE: 2,
	ORANGE: 3,
	GREEN: 4,
};

const PC_FORM_STAGE = {
	BASIC_DETAILS: "1",
	PC_DETAILS: "2",
	MEMBERS: "3",
	AMOUNT_RECEVIED: "4",
	BANK_DETAILS: "5",
	PROPOSED_ACTIVITY: "6",
	UPLOAD_DOCUMENTS: "7",
	FINAL: "8",
};
const PG_FORM_STAGE = {
	BASIC_DETAILS: "1",
	PC_DETAILS: "2",
	MEMBERS: "3",
	AMOUNT_RECEVIED: "4",
	BANK_DETAILS: "5",
	PROPOSED_ACTIVITY: "6",
	UPLOAD_DOCUMENTS: "7",
	FINAL: "8",
};
const EG_FORM_STAGE = {
	BASIC_DETAILS: "1",
	EG_DETAILS: "2",
	MEMBERS: "3",
	AMOUNT_RECEVIED: "4",
	BANK_DETAILS: "5",
	PROPOSED_ACTIVITY: "6",
	UPLOAD_DOCUMENTS: "7",
	FINAL: "8",
};

const PC_UPLOAD_DOC = {
	REG_CERTIFICATE: 1,
	AUDIT_STATEMENT: 2,
	BANK_PASSBOOK: 3,
	LATEST_MOM: 4,
	BUSSINESS_PLAN: 5,
};
const PG_UPLOAD_DOC = {
	MIN_OF_PG: 1,
	BANK_PASSBOOK: 2,
	BUSSINESS_PLAN: 3,
};

const EG_UPLOAD_DOC = {
	MIN_OF_PG: 1,
	BANK_PASSBOOK: 2,
	BUSSINESS_PLAN: 3,
};

const PC_STAFF_DOC = {
	SMPU_APPROVAL: 1,
	DECMM: 2,
	SIGNED_ASSESMENT: 3,
	FIRST_TRANCHE: 4,
	SMPU_TRANCHE_APPROVAL: 5,
	SECOND_TRANCHE: 6,
};
const PG_STAFF_DOC = {
	SIGNED_ASSESMENT: 1,
	BLECMM: 2,
	SMPU_APPROVAL: 3,
	DECMM: 4,
	FIRST_TRANCHE_UC: 5,
};
const PG_APPLICATION_STATUS_TYPE = {
	BMPU_OPEN_APPLICATION: 1,
	DMPU_OPEN_APPLICATION: 2,
};
const DELETE_STATUS = {
	DELETED: true,
	NOT_DELETED: false,
};
const PC_DISBURSEMENT_STATE = {
	FIRST_TRANCHE: 1,
	SECOND_TRANCHE: 2,
	SECOND_TRANCHE_UC: 3,
};
const PG_DISBURSEMENT_STATE = {
	AMOUNT_DISBURSMENT: 1,
	SUBMIT_UC_DISBURSMENT: 2,
};

//EG CONSTANTS
module.exports.DASHBOARD_FORM_STATUS = DASHBOARD_FORM_STATUS;
module.exports.STAFF_ROLE = STAFF_ROLE;
module.exports.ORDERBY = ORDERBY;
module.exports.STAFF_STATUS = STAFF_STATUS;
module.exports.PC_FORM_MASTER_STATUS = PC_FORM_MASTER_STATUS;
module.exports.SYMR_FORM_MASTER_STATUS = SYMR_FORM_MASTER_STATUS;
module.exports.SYMR_FORM_STAGE = SYMR_FORM_STAGE;
module.exports.PG_FORM_MASTER_STATUS = PG_FORM_MASTER_STATUS;
module.exports.FORM_SECTION_STATUS = FORM_SECTION_STATUS;
module.exports.PC_FORM_STAGE = PC_FORM_STAGE;
module.exports.DELETE_STATUS = DELETE_STATUS;
module.exports.PC_UPLOAD_DOC = PC_UPLOAD_DOC;
module.exports.ACTIVITY_CATEGORY = ACTIVITY_CATEGORY;
module.exports.PC_STAFF_DOC = PC_STAFF_DOC;
module.exports.PG_STAFF_DOC = PG_STAFF_DOC;
module.exports.PC_DISBURSEMENT_STATE = PC_DISBURSEMENT_STATE;
module.exports.PG_DISBURSEMENT_STATE = PG_DISBURSEMENT_STATE;
module.exports.FORM_TYPES = FORM_TYPES;
module.exports.PG_FORM_STAGE = PG_FORM_STAGE;
module.exports.PG_UPLOAD_DOC = PG_UPLOAD_DOC;
module.exports.PG_APPLICATION_STATUS_TYPE = PG_APPLICATION_STATUS_TYPE;

// EG
module.exports.EG_FORM_MASTER_STATUS = EG_FORM_MASTER_STATUS;
module.exports.EG_FORM_STAGE = EG_FORM_STAGE;
module.exports.EG_UPLOAD_DOC = EG_UPLOAD_DOC;
module.exports.SYMR_UPLOAD_DOC = SYMR_UPLOAD_DOC;
