module.exports = (sequelize, DataTypes) => {
	const pcCoveragePanchayat = sequelize.define(
		"TNRTP34_PC_PROJECT_AREA_PANCHAYAT_MEMBER",
		{
			TNRTP34_PC_PROJECT_AREA_PANCHAYAT_MEMBER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			coverageBlockId: {
				type: DataTypes.INTEGER,
				field: "TNRTP34_PC_PROJECT_COVERAGE_AREA_BLOCK_MASTER_D",
			},
			value: { type: DataTypes.INTEGER, field: "TNRTP34_UC_PANCHAYAT_MASTER_D" },
			coveragePanchayatTotal: {
				type: DataTypes.INTEGER,
				field: "TNRTP34_PC_NO_OF_PANCHAYAT_MEMBERS_D",
			},
			TNRTP34_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP34_CREATED_AT: { type: DataTypes.DATE },
			TNRTP34_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcCoveragePanchayat.selectedFields = ["value", "coveragePanchayatTotal"];
	return pcCoveragePanchayat;
};
