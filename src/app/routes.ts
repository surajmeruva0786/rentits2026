import { createBrowserRouter } from "react-router";
import InputScreen from "./screens/InputScreen";
import ResultScreen from "./screens/ResultScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: InputScreen,
  },
  {
    path: "/result",
    Component: ResultScreen,
  },
]);
