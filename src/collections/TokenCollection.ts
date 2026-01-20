import { CollectionConfig } from 'payload/types';

const TokenCollection: CollectionConfig = {
  slug: 'tokens', // Це відповідатиме назві моделі "Token" в MongoDB
  admin: {
    useAsTitle: 'uid',
  },
  access:
  { read: ({ req: { user } }) => {
      return  user?.role === 'admin';
    },},
  fields: [
    {
      name: 'uid',
      type: 'text',
      required: true,
    },
    {
      name: 'refreshToken',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    // Тут можна додати хуки якщо потрібно
    beforeChange: [
      // наприклад, для валідації чи модифікації даних перед збереженням
    ],
    afterChange: [
      // для дій після збереження
    ],
  },
};

export default TokenCollection;