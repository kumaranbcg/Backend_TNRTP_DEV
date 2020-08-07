const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pcFormProposedActivity = sequelize.define(
		"TNRTP12_PC_FORMS_PROPOSED_ACTIVITY",
		{
			TNRTP12_PC_FORMS_PROPOSED_ACTIVITY_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP12_PC_FORMS_MASTER_D" },
			activityName: { type: DataTypes.STRING, field: "TNRTP12_ACTIVITY_NAME_N" },
			activityTimeLine: { type: DataTypes.INTEGER, field: "TNRTP12_ACTIVITY_TIMELINE_MASTER_D" },
			activityTimeLineVal: { type: DataTypes.INTEGER, field: "TNRTP12_ACTIVITY_TIMELINE_VALUE_D" },
			amtReq: { type: DataTypes.INTEGER, field: "TNRTP12_AMOUNT_REQUIRED_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP12_STATUS_D",
			},
			TNRTP12_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP12_CREATED_AT: { type: DataTypes.DATE },
			TNRTP12_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP12_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP12_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pcFormProposedActivity.associate = function (models) {
		pcFormProposedActivity.belongsTo(models.activityTimeline, {
			foreignKey: "TNRTP12_ACTIVITY_TIMELINE_MASTER_D",
			as: "activityTimelineData",
		});
	};
	pcFormProposedActivity.selectedFields = ["activityName", "activityTimeLineVal", "amtReq"];
	return pcFormProposedActivity;
};
