/** @jsxImportSource @emotion/react */
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { css } from '@emotion/react';
import { useAuth } from './hooks/useAuth';
import { Loading } from './components/Loading';
import { ErrorPage } from './components/ErrorPage';
import { AppLayout } from './components/AppLayout';
import { SettingsPage } from './components/Pages/Settings';
// Lazy-loaded components with explicit types
const Auth = {
  Login: lazy(() => import('./components/Auth/login')),
  Register: lazy(() => import('./components/Auth/RegisterForm')),
  VerifyEmail: lazy(() => import('./components/Auth/VerifyEmail'))
};
  const AppPages = {
    Dashboard: lazy(() => import('./components/Pages/Dashboard')),
    Profile: lazy(() => import('./components/Pages/Profile'))
  };

const RouteSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loading fullscreen />}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  // Make login the default route
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <RouteSuspense>
          <Auth.Login />
        </RouteSuspense>
      </PublicOnlyRoute>
    )
  },
  {
    path: '/register',
    element: (
      <PublicOnlyRoute>
        <RouteSuspense>
          <Auth.Register />
        </RouteSuspense>
      </PublicOnlyRoute>
    )
  },
  {
    path: '/verify-email',
    element: (
      <VerifyEmailRoute>
        <RouteSuspense>
          <Auth.VerifyEmail />
        </RouteSuspense>
      </VerifyEmailRoute>
    )
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/app" replace />
      },
      {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <RouteSuspense>
          <SettingsPage />  // Make sure to import this component
        </RouteSuspense>
      </ProtectedRoute>
    )
  },
      {
        path: 'app',
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />
          },
          {
            path: 'dashboard',
            element: (
              <RouteSuspense>
                <AppPages.Dashboard />
              </RouteSuspense>
            )
          },
          {
            path: 'profile',
            element: (
              <RouteSuspense>
                <AppPages.Profile />
              </RouteSuspense>
            )
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage status={404} />
  }
]);

// Route Guard Components
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      `}>
        <Loading />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ 
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash
          }
        }} 
      />
    );
  }

  if (!user.token) {
    return (
      <Navigate 
        to="/verify-email" 
        replace 
        state={{ 
          from: location,
          message: 'Please verify your email'
        }} 
      />
    );
  }

  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/app/dashboard';

  if (isLoading) return <Loading fullscreen />;

  if (user) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}
function VerifyEmailRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const from = location.state?.from || { pathname: '/app/dashboard' };

  if (isLoading) return <Loading fullscreen />;

  if (!user?.email) {
    return <Navigate to="/register" replace state={{ from }} />;
  }

  if (user.token) {
    return <Navigate to={from.pathname} replace />;
  }

  return <>{children}</>;
}

export function Router() {
  const { isLoading } = useAuth();
  if (isLoading) {
    return (
      <div css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      `}>
        <Loading />
      </div>
    );
  }
  return <RouterProvider router={router} />;
}