import { menuArray } from "./data.js";

const menu = document.getElementById('menu');

// Event Listeners
document.addEventListener('click', (e)=> {
  if (e.target.dataset.plus){
  handlePlusClick(e.target.dataset.plus);
  }else if(e.target.dataset.remove){
    handleRemoveClick(e.target.dataset.remove);
  }
})

//function to handle an event when the plus button is clicked
let menuArr = menuArrayWithCount()
function handlePlusClick(id) {
  let itemValue=``
  let cumPrices = 0;
  
  menuArr.forEach(item => {
    if (item.count > 0 && id == item.id ) {
      item.count++
      item.totalPrice += item.price
      document.getElementById(`${id}`).textContent = `${item.totalPrice}`

    }else if (id == item.id) {
      item.count++
      item.totalPrice += item.price
      itemValue += `
              <div class='payout-menu' id='payout-menu'>
                <p class='pm-name'>${item.name}</p>
                <p class='pm-remove' data-remove='${item.id}' >remove</p>
                <p class='pm-total' id='${item.id}'>${item.price}</p>
                
              </div>
            `
    }
  })
  
  document.getElementById('payout-items').innerHTML += itemValue
  document.getElementById(id).parentElement.classList.remove('unshow')
  
  
  let tClass = document.querySelectorAll('.pm-total');
  
  for (let eclass of tClass) {
    cumPrices += Number(eclass.textContent)
  }
  
  document.getElementById('pt-amount').textContent = cumPrices;
}

//function to handle an event when the remove button is clicked
function handleRemoveClick(id){
    document.getElementById(id).parentElement.classList.add('unshow')

}

//reformat menuArray to have additonal object properties
function menuArrayWithCount(){
  let newArr = menuArray.map(item => {
    return {...item, 'count': 0, 'totalPrice': 0
    }
  } )
  return newArr
}

function displayMenuItems(){
    let menuItems = ``
    menuArray.forEach(item => {
        
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
                    <i class="fa-solid fa-plus menu-add" data-plus='${item.id}'></i>
                    </div>
            </div>`
       
    })
    return menuItems
}
function render(){
    menu.innerHTML = displayMenuItems();
}
render()