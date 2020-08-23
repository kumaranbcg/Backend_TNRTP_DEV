const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const egFormProposedActivity = sequelize.define(
		"TNRTP59_EG_FORMS_PROPOSED_ACTIVITY",
		{
			TNRTP59_EG_FORMS_PROPOSED_ACTIVITY_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP59_EG_FORMS_MASTER_D" },
			activityName: { type: DataTypes.STRING, field: "TNRTP59_ACTIVITY_NAME_N" },
			activityTimeLine: { type: DataTypes.INTEGER, field: "TNRTP59_ACTIVITY_TIMELINE_MASTER_D" },
			activityTimeLineVal: { type: DataTypes.INTEGER, field: "TNRTP59_ACTIVITY_TIMELINE_VALUE_D" },
			amtReq: { type: DataTypes.BIGINT, field: "TNRTP59_AMOUNT_REQUIRED_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP59_STATUS_D",
			},
			TNRTP59_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP59_CREATED_AT: { type: DataTypes.DATE },
			TNRTP59_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP59_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP59_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	egFormProposedActivity.associate = function (models) {
		egFormProposedActivity.belongsTo(models.activityTimeline, {
			foreignKey: "TNRTP59_ACTIVITY_TIMELINE_MASTER_D",
			as: "activityTimelineData",
		});
	};
	egFormProposedActivity.selectedFields = ["activityName", "activityTimeLineVal", "amtReq"];
	return egFormProposedActivity;
};
