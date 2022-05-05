#!/usr/bin/env node

//assign process.argv to a variable
const command = process.argv
//assign index to a variable
let indexNum = process.argv[3]
//assign filesystem module to a variable
const fs = require('fs')



start(command)

//create a start function that will pull data initially and pass that data on to other functions based on the command given
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
//read command error function
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
       
    }

}
// this function creates a pet object, then combines the new object with the current array. Then writes the new array to the json file
function create(command, jsonResult){
    
    if(command[5] === undefined || command[4] === undefined && command[5] === undefined || command[3] === undefined && command[4] === undefined && command[5] === undefined) {
            console.error('Usage: node pets.js create AGE KIND NAME')
            process.exit(1)
        }
        else{
        let petArray = []  
        
        //create pet object and assign values
        let createPet = {}
        createPet.age = parseInt(command[3])
        createPet.kind = command[4]
        createPet.name = command[5]
        // push the new pet to the current json array
        jsonResult.push(createPet)
        // writes new json array to the pets.json file
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
        // access current array element based on user input, update the object 
        let current = jsonResult[indexNum]
        current.age = parseInt(command[4])
        current.kind = command[5]
        current.name = command[6]
        // write updated object to the json file
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
        // remove element at index and write the file 
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
