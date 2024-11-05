# Nuxt Vue To Pdf



## Features

<!-- Highlight some of the features your module provide here -->
- Nuxt 3 ready
- Vue 3 composables

## Quick Setup

Install the module:

```sh
npx nuxi@latest module add nuxt-vue-to-pdf
```

And that's it! The module will now register route rules and server middlewares globally so that your application will be more secured.

## Configuration

You can pass configuration to the module in the `nuxt.config.ts` like following:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-vue-to-pdf"],
  // ...
  runtimeConfig: {
    nuxtVueToPdf: {
      // Partial<VueToPdfOptions>
    },
  },
})
```

**TypeScript Signature:**

```ts
interface VueToPdfOptions {
  puppeteerLaunchOptions?: PuppeteerLaunchOptions // can be overridden by NUXT_PUPPETEER_LAUNCH_OPTIONS_{OPTION} environment variable
  pdfOptions?: PDFOptions // can be overridden by NUXT_PDF_OPTIONS_{OPTION} environment variable
  css: {
    external: {
      cdns: string[] // can be overridden by NUXT_CSS_EXTERNAL_CDNS environment variable
    }
    local: string[] // can be overridden by NUXT_CSS_LOCAL environment variable
  }
}
```

## Server Utils

The following helpers are auto-imported in your `server/` directory.

```ts
async function exportVueToPdf(event: H3Event, filename: string, component: Component, options?: Partial<VueToPdfOptions>): Promise<Uint8Array<ArrayBufferLike> | undefined>
```

> ⚠️ **Warning: Side Effect on Response Headers**
>
> The `exportVueToPdf` function modifies the headers of the HTTP response. Specifically, it sets the following headers:
>
> - `Content-Type: application/pdf`
> - `Content-Disposition: attachment; filename="<filename>"`
> - `Content-Length: <pdfBuffer.length>`
>
> These headers are automatically applied to the response object, which may affect other parts of the request handling process. Make sure this behavior is expected or handle potential conflicts in downstream code.
