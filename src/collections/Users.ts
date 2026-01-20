import { CollectionConfig } from 'payload/types'

 const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
        { label: 'Guest', value: 'guest' }  // Додана роль guest
      ]
    }
  ],
}

export default Users;