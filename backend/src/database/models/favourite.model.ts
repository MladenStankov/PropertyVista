import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Default, CreatedAt, UpdatedAt, Table } from "@sequelize/core/decorators-legacy"

@Table({
    indexes: [
        {
            unique: true,
            fields: ['userId', 'listingId']
        }
    ]
})
export default class Favourite extends Model<InferAttributes<Favourite>, InferCreationAttributes<Favourite>> {
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

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare userId: number

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare listingId: number
}