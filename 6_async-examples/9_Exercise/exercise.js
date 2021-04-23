
// writing callbacks 
/*getCustomer(1, (customer) => {
    console.log('Customer: ', customer);
    if(customer.isGold) {
        getTopMovies((movies) => {
            console.log('Top Movies: ', movies);

            sendEmail(customer.email, movies, () => {
                console.log('Email sent...');
            });
        });
    }
});*/


// Replacing above code with Async and Await approach
async function notifyCustomer(){
    try{
        const customer = await getCustomer(1);
        console.log('Customer: ', customer);

        if(customer.isGold){
            const topMovies = await getTopMovies();
            console.log('Top Movies: ', topMovies);

            await sendEmail(customer.email, topMovies);
            console.log('Email sent...');
        }
    }catch(error){
        console.log(error);
    }
}

notifyCustomer();

// to get the customer based on it's id
function getCustomer(id){
    return new Promise(function(resolve, rejected){
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Rupesh',
                isGold: true,
                email: 'abcd@somethig.com'
            });
        }, 4000);
    });
}

// to get the top movies for gold customer
function getTopMovies() {
    return new Promise(function(resolve, rejected) {
        setTimeout(() => {
            resolve(['Movie1', 'Movie2']);  
        }, 4000);
    });
}

// send an email to the customer with the list of top movies
function sendEmail(email, movies) {
    return new Promise(function(resolve, rejected){
        setTimeout(() => {
            resolve();
        }, 4000);
    });
}

