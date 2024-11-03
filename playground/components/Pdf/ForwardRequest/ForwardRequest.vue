<script setup lang="ts">
import Header from '~/components/Pdf/ForwardRequest/childrean/Header.vue'
import SimpleTable from '~/components/Table/SimpleTable.vue'

const props = defineProps<{
  query: { title: string }
  users: { [key: string ]: string | number | { [key: string ]: string } }[]
}>()

const columns = ['Name', 'Username', 'Email', 'Website']
const rows = props.users.map(user => ({
  name: user.name,
  username: user.username,
  email: user.email,
  website: user.website,
}))
</script>

<template>
  <Header :title="query.title" />
  <SimpleTable
    :columns
    :rows
  />
</template>
