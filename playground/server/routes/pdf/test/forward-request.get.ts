import type { VueToPdfOptions } from '~/src/types'
import Pdf from '~/components/Pdf/ForwardRequest/ForwardRequest.vue'

export default defineEventHandler(async (event) => {
  const users = await $fetch('https://jsonplaceholder.typicode.com/users')

  const options: VueToPdfOptions = {
    pdfOptions: {
      format: 'A4',
    },
    component: {
      props: { users },
    },
  }

  console.log(getQuery(event))


  
  return await exportVueToPdf(event, 'forward-request.pdf', Pdf, options)
})
