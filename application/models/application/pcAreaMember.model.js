module.exports = (sequelize, DataTypes) => {
	const pcAreaMember = sequelize.define(
		"TNRTP24_PC_PROJECT_AREA_MEMBER_DETAIL_MASTER",
		{
			TNRTP24_PC_PROJECT_AREA_MEMBER_DETAIL_MASTER_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP24_PC_FORMS_MASTER_D" },
			value: { type: DataTypes.INTEGER, field: "TNRTP24_US_DISTRICT_MASTER_D" },
			districtTotalBlock: { type: DataTypes.INTEGER, field: "TNRTP24_DISTRICT_TOTAL_BLOCK_D" },
			districtTotalMember: { type: DataTypes.BIGINT, field: "TNRTP24_DISTRICT_TOTAL_MEMBER_D" },
			TNRTP24_STATUS_D: { type: DataTypes.INTEGER },
			TNTRP24_CREATED_AT: { type: DataTypes.DATE },
			TNTRP24_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcAreaMember.selectedFields = ["value", "districtTotalBlock", "districtTotalMember"];
	pcAreaMember.associate = function (models) {
		pcAreaMember.hasMany(models.pcAreaMemberBlock, {
			foreignKey: "TNRTP30_PC_PROJECT_AREA_MEMBER_DETAIL_MASTER_D",
			as: "areaMembersBlock",
		});
	};
	return pcAreaMember;
};
