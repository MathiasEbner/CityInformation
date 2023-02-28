//import { request } from 'express';

export const pictureFetch = async function (textInput) {
  const pexelApiData = {
    key: '563492ad6f91700001000001af8ca5e9804243ccab1a370f31e6ca78',
    url: 'https://api.pexels.com/v1',
  };

  const pictureSearchString = getPictureSearchString(pexelApiData.url, textInput);
  const pictureFetchResults = await requestPictureData(pexelApiData.key, pictureSearchString);
  // console.log(pictureFetchResults);
  if (pictureFetchResults.hasOwnProperty('photos') && pictureFetchResults.photos.length >= 1) {
    // returns true if attribut "photos" exists
    const pictrueProcessedResults = processPictureData(pictureFetchResults.photos);
    //  console.log(pictrueProcessedResults);
    return pictrueProcessedResults;
  } else {
    //TODO: error wrong input/ no Picture found
    return 'noPictureFound';
  }
};

function getPictureSearchString(url, textInput) {
  return `${url}/search?query=${textInput}&orientation=landscape&per_page=3`;
}

async function requestPictureData(key, pictureSearchString) {
  try {
    const response = await fetch(pictureSearchString, {
      headers: {
        Authorization: `${key}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    //TODO: error
    return false;
  }
}

function processPictureData(pictureFetchResults) {
  let altData = getPictureAltData(pictureFetchResults[0].url);
  const pictureObject = {
    src: pictureFetchResults[0].src.large,
    alt: altData,
  };

  return pictureObject;
}

function getPictureAltData(urlData) {
  let arr = urlData.split('/')[4].split('-');
  arr.pop();
  return arr.join(' ');
}

export const infoTextFetch = async function (textInput) {
  const wikiApiData = {
    url: 'https://en.wikipedia.org/api/rest_v1/page/summary',
  };

  const infoTextSearchString = getInfoTextSearchString(wikiApiData.url, textInput);
  const infoTextFetchResults = await requestInfoTextData(infoTextSearchString);
  console.log(infoTextFetchResults);
  if (infoTextFetchResults.title !== 'Not found.') {
    const infoTextProcessedResults = processInfoTextData(infoTextFetchResults);
    return infoTextProcessedResults;
  } else {
    //TODO: error wrong input
    return 'noInfoTextFound';
  }
};

async function requestInfoTextData(infoTextSearchString) {
  try {
    const response = await fetch(infoTextSearchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function getInfoTextSearchString(url, textInput) {
  return `${url}/${textInput}`;
}

function processInfoTextData(infoTextFetchResults) {
  const infoTextObject = {
    text: infoTextFetchResults.extract,
    urlDesktop: infoTextFetchResults.content_urls.desktop.page,
    urlMobile: infoTextFetchResults.content_urls.mobile.page,
  };
  return infoTextObject;
}

export const newsFetch = async function (textInput) {
  const newsApiData = {
    url: 'https://newsapi.org/v2/everything',
    key: '0edee65ed1e34a63a8f111c8f816d18e',
  };

  const newsSearchString = getNewsSearchString(newsApiData.url, newsApiData.key, textInput);
  const newsFetchResults = await requestNewsData(newsApiData.key, newsSearchString);
  return newsFetchResults;
};

function getNewsSearchString(url, key, textInput) {
  return `${url}?q=${textInput}&language=en&sortBy=relevancy&pageSize=6`;
  //return `${url}?q=${textInput}&language=en&sortBy=popularity&pageSize=15&apiKey=${key}`;
  /* return 'https://newsapi.org/v2/everything?q=London&language=en&sortBy=relevancy&pageSize=15&apiKey=0edee65ed1e34a63a8f111c8f816d18e'; */
}

async function requestNewsData(key, newsSearchString) {
  try {
    const response = await fetch(newsSearchString, {
      headers: {
        Authorization: `${key}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {}
}

export const locationFetch = async function (textInput) {
  const locationApiData = {
    url: 'http://api.openweathermap.org/data/2.5/weather',
    key: '118bdccc4462075e438ee7deb86507dc',
  };

  const locationSearchString = getLocationSearchString(locationApiData.url, locationApiData.key, textInput);
  const locationFetchResults = await requestLocationData(locationSearchString);
  if (!(locationFetchResults.hasOwnProperty('message') && locationFetchResults.message === 'city not found')) {
    const locationProcessedResults = processLocationResult(locationFetchResults);
    return locationProcessedResults;
  } else {
    return 'city not found';
  }
};

function getLocationSearchString(url, key, textInput) {
  return `${url}?q=${textInput}&appid=${key}`;
}

async function requestLocationData(locationSearchString) {
  try {
    const response = await fetch(locationSearchString);
    const data = await response.json();
    return data;
  } catch (error) {
    //TODO: Error Handling
    return error;
  }
}

function processLocationResult(locationFetchResults) {
  // console.log(locationFetchResults);
  const locationObject = {
    lat: locationFetchResults.coord.lat,
    lon: locationFetchResults.coord.lon,
    city: locationFetchResults.name,
    country: locationFetchResults.sys.country,
  };
  return locationObject;
}

export const weatherFetch = async function (locationData) {
  const weatherApiData = {
    url: 'https://api.openweathermap.org/data/2.5/onecall',
    key: '118bdccc4462075e438ee7deb86507dc',
  };
  const weatherSearchString = getWeatherSearchString(weatherApiData.url, weatherApiData.key, locationData);
  const weatherFetchResults = await requestWeatherData(weatherSearchString);
  return weatherFetchResults;
};

function getWeatherSearchString(url, key, locationData) {
  return `${url}?lat=${locationData.lat}&lon=${locationData.lon}&units=metric&exclude=minutely,hourly&appid=${key}`;
}

async function requestWeatherData(weatherSearchString) {
  const response = await fetch(weatherSearchString);
  const data = await response.json();
  return data;
}

export const timeFetch = async function (locationData) {
  const timeApiData = {
    url: 'http://api.timezonedb.com/v2.1/get-time-zone',
    key: 'L80765MCPXFZ',
  };

  const timeSearchString = getTimeSearchString(timeApiData.url, timeApiData.key, locationData);
  const timeFetchResults = await requestTimeData(timeSearchString);
  console.log(timeFetchResults);
  return timeFetchResults;
};

function getTimeSearchString(url, key, locationData) {
  return `${url}?format=json&by=position&lat=${locationData.lat}&lng=${locationData.lon}&key=${key}`;
}

async function requestTimeData(timeSearchString) {
  const response = await fetch(timeSearchString);
  const data = await response.json();
  return data;
}
