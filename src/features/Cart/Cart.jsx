//
//

import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIsCardEmpty,
  clearCart,
  getCart,
} from './cartSlice';
import { getUsername } from '../User/userSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUsername);
  const iscartEmpty = useSelector(checkIsCardEmpty);
  const dispatch = useDispatch();

  if (iscartEmpty) return <EmptyCart />;

  return (
    <div className="bgf-blue-400 px-4 py-3">
      <LinkButton to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h2 className="my-7 text-xl font-semibold">
        Your cart, {username}
      </h2>

      <ul className="divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-5">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button
          onClick={() => dispatch(clearCart())}
          type="secondary"
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
