// collections/Payments.ts
import { CollectionConfig } from 'payload/types';
import { getPaymentsByProvider } from '../endpoints/getPaymentsByProvider';

const Payments: CollectionConfig = {
  slug: 'payments-admin',
  admin: {
    useAsTitle: 'name',
    description: 'Налаштування платіжних систем для провайдерів',
  },
  endpoints: [
    getPaymentsByProvider
  ],
  fields: [
    {
      name: 'provider',
      type: 'select',
      required: true,
      options: [
        { label: 'Intelekt', value: 'Intelekt' },
        { label: 'Opensvit', value: 'Opensvit' },
        { label: 'Opticom', value: 'Opticom' },
        { label: 'Veles', value: 'Veles' },
        { label: 'Mtknet', value: 'Mtknet' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'LiqPay',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'show',
      type: 'checkbox',
      defaultValue: false,
    }
  ],
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false;
      return user.role === 'admin' || user.role === 'editor';
    },
    update: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
    create: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
    delete: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
  },
};

export default Payments;