module.exports = (sequelize, DataTypes) => {
	const userRegistration = sequelize.define(
		"TNRTP01_USER_MASTER",
		{
			TNRTP01_USER_MASTER_D: { type: DataTypes.INTEGER, primaryKey: true },
			TNRTP01_USER_NAME: { type: DataTypes.STRING },
			TNRTP01_FIRST_N: { type: DataTypes.STRING },
			TNRTP01_LAST_N: { type: DataTypes.STRING },
			TNRTP01_EMAIL_N: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
				},
			},
			TNRTP01_MOBILE_NUMBER_R: { type: DataTypes.STRING },
			TNRTP01_PASSWORD_N: { type: DataTypes.STRING },
			TNRTP01_TYPE_D: { type: DataTypes.INTEGER },
			TNRTP01_IS_NEW_USER: { type: DataTypes.BOOLEAN },
			TNRTP01_STATUS_D: { type: DataTypes.INTEGER },
			TNRTP01_CREATED_BY: { type: DataTypes.INTEGER },
			TNRTP01_DELETED_F: { type: DataTypes.BOOLEAN },
			TNRTP01_CREATED_AT: { type: DataTypes.DATE },
			TNRTP01_UPDATED_AT: { type: DataTypes.DATE },
			TNRTP01_CREATED_D: { type: DataTypes.INTEGER },
			TNRTP01_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	userRegistration.associate = function (models) {
		userRegistration.belongsTo(models["userRegistration"], {
			foreignKey: "TNRTP01_CREATED_BY",
			as: "createdBy",
		});
		userRegistration.hasOne(models["address"], {
			foreignKey: "TNRTP03_USER_MASTER_D",
			as: "address",
		});
	};
	return userRegistration;
};
