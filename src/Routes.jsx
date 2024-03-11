import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import Category from "./Pages/Category/Category";
import Basket from "./Pages/Basket/Basket";
import Search from './Pages/Search/Search';
import Products from './Pages/Products/Products'
import Brand from "./Pages/Brand/Brand";

let routes = [
    { path: "/", element: <Home /> },
    { path: "/category-info/:categoryName", element: <Category /> },
    { path: "/product-info/:productName/:id", element: <Product /> },
    { path: "/basket", element: <Basket /> },
    { path: "/search/:value", element: <Search /> },
    { path: "/Products/:issue/:number", element: <Products /> },
    { path: "/brand/:id", element: <Brand /> }
]

export default routes