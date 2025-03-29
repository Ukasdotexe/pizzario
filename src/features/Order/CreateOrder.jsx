import { useState } from 'react';
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { getUsername } from '../User/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const username = useSelector(getUsername);
  const cart = fakeCart;
  const navigation = useNavigation();
  const formErrors = useActionData();

  const isSubmitting = navigation.state === 'submitting';

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

        <div className="col-span-2 sm:col-span-1">
          <input
            className="input w-full" // Ensure this spans fully
            type="text"
            name="address"
            required
          />
        </div>

        <div className="col-span-2 mb-5 flex items-center gap-4">
          <input
            className="h-6 w-6 cursor-pointer accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
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
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Placing order' : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  console.log(request);

  const formData = await request.formData();

  console.log([...formData.entries()]);

  const order = {
    ...Object.fromEntries(formData),
    cart: JSON.parse(formData.get('cart')), // Parse cart
    priority: formData.get('priority') === 'on', // Handle checkbox
  };

  const error = {};

  if (!isValidPhone(order.phone))
    error.phone = 'enter correct phone number';

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
