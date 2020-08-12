const { DELETE_STATUS, FORM_SECTION_STATUS } = require("../../constants/index");
const db = require("../../models");
module.exports = (sequelize, DataTypes) => {
	const symrShgDetails = sequelize.define(
		"TNRTP11_SYMR_SHG_DETAILS",
		{
			TNRTP11_SYMR_SHG_DETAILS_D: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			formId: { type: DataTypes.INTEGER, field: "TNRTP11_SYMR_FORMS_MASTER_D" },
		    shgMemberTypeId: { type: DataTypes.INTEGER, field: "TNRTP11_SHG_MEMBER_TYPE_MASTER_D" },
		    relationshipTypeId: { type: DataTypes.INTEGER, field: "TNRTP11_RELATIONSHIP_TYPE_MASTER_D" },
			shgName: { type: DataTypes.STRING, field: "TNRTP11_SYMR_SHG_NAME_N" },
            eMathiCode: { type: DataTypes.STRING, field: "TNRTP11_SYMR_EMATHI_CODE_ADDRESS_N" },
			status: {
				type: DataTypes.INTEGER,
				defaultValue: FORM_SECTION_STATUS.FILLED,
				field: "TNRTP11_STATUS_D",
			},
			TNRTP11_DELETED_F: { type: DataTypes.BOOLEAN, defaultValue: DELETE_STATUS.NOT_DELETED },
			TNRTP11_CREATED_AT: { type: DataTypes.DATE },
			TNRTP11_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP11_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP11_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
    );
    symrShgDetails.associate = function (models) {
		symrShgDetails.belongsTo(models.shgMemberType, {
			foreignKey: "TNRTP11_SHG_MEMBER_TYPE_MASTER_D",
			as: "shgMemberTypeData",
		});
		symrShgDetails.belongsTo(models.relationshipType, {
			foreignKey: "TNRTP11_RELATIONSHIP_TYPE_MASTER_D",
			as: "relationshipTypeData",
		});
	};
	symrShgDetails.selectedFields = [
		"shgName",
        "eMathiCode"
	];
	return symrShgDetails;
};
