import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utilities/helpers';
import {
  addItem,
  getCartItemQuantityById,
} from '../Cart/cartSlice';
import QuantitySelector from '../../ui/QuantitySelector';

function MenuItem({ pizza }) {
  const {
    id,
    name,
    unitPrice,
    ingredients,
    soldOut,
    imageUrl,
  } = pizza;

  const dispatch = useDispatch();

  const itemQte = useSelector((store) =>
    getCartItemQuantityById(store, id),
  );

  const isInCart = itemQte > 0;
  // un working on updatig quantity whenever I click

  const handleAddToCart = () => {
    dispatch(
      addItem(
        id,
        ingredients,
        name,
        itemQte || 1,
        unitPrice,
      ),
    );
  };

  return (
    <li className="flex gap-x-4 py-2">
      <img
        className={`h-24 ${soldOut ? 'opacity-50 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && <QuantitySelector id={id} />}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              ADD TO CART
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
