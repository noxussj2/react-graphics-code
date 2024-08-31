import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/reset.scss'
import './index.css'
import 'animate.css'
import { ISetToken } from './api/csrf'

ISetToken()

createRoot(document.getElementById('root')!).render(<App />)
