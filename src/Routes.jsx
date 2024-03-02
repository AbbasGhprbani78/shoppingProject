import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import Category from "./Pages/Category/Category";
import Basket from "./Pages/Basket/Basket";
import Search from './Pages/Search/Search';
import Products from './Pages/Products/Products'

let routes = [
    { path: "/", element: <Home /> },
    { path: "/category-info/:categoryName/:id/:page", element: <Category /> },
    { path: "/product-info/:productName/:id", element: <Product /> },
    { path: "/basket", element: <Basket /> },
    { path: "/search", element: <Search /> },
    { path: "/Products", element: <Products /> },
]

export default routes