module.exports = (sequelize, DataTypes) => {
	const pcCoverageBlock = sequelize.define(
		"TNRTP31_PC_PROJECT_COVERAGE_AREA_BLOCK_MEMBER",
		{
			TNRTP31_PC_PROJECT_COVERAGE_AREA_BLOCK_MEMBER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			coverageAreaId: {
				type: DataTypes.INTEGER,
				field: "TNRTP31_PC_PROJECT_COVERAGE_AREA_MASTER_D",
			},
			value: { type: DataTypes.INTEGER, field: "TNRTP31_US_BLOCK_MASTER_D" },
			coverageBlockTotal: {
				type: DataTypes.INTEGER,
				field: "TNRTP31_PC_PROJECT_COVERAGE_TOTAL_BLOCK_MEMBERS_D",
			},
			TNRTP31_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP31_CREATED_AT: { type: DataTypes.DATE },
			TNRTP31_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcCoverageBlock.selectedFields = ["value", "coverageBlockTotal"];
	pcCoverageBlock.associate = function (models) {
		pcCoverageBlock.hasMany(models.pcCoveragePanchayat, {
			foreignKey: "TNRTP34_PC_PROJECT_COVERAGE_AREA_BLOCK_MASTER_D",
			as: "coveragePanchayat",
		});
	};
	return pcCoverageBlock;
};
