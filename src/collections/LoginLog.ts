import { CollectionConfig } from 'payload/types';

const LoginLog: CollectionConfig = {
  slug: 'login-logs',
  
  admin: {
    useAsTitle: 'login',
    description: 'Логування входів користувачів у систему',
    group: 'Система відстежування входу в кабінет',
    defaultColumns: ['login', 'timestamp', 'ip', 'method', 'loginAttempts'],
  },
  
  fields: [
    {
      name: 'login',
      type: 'text',
      required: true,
      unique: true, // Забезпечуємо унікальність логіну
      admin: {
        description: 'Логін користувача в системі',
      },
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
      admin: {
        description: 'Час першого входу користувача',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm:ss',
        },
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'lastLoginAttempt',
      type: 'date',
      required: true,
      admin: {
        description: 'Час останньої спроби входу',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm:ss',
        },
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'loginAttempts',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        description: 'Кількість спроб входу',
      },
    },
    {
      name: 'ip',
      type: 'text',
      required: true,
      admin: {
        description: 'IP адреса останнього входу',
      },
    },
    {
      name: 'provider',
      type: 'text',
      required: true,
      admin: {
        description: 'Провайдер інтернет-послуг',
      },
    },
    {
      name: 'method',
      type: 'select',
      required: true,
      options: [
        { label: 'Стандартний вхід', value: 'login' },
        { label: 'Вхід за телефоном', value: 'loginPhone' },
        { label: 'OAuth', value: 'oauth' },
      ],
      admin: {
        description: 'Метод останньої автентифікації',
      },
    },
    {
      name: 'loginHistory',
      type: 'array',
      admin: {
        description: 'Історія всіх входів користувача',
      },
      fields: [
        {
          name: 'timestamp',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
              displayFormat: 'dd.MM.yyyy HH:mm:ss',
            },
          },
        },
        {
          name: 'ip',
          type: 'text',
          required: true,
        },
        {
          name: 'method',
          type: 'select',
          required: true,
          options: [
            { label: 'Стандартний вхід', value: 'login' },
            { label: 'Вхід за телефоном', value: 'loginPhone' },
            { label: 'OAuth', value: 'oauth' },
          ],
        },
        {
          name: 'success',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'clientType',
          type: 'select',
          defaultValue: 'browser',
          options: [
            { label: 'Веб-браузер', value: 'browser' },
            { label: 'Мобільний додаток', value: 'mobile' },
            { label: 'Десктопний додаток', value: 'desktop' },
          ],
        },
      ],
    },
    {
      name: 'loginSuccess',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Чи був останній вхід успішним',
      },
    },
    {
      name: 'sessionStatus',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Активна', value: 'active' },
        { label: 'Завершена', value: 'expired' },
        { label: 'Примусово завершена', value: 'terminated' },
      ],
      admin: {
        description: 'Статус поточної сесії користувача',
      },
    },
    {
      name: 'userRole',
      type: 'select',
      defaultValue: 'user',
      options: [
        { label: 'Користувач', value: 'user' },
        { label: 'Адміністратор', value: 'admin' },
        { label: 'Модератор', value: 'moderator' },
      ],
      admin: {
        description: 'Роль користувача в системі',
      },
    },
    {
      name: 'clientType',
      type: 'select',
      defaultValue: 'browser',
      options: [
        { label: 'Веб-браузер', value: 'browser' },
        { label: 'Мобільний додаток', value: 'mobile' },
        { label: 'Десктопний додаток', value: 'desktop' },
      ],
      admin: {
        description: 'Тип клієнтського додатку останнього входу',
      },
    },
  ],
  
  access: {
    read: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
    update: () => false,
    delete: () => false,
    create: () => true,
  },
  
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        // Якщо це оновлення існуючого запису
        if (originalDoc) {
          return {
            ...data,
            loginAttempts: (originalDoc.loginAttempts || 0) + 1,
            lastLoginAttempt: new Date(),
            loginHistory: [
              ...(originalDoc.loginHistory || []),
              {
                timestamp: new Date(),
                ip: data.ip,
                method: data.method,
                success: data.loginSuccess,
                clientType: data.clientType,
              },
            ],
          };
        }
        
        // Якщо це новий запис
        return {
          ...data,
          timestamp: new Date(),
          lastLoginAttempt: new Date(),
          loginAttempts: 1,
          loginHistory: [
            {
              timestamp: new Date(),
              ip: data.ip,
              method: data.method,
              success: data.loginSuccess,
              clientType: data.clientType,
            },
          ],
        };
      },
    ],
  },

  versions: {
    drafts: false,
  },
};

export default LoginLog;