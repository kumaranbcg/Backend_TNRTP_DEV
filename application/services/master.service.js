const errorCodes = require("./../configs/errorCodes");
const messages = require("./../configs/errorMsgs");
const { pcTypes, pcSectorTypes, pcCommodityTypes, domain, commodityHold } = require("../models");
const { DELETE_STATUS, ACTIVITY_COLUMN } = require("./../constants/index");
const { Op } = require("sequelize");
const xlsx = require("xlsx");
const _ = require("lodash");

class MasterService {}
MasterService.prototype.insertActivityMasterService = async (params) => {
	try {
		const { documentUrls } = params;
		// if (documentUrls.length) {
		// 	let docPath = "./public" + documentUrls[0].url.split("/public")[1];
		// 	var workbook = await xlsx.readFile(docPath);
		// 	var sheet_name_list = workbook.SheetNames;
		// 	let data = await xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
		// 	let cells = workbook.Sheets[sheet_name_list[0]];
		// 	console.log(docPath, data[0]);
		// 	return {
		// 		code: errorCodes.HTTP_OK,
		// 		message: messages.success,
		// 	};
		// } else {
		// 	return {
		// 		code: errorCodes.HTTP_BAD_REQUEST,
		// 		message: messages.uploadDoc,
		// 	};
		// }
		let docPath = "./public/uploads/-1598371429749.xlsx";
		var workbook = await xlsx.readFile(docPath);
		var sheet_name_list = workbook.SheetNames;
		let data = await xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
		let cells = workbook.Sheets[sheet_name_list[0]];
		if (
			ACTIVITY_COLUMN.DOMAIN == cells["A1"].h &&
			ACTIVITY_COLUMN.ACTIVITY == cells["B1"].h &&
			ACTIVITY_COLUMN.SECTOR == cells["C1"].h &&
			ACTIVITY_COLUMN.COMMODITY_HOLD == cells["D1"].h &&
			ACTIVITY_COLUMN.COMMODITY == cells["E1"].h &&
			ACTIVITY_COLUMN.DOMAIN_TAMIL == cells["F1"].h &&
			ACTIVITY_COLUMN.ACTIVITY_TAMIL == cells["G1"].h &&
			ACTIVITY_COLUMN.SECTOR_TAMIL == cells["H1"].h &&
			ACTIVITY_COLUMN.COMMODITY_HOLD_TAMIL == cells["I1"].h &&
			ACTIVITY_COLUMN.COMMODITY_TAMIL == cells["J1"].h
		) {
			let activityData = _.uniqBy(data, ACTIVITY_COLUMN.ACTIVITY).map((eachActivity) => ({
				label: eachActivity[ACTIVITY_COLUMN.ACTIVITY],
				labelTamil: eachActivity[ACTIVITY_COLUMN.ACTIVITY_TAMIL],
				sectorTypes: _.uniqBy(data, ACTIVITY_COLUMN.SECTOR)
					.filter((y) => y[ACTIVITY_COLUMN.ACTIVITY] == eachActivity[ACTIVITY_COLUMN.ACTIVITY])
					.map((eachSector) => ({
						label: eachSector[ACTIVITY_COLUMN.SECTOR],
						labelTamil: eachSector[ACTIVITY_COLUMN.SECTOR_TAMIL],
						commodityHoldTypes: _.uniqBy(data, ACTIVITY_COLUMN.COMMODITY_HOLD)
							.filter((z) => z[ACTIVITY_COLUMN.SECTOR] == eachSector[ACTIVITY_COLUMN.SECTOR])
							.map((eachCommodityHold) => ({
								label: eachCommodityHold[ACTIVITY_COLUMN.COMMODITY_HOLD],
								labelTamil: eachCommodityHold[ACTIVITY_COLUMN.COMMODITY_HOLD_TAMIL],
							})),
						commodityTypes: data
							.filter((a) => a[ACTIVITY_COLUMN.SECTOR] == eachSector[ACTIVITY_COLUMN.SECTOR])
							.map((eachCommodity) => ({
								label: eachCommodity[ACTIVITY_COLUMN.COMMODITY],
								labelTamil: eachCommodity[ACTIVITY_COLUMN.COMMODITY_TAMIL],
							})),
						domainTypes: _.uniqBy(data, ACTIVITY_COLUMN.DOMAIN)
							.filter((a) => a[ACTIVITY_COLUMN.SECTOR] == eachSector[ACTIVITY_COLUMN.SECTOR])
							.map((eachDomain) => ({
								label: eachDomain[ACTIVITY_COLUMN.DOMAIN],
								labelTamil: eachDomain[ACTIVITY_COLUMN.DOMAIN_TAMIL],
							})),
					})),
			}));
			let commodityCount = 0,
				commodityHoldCount = 0,
				domainCount = 0,
				sectorCount = 0,
				activityCount = 0;
			activityData.forEach((eachActivity) => {
				activityCount++;
				eachActivity.sectorTypes.forEach((eachCommodity) => {
					sectorCount++;
					eachCommodity.commodityTypes.forEach((eachdata) => {
						commodityCount++;
					});
					eachCommodity.commodityHoldTypes.forEach((eachdata) => {
						commodityHoldCount++;
					});
					eachCommodity.domainTypes.forEach((eachdata) => {
						domainCount++;
					});
				});
			});
			console.log(
				"commodityCount",
				commodityCount,
				"commodityHoldCount",
				commodityHoldCount,
				"domainCount",
				domainCount,
				"sectorCount",
				sectorCount,
				"activityCount",
				activityCount
			);
			return {
				code: errorCodes.HTTP_OK,
				message: messages.success,
				data: activityData,
			};
		} else {
			return {
				code: errorCodes.HTTP_BAD_REQUEST,
				// message: [
				//     `Cell A1 should have ${ACTIVITY_COLUMN.DOMAIN}`,
				//     `Cell B1 should have ${ACTIVITY_COLUMN.ACTIVITY}`,
				//     `Cell C1 should have ${ACTIVITY_COLUMN.SECTOR}`,
				//     `Cell D1 should have ${ACTIVITY_COLUMN.COMMODITY_HOLD}`,
				//     `Cell E1 should have ${ACTIVITY_COLUMN.COMMODITY}`,
				//     `Cell F1 should have ${ACTIVITY_COLUMN.DOMAIN_TAMIL}`,
				//     `Cell G1 should have ${ACTIVITY_COLUMN.ACTIVITY_TAMIL}`,
				//     `Cell H1 should have ${ACTIVITY_COLUMN.SECTOR_TAMIL}`,
				//     `Cell I1 should have ${ACTIVITY_COLUMN.COMMODITY_HOLD_TAMIL}`,
				//     `Cell J1 should have ${ACTIVITY_COLUMN.COMMODITY_TAMIL}`,
				// ],
			};
		}
		console.log(data[100]);
	} catch (err) {
		console.log(err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
module.exports = new MasterService();
