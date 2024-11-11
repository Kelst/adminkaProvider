// collections/News.ts
import { CollectionConfig } from 'payload/types';
import { slateEditor } from '@payloadcms/richtext-slate';

const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    description: 'Новини для різних провайдерів',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'author',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Business', value: 'Business' },
        { label: 'Info', value: 'Info' },
      ],
      required: true,
    },
    {
      name: 'preview',
      type: 'textarea',
    },
    { 
      name: 'content',
      type: 'richText',
      defaultValue: [
        {
          children: [{ text: '' }],
        },
      ],
    }
  ],
  access: {
    read: () => true,
  },
};

export default News;