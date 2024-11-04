import defu from 'defu'
import type { H3Event } from 'h3'
import type { VueToPdfOptions } from '~/src/types'
import { getQuery, useRuntimeConfig } from '#imports'

export function mergeVueToPdfOptions(event: H3Event, options?: Partial<VueToPdfOptions>): VueToPdfOptions {
  const defaultOptions: Readonly<VueToPdfOptions> = {
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
        cdns: [],
      },
      local: [],
    },
    component: {
      forwardRequest: true,
      props: {},
    },
  }

  const _options = defu(options, useRuntimeConfig().nuxtVueToPdf, defaultOptions) as VueToPdfOptions

  if (!_options.component.forwardRequest)
    return _options

  const { props } = _options.component

  if (props?.headers) {
    console.warn(`options.component.props.headers will be overwritten due to forwardRequest flag`)
  }
  props.headers = event.node.req.headers

  if (props?.query) {
    console.warn(`options.component.props.query will be overwritten due to forwardRequest flag`)
  }
  props.query = getQuery(event)

  return _options
}
