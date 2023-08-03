
let essenceItem= []
const store =  document.querySelector('.storeItem')
const noItem = document.querySelector('.no-item')
const addToCart =  document.querySelectorAll('.addToCart')
const productJt = document.querySelector('.product-js')

const sumPrice = document.querySelector('.sum-text')



function countSumPrice(){
    let  sumPrice = 0
    essenceItem.forEach(item=>{
       sumPrice += item.price
    })
    return sumPrice
}


function updateCartItem(item) {
    for(let i = 0; i < essenceItem.length; i++){
        if(essenceItem[i].class=== item.class){
essenceItem[i].count += 1
essenceItem[i].price = essenceItem[i].countPrice * essenceItem[i].count
return
        }
 
    }
   
    essenceItem.push(item)
    productJt.classList.add('add-toggle')
}




function addToCartItem(e) {
const current = e.currentTarget.parentElement
const oldprice = current.previousElementSibling.lastElementChild.firstElementChild.textContent
const price = parseFloat(oldprice)
const name = current.previousElementSibling.firstElementChild.textContent
const image = current.parentElement.parentElement.firstElementChild.firstElementChild
const img = image.src
const classes = name;

let item = {
    name,
price,
    img,
 id : Date.now(),
    class:classes,
    count:1,
    countPrice : price,
}

updateCartItem(item)
store.dispatchEvent(new CustomEvent("itemsUpdated"))
alert(`Your ${name} added to the cart`)
}


function displayItem(){
    
const html =  essenceItem.map(x=> 
`
          <div class="Cart-col" id=${x.id}>
          <img src=${x.img}>
          <div class="cart-Price">
              <span class="cart-Title ">${x.name}</span>
              <span class="cartPrice">$ ${x.price}</span>
              <span id="button" ><i class="fa fa-trash" id=${x.id} ></i></span>
          </div>
          <div class="cart-col-flex">
          <button class="minus" onclick="decrement(${x.id})">-</button>
          <span class="counted">${x.count}</span>
          <button class="plus" onclick="increment(${x.id})">+</button>
          </div>
          </div>
  
      `
).join('')
store.innerHTML = html
  sumPrice.innerHTML = "$ &nbsp" +countSumPrice()
  if(essenceItem.innerHTML===""){
           noItem.style.display = "block"
           sumPrice.innerHTML=""
        }else{
            noItem.style.display = "none"
        }
      
  }
  


function eventLocalStorage(){
    localStorage.setItem('essenceItem',JSON.stringify(essenceItem))
}

function getLocale(){
   const restore =  JSON.parse(localStorage.getItem('essenceItem'))
   if(restore.length){
    essenceItem = restore
    store.dispatchEvent(new CustomEvent("itemsUpdated"));
   }
}

function deleteItems(id){
    console.log('Delete items')
    essenceItem = essenceItem.filter((item)=>item.id !==id)
    store.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function increment(id) {
    let selectedItem  =id
    let search = essenceItem.find(x=>x.id===selectedItem)
    if(search)
    {
        search.count +=1
    }
    console.log(search)
    store.dispatchEvent(new CustomEvent("itemsUpdated"));
    calculation(id)
    }
    function decrement(id) {
        let selectedItem  =id
    let search = essenceItem.find(x=>x.id===selectedItem)
    if(search.count===0) {
      deleteItems(id)
    }
    else{
        search.count -=1
    }
    store.dispatchEvent(new CustomEvent("itemsUpdated"));
    console.log(search)
    calculation(id)
    }
    
    function calculation(id) {
        let search = essenceItem.find(x=>x.id===id)
        search.price = search.count*search.countPrice
        store.dispatchEvent(new CustomEvent("itemsUpdated"));
    }

addToCart.forEach(btn=>btn.addEventListener('click',addToCartItem))
store.addEventListener("itemsUpdated",displayItem)
store.addEventListener("itemsUpdated",eventLocalStorage)
store.addEventListener("click",(e)=>{
    const id = parseInt(e.target.id)
    if(e.target.matches("i")){
        deleteItems(id)
    }
    
})


getLocale()