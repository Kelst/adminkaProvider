import express from 'express'
import payload from 'payload'
import cors from 'cors'

require('dotenv').config()
const app = express()

const PAYLOAD_SERVER = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://194.8.147.150:5300'

// Налаштування CORS
app.use(cors({
  origin: true, // Дозволяємо всі домени під час розробки
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
}))

// Додаткові заголовки безпеки
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Private-Network', 'true')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
})

// Pre-flight requests
app.options('*', cors())

const start = async () => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      },
    })

    app.get('/', (_, res) => {
      res.redirect('/admin')
    })

    // Слухаємо на всіх інтерфейсах
    app.listen(5300, '0.0.0.0', () => {
      console.log(`Server running on ${PAYLOAD_SERVER}`)
    })
  } catch (error) {
    console.error('Error starting server:', error)
  }
}

start()