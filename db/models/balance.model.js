export const BalanceModel = (connection, DataTypes) => {
    return connection.define('Balance', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      activityId: {
        field: 'activity_id',
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
      debtor: {
        field: 'debtor',
        allowNull: true,
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