import { defu } from 'defu'
import puppeteer, { type PDFOptions, type PuppeteerLaunchOptions } from 'puppeteer'
import { type Component, createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import type { H3Event } from 'h3'
import { createError, useRuntimeConfig } from '#imports'
import type { VueToPdfOptions } from '~/src/types'

const defaultOptions: VueToPdfOptions = {
  pdfOptions: {
    format: 'A4',
    printBackground: true,
  },
  puppeteerLaunchOptions: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  css: {
    external: {
      cdns: '',
    },
  },
}

export async function exportVueToPdf(event: H3Event, filename: string, component: Component, options?: Partial<VueToPdfOptions>) {
  const _options = defu(options, useRuntimeConfig().nuxtVueToPdf, defaultOptions) as VueToPdfOptions

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
      ${Array.isArray(_options.css.external.cdns) ? (_options.css.external.cdns as string[]).join() : _options.css.external.cdns}
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
