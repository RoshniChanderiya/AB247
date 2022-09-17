import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AuthProvider from '@/providers/AuthProvider';

// layouts
const DashboardLayout = React.lazy(() => import('@/layouts/Dashboard'));
const AuthLayout = React.lazy(() => import('@/layouts/Auth'));

// pages
const Home = React.lazy(() => import('@/layouts/Home'));
const Inventory = React.lazy(() => import('@/pages/Inventory'));
const Login = React.lazy(() => import('@/pages/Login'));
const SetPassword = React.lazy(() => import("@/pages/SetPassword"));

const Chat = React.lazy(() => import('@/pages/Chat'));

const AppRoute: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <React.Suspense fallback={'Loading...'}>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route path='/setpassword' element={<SetPassword />} />
              <Route path="" element={<Home />}>
                <Route path="inventory/:vehicleConfigId" element={<Inventory />} />
              </Route>
              <Route path="/:configId/:vin/messages" element={<Chat />} />
            </Route>
            <Route path="/security" element={<AuthLayout />}>
              <Route path="" element={<Navigate to="login" />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<>Page Not Found</>} />
            </Route>
            <Route path="*" element={<>Page Not Found</>} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoute;
