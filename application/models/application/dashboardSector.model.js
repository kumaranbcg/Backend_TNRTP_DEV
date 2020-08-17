module.exports = (sequelize, DataTypes) => {
	const dashboardSector = sequelize.define(
		"TNRTP106_DASHBOARD_SECTOR_MASTER",
		{
			TNRTP106_DASHBOARD_SECTOR_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			dashboardMasterId: { type: DataTypes.STRING, field: "TNRTP106_DASHBOARD_FORMS_MASTER_D" },
			sectorId: { type: DataTypes.STRING, field: "TNRTP106_TYPE_OF_SECTOR_MASTER_D" },
			TNRTP106_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP106_CREATED_AT: { type: DataTypes.DATE },
			TNRTP106_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	dashboardSector.selectedFields = ["sectorId"];
	return dashboardSector;
};
