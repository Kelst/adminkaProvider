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
    mimeTypes: ['image/*', 'video/mp4', 'application/pdf'], // Додали підтримку PDF
  },
  fields: [
    {
      name: 'type',
      type: 'select', 
      hasMany: false,
      defaultValue: 'image',
      options: [
        {
          label: 'Image',
          value: 'image',
        },
        {
          label: 'Video',
          value: 'video',
        },
        {
          label: 'PDF',  // Додали новий тип
          value: 'pdf',
        }
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'fileSize', // Додаємо поле для розміру файлу
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ req }) => {
            if (req.files?.file) {
              return req.files.file.size;
            }
            return undefined;
          },
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        // Автоматично визначаємо тип файлу
        if (req.files?.file) {
          const mimeType = req.files.file.mimetype;
          if (mimeType.includes('image')) {
            data.type = 'image';
          } else if (mimeType.includes('video')) {
            data.type = 'video';
          } else if (mimeType.includes('pdf')) {
            data.type = 'pdf';
          }
        }
        return data;
      },
    ],
  },
  access: {
    read: () => true,
  },
};

export default Media;