import Api from '~/components/Pdf/Api/Api.vue'

export default defineEventHandler(async (event) => {
  return await exportVueToPdf(event, 'api.pdf', Api)
})
