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
      ],
    },
  ],
  access: {
    read: () => true,
  },
};

export default PageConfig;