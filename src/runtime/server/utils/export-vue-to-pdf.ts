import puppeteer from 'puppeteer'
import { type Component, createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import type { H3Event } from 'h3'
import { processLocalCss } from './process-local-css'
import { mergeVueToPdfOptions } from './merge-vue-to-pdf-options'
import { createError } from '#imports'
import type { VueToPdfOptions } from '~/src/types'

export async function exportVueToPdf(event: H3Event, filename: string, component: Component, options?: Partial<VueToPdfOptions>) {
  const _options = await mergeVueToPdfOptions(event, options)

  const app = createSSRApp({
    render() {
      return h(component, { ..._options.component.props })
    },
  })

  const renderedContent = await renderToString(app)
  const localCss = await processLocalCss(_options.css.local)

  const html = `
  <!DOCTYPE html>
  <html>
    <header>
      ${_options.css.external.cdns.join()}
      <style>${localCss}</style>
    </header>
    <body>
      <div id="app">${renderedContent}</div>
    </body>
  </html>`

  let browser
  try {
    browser = await puppeteer.launch(_options.puppeteerLaunchOptions)

    const page = await browser.newPage()

    await page.setContent(html, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf(_options.pdfOptions)

    event.node.res.setHeader('Content-Type', 'application/pdf')
    event.node.res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    event.node.res.setHeader('Content-Length', pdfBuffer.length)

    return pdfBuffer
  }
  catch (error) {
    createError({
      statusCode: 500,
      statusMessage: JSON.stringify(error),
    })
  }
  finally {
    if (browser)
      await browser.close()
  }
}
