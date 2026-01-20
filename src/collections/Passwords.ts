import { CollectionConfig } from 'payload/types';

const Passwords: CollectionConfig = {
  slug: 'passwords',
  admin: {
    useAsTitle: 'login',
    defaultColumns: ['login', 'ip', 'count_wrong_pass', 'dateField'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false;
      return user.role === 'admin' || user.role === 'editor';
    },
    update: () => true,
    delete: () => true,
    create: () => true,
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
      name: 'password',
      type: 'text',
      required: true,
      admin: {
        placeholder: "Пароль користувача"
      },
    },
    {
      name: 'ip',
      type: 'text',
      required: true,
      admin: {
        placeholder: "IP адреса"
      },
    },
    {
      name: 'count_wrong_pass',
      type: 'number',
      defaultValue: 1,
      admin: {
        placeholder: "Кількість неправильних спроб паролю"
      },
    },
    {
      name: 'count_wrong_login',
      type: 'number',
      defaultValue: 1,
      admin: {
        placeholder: "Кількість неправильних спроб логіну"
      },
    },
    {
      name: 'all_bad_login_pass',
      type: 'number',
      defaultValue: 1,
      admin: {
        placeholder: "Загальна кількість невдалих спроб"
      },
    },
    {
      name: 'delayWait',
      type: 'number',
      defaultValue: 0,
      admin: {
        placeholder: "Час очікування (мс)"
      },
    },
    {
      name: 'dateField',
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

export default Passwords;