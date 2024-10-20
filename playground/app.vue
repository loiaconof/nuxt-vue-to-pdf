<template>
  <div>
    Nuxt module playground!
    <hr>
    loading pdf: {{ loadingSimplePdf }}
    <button @click="downloadSimplePdf('/pdf/test/simple')">
      Download Simple Pdf
    </button>
    <hr>
    loading pdf: {{ loadingBasicPdf }}
    <button @click="downloadBasicPdf('/pdf/test/basic')">
      Download Basic Pdf
    </button>
    <hr>
    loading pdf: {{ loadingApiPdf }}
    <button @click="downloadApiPdf('/pdf/test/api')">
      Download Api Pdf
    </button>
  </div>
</template>

<script setup>
const { loading: loadingSimplePdf, download: downloadSimplePdf } = useVueToPdf()
const { loading: loadingBasicPdf, download: downloadBasicPdf } = useVueToPdf()
const { loading: loadingApiPdf, download: downloadApiPdf } = useVueToPdf()
</script>
