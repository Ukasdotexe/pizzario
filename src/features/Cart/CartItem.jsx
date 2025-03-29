//
//

import Button from '../../ui/Button';
import QuantitySelector from '../../ui/QuantitySelector';
import { formatCurrency } from '../../utilities/helpers';

function CartItem({ item }) {
  const { id, name, quantity, totalPrice } = item;

  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-4">
        <p className="font-bold">
          {formatCurrency(totalPrice)}
        </p>
        <QuantitySelector id={id} />
      </div>
    </li>
  );
}

export default CartItem;
