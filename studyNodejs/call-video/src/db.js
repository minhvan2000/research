const mongoose = require('mongoose');

let DBName = 'Test';

main()
    .then(() => console.log(`Connect with DB ${DBName}`))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/' + DBName);
}

setTimeout(() => {
    DBName = 'Test 2';
    main();
}, 10000);
