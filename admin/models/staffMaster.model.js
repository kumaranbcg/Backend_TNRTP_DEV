module.exports = (sequelize, DataTypes) => {
	const staffMaster = sequelize.define(
		"TNRTP06_STAFF_MASTER",
		{
			TNRTP06_STAFF_MASTER_D: { type: DataTypes.INTEGER, primaryKey: true },
			TNRTP06_USER_NAME: { type: DataTypes.STRING },
			TNRTP06_STATUS: { type: DataTypes.BOOLEAN },
			TNRTP06_ROLE: { type: DataTypes.INTEGER },
			TNRTP06_CREATED_BY: { type: DataTypes.INTEGER },
			TNRTP06_EMAIL_ID: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
				},
			},
			TNRTP06_MOBILE_NUMBER: { type: DataTypes.STRING },
			TNRTP06_PASSWORD: { type: DataTypes.STRING },
			TNRTP06_DISTRICT: { type: DataTypes.INTEGER },
			TNRTP06_BLOCK: { type: DataTypes.INTEGER },
			TNRTP06_PANCHAYAT: { type: DataTypes.INTEGER },
			TNRTP06_IS_NEW_USER: { type: DataTypes.BOOLEAN },
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
			foreignKey: "TNRTP06_CREATED_BY",
			as: "createdBy",
		});
		staffMaster.hasOne(models.staffAddress, {
			foreignKey: "TNTRP12_STAFF_MASTER_D",
			as: "address",
		});
	};
	return staffMaster;
};
