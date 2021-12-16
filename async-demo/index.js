console.log('Before');
console.log('after');





/* // Type 1
getUser(140)
    .then(obj => {
        console.log(obj);
    })
  
async function getUser(id) {
    try {
        await setTimeout(() => {
            console.log('Reading a user from a database...');
        }, 3000)
        return await { id, getHubUsername: 'mosh' };
    }
    catch (err) {
        console.log('Error : ' + err);
    }
}
  */

// Type 2
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id, gitHubUsername: 'mosh' });
    }, 3000)
}

getUser(12, function (obj) {
    console.log("Object :" + obj)
});

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Reading a user from Repository...');
        callback(['repo', 'repo2', 'repo3']);
    }, 3000)
}

// const p = Promise.resolve('Promise resolved');
// const pr = Promise.reject(new Error('Promises gets rejected : '));
// pr.catch(err => console.log(err))
// p.then(res => console.log(res))

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 2...')
        reject(new Error('Error occured'))
        // resolve(2)
    }, 21)
})

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
    }, 20)
})


// Promise.all([p1, p2])
//     .then(obj => console.log(...obj))
//     .catch(err => console.log(err));

Promise.race([p1, p2])
    .then(obj => console.log(obj))
    .catch(err => console.log(err));