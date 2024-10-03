import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyGetAssociationsMixin, NonAttribute } from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Unique, Default, CreatedAt, UpdatedAt, HasMany } from "@sequelize/core/decorators-legacy"
import {IsEmail, IsNumeric } from "@sequelize/validator.js"

import Favourite from "./favourite.model"
import Listing from "./listing.model"

export class User 
extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
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

    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    @Default(false)
    declare verified: CreationOptional<boolean>

    @Attribute(DataTypes.STRING)
    declare countryOfOrigin?: CreationOptional<string>
    
    @Attribute(DataTypes.STRING)
    @IsNumeric
    declare phoneNumber?: CreationOptional<string>

    @HasMany(() => Favourite, {
        foreignKey: {
            name: 'userId',
            onDelete: 'CASCADE'
        }
    })
    declare favourites?: NonAttribute<Favourite[]>

    declare getFavourites: HasManyGetAssociationsMixin<Favourite>

    @HasMany(() => Listing, {
        foreignKey: {
            name: 'userId',
            onDelete: 'CASCADE'
        }
    })
    declare listings?: NonAttribute<Listing[]>

    declare getListings: HasManyGetAssociationsMixin<Listing>
}