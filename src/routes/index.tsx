import OnboardingLandingPage from "@/pages/Onboarding/Landing";
import ResetPassword from "@/pages/Onboarding/ResetPassword";
import AuthProvider from "@/providers/AuthProvider";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// layouts
const AuthLayout = React.lazy(() => import("@/layouts/Auth"));
const DashboardLayout = React.lazy(() => import("@/layouts/Dashboard"));

// pages
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Auctions = React.lazy(() => import("@/pages/Auctions"));

const AuctionList = React.lazy(() => import("@/pages/Auctions/List"));
const LostAuctions = React.lazy(() => import("@/pages/Auctions/LostAuctions"));

const PendingDeals = React.lazy(() => import("@/pages/Deals/Pending"));
const NewDeals = React.lazy(() => import("@/pages/Deals/New"));
const FundedDeals = React.lazy(() => import("@/pages/Deals/Funded"));

const Inventory = React.lazy(() => import("@/pages/Inventory"));
const InventoryList = React.lazy(() => import("@/pages/Inventory/List"));

const Onboarding = React.lazy(() => import("@/pages/Onboarding"));

const Login = React.lazy(() => import("@/pages/Login"));
const ForgotPassword = React.lazy(() => import("@/pages/ForgotPassword"));

const Profile = React.lazy(() => import("@/pages/Profile"));

const AppRoute: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <React.Suspense fallback={"Loading..."}>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="auctions" element={<Auctions />}>
                <Route path="live" element={<AuctionList />} />
                <Route path="expiring" element={<AuctionList />} />
                <Route path="scheduled" element={<AuctionList />} />
                <Route path="lost" element={<LostAuctions />} />
                <Route path="*" element={<>Page Not Found</>} />
              </Route>

              <Route path="deals">
                <Route path="pending" element={<PendingDeals />} />
                <Route path="new" element={<NewDeals />} />
                <Route path="funded" element={<FundedDeals />} />
              </Route>
              <Route path="inventory" element={<Inventory />}>
                <Route index element={<InventoryList />} />
                <Route path="removed" element={<InventoryList />} />
              </Route>
              <Route path="/onboarding">
                <Route index element={<OnboardingLandingPage />} />
                <Route path=":step" element={<Onboarding />} />
              </Route>
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<>Page Not Found</>} />
            </Route>

            <Route path="/security" element={<AuthLayout />}>
              <Route path="" element={<Navigate to="login" />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="resetpassword" element={<ResetPassword />} />
              <Route path="*" element={<>Page Not Found</>} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoute;
