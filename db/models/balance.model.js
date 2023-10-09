export const BalanceModel = (connection, DataTypes) => {
    return connection.define('Balance', {
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
      participantId: {
        field: 'participant_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      balance: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
    })
  }