<script setup lang="ts">
defineProps<{
  columns: string[]
  rows: { [key: string ]: string | number | { [key: string ]: string } }[]
}>()
</script>

<template>
  <div>
    <table class="table-auto border-collapse border border-slate-500 w-7/8 mx-3">
      <thead>
        <tr>
          <th
            v-for="(value, index) in columns"
            :key="index"
            class="border border-slate-600"
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
            class="border border-slate-700"
          >
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
