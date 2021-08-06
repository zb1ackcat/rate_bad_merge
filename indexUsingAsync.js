const {Client} = require('pg')

// Variables used to connect to the database. 

const old_db = new Client({
    user: `old`,
    password: `hehehe`,
    host: `192.168.1.200`,
    port: 5432,
    database: `old`
})

const new_db = new Client({
    user: `new`,
    password: `hahaha`,
    host: '192.168.1.200',
    port: 5433,
    database: `new`
})


execute()

async function execute() {
    try{
    
    await old_db.connect()
    console.log("Connected successfully.")
    //await client.query("insert into employees values (1, 'John')")

    const {rows} = await old_db.query("select * from accounts")
    console.table(rows)

    }
    catch (ex)
    {
        console.log(`Something wrong happend ${ex}`)
    }
    finally 
    {
        await client.end()
        console.log("Client disconnected successfully.")    
    }
    
}