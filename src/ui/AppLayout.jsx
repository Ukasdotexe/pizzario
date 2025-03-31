import Header from './Header';
import CartOverView from '../features/Cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';
import '../index.css';
import { useSelector } from 'react-redux';
import { checkIsCardEmpty } from '../features/Cart/cartSlice';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state == 'loading';

  const isEmptyCart = useSelector(checkIsCardEmpty);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
          <Loader />
        </div>
      )}

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      {!isEmptyCart && <CartOverView />}
    </div>
  );
}

export default AppLayout;
