const service = require("./../services/userForm.service");
const errorCodes = require("./../configs/errorCodes");
const errMessages = require("./../configs/errorMsgs");
const { FORM_MASTER_STATUS, PC_FORM_STAGE } = require("./../constants/index");
class UserFormController {}

UserFormController.prototype.getUserApplications = async (req, res) => {
	try {
		let result = await service.getUserApplicationsService({ ...req.user });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
module.exports = new UserFormController();
