document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.querySelector('.products')
  const products = JSON.parse(localStorage.getItem('PRODUCTS')) || []
  const productsInCart = JSON.parse(localStorage.getItem('PRODUCTS_CART')) || []
  const shoppingIcon = document.getElementById('shopping-cart-icon')
  shoppingIcon.innerText = productsInCart.length

  const showProducts = () => {
    productsContainer.innerHTML = products.map(product => {
      const button = productsInCart.some(_product => _product.id === product.id)
        ? `<button class="products__button products__button--disable" disable data-id=${product.id}>Añadir al carrito</button>`
        : `<button class="products__button" data-id=${product.id}>Añadir al carrito</button>`
      return (`
        <div class="products__item">
          <h3 class="products__title">${product.name}</h3>
          <strong class="products__price">$${product.price}</strong>
          <p class="products__description">${product.description}</p>
          ${button}
        </div>   
      `)
    }).join('')
    addListener()
  }

  const addListener = () => {
    document.querySelectorAll('.products__button').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id')
        if (productsInCart.some(product => product.id === parseInt(id))) return
        const product = products.find(_product => _product.id === parseInt(id))
        productsInCart.push(product)
        localStorage.setItem('PRODUCTS_CART', JSON.stringify(productsInCart))
        showProducts()
        shoppingIcon.innerText = productsInCart.length
      })
    })
  }
  showProducts()


})