import {
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import Button from '../../ui/Button';
import EmptyCart from '../Cart/EmptyCart';
import Loader from '../../ui/Loader';
import { createOrder } from '../../services/apiRestaurant';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAddress,
  getUsername,
} from '../User/userSlice';

import {
  clearCart,
  getCart,
  getTotalCartPrice,
} from '../Cart/cartSlice';

import { formatCurrency } from './../../utilities/helpers';

import store from '../../store';
import { useState } from 'react';

// https://uibakery.io/regex-library/phone-number

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const username = useSelector(getUsername);
  const {
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((store) => store.user);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === 'submitting';
  const isLoadingAddress = status === 'loading';

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority
    ? totalCartPrice * 0.2
    : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (cart.length === 0) return <EmptyCart />;

  if (isLoadingAddress)
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
        <Loader />
      </div>
    );

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let's go!
      </h2>

      <Form
        method="POST"
        className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[10rem_1fr]"
      >
        <label className="col-span-2 sm:col-span-1">
          First Name
        </label>
        <input
          className="input"
          type="text"
          name="customer"
          required
          defaultValue={username}
        />

        <label className="col-span-2 sm:col-span-1">
          Phone number
        </label>
        <div className="col-span-2 sm:col-span-1">
          <input
            className="input w-full" // Ensure this spans fully
            type="tel"
            name="phone"
            required
          />

          {formErrors?.phone && (
            <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-800">
              {formErrors.phone}
            </p>
          )}
        </div>

        <label className="col-span-2 sm:col-span-1">
          Address
        </label>

        <div className="relative col-span-2 sm:col-span-1">
          <input
            className="input w-full" // Ensure this spans fully
            type="text"
            name="address"
            defaultValue={address}
            required
          />
          {addressStatus === 'error' && (
            <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-800">
              {addressError}
            </p>
          )}
          {!position.latitude && !position.longtitude && (
            <span className="absolute right-0.5 top-0.5 z-30">
              <Button
                type="primary"
                onClick={() => {
                  dispatch(fetchAddress());
                }}
              >
                get Position
              </Button>
            </span>
          )}
        </div>

        <div className="col-span-2 mb-5 flex items-center gap-4">
          <input
            className="h-6 w-6 cursor-pointer accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) =>
              setWithPriority(e.target.checked)
            }
          />
          <label htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `latitude:${position.latitude},longitude:${position.longitude}`
                : ''
            }
          />
          <Button
            type="primary"
            disabled={isSubmitting || isLoadingAddress}
          >
            {isSubmitting
              ? `Placing order`
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  // console.log(request);

  const formData = await request.formData();

  // console.log([...formData.entries()]);

  const order = {
    ...Object.fromEntries(formData),
    cart: JSON.parse(formData.get('cart')), // Parse cart
    priority: formData.get('priority') === 'true', // Handle checkbox
  };

  console.log(order);
  const error = {};

  if (!isValidPhone(order.phone))
    error.phone = 'enter correct phone number';

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
