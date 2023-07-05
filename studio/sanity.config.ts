import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'portfolio-nextjs',

  projectId: 'qejnf6j2',
  dataset: 'portfolio_pieces',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
