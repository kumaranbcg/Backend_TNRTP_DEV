const errorCodes = require("./../configs/errorCodes");
const messages = require("./../configs/errorMsgs");
const {
	pcTypes,
	pcSectorTypes,
	pcCommodityTypes,
	domain,
	commodityHold,
	application,
} = require("../models");
const { DELETE_STATUS, ACTIVITY_COLUMN } = require("./../constants/index");
const { Op } = require("sequelize");
const xlsx = require("xlsx");
const _ = require("lodash");

class MasterService {}
MasterService.prototype.insertActivityMasterService = async (params) => {
	try {
		const { documentUrls } = params;
		if (documentUrls && documentUrls.length) {
			let docPath = "./public" + documentUrls[0].url.split("/public")[1];
			var workbook = await xlsx.readFile(docPath);
			var sheet_name_list = workbook.SheetNames;
			let data = await xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
			let cells = workbook.Sheets[sheet_name_list[0]];
			if (
				ACTIVITY_COLUMN.ACTIVITY == cells["A1"].h &&
				ACTIVITY_COLUMN.SECTOR == cells["B1"].h &&
				ACTIVITY_COLUMN.COMMODITY == cells["C1"].h &&
				ACTIVITY_COLUMN.COMMODITY_HOLD == cells["D1"].h &&
				ACTIVITY_COLUMN.DOMAIN == cells["E1"].h &&
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
						})),
				}));
				let domainData = _.uniqBy(data, ACTIVITY_COLUMN.DOMAIN).map((eachDomain) => ({
					label: eachDomain[ACTIVITY_COLUMN.DOMAIN],
					labelTamil: eachDomain[ACTIVITY_COLUMN.DOMAIN_TAMIL],
					commodityHoldTypes: _.uniqBy(data, ACTIVITY_COLUMN.COMMODITY_HOLD)
						.filter((z) => z[ACTIVITY_COLUMN.DOMAIN] == eachDomain[ACTIVITY_COLUMN.DOMAIN])
						.map((eachCommodityHold) => ({
							label: eachCommodityHold[ACTIVITY_COLUMN.COMMODITY_HOLD],
							labelTamil: eachCommodityHold[ACTIVITY_COLUMN.COMMODITY_HOLD_TAMIL],
						})),
				}));
				await domain
					.destroy({ where: {}, truncate: { cascade: true }, restartIdentity: true })
					.then(async (data) => {
						await application.query(`ALTER TABLE ${domain} AUTO_INCREMENT = 0;`);
						return domain.bulkCreate([...domainData], {
							include: [
								{
									model: commodityHold,
									as: "commodityHoldTypes",
								},
							],
						});
					});
				await pcTypes
					.destroy({ where: {}, truncate: { cascade: true }, restartIdentity: true })
					.then(async (data) => {
						return pcTypes.bulkCreate([...activityData], {
							include: [
								{
									model: pcSectorTypes,
									as: "sectorTypes",
								},
							],
						});
					});

				let commodityHolds = await commodityHold.findAll({
					attributes: commodityHold.selectedFields,
				});
				let sectors = await pcSectorTypes.findAll({
					attributes: pcSectorTypes.selectedFields,
				});
				let commodityData = [];
				data.forEach((eachCommodity) => {
					let commodityHoldDataId = commodityHolds.find(
						(x) => x.label == eachCommodity[ACTIVITY_COLUMN.COMMODITY_HOLD]
					);
					let sectorDataId = sectors.find((x) => x.label == eachCommodity[ACTIVITY_COLUMN.SECTOR]);
					let commodityPush = {
						label: eachCommodity[ACTIVITY_COLUMN.COMMODITY],
						labelTamil: eachCommodity[ACTIVITY_COLUMN.COMMODITY_TAMIL],
						sectorId: sectorDataId ? sectorDataId.value : null,
						commodityHoldId: commodityHoldDataId ? commodityHoldDataId.value : null,
						isOthers: eachCommodity[ACTIVITY_COLUMN.COMMODITY].toLowerCase().includes("other")
							? true
							: false,
					};
					commodityData.push(commodityPush);
				});
				await pcCommodityTypes.bulkCreate([...commodityData]);
				return {
					code: errorCodes.HTTP_OK,
					message: messages.success,
				};
			} else {
				return {
					code: errorCodes.HTTP_BAD_REQUEST,
					message: [
						`Cell A1 should have ${ACTIVITY_COLUMN.ACTIVITY}`,
						`Cell B1 should have ${ACTIVITY_COLUMN.SECTOR}`,
						`Cell C1 should have ${ACTIVITY_COLUMN.COMMODITY}`,
						`Cell D1 should have ${ACTIVITY_COLUMN.COMMODITY_HOLD}`,
						`Cell E1 should have ${ACTIVITY_COLUMN.DOMAIN}`,
						`Cell F1 should have ${ACTIVITY_COLUMN.DOMAIN_TAMIL}`,
						`Cell G1 should have ${ACTIVITY_COLUMN.ACTIVITY_TAMIL}`,
						`Cell H1 should have ${ACTIVITY_COLUMN.SECTOR_TAMIL}`,
						`Cell I1 should have ${ACTIVITY_COLUMN.COMMODITY_HOLD_TAMIL}`,
						`Cell J1 should have ${ACTIVITY_COLUMN.COMMODITY_TAMIL}`,
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
		console.log(err);
		return {
			code: errorCodes.HTTP_INTERNAL_SERVER_ERROR,
			message: err,
		};
	}
};
module.exports = new MasterService();
