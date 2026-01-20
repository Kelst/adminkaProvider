import { CollectionConfig } from 'payload/types';
import path from 'path';

const BinaryFiles: CollectionConfig = {
  slug: 'binary-files',
  admin: {
    useAsTitle: 'fileName',
    defaultColumns: ['fileName', 'fileType', 'fileSize', 'uploadedAt'],
  },
  access: {
    read: () => true,  // Дозволяє всім читати/завантажувати файли
    create: () => false,  // Тільки адміни можуть створювати
    update: () => false,  // Тільки адміни можуть оновлювати
    delete: () => false,  // Тільки адміни можуть видаляти
  },
  upload: {
    staticDir: path.resolve(__dirname, '../uploads/binary-files'),
    staticURL: '/binary-files',
    mimeTypes: ['application/vnd.android.package-archive', 'application/x-msdownload'],
    filesRequiredOnCreate: true,
    adminThumbnail: 'card',
  },
  fields: [
    {
      name: 'fileName',
      type: 'text',
      required: true,
      admin: {
        description: 'Назва файлу буде встановлена автоматично',
      },
    },
    {
      name: 'fileType',
      type: 'select',
      required: true,
      options: [
        { label: 'APK', value: 'apk' },
        { label: 'EXE', value: 'exe' },
      ],
      admin: {
        description: 'Тип файлу',
      },
    },
    {
      name: 'fileSize',
      type: 'number',
      admin: {
        description: 'Розмір файлу (в байтах)',
        position: 'sidebar',
      },
    },
    {
      name: 'version',
      type: 'text',
      admin: {
        description: 'Версія програми',
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Опис файлу',
      },
    },
    {
      name: 'platform',
      type: 'select',
      options: [
        { label: 'Android', value: 'android' },
        { label: 'Windows', value: 'windows' },
      ],
      admin: {
        description: 'Платформа',
        position: 'sidebar',
      },
    },
    {
      name: 'uploadedAt',
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
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (req.files && req.files.file) {
          const file = req.files.file;
          // Автоматично встановлюємо тип файлу на основі розширення
          const ext = path.extname(file.name).toLowerCase();
          data.fileType = ext === '.apk' ? 'apk' : 'exe';
          data.platform = ext === '.apk' ? 'android' : 'windows';
          data.fileSize = file.size;
        }
        return data;
      },
    ],
  },
  timestamps: true,
};

export default BinaryFiles;