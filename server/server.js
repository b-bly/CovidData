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

//const url = 'https://covid19-lake.s3.us-east-2.amazonaws.com/rearc-covid-19-nyt-data-in-usa/json/us-counties/part-00000-99da90dc-5262-4d4f-a37c-500d842389db-c000.json';

const url = 'https://covid19-lake.s3.us-east-2.amazonaws.com/enigma-nytimes-data-in-usa/json/us_states/part-00000-8d824b55-c9fc-4852-b19b-2cc9e6279db0-c000.json';
try {


  fetch(url)
    .then(res => res.text())
    .then(async text => {
      // text = JSON.stringify(text.trim());

      // text = await text.replace(/}/gi, "},");
      // text = await  text.replace(/,(?!.*,)/gim, "");
      // text = "[" + text + "]";
      const jsonData = text.split('}').map(function (record) {
        console.log(record);
        try {
          return JSON.parse(record + '}');
        } catch (e) {
          return {};
        }
        
      })
      console.log(jsonData);

      // const json = JSON.parse(text);

    });
} catch (e) {
  console.log(e)
}

// Starting Server 
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
})
