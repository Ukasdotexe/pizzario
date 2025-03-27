import Header from "./Header";
import CartOverView from "../features/Cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import "../index.css";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state == "loading";

  return (
    <div className="layout">
      <Header />
      <main>{isLoading ? <Loader /> : <Outlet />}</main>
      <CartOverView />
    </div>
  );
}

export default AppLayout;
