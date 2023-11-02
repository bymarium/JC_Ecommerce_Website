const hasUser = JSON.parse(localStorage.getItem('HAS_USER'))
const logoutButton = document.getElementById('logout-button')

if (!hasUser) {
  window.location = '../../index.html'
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('HAS_USER')
  })
}

let products = JSON.parse(localStorage.getItem('PRODUCTS')) || []

const table = document.getElementById('table-content')

document.addEventListener('DOMContentLoaded', () => {
  showProducts(products)

  addButtonsListener()
})

const form = document.getElementById('product-form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  products = JSON.parse(localStorage.getItem('PRODUCTS')) || []

  const isUpdating = JSON.parse(form.getAttribute('updating'))

  if (isUpdating) {
    const id = parseInt(localStorage.getItem('CURRENT_ID'))
    const product = {
      id,
      name: event.target.elements.name.value,
      price: event.target.elements.price.value,
      description: event.target.elements.description.value
    }

    const index = products.findIndex(product => product.id === id)
    products[index] = product
  } else {
    const product = {
      id: products[products.length - 1]?.id + 1 || 0 + 1,
      name: event.target.elements.name.value,
      price: event.target.elements.price.value,
      description: event.target.elements.description.value
    }
  
    products.push(product)
  }
  
  localStorage.setItem('PRODUCTS', JSON.stringify(products))
  showProducts(products)
  form.setAttribute('updating', false)

  document.getElementById('form-title').innerText = 'Crear producto'
  document.getElementById('submit-button').innerText = 'Crear'
  addButtonsListener()
  event.target.reset()
})


const showProducts = (products) => {
  table.innerHTML = products.map(product => (`
    <tr>
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td>
        <button class="button--edit" data-id="${product.id}">
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
              <path d="M16 5l3 3"></path>
            </svg>
          </i>
          Editar
        </button>
        <button class="button--delete" data-id="${product.id}">
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 7l16 0"></path>
              <path d="M10 11l0 6"></path>
              <path d="M14 11l0 6"></path>
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
            </svg>
          </i>
          Eliminar
        </button>
      </td>
    </tr>
  `)).join('')
}

const addButtonsListener = () => {
  document.querySelectorAll('.button--delete').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = button.getAttribute('data-id')
      alert('Se va a eliminar el producto: ' + id)
      const newProducts = products.filter(product => product.id !== parseInt(id)) // Estamos exluyendo el producto que se quiere eliminar
      localStorage.setItem('PRODUCTS', JSON.stringify(newProducts))
      event.target.parentElement.parentElement.remove()
    })
  })

  document.querySelectorAll('.button--edit').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id')
      localStorage.setItem('CURRENT_ID', id)
      const product = products.find(product => product.id === parseInt(id))
      document.getElementById('description').value = product.description
      document.getElementById('name').value = product.name
      document.getElementById('price').value = product.price

      form.setAttribute('updating', true)

      document.getElementById('form-title').innerText = 'Actualizar producto'
      document.getElementById('submit-button').innerText = 'Actualizar'
    })
  })
}