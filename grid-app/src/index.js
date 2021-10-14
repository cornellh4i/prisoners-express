var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyeCKNtiCyQGoVuX'}).base('appxq5A3yP1YfQOsp');

base('Contributions').select({
    // Selecting the first 3 records in OPEN - Public Content - All 🔗:
    maxRecords: 3,
    view: "OPEN - Public Content - All 🔗"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved', record.get('File Name (Formula)'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});