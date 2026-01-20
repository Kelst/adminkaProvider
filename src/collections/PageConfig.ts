import { CollectionConfig } from 'payload/types';

const PageConfig: CollectionConfig = {
  slug: 'page-configs',
  admin: {
    useAsTitle: 'type',
    description: 'Конфігурація сторінки для різних типів провайдерів',
  },
  fields: [
    {
      name: 'type',
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
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Відео для заднього фону (mp4)',
      },
      filterOptions: {
        mimeType: {
          equals: 'video/mp4',
        },
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Логотип провайдера',
      },
    },
    {
      name: 'logo_min_navigation',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Логотип для меню ',
      },
    },
    {
      name: 'contract_pdf', // Нове поле для PDF файлу
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Договір у форматі PDF',
      },
      filterOptions: {
        mimeType: {
          equals: 'application/pdf',
        },
      },
    },
    {
      name: 'telegram_id',
      type: 'text',
      required: false,
      admin: {
        placeholder: '@intelekt_client_bot',
      },
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'phoneNumbers',
          type: 'array',
          admin: {
            description: 'Номери телефонів',
          },
          fields: [
            {
              name: 'phone',
              type: 'text',
              required: true,
              admin: {
                placeholder: '+380XXXXXXXXX',
              },
            },
            {
              name: 'description',
              type: 'text',
              required: false,
              admin: {
                placeholder: 'Опис номера телефону',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'home',
      type: 'group',
      fields: [
        { name: 'switchLogin', type: 'checkbox', defaultValue: false },
        { name: 'editPhone', type: 'checkbox', defaultValue: false },
        { name: 'reloadSesion', type: 'checkbox', defaultValue: false },
        { name: 'changePassword', type: 'checkbox', defaultValue: false },
        { name: 'clearMac', type: 'checkbox', defaultValue: false },
        { name: 'setCredit', type: 'checkbox', defaultValue: false },
        { name: 'additionalService', type: 'checkbox', defaultValue: false },
        { name: 'staticIp', type: 'checkbox', defaultValue: false },
        { name: 'tariffPlans', type: 'checkbox', defaultValue: false },
        { name: 'stopPlayLogin', type: 'checkbox', defaultValue: false },
        { name: 'unlinkLogin', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'additional',
      type: 'group',
      fields: [
        { name: 'showTask', type: 'checkbox', defaultValue: false },
        { name: 'addFriend', type: 'checkbox', defaultValue: false },
        { name: 'showOffice', type: 'checkbox', defaultValue: false },
        { name: 'tv', type: 'checkbox', defaultValue: true },
        { name: 'megogo', type: 'checkbox', defaultValue: true },
        { name: 'showStore', type: 'checkbox', defaultValue: true },
        { name: 'addFeedback', type: 'checkbox', defaultValue: true },
      ],
    },
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

export default PageConfig;