export const ParticipantModel = (connection, DataTypes) => {
    return connection.define('Participant', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      eventId: {
        field: 'event_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cost: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
    })
  }