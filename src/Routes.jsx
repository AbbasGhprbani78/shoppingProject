import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import Category from "./Pages/Category/Category";
import Basket from "./Pages/Basket/Basket";
let routes = [
    { path: "/", element: <Home /> },
    { path: "/category-info/:categoryName/:page", element: <Category /> },
    { path: "/product-info/:productName", element: <Product /> },
    { path: "/basket", element: <Basket /> }
]

export default routes