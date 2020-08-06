module.exports = (sequelize, DataTypes) => {
	const userRegistration = sequelize.define(
		"TNRTP01_USER_MASTER",
		{
			TNTRP01_USER_MASTER_D: { type: DataTypes.INTEGER, primaryKey: true },
			TNTRP01_USER_NAME: { type: DataTypes.STRING },
			TNTRP01_FIRST_N: { type: DataTypes.STRING },
			TNTRP01_LAST_N: { type: DataTypes.STRING },
			TNTRP01_EMAIL_N: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
				},
			},
			TNTRP01_MOBILE_NUMBER_R: { type: DataTypes.STRING },
			TNTRP01_PASSWORD_N: { type: DataTypes.STRING },
			TNTRP01_TYPE_D: { type: DataTypes.INTEGER },
			TNRTP01_IS_NEW_USER: { type: DataTypes.BOOLEAN },
			TNTRP01_STATUS_D: { type: DataTypes.INTEGER },
			TNTRP01_CREATED_BY: { type: DataTypes.INTEGER },
			TNTRP01_DELETED_F: { type: DataTypes.BOOLEAN },
			TNTRP01_CREATED_AT: { type: DataTypes.DATE },
			TNTRP01_UPDATED_AT: { type: DataTypes.DATE },
			TNTRP01_CREATED_D: { type: DataTypes.INTEGER },
			TNTRP01_UPDATED_D: { type: DataTypes.INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);

	return userRegistration;
};
