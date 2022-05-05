


const command = process.argv

let indexNum = process.argv[3]
const fs = require('fs')
// const json = require('./pets.json')
// let jsonResult

// if (!command[2]){
//     console.error('Usage: node pets.js [read | create | update | destroy]')
//     process.exit(1);
    
// }

// console.log(json)

start(command)
function start(command){
    fs.readFile('pets.json', 'utf-8', (err, data) => {
        let jsonResult = JSON.parse(data)
        // console.log(data)
    
        if (command[2] === 'read'){
            read(command, jsonResult)
        }
        else if (command[2] === 'create'){
            create(command, jsonResult)
        }
        else if (command[2] === 'update'){
            update(command, jsonResult)
        }
        else if (command[2] === 'destroy'){
            destroy(command, jsonResult)
        }
        else {
        console.error('Usage: node pets.js [read | create | update | destroy]')
        process.exit(1);
        }
    })
}

function read(command, jsonResult){
    if (command[2] === 'read'){
        
        // fs.readFile('pets.json', 'utf-8', (err, data) => {
        // // => [Error: EISDIR: illegal operation on a directory, read <directory>]
        
        // let jsonResult = JSON.parse(data)
    
            if (indexNum === undefined) {
            console.log(jsonResult)
            }
            else if (indexNum < 0 || indexNum > jsonResult.length) {
                console.log('Usage: node pets.js read INDEX')
            }
            else {
            console.log(jsonResult[indexNum])
            }
       // console.log(jsonResult[indexNum])
        // });
    }

}

function create(command, jsonResult){
    
    // read(command)
    if(command[5] === undefined || command[4] === undefined && command[5] === undefined || command[3] === undefined && command[4] === undefined && command[5] === undefined) {
            console.error('Usage: node pets.js create AGE KIND NAME')
            process.exit(1)
        }
        else{
        let petArray = []    
        let createPet = {}
        createPet.age = parseInt(command[3])
        createPet.kind = command[4]
        createPet.name = command[5]
        // let jsonResult = JSON.parse(data)
        jsonResult.push(createPet)
        // petArray.push(jsonResult)
        fs.writeFile('pets.json', JSON.stringify(jsonResult), function (err) {
            if (err) {
                console.log(err)
            }
            else {
            console.log(jsonResult)
            }
        })
        // console.log(jsonResult)
        }
    
    
}

function update(command, jsonResult){
    if(command[6] === undefined || command[5] === undefined && command[6] === undefined || command[4] === undefined && command[5] === undefined && command[6] === undefined || command[3] === undefined && command[4] === undefined && command[5] === undefined && command[6] === undefined) {
        console.error('Usage: node pets.js update INDEX AGE KIND NAME')
        process.exit(1)
    }
    else {
        let current = jsonResult[indexNum]
        current.age = parseInt(command[4])
        current.kind = command[5]
        current.name = command[6]

        fs.writeFile('pets.json', JSON.stringify(jsonResult), function (err) {
            if (err) {
                console.log(err)
            }
            else {
            console.log(jsonResult)
            }
        })
        console.log(current)
    }
}

function destroy(command, jsonResult){
    if(command[3] === undefined) {
        console.error('Usage: node pets.js destroy INDEX')
        process.exit(1)
    }
    else {
        jsonResult.splice(indexNum,1)
        fs.writeFile('pets.json', JSON.stringify(jsonResult), function (err) {
            if (err) {
                console.log(err)
            }
            else {
            console.log(jsonResult)
            }
        })
    }

}
