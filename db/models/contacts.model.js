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
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING
      },
    })
  }