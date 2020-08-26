const service = require("./../services/master.service");
const errorCodes = require("./../configs/errorCodes");
class MasterController {}

/**
 * DESC : Master data management
 * @param int/string
 * @return : array/json
 */
MasterController.prototype.insertActivityMaster = async (req, res) => {
	try {
		let result = await service.insertActivityMasterService({ ...req.body });
		res.status(result.code).json({ message: result.message, data: result.data });
	} catch (err) {
		console.log(err);
		res.status(errorCodes.HTTP_INTERNAL_SERVER_ERROR).json({ errMessage: JSON.stringify(err) });
	}
};
module.exports = new MasterController();
