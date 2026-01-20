import { Endpoint } from 'payload/config';
import { PayloadRequest } from 'payload/types';
import { Response, NextFunction } from 'express';
import { Where } from 'payload/types';

export const getPaymentsByProvider: Endpoint = {
  path: '/payments-by-provider',
  method: 'get',
  handler: async (req: PayloadRequest, res: Response, next: NextFunction) => {
    const { provider } = req.query;

    try {
      let where: Where = {
        and: [
          {
            show: {
              equals: true
            }
          }
        ]
      };

      // Додаємо умову провайдера, якщо він вказаний
      if (provider && typeof provider === 'string') {
        where.and.push({
          provider: {
            equals: provider
          }
        });
      }

      // Отримуємо платежі через Payload API
      const payments = await req.payload.find({
        collection: 'payments-admin',
        where,
        depth: 1
      });

      res.status(200).json(payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ 
        error: 'Error fetching payments',
        message: error.message 
      });
    }
  }
};