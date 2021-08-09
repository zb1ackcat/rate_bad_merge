/* eslint-disable no-undef */

//Libraries

// eslint-disable-next-line no-undef
const {Pool} = require("pg"); //Library to communicate with PostgreSQL database
//Variables

let total = 81412; //For total  amount of records to iterate through.
let limit = 500; //number of queries per call to the database. MAX 500.
let new_accounts = []; //List of new accounts for reporting.
let corrupted = [];//List of corrupted accounts for reporting.
let count = 0; //Used to count the proper amount for for loop.

// Variables used to connect to the database. 
// Adjust the two settings bellow to point to the old_data (the database see as SOT)
// and to the new database(the database with the bad data).

const old_db = new Pool({
	user: "old",
	password: "hehehe",
	host: "192.168.1.200",
	port: 5432,
	database: "old",
});

const new_db = new Pool({
	user: "new",
	password: "hahaha",
	host: "192.168.1.200",
	port: 5433,
	database: "new"
});

const db2 = old_db; //This is here to facilitate reusability of this script to allow it to select different databases.

// This function iterates over the data base in groups of ${limit} until it processes ${total} amount of records. Then pushes them to 
// Then pushes individual records to be formatted.
async function query_i(db1,total,limit){
	let lc =0; // Counter for Limit Count. Counts how many time we have pulled the records by the full limit. 
	for (let i = 0; i < total; i+= count){
		let client1 = await db1.connect();
		let x = limit * lc; //Offset
		lc++;
		await db1.query(`SELECT * FROM accounts OFFSET ${x} LIMIT ${limit}`)
			.then(results => pull_comparison(results.rows))
			.then (() => console.log(`This is the new ACCOUNT ${new_accounts.length} This is corruption ${corrupted.length} we are on ${i} out of ${total} Count is ${count}`)) //To help see progress.
			.catch(e => console.log(`THIS!!! ${e}`))
			.finally (() => client1.release());
	}

	console.table(new_accounts);
	console.table(corrupted);

}

// Function to format. If used in future this function should also pull keys automatically. 

async function pull_comparison(results){
	count = results.length;
	for (let i = 0; i < results.length; i++){
		let rtc = {"id":results[i].id,"name":results[i].name,"email":results[i].email,"favorite_flavor":results[i].favorite_flavor};

		await compare_db(rtc);
	}
}

//Checks id form ${db1 against ${db2}. If it does not exist in ${db2} it is assumed to be a new record.
//If the .name or .email does not match it is assumed the record is corrupt. 
//Arrays of made for both corrupt and new accounts.

async function compare_db(record){
	let client = await db2.connect();
	await client.query(`SELECT * FROM accounts WHERE "id" = '${record.id}'`)
		.then( results => {
			if (results.rows.length  === 0 ){
				new_accounts.push(record);   
			} else if (record.name != results.rows[0].name || record.email != results.rows[0].email) {
				let arr = {"id":results.rows[0].id,"name":record.name,"email":record.email,"favorite_flavor":record.favorite_flavor,"corrupt_name":results.rows[0].name,"corrupt_email":results.rows[0].email};
				corrupted.push(arr);
			} })
		.catch(e => console.log(`THAT!!! ${e}`))
		.finally( () => client.release());
}

query_i(new_db,total,limit); //Starts the app