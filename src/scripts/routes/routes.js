import Home from '../views/pages/home';
import Detil from '../views/pages/detail';
import Favorite from '../views/pages/restoFavorit';

const routes = {
  '/': Home, // default page
  '/favorit': Favorite,
  '/resto/:id': Detil,
};

export default routes;