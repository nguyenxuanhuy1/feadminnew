import React, { createContext, Suspense, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import routes from "./router/router";
import PrivateRoute from "./router/privateRouter";
import NotFoundPage from "./pages/page404";
import { ErrorFallback } from "./pages/page404/errFallback";
import LoadingOverlay from "./components/Loading";
export interface IAppContext {
  setLoading: (e: boolean) => void;
  loading: boolean;
}
export const AppContext = createContext<IAppContext>({
  setLoading: () => null,
  loading: false,
});

const App = () => {
  const [loading, setLoading] = useState(false);
  return (
    <AppContext.Provider
      value={{
        setLoading,
        loading,
      }}
    >
      <Router>
        <LoadingOverlay />
        <Routes>
          {routes.map((route, index) => {
            const element = route.isPrivateRoute ? (
              <PrivateRoute>
                <route.layout>
                  {route.component && <route.component />}
                </route.layout>
              </PrivateRoute>
            ) : (
              <route.layout>
                {route.component && <route.component />}
              </route.layout>
            );

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={<></>}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      {element}
                    </ErrorBoundary>
                  </Suspense>
                }
              />
            );
          })}

          {/* Route con */}
          {routes.flatMap((route) =>
            route.routeChild?.map((child, idx) => {
              const childElement = child.isPrivateRoute ? (
                <PrivateRoute>
                  <child.layout>
                    {child.component && <child.component />}
                  </child.layout>
                </PrivateRoute>
              ) : (
                <child.layout>
                  {child.component && <child.component />}
                </child.layout>
              );

              return (
                <Route
                  key={child.path}
                  path={child.path}
                  element={
                    <Suspense fallback={<></>}>
                      <ErrorBoundary FallbackComponent={ErrorFallback}>
                        {childElement}
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
              );
            })
          )}

          {/* Not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default React.memo(App);
