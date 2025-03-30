import { formatCurrency } from '../../utilities/helpers';

function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="flex justify-between space-y-1 py-3">
      <div>
        <p>
          <span className="text-sm font-bold">
            {quantity} &times;
          </span>
          {name}
        </p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
      </div>
      <p className="text-sm font-bold">
        {formatCurrency(totalPrice)}
      </p>
    </li>
  );
}

export default OrderItem;
