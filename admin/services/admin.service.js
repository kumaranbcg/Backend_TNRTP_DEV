const {
	staffMaster,
	districtMaster,
	panchayatMaster,
	blockMaster,
	staffAddress,
} = require("../models");
const messages = require("./../configs/errorMsgs.js");
const errorCodes = require("./../configs/errorCodes.js");
const { STAFF_ROLE, ORDERBY, STAFF_STATUS } = require("../constants/index");
const { Op } = require("sequelize");
class AdminService {}

AdminService.prototype.getStaffListService = async (params) => {
	try {
		const { filterData, status, role, sortBy, page, limit } = params;
		let statusCondition, roleCondition;
		if (STAFF_STATUS.ALL == status) statusCondition = [true, false];
		else statusCondition = [status ? true : false];
		if (STAFF_ROLE.ALL == role) roleCondition = [2, 3, 4, 5, 6];
		else roleCondition = [role];
		const searchCondition = !!filterData
			? {
					[Op.or]: [
						{
							"$address.district.TNRTP07_DISTRICT_NAME$": {
								[Op.like]: `%${filterData}%`,
							},
						},
						{
							"$TNRTP06_STAFF_MASTER.TNRTP06_STAFF_MASTER_D$": {
								[Op.like]: `%${filterData}%`,
							},
						},
						{
							"$TNRTP06_STAFF_MASTER.TNRTP06_EMAIL_N$": {
								[Op.like]: `%${filterData}%`,
							},
						},
					],
			  }
			: {};
		const { rows, count } = await staffMaster.findAndCountAll({
			where: {
				TNRTP06_ROLE_D: roleCondition,
				TNRTP06_STATUS_D: statusCondition,
				...searchCondition,
			},
			attributes: [
				["TNRTP06_STAFF_MASTER_D", "staffId"],
				["TNRTP06_USER_NAME_N", "userName"],
				["TNRTP06_STATUS_D", "isActive"],
				["TNRTP06_ROLE_D", "role"],
				["TNRTP06_MOBILE_NUMBER_R", "mobileNumber"],
				["TNRTP06_EMAIL_N", "emailId"],
				["TNRTP06_CREATED_AT", "createdAt"],
			],
			include: [
				{
					model: staffAddress,
					as: "address",
					attributes: [["TNRTP12_STAFF_ADDRESS_D", "addresssId"]],
					include: [
						{
							model: districtMaster,
							as: "district",
							attributes: [
								["TNRTP07_DISTRICT_MASTER_D", "districtId"],
								["TNRTP07_DISTRICT_NAME", "districtName"],
							],
						},
						{
							model: blockMaster,
							as: "block",
							attributes: [
								["TNRTP08_BLOCK_MASTER_D", "blockId"],
								["TNRTP08_BLOCK_NAME", "blockName"],
							],
						},
						{
							model: panchayatMaster,
							as: "panchayat",
							attributes: [
								["TNRTP09_PANCHAYAT_MASTER_D", "panchayatId"],
								["TNRTP09_PANCHAYAT_NAME", "panchayatName"],
							],
						},
					],
				},
				{
					model: staffMaster,
					as: "createdBy",
					attributes: [
						["TNRTP06_USER_NAME_N", "userName"],
						["TNRTP06_ROLE_D", "role"],
					],
				},
			],

			offset: (page - 1) * limit,
			limit,
			order: [["TNRTP06_CREATED_AT", sortBy == ORDERBY.ASC ? "ASC" : "DESC"]],
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
			message: messages.listSuccess,
			data: { staffList: rows, meta },
		};
	} catch (err) {
		console.log("getStaffListService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: messages.technicalError,
		};
	}
};
AdminService.prototype.getDistrictSerivce = async (params) => {
	try {
		const rows = await districtMaster.findAll({
			where: {
				TNRTP07_STATUS: true,
			},
			order: [["TNRTP07_DISTRICT_NAME", "ASC"]],
			attributes: [
				["TNRTP07_DISTRICT_MASTER_D", "districtId"],
				["TNRTP07_DISTRICT_NAME", "districtName"],
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.listSuccess,
			data: { districtList: rows },
		};
	} catch (err) {
		console.log("getDistrictSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: messages.technicalError,
		};
	}
};

AdminService.prototype.geBlockSerivce = async (params) => {
	try {
		const { districtId } = params;
		console.log(districtId);
		const rows = await blockMaster.findAll({
			where: {
				TNRTP08_DISTRICT_MASTER_D: districtId,
				TNRTP08_STATUS: true,
			},
			order: [["TNRTP08_BLOCK_NAME", "ASC"]],
			attributes: [
				["TNRTP08_BLOCK_MASTER_D", "blockId"],
				["TNRTP08_BLOCK_NAME", "blockName"],
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.listSuccess,
			data: { blockList: rows },
		};
	} catch (err) {
		console.log("geBlockSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: messages.technicalError,
		};
	}
};

AdminService.prototype.gePanchayatSerivce = async (params) => {
	try {
		const { blockId } = params;
		const rows = await panchayatMaster.findAll({
			where: {
				TNRTP09_BLOCK_MASTER_D: blockId,
				TNRTP09_STATUS: true,
			},
			order: [["TNRTP09_PANCHAYAT_NAME", "ASC"]],
			attributes: [
				["TNRTP09_PANCHAYAT_MASTER_D", "panchayatId"],
				["TNRTP09_PANCHAYAT_NAME", "panchayatName"],
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.listSuccess,
			data: { panchayatList: rows },
		};
	} catch (err) {
		console.log("gePanchayatSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: messages.technicalError,
		};
	}
};
module.exports = new AdminService();
