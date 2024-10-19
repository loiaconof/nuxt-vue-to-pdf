<script setup lang="ts">
import Header from '~/components/Pdf/Api/childrean/Header.vue'
import SimpleTable from '~/components/Table/SimpleTable.vue'

const users = await $fetch<{ [key: string]: any }[]>('https://jsonplaceholder.typicode.com/users')

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
