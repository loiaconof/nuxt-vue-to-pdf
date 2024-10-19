import { defineNuxtModule, addPlugin, createResolver, addServerImportsDir, addImports } from '@nuxt/kit'

export type * from './types'

// Module options TypeScript interface definition
export interface ModuleOptions {
  
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-vue-to-pdf',
    configKey: 'nuxtVueToPdf',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImports({ name: 'useVueToPdf', as: 'useVueToPdf', from: resolver.resolve('./runtime/composables/vue-to-pdf') })
    addServerImportsDir(resolver.resolve('./runtime/server/utils'))
  },
})
