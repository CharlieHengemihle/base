const SUPABASE_URL = 'https://yptuisgakfvenupeardm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdHVpc2dha2Z2ZW51cGVhcmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyMzczNzYsImV4cCI6MTk3OTgxMzM3Nn0.3-Dci0h1LC8RHsATCxjcMG8F0wt8rBk_OWPxOn3FPK8';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */


export async function createItem(item) {
    return await client.from('shopping_list').insert(item);

}

export async function getListItems() {
    return await client.from('shopping_list').select();

}

export async function gotIt(someId) {
    return await client.from('shopping_list').update({ bought: true }).match({ id: someId });

    return checkError(response);
}