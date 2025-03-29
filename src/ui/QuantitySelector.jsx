import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';

import {
  decreaseItemQuantity,
  increaseItemQuantity,
  deleteItem,
  getCartItemQuantityById,
} from '../features/Cart/cartSlice';

function QuantitySelector({ id }) {
  const dispatch = useDispatch();

  const quantity = useSelector((store) =>
    getCartItemQuantityById(store, id),
  );

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            if (quantity === 1) return;
            dispatch(decreaseItemQuantity(id));
          }}
          type="quantity"
        >
          -
        </Button>

        <p className="text-base font-semibold">
          {quantity}
        </p>

        <Button
          onClick={() => {
            dispatch(increaseItemQuantity(id));
          }}
          type="quantity"
        >
          +
        </Button>
      </div>

      <Button
        onClick={() => dispatch(deleteItem(id))}
        type="small"
      >
        Delete
      </Button>
    </div>
  );
}

export default QuantitySelector;
