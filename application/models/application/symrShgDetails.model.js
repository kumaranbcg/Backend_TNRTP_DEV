const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const db = require("../../models");
module.exports = (sequelize, DataTypes) => {
	const symrShgDetails = sequelize.define(
		"TNRTP77_SYMR_SHG_DETAILS",
		{
			TNRTP77_SYMR_SHG_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP77_SYMR_FORMS_MASTER_D" },
		    shgMemberType: { type: DataTypes.INTEGER, field: "TNRTP77_SHG_MEMBER_TYPE_MASTER_D" },
		    relationshipType: { type: DataTypes.INTEGER, field: "TNRTP77_RELATIONSHIP_TYPE_MASTER_D" },
			shgName: { type: DataTypes.STRING, field: "TNRTP77_SHG_NAME_N" },
            eMathiCode: { type: DataTypes.STRING, field: "TNRTP77_EMATHI_CODE_N" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP77_STATUS_D",
			},
			TNRTP77_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP77_CREATED_AT: { type: DataTypes.DATE },
			TNRTP77_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP77_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP77_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
    );
    symrShgDetails.associate = function (models) {
		symrShgDetails.belongsTo(models.shgMemberType, {
			foreignKey: "TNRTP77_SHG_MEMBER_TYPE_MASTER_D",
			as: "shgMemberTypeData",
		});
		symrShgDetails.belongsTo(models.relationshipType, {
			foreignKey: "TNRTP77_RELATIONSHIP_TYPE_MASTER_D",
			as: "relationshipTypeData",
		});
	};
	symrShgDetails.selectedFields = [
		"shgName",
        "eMathiCode"
	];
	return symrShgDetails;
};
