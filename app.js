/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createItem, getListItems, gotIt, renderItem, removeItems, deleteCompleted } from './fetch-utils.js';

/* Get DOM Elements */

const form = document.querySelector('.new-form');
const deleteItem = document.getElementById('delete');
const listEl = document.querySelector('.list');
const errorDisplay = document.getElementById('error-display');
const deleteComplete = document.getElementById('delete-complete');

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

async function populateItems() {
    const response = await getListItems();
    error = response.error;
    items = response.data;

    if (error) {
        displayError();
    }

    if (items) {
        displayItems();
    }
};

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
    // renderItem(item);

    if (error) {
        displayError();
    } else {
        items.push(item);
        displayItems();
        form.reset();
        populateItems();
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
        if (item.bought) {
            itemEl.classList.add('bought');
        } else {
            itemEl.classList.remove('bought');
        }
        
        listEl.append(itemEl);
        itemEl.addEventListener('click', async () => {
            const response = await gotIt(item.id);
            error = response.error;
            const updatedItem = response.data;
            itemEl.classList.add('bought');
            if (error) {
                displayError();
            } else {
                const index = items.indexOf(item);
                items[index] = updatedItem;
                displayItems();
            }
            populateItems();
            
            // if (item.bought) {
                //     itemEl.classList.add('bought');
                // } else {
                    //     itemEl.classList.add('not-bought');};
        });
    }
}

deleteItem.addEventListener('click', async () => {
    const response = await removeItems();
    error = response.error;

    if (error) {
        displayError();
    } else {
        populateItems();
    }
});

deleteComplete.addEventListener('click', async () => {
    const response = await deleteCompleted();
    error = response.error;

    if (error) {
        displayError();
    } else {
        populateItems();
    }
});

displayItems();