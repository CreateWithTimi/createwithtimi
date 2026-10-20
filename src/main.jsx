import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteFocus from './components/RouteFocus.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import './styles/global.css';

const MotionPage = lazy(() => import('./pages/MotionPage.jsx'));
const MotionProjectPage = lazy(() => import('./pages/MotionProjectPage.jsx'));

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const RangersLegendsCaseStudyPage = lazy(() => import('./pages/RangersLegendsCaseStudyPage.jsx'));
const OmniRetailCaseStudyPage = lazy(() => import('./pages/OmniRetailCaseStudyPage.jsx'));
const StartAProjectPage = lazy(() => import('./pages/StartAProjectPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function RouteView({ children }) {
  return <Suspense fallback={<p className="container-wide" role="status">Loading page…</p>}>{children}<RouteFocus /></Suspense>;
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
      { path: 'motion', element: <RouteView><MotionPage /></RouteView> },
      { path: 'motion/:slug', element: <RouteView><MotionProjectPage /></RouteView> },
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
        path: 'work/omniretail',
        element: (
          <RouteView>
            <OmniRetailCaseStudyPage />
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
