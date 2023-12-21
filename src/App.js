import React from 'react';
import { Provider } from "react-redux";
import store from "./store/configureStore";
import Layout from "./components/UI/Layout";
import AppRoutes from "./routes/AppRoutes";

const App = () => (
    <Provider store={store}>
        <Layout>
            <AppRoutes/>
        </Layout>
    </Provider>
);

export default App;