<script setup lang="ts">
import Header from '~/components/Pdf/Api/childrean/Header.vue'
import SimpleTable from '~/components/Table/SimpleTable.vue'

const props = defineProps<{
  headers: object
}>()
const users = await $fetch<{ [key: string ]: string | number | { [key: string ]: string } }[]>('https://jsonplaceholder.typicode.com/users', { headers: { Authorization: props.headers.authorization } })

const columns = ['Name', 'Username', 'Email', 'Website']
const rows = users.map(user => ({
  name: user.name,
  username: user.username,
  email: user.email,
  website: user.website,
}))
</script>

<template>
  <Header />
  <SimpleTable
    :columns
    :rows
  />
</template>
