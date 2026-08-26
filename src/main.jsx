import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import './styles/global.css';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const RangersLegendsCaseStudyPage = lazy(() => import('./pages/RangersLegendsCaseStudyPage.jsx'));
const StartAProjectPage = lazy(() => import('./pages/StartAProjectPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function RouteView({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: (
      <RouteView>
        <NotFoundPage />
      </RouteView>
    ),
    children: [
      {
        index: true,
        element: (
          <RouteView>
            <HomePage />
          </RouteView>
        ),
      },
      {
        path: 'work/rangers-legends',
        element: (
          <RouteView>
            <RangersLegendsCaseStudyPage />
          </RouteView>
        ),
      },
      {
        path: 'start-a-project',
        element: (
          <RouteView>
            <StartAProjectPage />
          </RouteView>
        ),
      },
      {
        path: '*',
        element: (
          <RouteView>
            <NotFoundPage />
          </RouteView>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
