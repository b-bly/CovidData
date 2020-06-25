import _ from 'lodash';

export const getDeathsByState = async (data) => {
  // {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}
  let stateDictionary = _.groupBy(data, 'state');
  // get most recent death toll for each state
  let arr = [];
  for (const key in stateDictionary) {
    stateDictionary[key] = _.orderBy(stateDictionary[key], [(o) => o.date], ['desc'])
      .reduce((acc, o, i) => (i === 0 ? o : acc));
    arr.push(stateDictionary[key]);
  }

  arr = _.sortBy(arr, [o => parseInt(o.deaths)], ['asc']).reverse().slice(0, 4);
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