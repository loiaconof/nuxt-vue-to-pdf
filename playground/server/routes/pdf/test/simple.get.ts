import { h } from 'vue'

export default defineEventHandler(async (event) => {
  const component = h('div', 'hello world')
  return await exportVueToPdf(event, 'test.pdf', component)
})
