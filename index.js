const dbHelper = require('./db.js')
const {Client, Pool} = require('pg')
const util = require('util')

let t = []
let new_accounts = []
let currupted = []

// Variables used to connect to the database. 

const old_db = new Pool({
    user: `old`,
    password: `hehehe`,
    host: `192.168.1.200`,
    port: 5432,
    database: `old`,
    max: 20,
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
        x = offset * i
        await db1.query(` SELECT * FROM accounts OFFSET ${x} LIMIT ${offset}`)
            .then(results => pull_comparision(results.rows))
            //.then (results => console.log(results.rows))
            .catch(e => console.log(`THIS!!! ${e}`))
            .finally (() => console.log(`This is the new ACCOUNT ${new_accounts.length} This is curuption ${currupted.length} ${currupted[0].name} ${currupted[0].currput_name}`))
    }

}
async function pull_comparision(results){

    for (let i = 0; i < results.length; i++){
        let rtc = {"id":results[i].id,"name":results[i].name,"email":results[i].email,"favorite_flavor":results[i].favorite_flavor}

        await compare_db(rtc)
    }
}
async function compare_db(record){
    client = await db2.connect()
    await client.query(`SELECT * FROM accounts WHERE "id" = '${record.id}'`)
        .then( results => {
            console.log(`STUFF!!! ${results.rows.length}`)
            if (results.rows.length  === 0 ){
                new_accounts.push(record)   
            } else if (record.name != results.rows[0].name || record.email != results.rows[0].email) {
                console.log(`record ${record.name } result ${results.rows[0].name} ${results.rows[0].email} ${results.rows}`)
                arr = {"id":results.id,"name":record.rows,"email":record.email,"favorite_flavor":record.favorite_flavor,"currput_name":results.name,"curupt_email":results.email,"currupt_favorite_flavor":results.favorite_flavor}
                currupted.push(arr)
            } else{
                console.log(`Nothing`)
            } })
        // .then( results => console.log(`THE RESULTS!!! ${JSON.stringify(results.rows)}`))
        .catch(e => console.log(`THAT!!! ${e}`))
        .finally( () => client.release())



}


query_i(new_db,1,10000)

// open_close(old_db)