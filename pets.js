


const command = process.argv


if (!command[2]){
    console.error('Usage: node pets.js [read | create | update | destroy]')
    process.exit(1);
    
}
else if (command[3] < 0 || command[3] > commmand) {
    console.log('Usage: node pets.js read INDEX')
}
else if (command[2] === 'read'){
    const fs = require('fs')
    fs.readFile('pets.json', 'utf-8', (err, data) => {
    // => [Error: EISDIR: illegal operation on a directory, read <directory>]
    let indexNum = process.argv[3]
    let jsonResult = JSON.parse(data)

        if (indexNum === undefined) {
        console.log(jsonResult)
        }
        else {
        console.log(jsonResult[indexNum])
        }
    // console.log(jsonResult[indexNum])
    });
}


