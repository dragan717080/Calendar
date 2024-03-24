import { Dialog } from '@headlessui/react';
import { lazy, Suspense, useState } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import { Header, Footer } from '~/components';
import ToasterContext from '~/context/toasterContext';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexPage = lazy(() => import('~/pages/home'));
const AuthPage = lazy(() => import('~/pages/auth'));
const Page404 = lazy(() => import('~/pages/404'));

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToasterContext />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function SimpleLayout() {
  return (
    <div className="min-h-screen">
      <ToasterContext />
      <Outlet />
    </div>
  )
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexPage />
        },
        {
          path: '*',
          element: <Page404 />
        },
      ],
    },
    {
      path: '/auth',
      element: <SimpleLayout />,
      children: [
        {
          path: '',
          element: <AuthPage />
        }
      ]
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
