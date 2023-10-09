export const UserModel = (connection, DataTypes) => {
    return connection.define('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      nickName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      photo: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      active: {
        allowNull: false,
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    })
  }