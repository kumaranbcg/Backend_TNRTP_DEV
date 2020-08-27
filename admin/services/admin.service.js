const {
	staffMaster,
	districtMaster,
	panchayatMaster,
	blockMaster,
	staffAddress,
	sequelize,
} = require("../models");
const xlsx = require("xlsx");
const _ = require("lodash");
const messages = require("./../configs/errorMsgs.js");
const errorCodes = require("./../configs/errorCodes.js");
const { STAFF_ROLE, ORDERBY, STAFF_STATUS, LOCATION_COLUMN } = require("../constants/index");
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
								["TNRTP07_DISTRICT_CODE_D", "districtCode"],
								["TNRTP07_DISTRICT_TAMIL_NAME_N", "districtTamil"],
							],
						},
						{
							model: blockMaster,
							as: "block",
							attributes: [
								["TNRTP08_BLOCK_MASTER_D", "value"],
								["TNRTP08_BLOCK_NAME", "blockName"],
								["TNRTP08_BLOCK_CODE_D", "blockCode"],
								["TNRTP08_BLOCK_NAME_TAMIL_N", "blockTamil"],
							],
						},
						{
							model: panchayatMaster,
							as: "panchayat",
							attributes: [
								["TNRTP09_PANCHAYAT_MASTER_D", "panchayatId"],
								["TNRTP09_PANCHAYAT_NAME", "panchayatName"],
								["TNRTP09_PANCHAYAT_CODE_D", "panchayatCode"],
								["TNRTP09_PANCHAYAT_TAMIL_NAME_N", "panchayatTamil"],
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
			attributes: districtMaster.selectedFields,
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
			attributes: blockMaster.selectedFields,
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
		const { blockId, isTNRTP } = params;
		let isTNRTPFiler = {};
		if (parseInt(isTNRTP)) {
			isTNRTPFiler = {
				TNRTP09_IS_TNRTP_D: true,
			};
		}
		const rows = await panchayatMaster.findAll({
			where: {
				TNRTP09_BLOCK_MASTER_D: blockId,
				...isTNRTPFiler,
				TNRTP09_STATUS: true,
			},
			order: [["TNRTP09_PANCHAYAT_NAME", "ASC"]],
			attributes: panchayatMaster.selectedFields,
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
AdminService.prototype.getProfileSerivce = async (params) => {
	try {
		const { userId } = params;
		let userProfile = await staffMaster.findOne({
			where: { TNRTP06_STAFF_MASTER_D: userId },
			attributes: staffMaster.selectedFields,
			include: [
				{
					model: staffMaster,
					as: "createdBy",
					attributes: [
						["TNRTP06_STAFF_MASTER_D", "userId"],
						["TNRTP06_USER_NAME_N", "userName"],
						["TNRTP06_ROLE_D", "role"],
					],
				},
				{
					model: staffAddress,
					as: "address",
					required: false,
					attributes: [["TNRTP12_STAFF_ADDRESS_D", "addressId"]],
					include: [
						{
							model: districtMaster,
							as: "district",
							attributes: districtMaster.selectedFields,
						},
						{
							model: blockMaster,
							as: "block",
							attributes: blockMaster.selectedFields,
						},
						{
							model: panchayatMaster,
							as: "panchayat",
							attributes: panchayatMaster.selectedFields,
						},
					],
				},
			],
		});
		return {
			code: errorCodes.HTTP_OK,
			message: messages.listSuccess,
			data: userProfile,
		};
	} catch (err) {
		console.log("getProfileSerivce", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: messages.technicalError,
		};
	}
};
AdminService.prototype.insertLocationService = async (params) => {
	try {
		const { documentUrls } = params;
		if (documentUrls && documentUrls.length) {
			let docPath = "./public" + documentUrls[0].url.split("/public")[1];
			var workbook = await xlsx.readFile(docPath);
			var sheet_name_list = workbook.SheetNames;
			let data = await xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
			let cells = workbook.Sheets[sheet_name_list[0]];
			if (
				LOCATION_COLUMN.SNO == cells["A1"].h &&
				LOCATION_COLUMN.DISTRICT_CODE == cells["B1"].h &&
				LOCATION_COLUMN.DISTRICT_ENAME == cells["C1"].h &&
				LOCATION_COLUMN.DISTRICT_TNAME == cells["D1"].h &&
				LOCATION_COLUMN.BLOCK_CODE == cells["E1"].h &&
				LOCATION_COLUMN.BLOCK_ENAME == cells["F1"].h &&
				LOCATION_COLUMN.BLOCK_TNAME == cells["G1"].h &&
				LOCATION_COLUMN.PANCHAYAT_CODE == cells["H1"].h &&
				LOCATION_COLUMN.PANCHAYAT_ENAME == cells["I1"].h &&
				LOCATION_COLUMN.PANCHAYAT_TNAME == cells["J1"].h &&
				LOCATION_COLUMN.IS_TNRTP == cells["K1"].h
			) {
				data.sort(function (a, b) {
					return a[LOCATION_COLUMN.SNO] - b[LOCATION_COLUMN.SNO];
				});
				let districts = _.uniqBy(data, LOCATION_COLUMN.DISTRICT_CODE).map((eachDistrict) => ({
					TNRTP07_DISTRICT_CODE_D: eachDistrict[LOCATION_COLUMN.DISTRICT_CODE],
					TNRTP07_DISTRICT_NAME: eachDistrict[LOCATION_COLUMN.DISTRICT_ENAME],
					TNRTP07_DISTRICT_TAMIL_NAME_N: eachDistrict[LOCATION_COLUMN.DISTRICT_TNAME],
					blocks: _.uniqBy(data, LOCATION_COLUMN.BLOCK_CODE)
						.filter(
							(x) => x[LOCATION_COLUMN.DISTRICT_CODE] == eachDistrict[LOCATION_COLUMN.DISTRICT_CODE]
						)
						.map((eachBlock) => ({
							TNRTP08_BLOCK_CODE_D: eachBlock[LOCATION_COLUMN.BLOCK_CODE],
							TNRTP08_BLOCK_NAME: eachBlock[LOCATION_COLUMN.BLOCK_ENAME],
							TNRTP08_BLOCK_NAME_TAMIL_N: eachBlock[LOCATION_COLUMN.BLOCK_TNAME],
							panchayats: _.uniqBy(data, LOCATION_COLUMN.PANCHAYAT_CODE)
								.filter(
									(y) => y[LOCATION_COLUMN.BLOCK_CODE] == eachBlock[LOCATION_COLUMN.BLOCK_CODE]
								)
								.map((eachPanchayat) => ({
									TNRTP09_PANCHAYAT_CODE_D: eachPanchayat[LOCATION_COLUMN.PANCHAYAT_CODE],
									TNRTP09_PANCHAYAT_NAME: eachPanchayat[LOCATION_COLUMN.PANCHAYAT_ENAME],
									TNRTP09_PANCHAYAT_TAMIL_NAME_N: eachPanchayat[LOCATION_COLUMN.PANCHAYAT_TNAME],
									TNRTP09_IS_TNRTP_D:
										eachPanchayat[LOCATION_COLUMN.IS_TNRTP].toLowerCase() == "yes" ? true : false,
								})),
						})),
				}));
				await districtMaster.destroy({ truncate: { cascade: true } }).then((data) => {
					return sequelize.query(
						`ALTER TABLE ${districtMaster.getTableName()} AUTO_INCREMENT = 0;ALTER TABLE ${blockMaster.getTableName()} AUTO_INCREMENT = 0;ALTER TABLE ${panchayatMaster.getTableName()} AUTO_INCREMENT = 0;`
					);
				});
				await districtMaster.bulkCreate([...districts], {
					include: [
						{
							model: blockMaster,
							as: "blocks",
							include: [
								{
									model: panchayatMaster,
									as: "panchayats",
								},
							],
						},
					],
				});
				return {
					code: errorCodes.HTTP_OK,
					message: messages.success,
				};
			} else {
				return {
					code: errorCodes.HTTP_BAD_REQUEST,
					message: [
						`Cell A1 should have ${LOCATION_COLUMN.SNO}`,
						`Cell B1 should have ${LOCATION_COLUMN.DISTRICT_CODE}`,
						`Cell C1 should have ${LOCATION_COLUMN.DISTRICT_ENAME}`,
						`Cell D1 should have ${LOCATION_COLUMN.DISTRICT_TNAME}`,
						`Cell E1 should have ${LOCATION_COLUMN.BLOCK_CODE}`,
						`Cell F1 should have ${LOCATION_COLUMN.BLOCK_ENAME}`,
						`Cell G1 should have ${LOCATION_COLUMN.BLOCK_TNAME}`,
						`Cell H1 should have ${LOCATION_COLUMN.PANCHAYAT_CODE}`,
						`Cell I1 should have ${LOCATION_COLUMN.PANCHAYAT_ENAME}`,
						`Cell J1 should have ${LOCATION_COLUMN.PANCHAYAT_TNAME}`,
						`Cell K1 should have ${LOCATION_COLUMN.IS_TNRTP}`,
					],
				};
			}
		} else {
			return {
				code: errorCodes.HTTP_BAD_REQUEST,
				message: messages.uploadDoc,
			};
		}
	} catch (err) {
		console.log("insertLocationService", err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
module.exports = new AdminService();
