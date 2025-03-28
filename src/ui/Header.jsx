import { Link } from 'react-router-dom';
import SearchOrder from '../features/Order/SearchOrder';
import Username from '../features/User/Username';

function Header() {
  return (
    <header className="text-pizza flex items-center justify-between border-b-2 border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Pizzario Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
