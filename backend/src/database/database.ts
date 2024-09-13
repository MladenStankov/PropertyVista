import { Sequelize } from '@sequelize/core'
import { PostgresDialect } from '@sequelize/postgres'
import dotnev from 'dotenv'

import {User, Broker} from './models/user.model'
import Listing from './models/listing.model'
import Favourite from './models/favourite.model'

dotnev.config()

export const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    clientMinMessages: 'notice',
    models: [User, Broker, Listing, Favourite]
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

