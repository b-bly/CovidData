const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const PORT = 8080;
const fetch = require('node-fetch');

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

const url = 'https://covid19-lake.s3.us-east-2.amazonaws.com/rearc-covid-19-nyt-data-in-usa/json/us-counties/part-00000-99da90dc-5262-4d4f-a37c-500d842389db-c000.json';

try {


  fetch(url)
    .then(res => res.text())
    .then(text => {
      text = JSON.stringify(text.trim());
      const json = JSON.parse(text);
      console.log(json);
    });
} catch (e) {
  console.log(e)
}

// Starting Server 
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
})
