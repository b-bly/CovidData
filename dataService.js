export async function getData(url) {
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     let response = await fetch(url);
  //     console.log(response);
  //     let data = await response.json();
  //     console.log(data);
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //     return {};
  //   }
  // });


// fetch(url).then(async (response) => {
//     console.log(response);
//     console.log(response.text());
//     let data = await response.json();
//     console.log(data);
//     return data;
//   });

  fetch(url)
  .then(res => res.text())
  .then(text => {
    text = JSON.stringify(text.trim());
    const json = JSON.parse(text);
    console.log(json);
    return json;
  });
}