module.exports = (sequelize, DataTypes) => {
	const districtMaster = sequelize.define(
		`TNRTP07_DISTRICT_MASTER`,
		{
			districtId: { type: DataTypes.INTEGER, primaryKey: true, field: "TNRTP07_DISTRICT_MASTER_D" },
			districtName: { type: DataTypes.STRING, field: "TNRTP07_DISTRICT_NAME" },
			TNRTP07_STATUS: { type: DataTypes.BOOLEAN },
			TNRTP07_CREATED_AT: { type: DataTypes.DATE },
			TNRTP07_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	districtMaster.selectedFields = ["districtId", "districtName"];
	return districtMaster;
};
