import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import Category from "./Pages/Category/Category";
import Basket from "./Pages/Basket/Basket";
import Products from './Pages/Products/Products'
import Brand from "./Pages/Brand/Brand";
import PurchaseHistory from "./Pages/PurchaseHistory/PurchaseHistory";
import Blog from "./Pages/Blog/Blog";
import Blogs from './Pages/Blogs/Blogs'

let routes = [
    { path: "/", element: <Home /> },
    { path: "/category-info/:categoryName", element: <Category /> },
    { path: "/product-info/:productName/:id", element: <Product /> },
    { path: "/basket", element: <Basket /> },
    { path: "/Products/:issue/:number", element: <Products /> },
    { path: "/brand/:brandName/:id", element: <Brand /> },
    { path: '/purchasehistory', element: <PurchaseHistory /> },
    { path: '/blog/:id', element: <Blog /> },
    { path: '/blogs/:number', element: <Blogs /> }
]

export default routes

//product/brand-info