import ReactDOM from "react-dom/client";
import App from "./App";
import { appStore } from "./redux";
import { Provider } from "react-redux";

const store = appStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
