// Test ID: IIDSAT

import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utilities/helpers';

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = useLoaderData();

  console.log(useLoaderData());
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  // console.log(cart);
  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Order #{id} status
        </h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery:
          {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {cart.map((item) => {
          return (
            <li className="flex justify-between space-y-1 py-3">
              <div>
                <p>
                  <span className="text-sm font-bold">
                    {item.quantity} &times;
                  </span>
                  {item.name}
                </p>
                <p className="text-sm capitalize italic text-stone-500">
                  tomato, mozzarella, basil
                </p>
              </div>
              <p className="text-sm font-bold">
                {formatCurrency(item.unitPrice)}
              </p>
            </li>
          );
        })}

        {/* <li className="flex justify-between space-y-1 py-3">
          <div>
            <p>
              <span className="text-sm font-bold">2</span>
              &times; Margherita
            </p>
            <p className="text-sm capitalize italic text-stone-500">
              tomato, mozzarella, basil
            </p>
          </div>
          <p className="text-sm font-bold">€12.00</p>
        </li> */}
      </ul>
      <div className="mt-2 space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery:
          {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function Loader({ params }) {
  return await getOrder(params.orderId);
}

export default Order;
