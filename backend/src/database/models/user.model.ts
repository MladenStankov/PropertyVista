import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyGetAssociationsMixin, NonAttribute } from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Unique, Default, CreatedAt, UpdatedAt, HasMany } from "@sequelize/core/decorators-legacy"
import {IsEmail} from "@sequelize/validator.js"
import Property from "./property.model"
import Favourite from "./favourite.model"
import { IUser } from "../../interfaces/user.interface"

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements IUser {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    @NotNull
    declare firstName: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare lastName: string

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    @IsEmail
    declare email: string

    @Attribute(DataTypes.STRING)    
    @NotNull
    declare passwordHashed: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare profileImage: string

    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    @Default(false)
    declare verified: CreationOptional<boolean>

    @Attribute(DataTypes.ENUM('User', 'Broker'))
    @NotNull
    @Default('Broker')
    declare role: CreationOptional<string>

    @Attribute(DataTypes.DATE)
    @CreatedAt
    @NotNull
    @Default(DataTypes.NOW)
    declare createdAt: CreationOptional<Date>

    @Attribute(DataTypes.DATE)
    @UpdatedAt
    @NotNull
    @Default(DataTypes.NOW)
    declare updatedAt: CreationOptional<Date>

    @HasMany(() => Property, {
        foreignKey: {
            name: 'brokerId',
            onDelete: 'CASCADE'
        }
    })
    declare properties?: NonAttribute<Property[]>

    declare getProperties: HasManyGetAssociationsMixin<Property>

    @HasMany(() => Favourite, {
        foreignKey: {
            name: 'userId',
            onDelete: 'CASCADE'
        }
    })
    declare favourites?: NonAttribute<Favourite[]>

    declare getFavourites: HasManyGetAssociationsMixin<Favourite>
}