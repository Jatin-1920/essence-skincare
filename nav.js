const nav = document.querySelector('.nav-toggle')
const menuBar = document.querySelector('.menu-bar')
const closeBar = document.querySelector('.close-bars')
    const navShop = document.querySelector('.toggle-nav')
    const navCol = document.querySelector('.nav-col')
    const cart = document.querySelector('.cart-bag')
    const productJs = document.querySelector('.product-js')
    const productBar =  document.querySelector('.product-js-bar')



  const navigation = document.querySelector('.primary-navigation')

    nav.addEventListener('click',function(){
      
      navShop.classList.toggle('block')  
    })

    function addToggle(){
navigation.classList.add('add-toggle')

    }

function removeToggle(){
navigation.classList.remove('add-toggle')

}

function addCartToggle(){
  productJs.classList.add('add-toggle')

}

function removeCartToggle(){
  productJs.classList.remove('add-toggle')
}

 menuBar.addEventListener('click',addToggle) 
 cart.addEventListener('click', addCartToggle)
closeBar.addEventListener('click', removeToggle)
productBar.addEventListener('click', removeCartToggle)
