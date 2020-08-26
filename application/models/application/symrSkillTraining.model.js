const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const db = require("../../models");
module.exports = (sequelize, DataTypes) => {
	const symrSkillTraining = sequelize.define(
		"TNRTP79_SYMR_SKILL_TRAINING",
		{
			TNRTP79_SYMR_SKILL_TRAINING_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP79_SYMR_FORMS_MASTER_D" },
			isSkillTrained: { type: DataTypes.BOOLEAN, field: "TNRTP79_IS_SKILLED_TRAINED_D" },
			trainingInstitute: { type: DataTypes.STRING, field: "TNRTP79_TRAINING_INSTITUTE_N" },
			skillTrainingScheme: {
				type: DataTypes.INTEGER,
				field: "TNRTP79_SKILL_TRAINING_SCHEME_MASTER_D",
			},
			otherSkillTrainingScheme: {
				type: DataTypes.STRING,
				field: "TNRTP79_OTHER_SKILL_TRAINING_SCHEME_N",
			},
			specifyOther: { type: DataTypes.STRING, field: "TNRTP79_SPECIFY_OTHER_N" },
			courseName: { type: DataTypes.STRING, field: "TNRTP79_COURSE_NAME_N" },
			courseCompletionYear: {
				type: DataTypes.INTEGER,
				field: "TNRTP79_COURSE_COMPLETION_YEAR_MASTER_D",
			},
			isCompletedEdpProgramme: {
				type: DataTypes.BOOLEAN,
				field: "TNRTP79_IS_ENTREPRENEUR_PROGRAMME_COMPLETED_D",
			},
			edpCompletedInstituteName: {
				type: DataTypes.STRING,
				field: "TNRTP79_EDP_COMPLETED_INSTITUTE_NAME_N",
			},
			edpCompletedCourseName: {
				type: DataTypes.STRING,
				field: "TNRTP79_EDP_COMPLETED_COURSE_NAME_N",
			},
			edpScheme: { type: DataTypes.INTEGER, field: "TNRTP79_EDP_SCHEME_MASTER_D" },
			otherEdpScheme: { type: DataTypes.STRING, field: "TNRTP79_OTHER_EDP_SCHEME_N" },
			isRegisteredEdpProgramme: {
				type: DataTypes.BOOLEAN,
				field: "TNRTP79_IS_EDP_PROGRAMME_REGISTERED_D",
			},
			edpRegisteredInstituteName: {
				type: DataTypes.STRING,
				field: "TNRTP79_EDP_REGISTERED_INSTITUTE_NAME_N",
			},
			edpRegisteredCourseName: {
				type: DataTypes.STRING,
				field: "TNRTP79_EDP_REGISTERED_COURSE_NAME_N",
			},
			registeredEdpScheme: {
				type: DataTypes.INTEGER,
				field: "TNRTP79_REGISTERED_EDP_SCHEME_MASTER_D",
			},
			otherRegisteredEdpScheme: {
				type: DataTypes.STRING,
				field: "TNRTP79_OTHER_REGISTERED_EDP_SCHEME_N",
			},
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP79_STATUS_D",
			},
			TNRTP79_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP79_CREATED_AT: { type: DataTypes.DATE },
			TNRTP79_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP79_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP79_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	symrSkillTraining.associate = function (models) {
		symrSkillTraining.belongsTo(models.scheme, {
			foreignKey: "TNRTP79_SKILL_TRAINING_SCHEME_MASTER_D",
			as: "skilltrainingData",
		});
		symrSkillTraining.belongsTo(models.scheme, {
			foreignKey: "TNRTP79_EDP_SCHEME_MASTER_D",
			as: "edpschemeData",
		});
		symrSkillTraining.belongsTo(models.scheme, {
			foreignKey: "TNRTP79_REGISTERED_EDP_SCHEME_MASTER_D",
			as: "registeredEdpSchemeData",
		});
		symrSkillTraining.belongsTo(models.courseCompletionYear, {
			foreignKey: "TNRTP79_COURSE_COMPLETION_YEAR_MASTER_D",
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
		"edpRegisteredCourseName",
		"otherSkillTrainingScheme",
		"otherEdpScheme",
		"otherRegisteredEdpScheme",
	];
	return symrSkillTraining;
};
