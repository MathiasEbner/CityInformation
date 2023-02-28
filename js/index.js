import { chart, map } from './components.js';
import { checkValid, checkCity } from './helperFunctions.js';
import {
  activateStartCity,
  resposiveness,
  showCityModal,
  changePicture,
  changeInfoText,
  changeWeather,
  changeCity,
  changeNews,
  changeMap,
  changeDate,
  changeTime,
  colorModes,
  favouritesFunctionality,
  historyFunctionality,
} from './HTMLmanipulate.js';
import { pictureFetch, infoTextFetch, newsFetch, locationFetch, timeFetch, weatherFetch } from './dataFunctions.js';

let myChart = chart();
document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {
    initApp();
  }
});

function initApp() {
  activateStartCity();
  colorModes();
  resposiveness(myChart);
  searchFunctionality();
  favouritesFunctionality();
  map();
}

function searchFunctionality() {
  const textInput = document.querySelector('#searchText');
  textInput.addEventListener('keydown', submitSearch);
  const form = document.querySelector('form');
  form.addEventListener('submit', submitSearch);
}

export const submitSearch = async function (e) {
  if (e.key === 'Enter' || e.type == 'submit') {
    e.preventDefault();
    let textInput = document.querySelector('#searchText').value;
    if (checkValid(textInput) && checkCity(textInput)) {
      const pictureResultData = await pictureFetch(textInput);
      changePicture(pictureResultData);
      const infoTextResultData = await infoTextFetch(textInput);
      changeInfoText(infoTextResultData);
      const newsResultData = await newsFetch(textInput);
      changeNews(newsResultData);
      const locationData = await locationFetch(textInput);
      changeCity(locationData);
      changeMap(locationData);
      const timeData = await timeFetch(locationData);
      let currentDay = changeDate(timeData);
      alert(currentDay);
      changeTime(timeData);
      const weatherData = await weatherFetch(locationData);
      changeWeather(weatherData, myChart, currentDay);
      historyFunctionality();
    } else {
      showCityModal();
    }
    document.querySelector('#searchText').value = '';
  } else {
    console.log('Nicht Rein');
  }
};
