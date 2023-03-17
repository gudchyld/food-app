import { menuArray } from './data.js';

const menu = document.getElementById('menu');
const ptAmount = document.getElementById('pt-amount');
const formElem = document.getElementById('modal-form');
const payOut = document.getElementById('payout');
const darkness = document.getElementById('darkness');
const innerDark = document.getElementById('inner-dark');
const container = document.getElementById('container');
const modal = document.getElementById('modal');

// Event Listeners
document.addEventListener('click', (e) => {
  if (e.target.dataset.plus) {
    handlePlusClick(e.target.dataset.plus);
  } else if (e.target.dataset.minus) {
    handleMinusClick(e.target.dataset.minus);
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  } else if (e.target.id === 'btn-p') {
    document.getElementById('modal-con').style.display = 'flex';
  } else if (e.target.id === 'modal-close' || !e.target.closest('.modal')) {
    document.getElementById('modal-con').style.display = 'none';
  }
});

//handle formData event
formElem.addEventListener('submit', (e) => {
  // on form submission, prevent default
  e.preventDefault();

  // construct a FormData object, which fires the formdata event
  let formData = new FormData(formElem);
  let userName = formData.get('user-name');

  payOut.innerHTML = `<div class="appreciation" id="appreciation">
    <p>Thanks ${userName}, your order is on the way!</p>
   </div>`;
  document.getElementById('modal-con').style.display = 'none';
});

//function to handle an event when the plus button is clicked
let menuArr = menuArrayWithCount();
let cumPrices = Number(ptAmount.textContent);
function handlePlusClick(id) {
  let itemValue = ``;

  menuArr.forEach((item) => {
    if (item.count > 0 && id == item.id) {
      item.count++;
      item.totalPrice += item.price;
      cumPrices += item.price;
      document.getElementById(`${id}`).textContent = `${item.totalPrice}`;
    } else if (id == item.id) {
      item.count++;
      item.totalPrice += item.price;
      cumPrices += item.price;
      itemValue += `
              <div class='payout-menu' id='payout-menu'>
                <p class='pm-name'>${item.name}</p>
                <p class='pm-remove' data-remove='${item.id}' >remove</p>
                <p class='pm-total' id='${item.id}'>${item.price}</p>
                
              </div>
            `;
    }
  });

  document.getElementById('payout-items').innerHTML += itemValue;
  document.getElementById(id).parentElement.classList.remove('unshow');

  ptAmount.textContent = cumPrices;
}

//function to handle an event when the remove button is clicked
function handleRemoveClick(id) {
  menuArr.forEach((item) => {
    if (id == item.id) {
      cumPrices -= item.totalPrice;
      item.totalPrice = 0;
    }
  });

  document.getElementById('pt-amount').textContent = cumPrices;
  document.getElementById(id).parentElement.classList.add('unshow');
}

//This function deducts from the total amount of a particular item in the cart by the item price
function handleMinusClick(id) {
  menuArr.forEach((item) => {
    if (id == item.id && item.totalPrice <= item.price) {      
      cumPrices -= item.totalPrice;
      item.totalPrice -= item.price;
      document.getElementById(id).parentElement.classList.add('unshow');
    }else if(id == item.id && item.totalPrice > item.price){
      item.totalPrice -= item.price;
      cumPrices -= item.price;
      document.getElementById(`${id}`).textContent = `${item.totalPrice}`;
    }
    

  });

  document.getElementById('pt-amount').textContent = cumPrices;
}

//reformat menuArray to have additonal object properties
function menuArrayWithCount() {
  let newArr = menuArray.map((item) => {
    return { ...item, count: 0, totalPrice: 0 };
  });
  return newArr;
}

function displayMenuItems() {
  let menuItems = ``;
  menuArray.forEach((item) => {
    menuItems += `<div class="menu-item">
                    <div class="menu-img-holder">
                        <span class="menu-img">${item.emoji}</span>
                    </div>
                    <div class="menu-content">
                        <h3>${item.name}</h3>
                        <p class="menu-ingredient">${item.ingredients}</p>
                        <p class="menu-price">$${item.price}</p>
                    </div>
                    <div class="menu-icon">
                    <i class="fa-solid fa-minus menu-add menu-minus" data-minus='${item.id}' id='minus'></i>
                    <i class="fa-solid fa-plus menu-add" data-plus='${item.id}' id='plus'></i>
                    </div>
            </div>`;
  });
  return menuItems;
}
function render() {
  menu.innerHTML = displayMenuItems();
}
render();

// The power of darkness
darkness.addEventListener('click', () => {
  innerDark.classList.toggle('dark-mode')
  darkness.classList.toggle('darkness-dark')
  container.classList.toggle('dark-container');
  // the darkness continues
  document.querySelectorAll('#plus').forEach(item => {
    item.classList.toggle('light-brown');
  })
  document.querySelectorAll('#minus').forEach(item => {
    item.classList.toggle('light-brown');
  })
  modal.classList.toggle('dark-modal');

  document.querySelectorAll('.form-input').forEach(item => {
    item.classList.toggle('dark-input');
  })
  document.querySelector('input[type="text"]').style.border = '2px solid rgb(153, 141, 122)'
  document.querySelectorAll('input[type="number"]').forEach(item => {
    item.style.border = '2px solid rgb(153, 141, 122)'
  })

})
