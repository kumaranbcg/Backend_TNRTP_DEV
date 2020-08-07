module.exports = (sequelize, DataTypes) => {
	const pcAreaMemberBlock = sequelize.define(
		"TNRTP30_PC_PROJECT_AREA_BLOCK_MEMBER_MASTER",
		{
			TNRTP30_PC_PROJECT_AREA_BLOCK_MEMBER_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			areaMemberId: {
				type: DataTypes.INTEGER,
				field: "TNRTP30_PC_PROJECT_AREA_MEMBER_DETAIL_MASTER_D",
			},
			value: { type: DataTypes.INTEGER, field: "TNRTP30_US_BLOCK_MASTER_D" },
			areaBlockTotal: { type: DataTypes.INTEGER, field: "TNRTP30_PC_PROJECT_AREA_TOTAL_BLOCK_D" },
			TNRTP30_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP30_CREATED_AT: { type: DataTypes.DATE },
			TNRTP30_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcAreaMemberBlock.selectedFields = ["value", "areaBlockTotal"];
	return pcAreaMemberBlock;
};
