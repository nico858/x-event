export const EventModel = (connection, DataTypes) => {
    return connection.define('Event', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      creator: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING
      },
      photo: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      cost: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      active: {
        allowNull: false,
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
    })
  }