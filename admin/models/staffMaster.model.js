module.exports = (sequelize, DataTypes) => {
	const staffMaster = sequelize.define(
		"TNRTP06_STAFF_MASTER",
		{
			TNRTP06_STAFF_MASTER_D: { type: DataTypes.INTEGER, primaryKey: true },
			TNRTP06_USER_NAME_N: { type: DataTypes.STRING },
			TNRTP06_STATUS_D: { type: DataTypes.BOOLEAN },
			TNRTP06_ROLE_D: { type: DataTypes.INTEGER },
			TNRTP06_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP06_EMAIL_N: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
				},
			},
			TNRTP06_MOBILE_NUMBER_R: { type: DataTypes.STRING },
			TNRTP06_PASSWORD_N: { type: DataTypes.STRING },
			TNRTP06_DISTRICT: { type: DataTypes.INTEGER },
			TNRTP06_BLOCK: { type: DataTypes.INTEGER },
			TNRTP06_PANCHAYAT: { type: DataTypes.INTEGER },
			TNRTP06_IS_NEW_USER_D: { type: DataTypes.BOOLEAN },
			TNRTP06_CREATED_AT: { type: DataTypes.DATE },
			TNRTP06_UPDATED_AT: { type: DataTypes.DATE },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);

	staffMaster.associate = function (models) {
		staffMaster.belongsTo(models["staffMaster"], {
			foreignKey: "TNRTP06_CREATED_D",
			as: "createdBy",
		});
		staffMaster.hasOne(models.staffAddress, {
			foreignKey: "TNRTP12_STAFF_MASTER_D",
			as: "address",
		});
	};
	staffMaster.selectedFields = [
		["TNRTP06_STAFF_MASTER_D", "userId"],
		["TNRTP06_USER_NAME_N", "userName"],
		["TNRTP06_STATUS_D", "isActive"],
		["TNRTP06_ROLE_D", "role"],
		["TNRTP06_EMAIL_N", "emailId"],
		["TNRTP06_MOBILE_NUMBER_R", "mobileNumber"],
		["TNRTP06_IS_NEW_USER_D", "isNewUser"],
	];
	return staffMaster;
};
