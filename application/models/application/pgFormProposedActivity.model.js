const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
module.exports = (sequelize, DataTypes) => {
	const pgFormProposedActivity = sequelize.define(
		"TNRTP42_PG_FORMS_PROPOSED_ACTIVITY",
		{
			TNRTP42_PG_FORMS_PROPOSED_ACTIVITY_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP42_PG_FORMS_MASTER_D" },
			activityName: { type: DataTypes.STRING, field: "TNRTP42_ACTIVITY_NAME_N" },
			activityTimeLine: { type: DataTypes.INTEGER, field: "TNRTP42_ACTIVITY_TIMELINE_MASTER_D" },
			activityTimeLineVal: { type: DataTypes.INTEGER, field: "TNRTP42_ACTIVITY_TIMELINE_VALUE_D" },
			amtReq: { type: DataTypes.INTEGER, field: "TNRTP42_AMOUNT_REQUIRED_D" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP42_STATUS_D",
			},
			TNRTP42_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP42_CREATED_AT: { type: DataTypes.DATE },
			TNRTP42_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP42_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP42_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	pgFormProposedActivity.associate = function (models) {
		pgFormProposedActivity.belongsTo(models.activityTimeline, {
			foreignKey: "TNRTP42_ACTIVITY_TIMELINE_MASTER_D",
			as: "activityTimelineData",
		});
	};
	pgFormProposedActivity.selectedFields = ["activityName", "activityTimeLineVal", "amtReq"];
	return pgFormProposedActivity;
};
