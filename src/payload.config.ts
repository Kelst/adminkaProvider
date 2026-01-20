import path from 'path'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import { getPaymentsByProvider } from './endpoints/getPaymentsByProvider'

import Users from './collections/Users'
import PageConfig from './collections/PageConfig'
import News from './collections/News'
import FAQ from './collections/FAQ'
import Media from './collections/Media'
import Payments from './collections/Payments'
import TokenCollection from './collections/TokenCollection'
import Feedback from './collections/Feedback'
import Passwords from './collections/Passwords'
import StopPlay from './collections/StopPlayLogin'
import TaskFromUser from './collections/TaskFromUser'
import LoginLog from './collections/LoginLog'
import PaymentLogsCollection from './collections/PaymentLogsCollection'
import BinaryFiles from './collections/BinaryFiles'
import LoginTracking from './collections/LoginTracking'

const PAYLOAD_SERVER = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://cabinet-host.biz.ua'

export default buildConfig({
  
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  
  editor: slateEditor({}),
  
  collections: [
    Users, 
    PageConfig, 
    News,
    FAQ,
    Media,
    Payments,
    TokenCollection,
    Feedback,
    Passwords,
    StopPlay,
    TaskFromUser,
    LoginLog,
    PaymentLogsCollection,
    BinaryFiles,
    LoginTracking
    
  ],
  
  endpoints: [
    {
      path: '/payments-by-provider',
      method: 'get',
      handler: async (req, res, next) => {
        const { provider } = req.query;

        try {
          let query = {
            where: {
              and: [
                {
                  show: {
                    equals: true
                  }
                }
              ]
            }
          };

          if (provider && typeof provider === 'string') {
            query.where.and.push({
              provider: {
                equals: provider
              }
            });
          }

          const payments = await req.payload.find({
            collection: 'payments-admin',
            ...query,
            depth: 1
          });

          res.json(payments);
        } catch (error) {
          console.error('Error fetching payments:', error);
          res.status(500).json({ 
            error: 'Error fetching payments',
            message: error.message 
          });
        }
      }
    },
    {
      path: '/news-by-provider',
      method: 'get',
      handler: async (req, res, next) => {
        const { provider } = req.query;

        try {
          if (!provider || typeof provider !== 'string') {
            return res.status(400).json({ 
              error: 'Provider is required',
              message: 'Please provide a valid provider parameter' 
            });
          }

          const query = {
            where: {
              provider: {
                equals: provider
              }
            },
            sort: '-date'
          };

          const news = await req.payload.find({
            collection: 'news',
            ...query,
            depth: 2
          });

          res.json(news);
        } catch (error) {
          console.error('Error fetching news:', error);
          res.status(500).json({ 
            error: 'Error fetching news',
            message: error.message 
          });
        }
      }
    },
    {
      path: '/get-image-page-url',
      method: 'get',
      handler: async (req, res, next) => {
        const { type } = req.query;
        
        try {
          if (!type || typeof type !== 'string') {
            return res.status(400).json({
              error: 'Type parameter is required',
              message: 'Please provide a valid type parameter'
            });
          }
          
          const query = {
            where: {
              type: {
                equals: type
              }
            }
          };
          
          const pageConfig = await req.payload.find({
            collection: 'page-configs',
            ...query,
            depth: 2
          });
          
          if (!pageConfig.docs || pageConfig.docs.length === 0) {
            return res.status(404).json({
              error: 'Configuration not found',
              message: `No configuration found for type: ${type}`
            });
          }
          
          const config = pageConfig.docs[0];
          const response = {
            logo: config.logo ? `${PAYLOAD_SERVER}/media/${config.logo.filename}` : null,
            logo_min_navigation: config.logo_min_navigation 
              ? `${PAYLOAD_SERVER}/media/${config.logo_min_navigation.filename}` 
              : null,
            backgroundVideo: config.backgroundVideo 
              ? `${PAYLOAD_SERVER}/media/${config.backgroundVideo.filename}` 
              : null,
            contract_pdf: config.contract_pdf  // Додане нове поле
              ? `${PAYLOAD_SERVER}/media/${config.contract_pdf.filename}`
              : null,
            telegram_id: config.telegram_id
          };
          
          res.json(response);
        } catch (error) {
          console.error('Error fetching page configuration:', error);
          res.status(500).json({
            error: 'Error fetching page configuration',
            message: error.message
          });
        }
      }
    }
  ],
  
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  
  plugins: [payloadCloud()],
  
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  express: {
    json: {
      limit: 500000000, // Збільшуємо ліміт для JSON
    },
    
  },
  upload: {
    limits: {
      fileSize: 500000000,
    },
  },
  
  serverURL: PAYLOAD_SERVER,
  
  csrf: [PAYLOAD_SERVER, 'https://cabinet-host.biz.ua'],
})