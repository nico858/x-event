export const ContactsModel = (connection, DataTypes) => {
    return connection.define('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      contact: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      state: {
        allowNull: false,
        type: DataTypes.ENUM('accepted', 'pending', 'rejected'),
        defaultValue: 'pending'
      },
    })
  }