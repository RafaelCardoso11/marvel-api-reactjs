import { ReactNode } from "react";
import { BrowserRouter, Route, Routes, RouteProps } from "react-router-dom";

function RoutersContextTesting({
  children,
  routes = [],
  router = { path: "/" },
}: {
  children: ReactNode;
  routes?: React.ReactElement<RouteProps>[];
  router?: { path: string };
}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={router.path} element={children} />
        {routes.map((route: React.ReactElement) => route)}
      </Routes>
    </BrowserRouter>
  );
}

export default RoutersContextTesting;
