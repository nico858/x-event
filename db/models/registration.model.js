export const RegistrationModel = (connection, DataTypes) => {
    return connection.define('Registration', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      activityId: {
        field: 'activity_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      percentage: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
    })
  }