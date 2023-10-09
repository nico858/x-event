export const RegistrationModel = (connection, DataTypes) => {
    return connection.define('Registration', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      participantId: {
        field: 'participant_id',
        allowNull: false,
        type: DataTypes.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      activityId: {
        field: 'activity_id',
        allowNull: false,
        type: DataTypes.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      percentage: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
    })
  }