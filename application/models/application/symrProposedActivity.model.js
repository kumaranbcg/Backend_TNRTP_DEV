const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const symrProposedActivity = sequelize.define(
		"TNRTP83_SYMR_PROPOSED_ACTIVITY",
		{
			TNRTP83_SYMR_PROPOSED_ACTIVITY_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP83_SYMR_FORMS_MASTER_D" },
			activityName: { type: DataTypes.STRING, field: "TNRTP83_ACTIVITY_NAME_N" },
			activityTimeLine: { type: DataTypes.INTEGER, field: "TNRTP83_ACTIVITY_TIMELINE_MASTER_D" },
			activityTimeLineVal: { type: DataTypes.INTEGER, field: "TNRTP83_ACTIVITY_TIMELINE_VALUE_D" },
			amtReq: { type: DataTypes.BIGINT, field: "TNRTP83_AMOUNT_REQUIRED_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP83_STATUS_D",
			},
			TNRTP83_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP83_CREATED_AT: { type: DataTypes.DATE },
			TNRTP83_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP83_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP83_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrProposedActivity.associate = function (models) {
		symrProposedActivity.belongsTo(models.activityTimeline, {
			foreignKey: "TNRTP83_ACTIVITY_TIMELINE_MASTER_D",
			as: "activityTimelineData",
		});
	};
	symrProposedActivity.selectedFields = ["activityName", "activityTimeLineVal", "amtReq"];
	return symrProposedActivity;
};
