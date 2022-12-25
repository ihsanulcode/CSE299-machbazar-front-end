import "./App.css";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import Home from "./Pages/Home/Home";
import ProductExtendedView from "./Pages/ProductExtendedView/ProductExtendedView";
import SearchResult from "./Pages/SearchResult/SearchResult";
import Cart from "./Pages/Cart/Cart";
import MyAccount from "./Pages/MyAccount/MyAccount";
import Orders from "./Pages/Orders/Orders";
import SellerLogin from "./Pages/SellerLoginAndRegister/SellerLogin";
import SellerRegistration from "./Pages/SellerLoginAndRegister/SellerRegistration";
import AddProduct from "./Pages/AddProduct/AddProduct";
import SellerAccount from "./Pages/SellerAccount/SellerAccount";
import WishList from "./Pages/WishList/WishList";
import SellerHome from "./Pages/SellerHome/SellerHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Modal from "./components/Modal";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Registration></Registration>,
        },
        {
          path: "/productExtendedView/:id",
          loader: ({ params }) =>
            fetch(`http://localhost:5000/product/${params.id}`),
          element: (
            <PrivateRoute>
              <ProductExtendedView></ProductExtendedView>
            </PrivateRoute>
          ),
        },
        {
          path: `/categories/:name`,
          element: <SearchResult></SearchResult>,
          loader: ({ params }) =>
            fetch(`http://localhost:5000/products/category/${params.name}`),
        },
        {
          path: "/cart/:uid",
          element: <Cart></Cart>,
          loader: ({ params }) =>
            fetch(`http://localhost:5000/cart/${params.uid}`),
        },
        {
          path: "/account",
          element: <MyAccount></MyAccount>,
        },
        {
          path: "/order",
          element: <Orders></Orders>,
        },
        {
          path: "/wishlist",
          element: <WishList></WishList>,
        },
        {
          path: "/sellerLogin",
          element: <SellerLogin></SellerLogin>,
        },
        {
          path: "/sellerRegistration",
          element: <SellerRegistration></SellerRegistration>,
        },
        {
          path: "/addProduct",
          element: <AddProduct></AddProduct>,
        },
        {
          path: "/sellerAccount",
          element: <SellerAccount></SellerAccount>,
        },
        {
          path: "/sellerHome",
          element: (
            <PrivateRoute>
              <SellerHome></SellerHome>
            </PrivateRoute>
          ),
        },
        {
          path: "/cart",
          element: <Cart></Cart>,
        },
        {
          path: "/modal",
          element: <Modal></Modal>,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
