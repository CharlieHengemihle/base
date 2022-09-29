/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createItem, getListItems, gotIt, renderItem } from './fetch-utils.js';

/* Get DOM Elements */

const form = document.querySelector('.new-form');
// const delete = document.querySelector('.delete');
const listEl = document.querySelector('.list');
const errorDisplay = document.getElementById('error-display');

/* State */

let items = [];
let error = null;

/* Events */
window.addEventListener('load', async () => {
    const response = await getListItems();
    error = response.error;
    items = response.data;

    if (error) {
        displayError();
    }

    if (items) {
        displayItems();
    }
});


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const newItem = {
        item: formData.get('item'),
        quantity: formData.get('quantity'),
    };

    const response = await createItem(newItem);
    error = response.error;
    const item = response.data;

    if(error) {
        displayError();
    } else {
        items.push(item);
        displayItems();
        form.reset();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

async function displayItems() {
    listEl.textContent = '';
    for (const item of items) {
        const itemEl = renderItem(item);
        if (item.bought = true) {
            itemEl.classList.add('bought');}
            
            listEl.append(itemEl);
        itemEl.addEventListener('click', async () => {
            const response = await gotIt(item.id);
            error = response.error;
            const updatedItem = response.data;
            if (error) {
                displayError();
            } else {
                const index = items.indexOf(item);
                items[index] = updatedItem;
                displayItems();
            }

            // if (item.bought) {
            //     itemEl.classList.add('bought');
            // } else {
            //     itemEl.classList.add('not-bought');};
        });
        }
}
