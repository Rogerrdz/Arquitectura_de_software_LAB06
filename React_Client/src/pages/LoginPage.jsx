import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice.js'
import api from '../services/blueprintsService.js'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  // Si ya está autenticado, redirigir a blueprints
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/blueprints', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    try {
      const { data } = await api.post('/auth/login', { username, password })
      
      // Guardar en Redux (que también guarda en localStorage)
      dispatch(login({ token: data.token, username }))
      
      setSuccess(true)
      
      // Redirigir a blueprints después de un breve delay
      setTimeout(() => {
        navigate('/blueprints', { replace: true })
      }, 1000)
    } catch (e) {
      setError('Credenciales inválidas o servidor no disponible')
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <div className="grid cols-2">
        <div>
          <label>Usuario</label>
          <input 
            className="input" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      {error && <p style={{ color: '#f87171' }}>{error}</p>}
      {success && <p style={{ color: '#4ade80' }}>Login exitoso! Redirigiendo...</p>}
      <button className="btn primary" style={{ marginTop: 12 }}>
        Ingresar
      </button>
    </form>
  )
}
