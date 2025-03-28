//
//

import Button from '../../ui/Button';
import { formatCurrency } from '../../utilities/helpers';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>

      <div className="flex items-center justify-between gap-4">
        <p className="font-bold">
          {formatCurrency(totalPrice)}
        </p>
        <div className="flex items-center gap-2">
          <Button type="quantity">-</Button>
          <p>3</p>
          <Button type="quantity">+</Button>
        </div>
        <Button type="small">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
