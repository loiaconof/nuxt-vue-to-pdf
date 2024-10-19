<template>
  <div>
    Nuxt module playground!
    loading pdf: {{ loadingPdf }}
    <button @click="downloadPdf('/pdf/test/simple')">Download Pdf</button>
  </div>
</template>

<script setup>
const { loading: loadingPdf, download: downloadPdf } = useVueToPdf()
</script>
