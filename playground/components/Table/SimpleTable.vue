<script setup lang="ts">
defineProps<{
  columns: string[]
  rows: { [key: string ]: string | number | { [key: string ]: string } }[]
}>()
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th
            v-for="(value, index) in columns"
            :key="index"
          >
            {{ value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
        >
          <td
            v-for="(value, idx) in Object.values(row)"
            :key="`${index}-${idx}`"
          >
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
