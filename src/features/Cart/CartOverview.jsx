import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from './cartSlice';

function CartOverview() {
  const totalCardquantity = useSelector(
    getTotalCartQuantity,
  );

  const totalCardPrice = useSelector(getTotalCartPrice);

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-3 font-semibold text-stone-300">
        <span>{totalCardquantity} pizzas</span>
        <span>€{totalCardPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
