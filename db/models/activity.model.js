export const ActivityModel = (connection, DataTypes) => {
    return connection.define('Activity', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      eventId: {
        field: 'event_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      creatorId: {
        field: 'creator_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      cost: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      active: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['active', 'inactive'],
        defaultValue: 'active'
      },
    })
  }