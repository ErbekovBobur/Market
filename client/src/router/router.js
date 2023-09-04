import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
} from "react-router-dom";
import Template from "../layout/template";
import ErrorPage from "../page/ErrorPage";
import AdminPage from "../page/AdminPage";
import Main from "../page/MainPage";
import FavoritePage from "../page/FavoritePage";
import ProductItem from "../component/Products/ProductIem";
import AuthPage from "../page/AuthPage";
import EditProduct from "../component/Products/EditProduct";
import AddProduct from "../component/Products/AddProduct";
import ProductForm from "../component/Products/ProductForm";
import AdminControl from "../component/AdminControl/AdminControl";
import Users from "../component/AdminControl/Users";
import Category from "../component/AdminControl/Category";
import Statistic from "../component/AdminControl/Statistic";
import NewComponent from "../component/New Component/newComponent";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Template />}
            // loader={rootLoader}
            // action={rootAction}
            errorElement={<ErrorPage />}
        >
            <Route errorElement={<ErrorPage />}>
                <Route index element={<Main />} />
                <Route path="admin/" element={<AdminPage />}>
                    <Route index element={<Statistic />} />
                    <Route path="add/" element={<AddProduct />} />
                    <Route path="edit/" element={<EditProduct />} />
                    <Route path="edit/:id" element={<ProductForm />} />
                    <Route path="control/" element={<AdminControl />}>
                        <Route path="discount" element={<h1>discount</h1>} />
                        <Route path="users" element={<Users />} />
                        <Route path="category" element={<Category />} />
                    </Route>
                </Route>
                <Route path="favorite/" element={<FavoritePage />} />
                <Route path="/product/:id" element={<ProductItem />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/newcomp" element={<NewComponent />} />
            </Route>
        </Route>
    )
);