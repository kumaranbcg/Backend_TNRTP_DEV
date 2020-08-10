const express = require("express");
const { STAFF_ROLE } = require("../constants/index");
const messages = require("./../configs/errorMsgs.js");
const ErrorCodes = require("./../configs/errorCodes.js");
const { verifyToken, docUpload, hasRole } = require("./../utils/index");
const router = express.Router();
const { PCFormController, userFormController } = require("./../controllers/controller");
const { pcFormSubmit } = require("../validators/pcForm.validator");
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
	hasRole(STAFF_ROLE.PUBLIC),
	PCFormController.pcFormCreate
);

router.post(
	"/application/pcFormFill",
	verifyToken,
	hasRole(STAFF_ROLE.PUBLIC),
	PCFormController.pcFormFill
);

router.get(
	"/application/getPcForm",
	verifyToken,
	hasRole(STAFF_ROLE.PUBLIC),
	PCFormController.getPcForm
);

router.get(
	"/application/getPCMasters",
	verifyToken,
	hasRole(STAFF_ROLE.PUBLIC),
	PCFormController.getPCMasters
);

router.post("/application/uploadDoc", verifyToken, docUpload, PCFormController.uploadDoc);

router.post(
	"/application/submitPcForm",
	verifyToken,
	hasRole(STAFF_ROLE.PUBLIC),
	pcFormSubmit,
	PCFormController.submitPcForm
);

router.post(
	"/application/getPcApplication",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.getPcApplication
);

router.post(
	"/application/updateOpenApplication",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.updateOpenApplication
);

router.get(
	"/application/getPcApplicationStatus",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.getPcApplicationStatus
);

router.post(
	"/application/updateFirstTranche",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.updateFirstTranche
);

router.post(
	"/application/updateSecondTranche",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.updateSecondTranche
);

router.post(
	"/application/updateSecondTrancheUc",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.updateSecondTrancheUc
);

router.get(
	"/application/startAssesment",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.startAssesment
);

router.post(
	"/application/submitAssesment",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.submitAssesment
);

router.get(
	"/application/getAssesment",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.getAssesment
);

router.post(
	"/application/pcServiceArea",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.pcServiceArea
);
router.get(
	"/application/getPcServiceArea",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.getPcServiceArea
);

router.post(
	"/application/pcCoverageArea",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.pcCoverageArea
);
router.get(
	"/application/getPcCoverageArea",
	verifyToken,
	hasRole(STAFF_ROLE.DPMU),
	PCFormController.getPcCoverageArea
);

router.get(
	"/application/getUserApplications",
	verifyToken,
	hasRole(STAFF_ROLE.PUBLIC),
	userFormController.getUserApplications
);

module.exports = router;
