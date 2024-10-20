import Basic from '~/components/Pdf/Basic/Basic.vue'

export default defineEventHandler(async (event) => {
  return await exportVueToPdf(event, 'basic.pdf', Basic)
})
