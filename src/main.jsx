import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import RangersLegendsCaseStudyPage from './pages/RangersLegendsCaseStudyPage.jsx';
import StartAProjectPage from './pages/StartAProjectPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'work/rangers-legends',
        element: <RangersLegendsCaseStudyPage />,
      },
      {
        path: 'start-a-project',
        element: <StartAProjectPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
