'use strict';

import sodiacDate from '../api/sodiacs';

/*List of custom select*/

const date = document.getElementById('date-list');
const month = document.getElementById('month-list');
const year = document.getElementById('year-list');

function selectData (select, start, end) {
  for(let i = start; i <= end; i++) {
    const item = document.createElement('li');
    item.className = 'select__item select__button--text';
    item.value = i;
    item.textContent = i;
  
    select.append(item);
  };
};

selectData(date, 1, 31);
selectData(month, 1, 12);
selectData(year, 1950, 2022);

/*Custom select working principle*/

const selectButtons = document.querySelectorAll('.select__button');
const button = document.querySelector('.button');

let birthday = {
  date: '',
  month: '',
  year: '',
};

function isValidBirthday() {
  let sodiacUrl = {};
  const formItem = document.getElementById('birth');

  if (birthday.date !== ''
    && birthday.month !== ''
    && birthday.month !== ''
  ) {
    button.style.display = 'flex';

    const sodiacMonth = sodiacDate.find(({ month }) => month === birthday.month);

    if (birthday.date <= sodiacMonth.monthDates.date1.date) {
      sodiacUrl = sodiacMonth.monthDates.date1;
    } else {
      sodiacUrl = sodiacMonth.monthDates.date2;
    };

    formItem.insertAdjacentHTML('beforeend', `
      <div class="zodiac">
        <div>
          <img src=${sodiacUrl.url} alt='Img'>
        </div>
        <div class="zodiac__text">${sodiacUrl.name}</div>
      </div>
    `);
  };
};

selectButtons.forEach(selectButton => {
  selectButton.addEventListener('click', (e) => {
    e.preventDefault();

    const block = e.target.closest('.select');
    const list = block.querySelector('.select__list');
    const items = list.querySelectorAll('.select__item');
  
    if (list.classList.contains('select__list--active')) {
      list.classList.remove('select__list--active');
    } else {
      list.classList.add('select__list--active');
    };
  
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        const block = e.target.closest('.select');
        const button = block.querySelector('.select__button');

        button.value = e.target.value;
        button.querySelector('.select__button--text').textContent = e.target.value;
        if (button.id === 'date') {
          birthday = {
            ...birthday,
            date: e.target.value,
          };
        };

        if (button.id === 'month') {
          birthday = {
            ...birthday,
            month: e.target.value,
          };
        };

        if (button.id === 'year') {
          birthday = {
            ...birthday,
            year: e.target.value,
          };
        };

        list.classList.remove('select__list--active');
      });
    });

    isValidBirthday();
  });
});

/*Form guide*/
const formItems = document.querySelectorAll('.form__item');
const footer = document.querySelector('.container__footer');
let currentItem = 0;

showItem(currentItem)

function showItem(ind) {
  formItems[ind].className = 'form__item--active';

  const inputs = formItems[ind].querySelectorAll('input');

  if (ind === formItems.length - 1) {
    button.innerHTML = `
      <img src="./images/phone.png" alt="Phone">
      <div class="button__text">Звонить и слушать</div>
    `;
    button.style.width = '100%';
    button.style.display = 'flex';
    footer.textContent = `
      TERMENI SI CONDITII: ACESTA ESTE UN SERVICIU DE DIVERTISMENT. PRIN FOLOSIREA LUI DECLARATI CA AVETI 18
    `;
    footer.classList.add('footer__end');
  };

  inputs.forEach(input => {
    input.addEventListener('click', (e) => {

      inputs.forEach(input => {
        input.removeAttribute('checked');
        input.closest('label').className = '';
      });
  
      e.target.setAttribute('checked', true);
  
      if (e.target.checked) {
        e.target.closest('label').className = 'form__content--radio-active';
      } else {
        e.target.closest('label').className = '';
      };

      button.style.display = 'flex';
    })
  });
};

button.addEventListener('click', () => {
  formItems[currentItem].style.display = 'none';
  button.style.display = 'none';
  currentItem = currentItem + 1;
  document.querySelector('.info').style.display = 'none';

  if (currentItem >= formItems.length) {
    document.querySelector('.form__container').submit();
  };

  showItem(currentItem);
});
