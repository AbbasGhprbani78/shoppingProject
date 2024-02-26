import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import Category from "./Pages/Category/Category";
let routes = [
    { path: "/", element: <Home /> },
    { path: "/category-info/:categoryName/:page", element: <Category /> },
    { path: "/product-info/:productName", element: <Product /> }
]

export default routes