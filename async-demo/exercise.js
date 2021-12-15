
getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
      });
    });
  }
});

(async function send() {
  try {
    const customer = await getCustomer(12);
    console.log('Customer: ', customer);

    if (customer.isGold) {
      const topMovies = await getTopMovies();
      console.log(topMovies);

      sendEmail(customer.email, topMovies);
    }
  } catch (err) {
    console.log("Errror ", err)
  }
})()


function getCustomer(id) {
  console.log('Getting Customer id');
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'email'
      });
    }, 4000);
  })
}

function getTopMovies() {
  console.log('Getting Top Movies');
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(['movie1', 'movie2']);
    }, 4000);
  })
}

function sendEmail(email, movies) {
  console.log('Sending Email');
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 4000);
  })
}