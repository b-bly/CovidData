const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const PORT = 8080;
const fetch = require('node-fetch');
fs = require('fs');

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

// amazon request

// try {


//   fetch(url)
//     .then(res => res.text())
//     .then(async text => {

//       const jsonData = text.split('}').map(function (record) {
//         console.log(record);
//         try {
//           return JSON.parse(record + '}');
//         } catch (e) {
//           return {};
//         }
//       })
//       console.log(jsonData);

//       // const json = JSON.parse(text);

//     });
// } catch (e) {
//   console.log(e)
// }



const _ = require('lodash')

const getDeathsByState = async (data) => {
  // {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}
  let stateDictionary = _.groupBy(data, 'state');
  // get most recent death toll for each state
  let arr = [];
  for (const key in stateDictionary) {
    stateDictionary[key] = _.orderBy(stateDictionary[key], [(o) => o.date], ['desc']).reduce((acc, o, i) => (i === 0 ? o : acc));
    arr.push(stateDictionary[key]);
  }
  arr = _.sortBy(arr, [o => parseInt(o.deaths)], ['asc']).reverse().slice(0, 4);
  return {
    labels: arr.map(o => o.state),
    datasets: [{ data: arr.map(o => o.deaths) }]
  };
}

const nyTimesUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv';

try {
  fetch(nyTimesUrl).then(res => res.text())
    .then(async text => {
      const jsonData = csvToJSON(text);
      const data = await getDeathsByState(jsonData);
    });
} catch (e) {
  console.log(e);
}

// Starting Server 
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
})

function csvToJSON(csv) {

  var lines = csv.split("\n");

  var result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step 
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  //return result; //JavaScript object
  return result
}