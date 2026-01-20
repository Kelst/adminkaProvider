import { CollectionConfig } from 'payload/types';

const StopPlay: CollectionConfig = {
  slug: 'stopPlay',
  admin: {
    useAsTitle: 'login',
  },
  fields: [
    {
      name: 'createdAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'uid',
      type: 'number',
      required: true,
      unique: true,
      admin: {
        description: 'Унікальний ідентифікатор'
      }
    },
    {
      name: 'login',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Введіть логін'
      }
    }
  ],
  access:
  { read: ({ req: { user } }) => {
      return  user?.role === 'admin';
    },},
  timestamps: true,
};

export default StopPlay;