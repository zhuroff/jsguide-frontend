import { Navigate, Outlet } from 'react-router-dom'

type ProtectedRoutesProps = {
  isAuth: boolean
}

const ProtectedRoutes = ({ isAuth }: ProtectedRoutesProps) => (
  isAuth ? <Outlet /> : <Navigate to="/" />
)

export default ProtectedRoutes
