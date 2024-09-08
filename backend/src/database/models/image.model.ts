import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Default, CreatedAt, UpdatedAt } from "@sequelize/core/decorators-legacy"

export default class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

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

    @Attribute(DataTypes.BLOB)
    @NotNull
    declare data: Blob

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare propertyId: number
}