export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig: {
    nuxtVueToPdf: {
      pdfOptions: {
        format: 'A2',
      },
      css: {
        external: {
          cdns: ['<script src="https://cdn.tailwindcss.com"></script>'],
        },
        local: ['./playground/assets/main.css'],
      },
    },
  },
  compatibilityDate: '2024-10-19',
})
