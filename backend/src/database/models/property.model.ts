import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, HasManyGetAssociationsMixin } from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Default, CreatedAt, UpdatedAt, HasMany } from "@sequelize/core/decorators-legacy"
import Favourite from "./favourite.model"
import Image from "./image.model"

export default class Property extends Model<InferAttributes<Property>, InferCreationAttributes<Property>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare longitude: number

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare latitude: number

    @Attribute(DataTypes.JSON)
    @NotNull
    declare metaData: object

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

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare brokerId: number;

    @HasMany(() => Favourite, {
        foreignKey: {
            name: 'propertyId',
            onDelete: 'CASCADE'
        }
    })
    declare favourites?: NonAttribute<Favourite[]>

    declare getFavourites: HasManyGetAssociationsMixin<Favourite>

    @HasMany(() => Image, {
        foreignKey: {
            name: 'propertyId',
            onDelete: 'CASCADE'
        }
    })
    declare images?: NonAttribute<Image[]>

    declare getImages: HasManyGetAssociationsMixin<Image>
}