const service = require("./../services/admin.service");
const errorCodes = require("./../configs/errorCodes.js");
class AdminController {}

AdminController.prototype.getStaffList = async (req, res) => {
	try {
		let result = await service.getStaffListService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
AdminController.prototype.getDistrictList = async (req, res) => {
	try {
		let result = await service.getDistrictSerivce({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
AdminController.prototype.getBlockList = async (req, res) => {
	try {
		let result = await service.geBlockSerivce({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
AdminController.prototype.getPanchayatList = async (req, res) => {
	try {
		let result = await service.gePanchayatSerivce({ ...req.query });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
AdminController.prototype.getProfile = async (req, res) => {
	try {
		let result = await service.getProfileSerivce({ ...req.user });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};

AdminController.prototype.insertLocation = async (req, res) => {
	try {
		let result = await service.insertLocationService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
module.exports = new AdminController();
