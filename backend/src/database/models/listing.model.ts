import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, HasManyGetAssociationsMixin } from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull, HasMany } from "@sequelize/core/decorators-legacy"

import Favourite from "./favourite.model"
import { IListing, IProperty, ListingType } from "../../interfaces/listing.interface"

export default class Listing extends Model<InferAttributes<Listing>, InferCreationAttributes<Listing>> implements IListing {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.JSON)
    @NotNull
    declare propertyData: IProperty

    @Attribute(DataTypes.JSON)
    @NotNull
    declare type: ListingType

    @Attribute(DataTypes.DECIMAL)
    @NotNull
    declare price: number

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare userId: number;

    @HasMany(() => Favourite, {
        foreignKey: {
            name: 'listingId',
            onDelete: 'CASCADE'
        }
    })
    declare favourites?: NonAttribute<Favourite[]>

    declare getFavourites: HasManyGetAssociationsMixin<Favourite>
}