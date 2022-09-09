import { CartState } from "../redux/slices/cartSlice";

function sumCart(cart: CartState): number {
  return cart.reduce((acc, item) => {
    return item.price ? acc + item.price * item.quantity : 0;
  }, 0);
}

export default sumCart;
