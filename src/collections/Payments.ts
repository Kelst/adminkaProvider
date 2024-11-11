import { CollectionConfig } from 'payload/types';

const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    useAsTitle: 'name',
    description: 'Налаштування платіжних систем для провайдерів',
  },
  fields: [
    {
      name: 'provider',
      type: 'select',
      required: true,
      options: [
        { label: 'Intelekt', value: 'Intelekt' },
        { label: 'Opensvit', value: 'Opensvit' },
        { label: 'Opticom', value: 'Opticom' },
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
    read: () => true,
  },
};

export default Payments;