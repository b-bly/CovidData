const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const PORT = 8080;
const fetch = require('node-fetch');
fs = require('fs');

const stateAbbreviations = require('../assets/stateAbbreviations.json');


const csvToJSON = (csv) => {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

    const obj = {};
    const currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  //return result; //JavaScript object
  return result;
}

const swapKeysAndValues = (json) => {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

const abbreviationsSwapped = swapKeysAndValues(stateAbbreviations);


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



const _ = require('lodash');
const { result } = require('lodash');

const getMostRecentRecordForEachState = (data) => {
  let stateDictionary = _.groupBy(data, 'state');

  // get most recent record for each state
  let arr = [];
  for (const key in stateDictionary) {
    stateDictionary[key] = _.orderBy(stateDictionary[key], [(o) => o.date], ['desc'])
      .reduce((acc, o, i) => (i === 0 ? o : acc));
    arr.push(stateDictionary[key]);
  }
  return arr.map(record => {
    record.state = abbreviationsSwapped[record.state];
    return record;
  });

}

const getDeathsByState = (data) => {
  // {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}
  let arr = getMostRecentRecordForEachState(data);
  arr = _.sortBy(arr, [o => parseInt(o.deaths)], ['asc']).reverse().slice(0, 8);
  return {
    labels: arr.map(o => o.state),
    datasets: [{ data: arr.map(o => o.deaths) }]
  };
}

const getCasesByState = (data) => {
  let arr = getMostRecentRecordForEachState(data);
  arr = _.sortBy(arr, [o => parseInt(o.cases)], ['asc']).reverse().slice(0, 8);
  const result = {
    labels: arr.map(o => o.state),
    datasets: [{ data: arr.map(o => o.cases) }]
  };
  return result;
}



const getDeathsByDateForState = (data, state) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  let stateDictionary = _.groupBy(data, 'state');
  if (!state) {
    // state = Object.keys(stateDictionary)[Object.keys(stateDictionary).length - 1];
    state = 'Alabama';
  }
  let stateData = _.orderBy(stateDictionary[state], ['date'], ['desc']);
  const groupedByMonth = _.groupBy(stateData, (item) => item.date.substring(0, 7));
  const months = [];
  const deaths = [];
  for (const month in groupedByMonth) {
    const monthNum = parseInt(month.substring(5, 7));
    const monthText = monthNames[monthNum];
    months.push(monthText);
    const highestDeath = _.maxBy(groupedByMonth[month], o => o.deaths);
    deaths.push(highestDeath.deaths);
  }
  const lineGraphData = {
    labels: months,
    datasets: [
      {
        data: deaths,
        // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        // strokeWidth: 2 // optional
      }
    ],
    // legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
  };
  console.log(lineGraphData)
  return lineGraphData;
}

const nyTimesUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv';

try {
  fetch(nyTimesUrl).then(res => res.text())
    .then(async text => {
      const jsonData = csvToJSON(text);
      const data = await getDeathsByDateForState(jsonData);
      // console.log(data);
    });
} catch (e) {
  console.log(e);
}

// Starting Server 
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
});
