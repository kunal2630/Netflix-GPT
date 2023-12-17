import "./App.css";
import Body from "./components/Body";
import Browse from "./components/Browse";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appstore from "./utils/store";
import {Provider} from 'react-redux';


const App = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path:"*",
      element: <Error />,
    },
  ]);

  return (
    <Provider store={appstore}>

    <RouterProvider router={appRouter}>
      <Body />
    </RouterProvider>

    </Provider>
  );
}

export default App;
