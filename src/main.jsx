import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllCards from "./components/Home/AllCards.jsx";
import { Header, Card } from "./components";
import Deck from "./components/Deck";
import "./index.css";

const routes = [
  {
    path: "/SW-API/",
    element: <AllCards />,
  },
  {
    path: "/SW-API/:name",
    element: <Card isDetail />,
  },
  {
    path: "/SW-API/Deck",
    element: <Deck />,
  },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
