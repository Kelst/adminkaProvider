import { CollectionConfig } from 'payload/types';

const TaskFromUser: CollectionConfig = {
  slug: 'taskfromusers',
  admin: {
    useAsTitle: 'login',
    defaultColumns: ['login', 'subLogin', 'createdAt', 'phone', 'provider'],
  },
  access:
  { read: ({ req: { user } }) => {
      return  user?.role === 'admin';
    },},
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
      name: 'subLogin',
      type: 'text',
      required: true,
      admin: {
        placeholder: "Додатковий логін користувача"
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        placeholder: "Текст повідомлення"
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
        { label: 'Intelekt', value: 'Intelekt' },
        { label: 'Opensvit', value: 'Opensvit' },
        { label: 'Opticom', value: 'Opticom' },
        { label: 'Veles', value: 'Veles' },
        { label: 'Mtknet', value: 'Mtknet' },
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

export default TaskFromUser;