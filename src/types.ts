import type { PDFOptions, PuppeteerLaunchOptions } from 'puppeteer'

export type VueToPdfOptions = Partial<{
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  pdfOptions?: PDFOptions
}>
