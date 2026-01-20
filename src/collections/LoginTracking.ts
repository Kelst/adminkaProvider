import { CollectionConfig } from 'payload/types';

// Використовуємо slug 'login-tracking', щоб відповідати назві колекції в MongoDB
const LoginTracking: CollectionConfig = {
  slug: 'login-tracking',
  admin: {
    useAsTitle: 'login',
    defaultColumns: ['login', 'provider', 'ip', 'date'],
    description: 'Відстеження успішних входів користувачів'
  },
  fields: [
    {
      name: 'login', 
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Логін користувача'
      }
    },
    {
      name: 'provider',
      type: 'text',
      required: true,
      defaultValue: 'local',
      admin: {
        placeholder: 'Провайдер авторизації'
      }
    },
    {
      name: 'ip',
      type: 'text',
      admin: {
        placeholder: 'IP-адреса користувача'
      }
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date(),
    }
  ],
  access: {
    read: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
  },
  timestamps: true,
};

export default LoginTracking;