import { map, chart } from './components.js';
import { submitSearch } from './index.js';

export const activateStartCity = function () {
  let event = new Event('Enter');
  event.key = 'Enter';
  submitSearch(event);
};

export const resposiveness = function (myChart) {
  phoneOnly();
  tabletUpper();

  function phoneOnly() {
    const phone = window.matchMedia('(max-width: 599px)');
    handlePhoneChange(phone);
    phone.addListener(handlePhoneChange);
    function handlePhoneChange(e) {
      if (e.matches) {
        let favourites = document.querySelector('#favourites');
        let history = document.querySelector('#history');
        console.log(favourites.textContent);
        favourites.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-angle-down"></i>';
        /* let i = document.createElement('i');
          favourites.appendChild(i);
          favourites.firstElementChild.classList.add('fas', 'fa-star');
    
          let i2 = document.createElement('i');
          favourites.appendChild(i2);
          favourites.children[1].classList.add('fas', 'fa-angle-down'); */
        history.innerHTML = '<i class="fas fa-history"></i><i class="fas fa-angle-down"></i>';

        myChart.data.datasets[0].borderWidth = 3;
        myChart.data.datasets[0].pointRadius = 2;
        myChart.options.scales.y.ticks.font.size = 9;
        myChart.options.scales.x.ticks.font.size = 9.5;

        myChart.update();
      }
    }
  }
  function tabletUpper() {
    const tablet = window.matchMedia('(min-width: 599px)');
    handleTabletChange(tablet);
    tablet.addListener(handleTabletChange);
    function handleTabletChange(e) {
      if (e.matches) {
        let favourites = document.querySelector('#favourites');
        let history = document.querySelector('#history');
        favourites.innerHTML = 'Favourites <i class="fas fa-angle-down"></i>';
        /* let i = document.createElement('i');
          favourites.appendChild(i);
          favourites.firstElementChild.classList.add('fas', 'fa-star');
    
          let i2 = document.createElement('i');
          favourites.appendChild(i2);
          favourites.children[1].classList.add('fas', 'fa-angle-down'); */
        history.innerHTML = 'History </i><i class="fas fa-angle-down"></i>';

        myChart.data.datasets[0].borderWidth = 4;
        myChart.data.datasets[0].pointRadius = 3;
        myChart.options.scales.y.ticks.font.size = 11;
        myChart.options.scales.x.ticks.font.size = 11;
        myChart.update();
      }
    }
  }
};

export const showCityModal = function () {
  var modal = document.querySelector('#myModal');
  var span = document.querySelector('.close');
  let modalHeaderHTML = document.querySelector('.modalHeader');
  let modalBodyHTML = document.querySelector('.modalBody');
  modalHeaderHTML.textContent = 'City can not be found!';
  modalBodyHTML.textContent = "Make sure it's typed correct";
  modal.style.display = 'block';
  span.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });
};

function showDuplicateModal() {
  let modalHTML = document.querySelector('#myModal');
  let spanHTML = document.querySelector('.close');
  let modalHeaderHTML = document.querySelector('.modalHeader');
  let modalBodyHTML = document.querySelector('.modalBody');
  modalHeaderHTML.textContent = 'Duplicate city!';
  modalBodyHTML.textContent = 'This city is already added to your favourites';
  modalHTML.style.display = 'block';

  spanHTML.addEventListener('click', () => {
    modalHTML.style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    if (e.target == modalHTML) {
      modalHTML.style.display = 'none';
    }
  });
}

export const changePicture = function (pictureResultData) {
  if (pictureResultData !== 'noPictureFound') {
    const image = document.querySelector('.image');
    image.src = pictureResultData.src;
    image.alt = pictureResultData.alt;
    // console.log(document.querySelector('.image'));
  } else {
    // TODO: default picture
  }
};

export const changeInfoText = function (infoTextData) {
  if (infoTextData !== 'noInfoTextFound') {
    const summaryText = document.querySelector('.summaryText');
    const summaryTextLink = document.querySelector('.summaryTextLink');
    summaryText.firstChild.textContent = infoTextData.text;

    const tabletSize = window.matchMedia('(max-width: 900px)');
    handleTableteChange(tabletSize);
    tabletSize.addListener(handleTableteChange);
    function handleTableteChange(e) {
      if (e.matches) {
        summaryTextLink.href = infoTextData.urlMobile;
      }
    }
    const desktopSize = window.matchMedia('(min-width: 901px)');
    handleDesktopChange(desktopSize);
    desktopSize.addListener(handleDesktopChange);
    function handleDesktopChange(e) {
      if (e.matches) {
        summaryTextLink.href = infoTextData.urlDesktop;
      }
    }
  }
};

export const changeCity = function (locationData) {
  const city = document.querySelector('.city');
  const country = document.querySelector('.country');
  // console.log(city, country);
  city.textContent = locationData.city;
  country.textContent = locationData.country;
  // console.log(city, country);
  checkStarActive();
};

export const changeMap = function (locationData) {
  /* map.flyTo({
    center: [locationData.lat, locationData.lon],
  }); */
  /* map.flyTo(); */
  map(locationData.lon, locationData.lat);
};

export const changeNews = function (newsResultData) {
  let len = newsResultData.articles.length;
  console.log(newsResultData.articles);
  const newsHeaders = Array.from(document.querySelectorAll('.newsItem h3'));
  const newsHeaderUrl = Array.from(document.querySelectorAll('.newsHeaderLink'));
  const newsText = Array.from(document.querySelectorAll('.newsText'));
  const newsImage = Array.from(document.querySelectorAll('.newsImage'));
  const newsImageUrl = Array.from(document.querySelectorAll('.newsImageLink'));
  const newsDate = Array.from(document.querySelectorAll('.newsDate'));
  const newsSource = Array.from(document.querySelectorAll('.newsSource'));

  for (let i = 0; i < len; i++) {
    newsHeaders[i].textContent = newsResultData.articles[i].title;
    newsHeaderUrl[i].href = newsResultData.articles[i].url;
    newsImage[i].src = newsResultData.articles[i].urlToImage;
    newsImageUrl[i].href = newsResultData.articles[i].url;
    newsText[i].textContent = newsResultData.articles[i].description;
    newsDate[i].textContent = getNewsDateFromated(newsResultData.articles[i].publishedAt);
    newsSource[i].textContent = newsResultData.articles[i].source.name;
  }
};

function getNewsDateFromated(date) {
  var formatedDate = moment(date).format('DD.MM.YYYY');
  //console.log(formatedDate);
  return formatedDate;
}

export const changeDate = function (timeData) {
  let unformatedDate = timeData.formatted.slice(0, 11);
  //console.log(unformatedDate);
  let formatedDate = getDateFromated(unformatedDate);
  let date = document.querySelector('.date');
  date.textContent = formatedDate;
  return formatedDate;
};

function getDateFromated(unformatedDate) {
  let formatedDate = moment(unformatedDate).format('dddd, DD MMMM YYYY');
  return formatedDate;
}

export const changeTime = function (timeData) {
  // console.log(timeData);
  let unformatedTime = timeData.formatted.slice(11, 19);
  // console.log(unformatedTime);
  let formatedTime = getTimeFormated(unformatedTime);
  let time = document.querySelector('.time');
  time.textContent = formatedTime;
};

function getTimeFormated(unformatedTime) {
  let formatedTme = moment(unformatedTime, 'HH:mm:ss').format('HH:mm a');
  // console.log(formatedTme);
  return formatedTme;
}

export const changeWeather = function (weatherData, myChart, currentDay) {
  let currentWeather = weatherData.current;
  let dailyWeather = weatherData.daily;
  console.log(myChart);
  changeCurrentWeather(currentWeather, dailyWeather);
  changeDailyWeather(dailyWeather, myChart, currentDay);
};

function changeCurrentWeather(currentWeather, dailyWeather) {
  let bodyHTML = document.querySelector('body');
  let temperatureHTML = document.querySelector('.temperature');
  let weatherIconHTML = document.querySelector('.weatherIcon');
  let conditionHTML = document.querySelector('.condition');
  let maxHTML = document.querySelector('.max');
  let minHTML = document.querySelector('.min');

  changeBackgroundImage(currentWeather.weather[0].main, bodyHTML);

  temperatureHTML.textContent = Math.round(currentWeather.temp) + '°C';
  weatherIconHTML.src = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
  conditionHTML.textContent = currentWeather.weather[0].main;
  minHTML.textContent = Math.round(dailyWeather[0].temp.min) + '°C';
  maxHTML.textContent = Math.round(dailyWeather[0].temp.max) + '°C';
}

function changeBackgroundImage(currentWeather, bodyHTML) {
  if (currentWeather == 'Clear') {
    bodyHTML.style.backgroundImage = "url('../assets/img/picture/t/clear_20.png')";
  } else if (currentWeather == 'Clouds') {
    bodyHTML.style.backgroundImage = "url('../assets/img/picture/t/clouds_20.png')";
  } else if (currentWeather == 'Snow') {
    bodyHTML.style.backgroundImage = "url('../assets/img/picture/t/snow_20.png')";
  } else if (currentWeather == 'Rain') {
    bodyHTML.style.backgroundImage = "url('../assets/img/picture/t/rain_10.png')";
  } else if (currentWeather == 'Drizzle') {
    bodyHTML.style.backgroundImage = "url('../assets/img/picture/t/rain_10.png')";
  } else if (currentWeather == 'Thunderstorm') {
    bodyHTML.style.backgroundImage = "url('../assets/img/picture/t/thunderstorm_10.png')";
  } else {
    bodyHTML.style.backgroundImage = "url('../assets/img/picture/t/fog_10.png')";
  }
}

function changeDailyWeather(dailyWeather, myChart, currentDay) {
  dailyWeather.pop();
  dailyWeather.pop();
  // console.log(dailyWeather);
  let dataArr = [];
  for (let i = 0; i < dailyWeather.length; i++) {
    dataArr.push(dailyWeather[i].temp.day.toFixed(1));
  }

  myChart.data.datasets[0].data = dataArr;

  let currentWeekDay = currentDay.split(',').shift();
  let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let flag = 0;
  for (let i = 0; i < weekdays.length; i++) {
    if (weekdays[i] == currentWeekDay) {
      flag = i;
      continue;
    }
  }

  let afterArr = [];
  let beforeArr = [];
  for (let i = 0; i <= 6; i++) {
    if (i < flag) {
      beforeArr.push(weekdays[i]);
    } else if (i >= flag) {
      afterArr.push(weekdays[i]);
    }
  }

  let sortedArr = [...afterArr, ...beforeArr];
  sortedArr.pop();
  myChart.data.labels = sortedArr;

  myChart.update();
}

export const changeBackgroundColor = function (e) {
  console.log(e.target.id);
  let colorButton1HTML = document.querySelector('#colorButton1');
  console.log(colorButton1HTML);
  let colorButton2HTML = document.querySelector('#colorButton2');
  let colorButton3HTML = document.querySelector('#colorButton3');

  changeButtonActive(e, colorButton1HTML, colorButton2HTML, colorButton3HTML);
  changeColor(e, colorButton1HTML, colorButton2HTML, colorButton3HTML);
};

function changeButtonActive(e, colorButton1HTML, colorButton2HTML, colorButton3HTML) {
  if (e.target.id == 'colorButton1') {
    if (!colorButton1HTML.classList.contains('active')) {
      colorButton1HTML.classList.add('active');
      saveActiveLocal('colorButton1');
    }
    colorButton2HTML.classList.remove('active');
    colorButton3HTML.classList.remove('active');
  } else if (e.target.id == 'colorButton2') {
    if (!colorButton2HTML.classList.contains('active')) {
      colorButton2HTML.classList.add('active');
      saveActiveLocal('colorButton2');
    }
    colorButton1HTML.classList.remove('active');
    colorButton3HTML.classList.remove('active');
  } else if (e.target.id == 'colorButton3') {
    if (!colorButton3HTML.classList.contains('active')) {
      colorButton3HTML.classList.add('active');
      saveActiveLocal('colorButton3');
    }
    colorButton1HTML.classList.remove('active');
    colorButton2HTML.classList.remove('active');
  }
}

function changeColor(e, colorButton1HTML, colorButton2HTML, colorButton3HTML) {
  let bodyHTML = document.querySelector('body');
  if (e.target.id == 'colorButton1') {
    bodyHTML.style.backgroundColor = '#fb8500';
    saveColorLocal('#fb8500');
    //console.log(colorButton1HTML.style);
  } else if (e.target.id == 'colorButton2') {
    bodyHTML.style.backgroundColor = '#14213d';
    saveColorLocal('#14213d');
  } else if (e.target.id == 'colorButton3') {
    bodyHTML.style.backgroundColor = '#000000';
    saveColorLocal('#000000');
  }
}

function saveColorLocal(color) {
  localStorage.setItem('colors', color);
}

function saveActiveLocal(htmlButton) {
  localStorage.setItem('active', htmlButton);
}

export const colorModes = function () {
  restoreDataLocal();
  let colorContainerHTML = document.querySelector('.colorContainer');
  colorContainerHTML.addEventListener('click', changeBackgroundColor);
};

export const restoreDataLocal = function () {
  let storedColorData = localStorage.getItem('colors');
  let storedActiveData = localStorage.getItem('active');
  if (storedColorData === null && storedActiveData === null) {
    storedColorData = '#14213d';
    // saveColorLocal('#14213d');
    localStorageColorChange(storedColorData);
    storedActiveData = 'colorButton2';
    // saveActiveLocal('#colorButton2');
    localStorageActiveChange(storedActiveData);
  } else {
    localStorageColorChange(storedColorData);
    localStorageActiveChange(storedActiveData);
  }
};

function localStorageColorChange(storedColorData) {
  let bodyHTML = document.querySelector('body');
  bodyHTML.style.backgroundColor = storedColorData;
}

function localStorageActiveChange(storedActiveData) {
  let item = document.querySelector(`#${storedActiveData}`);
  item.classList.add('active');
}

////////////////////////////////////////////////////////

export const favouritesFunctionality = function () {
  restoreFavouriteLocal();
  let starHTML = document.querySelector('.star');
  let deleteHTML = document.querySelectorAll('.delete');
  let favouritesItemTextHTML = document.querySelectorAll('.favouritesItemText');

  starHTML.addEventListener('click', addToFavourites);
  for (const entry of deleteHTML) {
    entry.addEventListener('click', removeFavourite);
  }
  for (const entry of favouritesItemTextHTML) {
    entry.addEventListener('click', activateFavouriteCity);
  }
};

function activateStar() {
  let starHTML = document.querySelector('.star');
  starHTML.classList.add('fas');
}

function deactivateStar() {
  let starHTML = document.querySelector('.star');
  starHTML.classList.remove('fas');
}

function addToFavourites() {
  let cityHTML = document.querySelector('.city').textContent;
  let countryHTML = document.querySelector('.country').textContent;
  let favouritesDropdownHTML = document.querySelector('.favourites-dropdown');
  let itemToAdd = `${cityHTML}, ${countryHTML}`;

  if (favouritesDropdownHTML.children.length < 20) {
    if (checkDuplicate(favouritesDropdownHTML.children, itemToAdd)) {
      /* <div class="favouritesItem">
      <a href="#">NewYork, US</a> 
      <i class="far fa-trash-alt delete"></i>
      </div> */
      let divHTML = document.createElement('div');
      divHTML.classList.add('favouritesItem');
      let aHTML = document.createElement('a');
      aHTML.href = '#';
      aHTML.classList.add('favouritesItemText');
      aHTML.textContent = itemToAdd;
      let iconHTML = document.createElement('i');
      iconHTML.className = 'far fa-trash-alt delete';

      divHTML.appendChild(aHTML);
      divHTML.appendChild(iconHTML);
      favouritesDropdownHTML.appendChild(divHTML);

      let favouritesItemTextHTML = document.querySelectorAll('.favouritesItemText');
      let deleteHTML = document.querySelectorAll('.delete');
      for (const entry of deleteHTML) {
        entry.addEventListener('click', removeFavourite);
      }
      for (const entry of favouritesItemTextHTML) {
        entry.addEventListener('click', activateFavouriteCity);
      }

      saveFavouriteLocal(itemToAdd);
      checkStarActive();
    } else {
      showDuplicateModal();
    }
  } else {
    alert('maximum number of favourites');
  }
}

function checkDuplicate(entrys, item) {
  for (const i of entrys) {
    if (i.textContent === item) {
      return false;
    }
  }
  return true;
}

function removeFavourite(e) {
  e.target.parentElement.remove();

  removeFavouriteLocal(e.target.parentElement.textContent);
  checkStarActive();
}

export const activateFavouriteCity = function (e) {
  let searchTextHTML = document.querySelector('#searchText');
  let favouriteTextItem = e.target.textContent.split(',');
  searchTextHTML.value = favouriteTextItem[0];

  let event = new Event('Enter');
  event.key = 'Enter';
  submitSearch(event);
};

function saveFavouriteLocal(itemToAdd) {
  let oldItem = localStorage.getItem('favourite');
  if (oldItem === null) {
    oldItem = '';
    localStorage.setItem('favourite', itemToAdd);
  } else {
    localStorage.setItem('favourite', oldItem + '|' + itemToAdd);
  }
}

function removeFavouriteLocal(itemToRemove) {
  let oldItem = localStorage.getItem('favourite');

  let itemsArr = oldItem.split('|');

  let newArr = itemsArr.filter((i) => {
    if (i !== itemToRemove) {
      return i;
    }
  });

  let str = newArr.join('|');

  localStorage.removeItem('favourite');
  localStorage.setItem('favourite', str);

  if (localStorage.getItem('favourite') === '') {
    localStorage.removeItem('favourite');
  }
}

function restoreFavouriteLocal() {
  let storedFavouriteData = localStorage.getItem('favourite');
  if (storedFavouriteData !== null) {
    addToFavouritesDropdownLocalStorage(storedFavouriteData);
    changeStarLocalStorage(storedFavouriteData);
  }
}

function addToFavouritesDropdownLocalStorage(itemsToAdd) {
  let favouritesDropdownHTML = document.querySelector('.favourites-dropdown');

  let itemsArray = itemsToAdd.split('|');

  for (let i of itemsArray) {
    let divHTML = document.createElement('div');
    divHTML.classList.add('favouritesItem');
    let aHTML = document.createElement('a');
    aHTML.href = '#';
    aHTML.classList.add('favouritesItemText');
    aHTML.textContent = i;
    let iconHTML = document.createElement('i');
    iconHTML.className = 'far fa-trash-alt delete';

    divHTML.appendChild(aHTML);
    divHTML.appendChild(iconHTML);
    favouritesDropdownHTML.appendChild(divHTML);
  }

  let favouritesItemTextHTML = document.querySelectorAll('.favouritesItemText');
  let deleteHTML = document.querySelectorAll('.delete');
  for (const entry of deleteHTML) {
    entry.addEventListener('click', removeFavourite);
  }
  for (const entry of favouritesItemTextHTML) {
    entry.addEventListener('click', activateFavouriteCity);
  }
}

function changeStarLocalStorage(itemsToAdd) {
  let itemsArray = itemsToAdd.split('|');

  for (let i of itemsArray) {
    let cityHTML = document.querySelector('.city').textContent;
    i = i.split(',');

    if (cityHTML === i[0]) {
      activateStar();
      break;
    } else {
      deactivateStar();
    }
  }
}

function checkStarActive() {
  let storedFavouriteData = localStorage.getItem('favourite');
  if (storedFavouriteData !== null) {
    changeStarLocalStorage(storedFavouriteData);
  } else {
    deactivateStar();
  }
}

export const historyFunctionality = function () {
  addToHistory();
};

function addToHistory() {
  let cityHTML = document.querySelector('.city').textContent;
  let countryHTML = document.querySelector('.country').textContent;
  let historyDropdownHTML = document.querySelector('.history-dropdown');
  let itemToAdd = `${cityHTML}, ${countryHTML}`;

  if (historyDropdownHTML.children.length < 15) {
    let divHTML = document.createElement('div');
    divHTML.classList.add('histroyItem');
    let aHTML = document.createElement('a');
    aHTML.href = '#';
    aHTML.classList.add('histroyItemText');
    aHTML.textContent = itemToAdd;

    divHTML.appendChild(aHTML);
    historyDropdownHTML.appendChild(divHTML);

    let historyItemTextHTML = document.querySelectorAll('.histroyItemText');

    for (const entry of historyItemTextHTML) {
      entry.addEventListener('click', activateHistoryCity);
    }
  } else {
    // alert('maximum number of favourites');
    historyDropdownHTML.children[0].remove();

    let divHTML = document.createElement('div');
    divHTML.classList.add('histroyItem');
    let aHTML = document.createElement('a');
    aHTML.href = '#';
    aHTML.classList.add('histroyItemText');
    aHTML.textContent = itemToAdd;

    divHTML.appendChild(aHTML);
    historyDropdownHTML.appendChild(divHTML);

    let historyItemTextHTML = document.querySelectorAll('.histroyItemText');

    for (const entry of historyItemTextHTML) {
      entry.addEventListener('click', activateHistoryCity);
    }
  }
}

function activateHistoryCity(e) {
  let searchTextHTML = document.querySelector('#searchText');
  let favouriteTextItem = e.target.textContent.split(',');
  searchTextHTML.value = favouriteTextItem[0];

  let event = new Event('Enter');
  event.key = 'Enter';
  submitSearch(event);
}
