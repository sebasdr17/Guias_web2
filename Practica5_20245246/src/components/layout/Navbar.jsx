import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../services/authService'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutUser()
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">Task Manager</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default Navbar