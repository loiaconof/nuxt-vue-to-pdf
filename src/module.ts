import { defineNuxtModule, addPlugin, createResolver, addServerImportsDir, addImports } from '@nuxt/kit'
import PluginVue from '@vitejs/plugin-vue'
import defu from 'defu'
import type { VueToPdfOptions } from '~/src/types'

export type * from './types'

// Module options TypeScript interface definition
export type ModuleOptions = VueToPdfOptions

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-vue-to-pdf',
    configKey: 'nuxtVueToPdf',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    _nuxt.options.runtimeConfig.nuxtVueToPdf = defu(_nuxt.options.runtimeConfig.nuxtVueToPdf ?? {} as Partial<VueToPdfOptions>, {
      puppeteerLaunchOptions: _options.puppeteerLaunchOptions,
      pdfOptions: _options.pdfOptions,
    })

    addPlugin(resolver.resolve('./runtime/plugin'))
    addImports({ name: 'useVueToPdf', as: 'useVueToPdf', from: resolver.resolve('./runtime/composables/vue-to-pdf') })
    addServerImportsDir(resolver.resolve('./runtime/server/utils'))

    _nuxt.hook('nitro:config', async (nitroConfig) => {
      nitroConfig.rollupConfig ||= {}
      nitroConfig.rollupConfig.plugins ||= []
      if (Array.isArray(nitroConfig.rollupConfig.plugins)) {
        (nitroConfig.rollupConfig.plugins as unknown[]).unshift(PluginVue())
      }
      else {
        throw new TypeError('Expected nitroConfig.rollupConfig.plugins to be an array.')
      }
    })
  },
})
