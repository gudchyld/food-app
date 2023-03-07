import { menuArray } from "./data.js";

const menu = document.getElementById('menu');

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
                    <i class="fa-solid fa-plus menu-add"></i>
                    </div>
            </div>`
       
    })
    return menuItems
}
function render(){
    menu.innerHTML = displayMenuItems();
}
render()