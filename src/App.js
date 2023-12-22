import React from 'react';
import { Provider } from "react-redux";
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./muiTheme";
import store from "./store/configureStore";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/UI/Layout";
import NotificationDialog from "./components/NotificationDialog";

const App = () => (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <Layout>
                <AppRoutes/>
                <NotificationDialog />
            </Layout>
        </Provider>
    </ThemeProvider>
);

export default App;