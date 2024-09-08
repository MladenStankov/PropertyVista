import { Sequelize } from '@sequelize/core'
import { PostgresDialect } from '@sequelize/postgres'
import dotnev from 'dotenv'

import User from './models/user.model'
import Property from './models/property.model'
import Favourite from './models/favourite.model'
import Image from './models/image.model'

dotnev.config()

export const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    clientMinMessages: 'notice',
    models: [User, Property, Favourite, Image]
})

export async function databaseSync() {
    try{
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        console.log('Syncronized with database')
    } catch(error) {
        console.log('Unable to sync with database: ', error)
    }
}

