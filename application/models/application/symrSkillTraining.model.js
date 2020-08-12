const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const db = require("../../models");
module.exports = (sequelize, DataTypes) => {
	const symrSkillTraining = sequelize.define(
		"TNRTP12_SYMR_SKILL_TRAINING",
		{
			TNRTP12_SYMR_SKILL_TRAINING_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
            formId: { type: DataTypes.INTEGER, field: "TNRTP12_SYMR_FORMS_MASTER_D" },
			isSkillTrained: { type: DataTypes.BOOLEAN, field: "TNRTP12_IS_SKILLED_TRAINED_D" },
			trainingInstitute: { type: DataTypes.STRING, field: "TNRTP12_SYMR_TRAINING_INSTITUTE_N" },
		    schemeId: { type: DataTypes.INTEGER, field: "TNRTP12_SCHEME_MASTER_D" },
			specifyOther: { type: DataTypes.STRING, field: "TNRTP12_SYMR_SPECIFY_OTHER_N" },
            courseName: { type: DataTypes.STRING, field: "TNRTP12_SYMR_COURSE_NAME_N" },
		    courseCompletionYearId: { type: DataTypes.INTEGER, field: "TNRTP12_SYMR_COURSE_COMPLETION_YEAR_MASTER_D" },
			isCompletedEdpProgramme: { type: DataTypes.BOOLEAN, field: "TNRTP12_SYMR_COMPLETED_ENTREPRENEUR_PROGRAMME_D" },
            edpCompletedInstituteName: { type: DataTypes.STRING, field: "TNRTP12_SYMR_EDP_COMPLETED_INSTITUTE_NAME_N" },
            edpCompletedCourseName: { type: DataTypes.STRING, field: "TNRTP12_SYMR_EDP_COMPLETED_COURSE_NAME_N" },
			isRegisteredEdpProgramme: { type: DataTypes.BOOLEAN, field: "TNRTP12_SYMR_REGISTERED_EDP_PROGRAMME_D" },
            edpRegisteredInstituteName: { type: DataTypes.STRING, field: "TNRTP12_SYMR_EDP_REGISTERED_INSTITUTE_NAME_N" },
            edpRegisteredCourseName: { type: DataTypes.STRING, field: "TNRTP12_SYMR_EDP_REGISTERED_COURSE_NAME_N" },
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
    symrSkillTraining.associate = function (models) {
		symrSkillTraining.belongsTo(models.scheme, {
			foreignKey: "TNRTP12_SCHEME_MASTER_D",
			as: "schemeTypeData",
		});
		symrSkillTraining.belongsTo(models.courseCompletionYear, {
			foreignKey: "TNRTP12_COURSE_COMPLETION_YEAR_MASTER_D",
			as: "courseCompletionTypeData",
		});
	};
	symrSkillTraining.selectedFields = [
		"isSkillTrained",
        "trainingInstitute",
        "specifyOther",
        "courseName",
        "isCompletedEdpProgramme",
        "edpCompletedInstituteName",
        "edpCompletedCourseName",
        "isRegisteredEdpProgramme",
        "edpRegisteredInstituteName",
        "edpRegisteredCourseName"
	];
	return symrSkillTraining;
};
