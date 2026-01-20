import { CollectionConfig } from 'payload/types';

const Feedback: CollectionConfig = {
  slug: 'feedback',
  admin: {
    useAsTitle: 'login',
    defaultColumns: ['login', 'createdAt', 'phone', 'provider'],
  },
  access: {
    read: () => true,
    update: () => false,
    delete: () => false,
    create: () => false,
  },
  fields: [
    {
      name: 'login',
      type: 'text',
      required: true,
      admin: {
        placeholder: "Логін користувача"
      },
    },
    {
      name: 'feedback',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        placeholder: "Текст відгуку"
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      validate: (value) => {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(value)) {
          return 'Введіть коректний номер телефону';
        }
        return true;
      },
      admin: {
        placeholder: "+380..."
      },
    },
    {
      name: 'provider',
      type: 'select',
      required: true,
      options: [
        { label: 'Intelekt', value: 'intelekt' },
        { label: 'Opensvit', value: 'opensvit' },
        { label: 'Opticom', value: 'opticom' },
      ],
     
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date(),
    },
  ],
  timestamps: true,
};

export default Feedback;