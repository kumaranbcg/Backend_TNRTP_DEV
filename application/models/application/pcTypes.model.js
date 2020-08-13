module.exports = (sequelize, DataTypes) => {
	const pcTypes = sequelize.define(
		"TNRTP04_TYPE_OF_PC_MASTER",
		{
			value: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "TNRTP04_TYPE_OF_PC_MASTER_D",
			},
			label: { type: DataTypes.STRING, field: "TNRTP04_TYPE_OF_PC_NAME_N" },
			status: { type: DataTypes.INTEGER, field: "TNRTP04_STATUS_D" },
			TNRTP04_CREATED_AT: { type: DataTypes.DATE },
			TNRTP04_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcTypes.associate = function (models) {
		pcTypes.hasMany(models.pcSectorTypes, {
			foreignKey: "TNRTP14_TYPE_OF_ACTIVITY_MASTER_D",
			as: "sectorTypes",
		});
	};
	pcTypes.selectedFields = ["value", "label"];
	return pcTypes;
};
