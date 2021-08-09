
//
const {Client, Pool} = require('pg')
const util = require('util')



let total = 81412
let limit = 500
let new_accounts = []
let currupted = []
let count = 0

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


async function query_i(db1,total,limit){
    for (let i = 0; i < total; i+ count){
        client1 = await db1.connect()
        x = limit * i
        await db1.query(` SELECT * FROM accounts OFFSET ${x} LIMIT ${limit}`)
            .then(results => pull_comparision(results.rows))
            .then (results => console.log(`This is the new ACCOUNT ${new_accounts.length} This is corruption ${currupted.length} ${currupted[0].name} ${currupted[0].currput_name}`))
            .catch(e => console.log(`THIS!!! ${e}`))
            .finally (() => client1.release())
    }

}
async function pull_comparision(results){
    count = results.length
    for (let i = 0; i < results.length; i++){
        let rtc = {"id":results[i].id,"name":results[i].name,"email":results[i].email,"favorite_flavor":results[i].favorite_flavor}

        await compare_db(rtc)
    }
}
async function compare_db(record){
    client = await db2.connect()
    await client.query(`SELECT * FROM accounts WHERE "id" = '${record.id}'`)
        .then( results => {
            if (results.rows.length  === 0 ){
                new_accounts.push(record)   
            } else if (record.name != results.rows[0].name || record.email != results.rows[0].email) {
                arr = {"id":results.id,"name":record.rows,"email":record.email,"favorite_flavor":record.favorite_flavor,"currput_name":results.name,"curupt_email":results.email,"currupt_favorite_flavor":results.favorite_flavor}
                currupted.push(arr)
            } else{
                
            } })
        // .then( results => console.log(`THE RESULTS!!! ${JSON.stringify(results.rows)}`))
        .catch(e => console.log(`THAT!!! ${e}`))
        .finally( () => client.release())



}


query_i(new_db,total,limit)

// open_close(old_db)