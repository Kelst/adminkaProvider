import { CollectionConfig } from 'payload/types';

const PaymentLogsCollection: CollectionConfig = {
  slug: 'paymentlogs',
  admin: {
    useAsTitle: 'login',
    defaultColumns: ['route', 'login', 'suma', 'date'],
    description: 'Логування платіжних запитів від користувачів',
    group: 'Платежі та Транзакції',
  },
  access: {
    create: () => false,
    read: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'route',
      type: 'select',
      required: true,
      label: 'Платіжний маршрут',
      options: [
        {
          label: 'Portmone',
          value: '/getPortmoneLink',
        },
        {
          label: 'LiqPay',
          value: '/getLiqPayLink',
        },
        {
          label: 'EasyPay',
          value: '/getEasypayLink',
        },
        {
          label: 'Приват24',
          value: '/getPrivat24Link',
        },
      ],
      admin: {
        description: 'Тип платіжної системи',
      },
    },
    {
      name: 'login',
      type: 'text',
      required: true,
      label: 'Логін користувача',
      admin: {
        description: 'Логін користувача, який ініціював платіж',
      },
    },
    {
      name: 'suma',
      type: 'text',
      required: true,
      label: 'Сума',
      admin: {
        description: 'Сума платежу',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Дата запиту',
      admin: {
        description: 'Дата та час створення запиту',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm:ss',
        },
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      label: 'Створено',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm:ss',
        },
      },
    },
    {
      name: 'updatedAt',
      type: 'date',
      label: 'Оновлено',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm:ss',
        },
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data }) => {
        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        return doc;
      },
    ],
  },
  versions: {
    drafts: false,
  },
};

export default PaymentLogsCollection;