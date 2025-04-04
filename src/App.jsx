//

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './ui/Home';
import Menu, {
  loader as menuLoader,
} from './features/Menu/Menu';
import Cart from './features/Cart/Cart';
import Order, {
  Loader as orderLoader,
} from './features/Order/Order';
import Error from './ui/Error';
import CreateOrder, {
  action as createOrderAction,
} from './features/Order/CreateOrder';
import { action as updateOrderAction } from './features/Order/UpdateOrder';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    // layout route : provides the layout to the application
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,

        // the error will bubble up to the parent route unless handled
        // inside the child route.
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
