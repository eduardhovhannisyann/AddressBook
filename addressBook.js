const prompt = require("readline-sync");
const fs = require("fs");

function gettingStarted(){
    const commands = "    Choose command \nseeAll\nadd\nchange\ndelete\nsearch\nexit\n";
    console.log(commands);

    let input = prompt.question("$ ");
    
    switch (input){
        case "seeAll":
            onSeeAll();
            break;
        case "add":
            onAdd();
            break;
        case "change":
            onChange();
            break;
        case "delete":
            onDelete();
            break;
        case "search":
            onSearch();
            break;
        case "exit":
            onExit();
            break;
        default:
            console.log("Command not found");
            gettingStarted();
    }
}

function onSeeAll(){
    let jsonData = fs.readFileSync("address.json","utf-8");
    let dataArray = JSON.parse(jsonData);
    
    print(dataArray);
    gettingStarted();
}

function onAdd(){
    let name, phone, mail;
    let valid = false;
    while (!valid) {
        name = prompt.question("name ->");
        phone = prompt.question("phone -> +374 ");
        mail = prompt.question("mail ->");
        valid = isValid(name, phone, mail);
        
        if (!valid) {
            console.log("write correct data");
        }
  }

    function Person(name, phone, mail){
        this.name = name;
        this.phone = phone;
        this.mail = mail;
    }

    const person = new Person(name, phone, mail);

    let existingData = fs.readFileSync("address.json", "utf-8");
    if (existingData.trim() === "") {
        existingData = "[]";
    }
    const dataArray = JSON.parse(existingData);

    dataArray.push(person);
    const updatedData = JSON.stringify(dataArray, null, 3);

    fs.writeFileSync("address.json", updatedData);
    
    gettingStarted();
}

function onChange(){
    let inputName = prompt.question("Search by Name ->");
    const jsonData = fs.readFileSync("address.json","utf-8");
    const dataArray = JSON.parse(jsonData);

    let found = [];
    let indexArr = [];
    for(let i = 0; i < dataArray.length ; ++i){
        const person = dataArray[i];

        if(inputName === person.name) {
            found.push(person);
            indexArr.push(i);
        }
    }
    if(found.length === 0){
        console.log("Name is not found");
        onChange();
    }else if(found.length === 1){
        console.log(found[0]);
        dataArray.splice(indexArr[0],1);
        fs.writeFileSync("address.json", JSON.stringify(dataArray, null, 2));
    console.log("Write new datas");
        onAdd();
    }else{
        found.forEach((element,index) => {
            console.log(`${index} - `);
            print([],element);
        });
        let changeNumber = prompt.question("Choose number ->");
        console.log(found[changeNumber]);
        dataArray.splice(indexArr[changeNumber],1);
        fs.writeFileSync("address.json", JSON.stringify(dataArray, null, 2));
        console.log("Write new data ->");
        onAdd();
    }
    gettingStarted();
}

function onDelete(){
    let nameDelet = prompt.question("Delet by name  ");
    const jsonData = fs.readFileSync("address.json","utf-8");
    const dataArray = JSON.parse(jsonData);
    
    let index = -1;
    let counter = 0;

    dataArray.find((el, i) => {
        if (el.name === nameDelet) {
            console.log(`${i} - `);
            print([], el);
            index = i;
            counter++;
        }
    });

   if (counter > 1) {
    let chooseNumber = prompt.question("Choose number ->");
    dataArray.splice(chooseNumber,1);
    fs.writeFileSync("address.json", JSON.stringify(dataArray, null, 3)); 

    gettingStarted();
   } else if (counter == 1) {
    dataArray.splice(index,1);
    fs.writeFileSync("address.json", JSON.stringify(dataArray, null, 3));

    gettingStarted();
   } else {
    console.log("Name not found");
    onDelete();
   }
}

function onSearch(){
    let inputName = prompt.question("Search by Name ");
    const jsonData = fs.readFileSync("address.json","utf-8");
    const dataArray = JSON.parse(jsonData);

    let found = [];

    for(let i = 0; i < dataArray.length ; ++i){
        const person = dataArray[i];

        if(inputName === person.name) {
            found.push(person);
        }
    }
    print(found);
    gettingStarted();
}

function onExit(){
    console.log("Bye");
    return;
}

function isValid(name, phone, mail) {
    if(typeof name[0] !== "string"){
        return false;
    }else if(name.split(" ").length !== 2){
        return false;
    }else if(phone.split("")[0] === 0){
        return false;
    }else if(mail.search("@") === -1){
        return false;
    }
    return true;
}

function print(array, obj) {
    if (obj === undefined) {
        for(let i = 0;i < array.length ; ++i){
            const person = array[i];
            
            for(let key in array[i]) {
                console.log(`${key}: ${array[i][key]}`);
            }
            console.log("\n");
        }
    } else {
        for(let key in obj) {
            console.log(`${key}: ${obj[key]}`);
        }
        console.log("\n");
    }
}

gettingStarted();

