import { Header } from '@autobid247/theme';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { AppRoute } from '@/constants/AppRoutes';
import useAuth from '@/hooks/useAuth';
import SocketProvider from '@/providers/SocketProvider';

const DashboardLayout: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(
        `${AppRoute.LOGIN}?returnUrl=${encodeURIComponent(
          `${location.pathname}${location.search}`,
        )}`,
      );
    }
  }, [isLoggedIn, navigate, location]);

  return (
    <SocketProvider>
      <Header
        menus={[
          {
            title: 'Chat',
            link: '/chat',
          },
        ]}
        loggedIn={{
          name: user?.name,
          options: [
            {
              title: 'Sign Out',
              link: '/',
              onClick: () => logout(() => navigate(AppRoute.LOGIN)),
            },
          ],
        }}
      />
      <Outlet />
    </SocketProvider>
  );
};

export default DashboardLayout;
