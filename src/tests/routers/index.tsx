import { ReactNode } from "react";
import { BrowserRouter, Route, Routes, RouteProps } from "react-router-dom";

function RoutersContextTesting({
  children,
  routes = [],
}: {
  children: ReactNode;
  routes?: React.ReactElement<RouteProps>[];
}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>{children}</>} />
        {routes.map((route: React.ReactElement) => route)}
      </Routes>
    </BrowserRouter>
  );
}

export default RoutersContextTesting;
