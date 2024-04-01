import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalCost = cartList.reduce(
        (accumulator, currVal) =>
          accumulator + currVal.price * currVal.quantity,
        0,
      )
      return (
        <div className="cart-summary-container">
          <p>
            Order Total: <span>Rs {totalCost} /-</span>
          </p>
          <p>{cartList.length} Items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
