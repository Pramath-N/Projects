import Layout from "./layouts/Layout.tsx"
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"
import AuthCallbackPage from "./pages/AuthCallbakcPage.tsx"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/user-profile" element={<span>USER PROFILE</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
