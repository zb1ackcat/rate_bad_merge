const dbHelper = require('./db.js')
const {Client, Pool} = require('pg')

let t = []
let new_accounts = []
let curupted = []

// Variables used to connect to the database. 

const old_db = new Pool({
    user: `old`,
    password: `hehehe`,
    host: `192.168.1.200`,
    port: 5432,
    database: `old`,
    max: 2000,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

const new_db = new Pool({
    user: `new`,
    password: `hahaha`,
    host: '192.168.1.200',
    port: 5433,
    database: `new`
});

const db2 = old_db


async function query_i(db1,ammount,offset){
    for (let i = 0; i < ammount; i++){
        db1.connect()
        console.log(`This is i ${i}`)
        x = offset * i
        await db1.query(` SELECT * FROM accounts OFFSET ${x} LIMIT ${offset}`)
            .then(results => pull_comparision(results.rows))
            //.then (results => console.log(results.rows))
            .catch(e => console.log(`THIS!!! ${e}`))
            .finally (() => console.log(`This is the new ACCOUNT ${new_accounts.length}`))
    }

}
async function pull_comparision(results){

    for (let i = 0; i < results.length; i++){
        console.log(`I is ${i} and the length is ${results.length} and ${i <= results.length}`)
        let rtc = {"id":results[i].id,"name":results[i].name,"email":results[i].email,"favorite_flavor":results[i].favorite_flavor}
        console.log(rtc)
        await compare_db(rtc)
    }
}
async function compare_db(record){
    console.log(`RECORD ${record.id}`)
    client = await db2.connect()
    await client.query(`SELECT * FROM accounts WHERE "id" = '${record.id}'`)
        .then( results => {
            if (results.rows.length  === 0 ){
                console.log(`RECORD 123 ${record}`)
                new_accounts.push(record)
            t = results.rows
            } else{
                t = results.rows
            } })
        .then( results => console.log(`THE RESULTS!!! ${JSON.stringify(t)}`))
        .catch(e => console.log(`THAT!!! ${e}`))
        .finally( () => client.release())



}


query_i(new_db,1,100000)

// open_close(old_db)