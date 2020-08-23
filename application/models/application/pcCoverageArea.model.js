module.exports = (sequelize, DataTypes) => {
	const pcCoverageArea = sequelize.define(
		"TNRTP25_PC_PROJECT_COVERAGE_AREA_MASTER",
		{
			TNRTP25_PC_PROJECT_COVERAGE_AREA_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP25_PC_FORMS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP25_US_DISTRICT_MASTER_D" },
			districtTotalMembers: {
				type: DataTypes.BIGINT,
				field: "TNRTP25_PC_TOTAL_DISTRICT_MEMBERS_D",
			},
			noOfBlock: { type: DataTypes.INTEGER, field: "TNRTP25_PC_NO_OF_BLOCK_D" },
			TNRTP25_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP25_CREATED_AT: { type: DataTypes.DATE },
			TNRTP25_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcCoverageArea.associate = function (models) {
		pcCoverageArea.hasMany(models.pcCoverageBlock, {
			foreignKey: "TNRTP31_PC_PROJECT_COVERAGE_AREA_MASTER_D",
			as: "coverageBlock",
		});
	};
	pcCoverageArea.selectedFields = ["value", "districtTotalMembers", "noOfBlock"];
	return pcCoverageArea;
};
