const express = require("express");
const { STAFF_ROLE } = require("../constants/index");
const messages = require("./../configs/errorMsgs.js");
const ErrorCodes = require("./../configs/errorCodes.js");
const { verifyToken, docUpload, hasRole, decryptData } = require("./../utils/index");
const router = express.Router();
const {
	PCFormController,
	userFormController,
	PGFormController,
	SYMRFormController,
	EGFormController,
	DashboardController,
	MasterController,
} = require("./../controllers/controller");

const {
	pcFormSubmit,
	pgFormSubmit,
	egFormSubmit,
	symrFormSubmit,
	getPcForm,
} = require("../validators");

router.use((req, res, next) => {
	if (req.headers.authorization) {
		let token = req.headers.authorization.replace("Bearer ", "");
		if (token == process.env.API_AUTH_KEY) {
			next();
		} else {
			let Error = new Error();
			next(Error);
		}
	} else if (req.originalUrl.includes("public")) next();
});

router.use((err, req, res, next) => {
	if (err) {
		res
			.status(ErrorCodes.HTTP_UNAUTHORIZED)
			.json({ message: messages[ErrorCodes.HTTP_UNAUTHORIZED] });
	} else {
		next();
	}
});

router.get(
	"/application/pcFormCreate",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	PCFormController.pcFormCreate
);

router.post(
	"/application/pcFormFill",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	PCFormController.pcFormFill
);

router.get(
	"/application/getPcForm",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	getPcForm,
	PCFormController.getPcForm
);

router.get(
	"/application/getPCMasters",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	PCFormController.getPCMasters
);

router.post("/application/uploadDoc", verifyToken, docUpload, PCFormController.uploadDoc);

router.post(
	"/application/submitPcForm",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	// decryptData,
	pcFormSubmit,
	PCFormController.submitPcForm
);

router.post(
	"/application/getPcApplication",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	PCFormController.getPcApplication
);

router.post(
	"/application/updateOpenApplication",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PCFormController.updateOpenApplication
);

router.get(
	"/application/getPcApplicationStatus",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	PCFormController.getPcApplicationStatus
);

router.post(
	"/application/updateFirstTranche",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PCFormController.updateFirstTranche
);

router.post(
	"/application/updateSecondTranche",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PCFormController.updateSecondTranche
);

router.post(
	"/application/updateSecondTrancheUc",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PCFormController.updateSecondTrancheUc
);

router.get(
	"/application/startAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PCFormController.startAssesment
);

router.post(
	"/application/submitAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PCFormController.submitAssesment
);

router.get(
	"/application/getAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	PCFormController.getAssesment
);

router.post(
	"/application/pcServiceArea",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PCFormController.pcServiceArea
);
router.get(
	"/application/getPcServiceArea",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	PCFormController.getPcServiceArea
);

router.post(
	"/application/pcCoverageArea",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PCFormController.pcCoverageArea
);
router.get(
	"/application/getPcCoverageArea",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	PCFormController.getPcCoverageArea
);

router.get(
	"/application/getUserApplications",
	verifyToken,
	hasRole([STAFF_ROLE.PUBLIC]),
	userFormController.getUserApplications
);

router.get(
	"/application/pgFormCreate",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	PGFormController.pgFormCreate
);

router.post(
	"/application/pgFormFill",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	PGFormController.pgFormFill
);

router.get(
	"/application/getPgForm",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	PGFormController.getPgForm
);

router.post(
	"/application/submitPgForm",
	verifyToken,
	pgFormSubmit,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	PGFormController.submitPgForm
);

router.post(
	"/application/getPgApplication",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	PGFormController.getPgApplication
);

router.post(
	"/application/updateBmpuOpenApplication",
	verifyToken,
	hasRole([STAFF_ROLE.BPMU]),
	PGFormController.updateBmpuOpenApplication
);

router.get(
	"/application/getPgApplicationStatus",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	PGFormController.getPgApplicationStatus
);

router.post(
	"/application/updateDmpuOpenApplication",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PGFormController.updateDmpuOpenApplication
);

router.post(
	"/application/updateAmountDisbursment",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PGFormController.updateAmountDisbursment
);

router.post(
	"/application/updateDisbursmentUc",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	PGFormController.updateDisbursmentUc
);

router.get(
	"/application/startPgAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.BPMU, STAFF_ROLE.DPMU]),
	PGFormController.startPgAssesment
);

router.post(
	"/application/submitPgAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.BPMU, STAFF_ROLE.DPMU]),
	PGFormController.submitPgAssesment
);

router.get(
	"/application/getPgAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	PGFormController.getPgAssesment
);

//----------- EG FORM -------------
router.get(
	"/application/egFormCreate",
	verifyToken,
	hasRole([
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
		STAFF_ROLE.PUBLIC,
	]),
	EGFormController.egFormCreate
);

router.post(
	"/application/egFormFill",
	verifyToken,
	hasRole([
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
		STAFF_ROLE.PUBLIC,
	]),
	EGFormController.egFormFill
);

router.get(
	"/application/getEgForm",
	verifyToken,
	hasRole([
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
		STAFF_ROLE.PUBLIC,
	]),
	EGFormController.getEgForm
);

router.get(
	"/application/getEGMasters",
	verifyToken,
	hasRole([
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
		STAFF_ROLE.PUBLIC,
	]),
	EGFormController.getEGMasters
);

router.post(
	"/application/submitEgForm",
	verifyToken,
	egFormSubmit,
	hasRole([
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
		STAFF_ROLE.PUBLIC,
	]),
	EGFormController.submitEgForm
);

router.post(
	"/application/getEgApplication",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	EGFormController.getEgApplication
);
router.post(
	"/application/updateEgBmpuOpenApplication",
	verifyToken,
	hasRole([STAFF_ROLE.BPMU]),
	EGFormController.updateEgBmpuOpenApplication
);

router.get(
	"/application/getEgApplicationStatus",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	EGFormController.getEgApplicationStatus
);

router.get(
	"/application/startEgAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.BPMU, STAFF_ROLE.DPMU]),
	EGFormController.startEgAssesment
);

router.post(
	"/application/submitEgAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.BPMU, STAFF_ROLE.DPMU]),
	EGFormController.submitEgAssesment
);

router.get(
	"/application/getEgAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	EGFormController.getEgAssesment
);

router.post(
	"/application/updateEgDmpuOpenApplication",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	EGFormController.updateEgDmpuOpenApplication
);

router.post(
	"/application/updateEgAmountDisbursment",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	EGFormController.updateEgAmountDisbursment
);

router.post(
	"/application/updateEgDisbursmentUc",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU]),
	EGFormController.updateEgDisbursmentUc
);
router.get("/application/getActivityTypes", verifyToken, userFormController.getActivityTypes);

router.post("/application/getSectorTypes", verifyToken, userFormController.getSectorTypes);

router.post("/application/getCommodityTypes", verifyToken, userFormController.getCommodityTypes);

// SYMR
router.get(
	"/application/symrFormCreate",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	SYMRFormController.symrFormCreate
);

router.post(
	"/application/symrFormFill",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	SYMRFormController.symrFormFill
);
router.post("/application/uploadDoc", verifyToken, docUpload, SYMRFormController.uploadDoc);

router.post(
	"/application/submitSymrForm",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	symrFormSubmit,
	SYMRFormController.submitSymrForm
);
router.get(
	"/application/getSymrForm",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	SYMRFormController.getSymrForm
);
router.get(
	"/application/getSymrMasters",
	verifyToken,
	hasRole([
		STAFF_ROLE.PUBLIC,
		STAFF_ROLE.DPMU,
		STAFF_ROLE.SPMU,
		STAFF_ROLE.PLF,
		STAFF_ROLE.BPMU,
		STAFF_ROLE.VPRC,
	]),
	SYMRFormController.getSymrMasters
);
router.post(
	"/application/getSymrApplication",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	SYMRFormController.getSymrApplication
);

router.post(
	"/application/symrUpdateOpenApplication",
	verifyToken,
	hasRole([STAFF_ROLE.VPRC]),
	SYMRFormController.symrUpdateOpenApplication
);

router.get(
	"/application/getSymrApplicationStatus",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	SYMRFormController.getSymrApplicationStatus
);
router.get(
	"/application/startSymrAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.VPRC]),
	SYMRFormController.startSymrAssesment
);

router.post(
	"/application/submitSymrAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.VPRC]),
	SYMRFormController.submitSymrAssesment
);

router.get(
	"/application/getSymrAssesment",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	SYMRFormController.getSymrAssesment
);
router.post(
	"/application/updateSymrAmountDisbursment",
	verifyToken,
	hasRole([STAFF_ROLE.VPRC]),
	SYMRFormController.updateSymrAmountDisbursment
);

router.post(
	"/application/updateSymrDisbursmentUc",
	verifyToken,
	hasRole([STAFF_ROLE.VPRC]),
	SYMRFormController.updateSymrDisbursmentUc
);

router.post(
	"/application/dashboard/statistics",
	verifyToken,
	hasRole([STAFF_ROLE.DPMU, STAFF_ROLE.SPMU, STAFF_ROLE.PLF, STAFF_ROLE.BPMU, STAFF_ROLE.VPRC]),
	DashboardController.dashboardStatistics
);

router.post(
	"/master/insertActivityMaster",
	verifyToken,
	hasRole([STAFF_ROLE.ADMIN]),
	docUpload,
	MasterController.insertActivityMaster
);

module.exports = router;
