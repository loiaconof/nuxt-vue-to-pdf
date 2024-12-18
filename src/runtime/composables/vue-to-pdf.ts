import defu from 'defu'
import { ref } from 'vue'

export function useVueToPdf() {
  const loading = ref(false)
  const error = ref<Error | undefined>(undefined)

  async function download(url: string, options?: Partial<FetchOptions<'blob'>>) {
    loading.value = true
    error.value = undefined
    const defaultOptions = { responseType: 'blob' }
    const _options = defu(options ?? {}, defaultOptions) as Partial<FetchOptions<'blob'>>

    try {
      const response = await $fetch.raw<FetchResponse<Blob>>(url, { ..._options })
      downloadBlob(response._data, getResponseFilename(response))
    }
    catch (err: unknown) {
      error.value = err instanceof Error ? err : new Error('Unknown error.')
    }
    finally {
      loading.value = false
    }
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
  }

  function getResponseFilename(response: FetchResponse) {
    const contentDisposition = response.headers.get('Content-Disposition')
    const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/)
    return filenameMatch && filenameMatch[1]
  }

  return {
    loading,
    error,
    download,
  }
}
