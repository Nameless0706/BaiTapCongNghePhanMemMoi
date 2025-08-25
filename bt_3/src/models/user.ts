import { Model, type Optional, DataTypes } from 'sequelize';
import type { Sequelize } from 'sequelize';

// Define the attributes of your model
export interface UserAttributes {
  id: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  gender?: string;
  image?: string;
  roleId: string;
  positionId?: string;
}

// Define the optional attributes for model creation
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  // Define attributes for the instance
  public id!: number;
  public email!: string;
  public password?: string;
  public firstName!: string;
  public lastName!: string;
  public address?: string;
  public phoneNumber?: string;
  public gender?: string;
  public image?: string;
  public roleId!: string;
  public positionId?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association method
  static associate(models: any) {
    // Define association here
  }
}

// Initialize the model
const UserInit = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      gender: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      roleId: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      positionId: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Users',
      modelName: 'User',
      timestamps: true,
    }
  );

  return User;
};

export default UserInit;