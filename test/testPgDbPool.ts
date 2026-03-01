import { Pool, Client } from "pg"
import { v4 as uuid } from "uuid"

export const getTestPgDatabasePool = async (poolOptions?: { max?: number }): Promise<Pool> => {
    const baseUri = process.env.__PG_CONNECTION_URI
    if (!baseUri) throw new Error("PG container not started - is globalSetup configured?")
    const dbName = `test_${uuid().split("-").join("")}`
    const client = new Client({
        connectionString: baseUri
    })
    await client.connect()

    await client.query(`CREATE DATABASE "${dbName}"`)
    await client.end()

    const url = new URL(baseUri)
    url.pathname = `/${dbName}`

    return new Pool({
        connectionString: url.toString(),
        ...poolOptions
    })
}
