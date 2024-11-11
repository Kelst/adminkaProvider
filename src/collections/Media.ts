// collections/Media.ts
import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Медіафайли для системи',
  },
  upload: {
    staticDir: '../media',
    staticURL: '/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [], // Додали порожній масив fields, оскільки це обов'язкове поле
  access: {
    read: () => true,
  },
};

export default Media;