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



old_db.connect()
    .then (console.log(`Connection Sucsessful`))
    .then ( ()=> old_db.query("SELECT * FROM accounts"))
    .then(results => console.table(results.rows))
    .catch((e => console.log(e)))
    .finally(() => old_db.end )



function test(database){
    database.query("select * from accounts")
    .then(results => console.log(results.rows))
    // .then (console.log(database))
    .catch((e => console.log))
    
}

// open_close(old_db)