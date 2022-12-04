import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { getCountryList } from './getCountryList';
import { getCountryInfo } from './getCountryInfo';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput() {
  const name = searchInput.value.trim();
  if (name === '') {
    return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
  }
  fetchCountries(name)
    .then(countries => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      if (countries.length === 1) {
        countryList.insertAdjacentHTML('beforeend', getCountryList(countries));
        countryInfo.insertAdjacentHTML('beforeend', getCountryInfo(countries));
      } else if (countries.length >= 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        countryList.insertAdjacentHTML('beforeend', getCountryList(countries));
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}
