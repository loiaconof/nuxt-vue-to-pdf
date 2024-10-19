import { defu } from 'defu'
import puppeteer, { type PDFOptions, type PuppeteerLaunchOptions } from 'puppeteer'
import { type Component, createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import type { H3Event } from 'h3'
import { createError } from '#imports'
import type { VueToPdfOptions } from '~/src/types'

const defaultPuppeteerLaunchOptions: PuppeteerLaunchOptions = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
}

const defaultPdfOptions: PDFOptions = {
  format: 'A4',
  printBackground: true,
}

export async function exportVueToPdf(event: H3Event, filename: string, component: Component, options?: VueToPdfOptions) {
  const mergedLaunchOptions = defu(options?.puppeteerLaunchOptions ?? {}, defaultPuppeteerLaunchOptions)
  const mergedPdfOptions = defu(options?.pdfOptions ?? {}, defaultPdfOptions)

  const app = createSSRApp({
    render() {
      return h(component)
    },
  })

  const renderedContent = await renderToString(app)

  const html = `
  <!DOCTYPE html>
  <html>
    <header>
    </header>
    <body>
      <div id="app">${renderedContent}</div>
    </body>
  </html>`

  let browser
  try {
    browser = await puppeteer.launch(mergedLaunchOptions)
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf(mergedPdfOptions)

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
