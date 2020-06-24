import DomSelector from 'react-native-dom-parser';

// example url 
// https://covid19-lake.s3.us-east-2.amazonaws.com/enigma-nytimes-data-in-usa/json/us_states/part-00000-11e6af04-82cb-4632-82b1-f3943cdc99cb-c000.json

const s3BaseUrl = 'https://covid19-lake.s3.us-east-2.amazonaws.com';
const enigmaNytimesDataInUsaBucket = 'https://covid19-lake.s3.amazonaws.com/?delimiter=%2F&prefix=enigma-nytimes-data-in-usa%2Fjson%2Fus_states%2F';

export async function getData(url) {
  const res = await fetch(url);
  const text = await res.text();
  return JSON.parse(JSON.stringify(text.trim()));
}

export async function getUrl(url) {
  const res = await fetch(url);
  const text = await res.text();
  const rootNode = await DomSelector(text);
  const urlPostfix = await rootNode.getElementsByTagName('Key')[0].firstChild.text;
  return urlPostfix;
}

export async function getEnigmaNytimesData() {
  const urlPostfix = await getUrl(enigmaNytimesDataInUsaBucket);
  const url = `${s3BaseUrl}/${urlPostfix}`;
  return await getData(`${s3BaseUrl}/${urlPostfix}`);
}