import Layout from "./layouts/Layout.tsx"
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"
import AuthCallbackPage from "./pages/AuthCallbakcPage.tsx"
import UserProfilePage from "./pages/UserProfilePage.tsx"
import ProtectedRoute from "./auth/ProtectedRoute.tsx"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout showHero><HomePage /></Layout>} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
