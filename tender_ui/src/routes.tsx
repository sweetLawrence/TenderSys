import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout'
import TenderForm from './components/TenderForm';
import TenderList from './components/TenderList';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <TenderForm />,
      },
         {
        path: '/tender-list',
        element: <TenderList />,
      }
    ],
  },
]);

export default router;
