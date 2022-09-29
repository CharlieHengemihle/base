/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createItem, getListItems, gotIt } from './fetch-utils.js';

/* Get DOM Elements */

const form = document.querySelector('.new-form');
// const delete = document.querySelector('.delete');
const listEl = document.querySelector('.list');
const logout = document.getElementById('logout')
const errorDisplay = document.getElementById('error-display');

/* State */

let items = [];
let error = null;

/* Events */
// window.addEventListener('load', async () => {
//     const response = await getListItems();
//     error = response.error;
//     items = response.data;

//     if (error) {
//         displayError();
//     }

//     if (items) {
//         displayItems();
//     }
// });


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
    const items = await getListItems();
    listEl.textContent = '';
    for (const item of items) {
        const itemEl = document.createElement('p');
        itemEl.classList.add('list');
        listEl.textContent = `${item.quantity} ${item.item}`;
        
        // if (item.got) {
        //         itemEl.classList.add('got')
        //     } else {
        //             itemEl.classList.add('not-got');
        //             itemEl.addEventListener('click', async () => {
        //                     await getListItems(item.id);
        //                     displayItems();
        //                 });  
        //             }
        //         }
                items.append(item);
}

// async function displayItems() {
//     // - call supabase to fetch all shopping items for this user
//     const list = await getListItems();

//     // - loop through those items, create DOM elements, and append -- render items differently if "bought: true"
//     listEl.textContent = '';
//     for (let item of list) {
//         const listItemEl = document.createElement('p');

//         listItemEl.classList.add('list-item');

//         listItemEl.textContent = `${item.quantity} ${item.item}`;

//         // if (item.bought) {
//         //     listItemEl.classList.add('bought');
//         // } else {
//         //     listItemEl.classList.add('not-bought');
//         //     listItemEl.addEventListener('click', async () => {
//         //         // change the boolean to true
//         //         await buyListItem(item.id);
//         //         displayItems();
//         //     });
//         // }
//         listEl.append(listItemEl);
//     }
// }
