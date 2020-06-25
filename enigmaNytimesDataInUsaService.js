import _ from 'lodash';

export const getDeathsByState = (data) => {
  // {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}
  let stateDictionary = _.groupBy(data, 'state');
  // get most recent death toll for each state
  topFive = [];
  for (const key in stateDictionary) {
    stateDictionary[key] = _.orderBy(stateDictionary[key], [(o) =>  o.date ], ['desc']);
    stateDictionary[key] = stateDictionary[key].reduce((acc, o, i) => (i === 0 ? o : acc));
    topFive.push(stateDictionary[key]);
  }
  top = _.orderBy(topFive, [ o => o.deaths ], ['desc']);
  const ordered = [];
  for (let i = 0; i < 4; i ++) {
    ordered.push(top[i])
  }
  return {
    labels: ordered.map( o => o.state ),
    datasets: [ { data: ordered.map( o => o.deaths ) } ]
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