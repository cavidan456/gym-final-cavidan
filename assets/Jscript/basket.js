const product = document.getElementById("product")



function getBasket() {
    product.innerHTML =``
  let cart = JSON.parse(localStorage.getItem("cart")) || []
    db = cart
    db.map((item, index) => {
        let box = document.createElement("div")
        box.className = "mt-3 col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mx-auto"
        box.innerHTML =`
        <div class="card">
  <img class="card-img-top" src="${item.image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p>${item.price} Tobago Doları</p>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button onclick="deleyt(${index})" class="btn btn-danger">sil</button>
  </div>
</div>`
product.appendChild(box)
    });
}

getBasket()


function deleyt(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
  cart.splice(index ,1)
  localStorage.setItem("cart", JSON.stringify(cart))
  getBasket()
}


//=========================================  C R U D // F O R M =====================================/
const lastname = document.getElementById("lastname")
const firstname = document.getElementById("firstname")
const email = document.getElementById("email")
const password =  document.getElementById("password")
const form = document.querySelector("form")

function postForm(event) {
  event.preventDefault()
  axios.post(`https://655dd2b79f1e1093c599f093.mockapi.io/forms`,{
    firstname:firstname.value,
    lastname:lastname.value,
    email:email.value,
    password:password.value
}).then((res)=>{
    console.log(res);
    getUser()
  })
}

form.addEventListener("submit" ,  postForm)


// get users 

const userRow = document.getElementById("usersAdd")

function getUser() {
  axios.get(`https://655dd2b79f1e1093c599f093.mockapi.io/forms`)
  .then(res=>{
  const data = res.data
  user = data
  userRow.innerHTML = ``
  user.forEach(item => {
    let userBox = document.createElement("div")
    userBox.className = "mt-3 col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
    userBox.innerHTML =`
    <div class="card"">
  <img class="card-img-top" src="${item.avatar}" alt="Card image cap">
  <div class="card-body">
  <h4>${item.firstname} ${item.lastname}</h4>
  <p>${item.email}</p>
    <button class="btn btn-danger" onclick="deleteUser(${item.id})">Delete User</button>
  </div>
</div>`
userRow.appendChild(userBox)
  });
})
}
getUser()

//  delete user 

function deleteUser(id) {
  axios.delete(`https://655dd2b79f1e1093c599f093.mockapi.io/forms/${id}`)
  .then((res)=>{
    console.log("kullanici silinmisdir");
    getUser()
  })
}