export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig: {
    nuxtVueToPdf: {
      pdfOptions: {
        format: 'A2',
      },
    },
  },
  compatibilityDate: '2024-10-19',
})
