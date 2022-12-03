export function getCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 42px height = 32px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `;
    })
    .join('');
  return markup;
}
