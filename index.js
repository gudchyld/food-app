import { menuArray } from "./data.js";

const menu = document.getElementById('menu');
const ptAmount = document.getElementById('pt-amount');
const formElem = document.getElementById('modal-form');
const payOut = document.getElementById('payout')

// Event Listeners
document.addEventListener('click', (e)=> {
  if (e.target.dataset.plus){
  handlePlusClick(e.target.dataset.plus);
  }else if(e.target.dataset.remove){
    handleRemoveClick(e.target.dataset.remove);
  }else if(e.target.id === 'btn-p' ){
    document.getElementById('modal-con').style.display = 'flex'
  }
  else if(e.target.id ==='modal-close' || !e.target.closest(".modal")){
    document.getElementById('modal-con').style.display = 'none'
  }
})

//handle formData event
formElem.addEventListener('submit', (e) => {
  
    // on form submission, prevent default
    e.preventDefault();
  
    // construct a FormData object, which fires the formdata event
   let formData =  new FormData(formElem);
   let userName = formData.get("user-name")

   payOut.innerHTML = `<div class="appreciation" id="appreciation">
    <p>Thanks ${userName}, your order is on the way!</p>
   </div>`
   document.getElementById('modal-con').style.display = 'none'
    
  });



//function to handle an event when the plus button is clicked
let menuArr = menuArrayWithCount()
let cumPrices = Number(ptAmount.textContent)
function handlePlusClick(id) {
  let itemValue=``

  menuArr.forEach(item => {
    if (item.count > 0 && id == item.id ) {
      item.count++
      item.totalPrice += item.price
      cumPrices+=item.price
      document.getElementById(`${id}`).textContent = `${item.totalPrice}`

    }else if (id == item.id) {
      item.count++
      item.totalPrice += item.price
      cumPrices+= item.price
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

ptAmount.textContent = cumPrices;
}

//function to handle an event when the remove button is clicked
function handleRemoveClick(id){
  
    menuArr.forEach(item => {
      if (id == item.id){
        cumPrices-= item.totalPrice
        item.totalPrice = 0
      }
    })
    
  document.getElementById('pt-amount').textContent = cumPrices;
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