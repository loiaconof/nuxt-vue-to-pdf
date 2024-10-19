import type { PDFOptions, PuppeteerLaunchOptions } from 'puppeteer'

export interface VueToPdfOptions {
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  pdfOptions?: PDFOptions
}
