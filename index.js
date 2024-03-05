import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const inputEl = document.querySelector("#input-el");
const addBtnEl = document.querySelector("#add-btn");
const ulEl = document.querySelector("#shopping-list");
const appSettings = {databaseURL:"https://shopping-cart-b8000-default-rtdb.firebaseio.com/"}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database,"shoppingList")
addBtnEl.addEventListener("click",function()
{
    if(inputEl.value.length>0)
    {
        let inputVal = inputEl.value;
        push(shoppingListInDB,inputVal)
        
        clearInput(inputEl);
    }
    

})

onValue(shoppingListInDB,function(snapshot)
{
    if(snapshot.exists())
    {
        let shoppingList = Object.entries(snapshot.val());
        clearShoppingListEl();
        for(let i=0;i<shoppingList.length;i++)
        {
            let currentItem = shoppingList[i];
            appendItemToShoppingListEl(currentItem);
        }
    }
    else
    {
        ulEl.innerHTML = "No items to display here";
    }
    
    
})
function clearInput(inputEl)
{
    inputEl.value = "";
}
function clearShoppingListEl()
{
    ulEl.innerHTML = "";
}
function appendItemToShoppingListEl(item)
{
    
        let itemID = item[0];
        let itemName = item[1];
        console.log(typeof itemName)
        if(itemName.length>0)
        {
            let list = document.createElement("li");
            list.textContent = itemName;
            list.addEventListener("click",function()
            {
                
                let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`);
                
                remove(exactLocationOfItemInDB);
            })
            ulEl.append(list);
        }
    
    
}

/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-cart-b8000-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-el")
const addButtonEl = document.getElementById("add-btn")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}*/
