import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyGetAssociationsMixin, NonAttribute } from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Unique, Default, CreatedAt, UpdatedAt, HasMany, Table } from "@sequelize/core/decorators-legacy"
import {IsEmail, IsNumeric } from "@sequelize/validator.js"

import Favourite from "./favourite.model"
import Listing from "./listing.model"
import { IBroker, IUser } from "../../interfaces/user.interface"

@Table.Abstract
export class AbstractUser<M extends AbstractUser<M>> 
extends Model<InferAttributes<M>, InferCreationAttributes<M>> {
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
    @Default('')
    @NotNull
    declare profileImage: CreationOptional<string>

    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    @Default(false)
    declare verified: CreationOptional<boolean>

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
}

export class User extends AbstractUser<User> implements IUser {
    @HasMany(() => Favourite, {
        foreignKey: {
            name: 'userId',
            onDelete: 'CASCADE'
        }
    })
    declare favourites?: NonAttribute<Favourite[]>

    declare getFavourites: HasManyGetAssociationsMixin<Favourite>
}

export class Broker extends AbstractUser<Broker> implements IBroker {
    @Attribute(DataTypes.STRING)
    @NotNull
    declare countryOfOrigin: string

    @Attribute(DataTypes.STRING)
    @NotNull
    declare agencyName: string

    @Attribute(DataTypes.STRING)
    @NotNull
    @IsNumeric
    declare phoneNumber: string

    @HasMany(() => Listing, {
        foreignKey: {
            name: 'brokerId',
            onDelete: 'CASCADE'
        }
    })
    declare listings?: NonAttribute<Listing[]>

    declare getListings: HasManyGetAssociationsMixin<Listing>
}