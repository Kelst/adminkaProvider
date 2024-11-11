import { CollectionConfig } from 'payload/types';

const FAQ: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'title',
    description: 'Часті запитання для різних провайдерів',
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'displayFaq',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  access: {
    read: () => true,
  },
};

export default FAQ;