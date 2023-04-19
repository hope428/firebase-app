import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://shopping-list-7d768-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInListDB = ref(database, "items")


const itemInput = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");

const appendListToPage = (newItem) => {
  const list = document.getElementById("list")
  const li = document.createElement("li")
  li.setAttribute("data-id", newItem[0])
  li.textContent = newItem[1]

  list.appendChild(li)

  li.addEventListener("dblclick", (e) => {
    let itemId = e.target.dataset["id"]

    let itemLocation = ref(database, `items/${itemId}`)

    remove(itemLocation)
  })
}

const clearField = () => {
  itemInput.value = ""
}

// const getItemsInDB = () => {
  onValue(itemsInListDB, function(snapshot){
    let items = Object.entries(snapshot.val())
    console.log(items);
    clearList()
    items.forEach((item) => {appendListToPage(item)})
  })
// }

const clearList = () => {
  list.innerHTML = ""
}

const addToCart = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;
  push(itemsInListDB, newItem)

  clearField()
};

// getItemsInDB()

addBtn.addEventListener("click", addToCart);

