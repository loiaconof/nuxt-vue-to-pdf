import type { PDFOptions, PuppeteerLaunchOptions } from 'puppeteer'

export interface VueToPdfOptions {
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  pdfOptions?: PDFOptions
  css: {
    external: {
      cdns: string[]
    }
    local: string[]
  }
  component: {
    forwardRequest: boolean
    props: { [key: string]: unknown }
  }
}
