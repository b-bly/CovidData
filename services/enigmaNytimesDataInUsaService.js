import _ from 'lodash';
import { swapKeysAndValues, csvToJSON } from '../util/utility';
import stateAbbreviations from '../assets/stateAbbreviations.json';
const abbreviationsSwapped = swapKeysAndValues(stateAbbreviations);

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

export const getDeathsByState = (data) => {

  // {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}
  let arr = getMostRecentRecordForEachState(data);
  arr = _.sortBy(arr, [o => parseInt(o.deaths)], ['asc']).reverse().slice(0, 8);
  return {
    labels: arr.map(o => o.state),
    datasets: [{ data: arr.map(o => o.deaths) }]
  };
}
// Bar graph data format example

// const data = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43]
//     }
//   ]
// };


export async function getEnigmaNytimesData() {
  const nyTimesUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv';
  try {
    const res = await fetch(nyTimesUrl);
    const text = await res.text();
    const jsonData = csvToJSON(text);
    return getDeathsByState(jsonData);
  } catch (e) {
    console.log(e);
  }
}


