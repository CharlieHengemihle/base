/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createItem, getListItems } from './fetch-utils.js';

/* Get DOM Elements */

const form = document.querySelector('.new-form');
const delete = document.querySelector('.delete');
const listEl = document.querySelector('.list');
const logout = document.getElementById('logout')

/* State */


/* Events */

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
        getListItems.push(item);
        displayItems();
        form.requestFullscreen();
    }
});


/* Display Functions */
