import Api from '~/components/Pdf/Api/Api.vue'

export default defineEventHandler(async (event) => {
  const options = {
    pdfOptions: {
      format: 'A4',
    },
  }

  return await exportVueToPdf(event, 'api.pdf', Api, options)
})
