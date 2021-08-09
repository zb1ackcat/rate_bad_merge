# The Bad Merge Detector 3000

A simple app to find corrupted data from a bad database merge. 

### Dependencies

* node.js
    * node-postgres 
    ```npm install pg```

* PostgresSQL

### Requirements


Output:
Your program must output a report that could be used to fix the missing and incorrect data. Your report should also include those rows that exist in the new dataset but not in the old dataset.
1
Ambiguity:
You may make simplifying assumptions along the way so long as you document the assumptions you made and satisfy all parts of this prompt. If you continue to the final interview be prepared to discuss those assumptions and potential complicating factors were this a real scenario. If you feel unable to make/document a reasonable assumption and require additional clarity you may reach out to us.
Technical Clarifications:
• You may write this program in any language of your choice. We won’t penalize you for language choice so please just use whatever you’re most comfortable with.
• If you find a record in the original data set and in the migrated data set that share the same primary key you should assume they refer to the same entity. No primary keys were corrupted during or since the migration.
• If two records referring to the same entity have different data in any shared column you should consider that record to have been corrupted by the migration and include it in your report.
• If you find a record in the original data set that is not in the migrated data set you should consider it to have been missed during the migration (no records were intentionally omitted by the migration and records are
never deleted).
• If you find records in the migrated data set that are not in the original data set you should consider those records to have been newly created since the migration. There would be no need to repair these records but your report should still include them.
A checklist for a quality submission:
[_] You valued correctness, simplicity, readability, and efficiency over being clever and sophisticated.
[_] You’ve written tests to demonstrate with high confidence that your code does what it should.
[_] You’ve documented how to use your program such that an experienced engineer could run it without assistance.
[_] You’ve documented any assumptions you made beyond what was explicitly described here.

### Executing program

* Run from Root Directory
* 
```
node index.js
```
*Script will run and then display a report in the terminal. 
## Help

TBD
## Authors

DJ Douglass Douglass.dj@gmail.com

## Version History

* 0.1
    * Initial Commit with boilerplate 



