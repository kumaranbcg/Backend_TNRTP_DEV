module.exports = (sequelize, DataTypes) => {
	const districtMaster = sequelize.define(
		`TNRTP07_DISTRICT_MASTER`,
		{
			value: { type: DataTypes.INTEGER, primaryKey: true, field: "TNRTP07_DISTRICT_MASTER_D" },
			label: { type: DataTypes.STRING, field: "TNRTP07_DISTRICT_NAME" },
			code: { type: DataTypes.BIGINT, field: "TNRTP07_DISTRICT_CODE_D" },
			labelTamil: { type: DataTypes.STRING, field: "TNRTP07_DISTRICT_TAMIL_NAME_N" },
			TNRTP07_STATUS: { type: DataTypes.BOOLEAN },
			TNRTP07_CREATED_AT: { type: DataTypes.DATE },
			TNRTP07_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	districtMaster.selectedFields = ["value", "label", "code", "labelTamil"];
	return districtMaster;
};
