<script setup lang="ts"></script>
<template>
  <div class="q-pa-md flex flex-col flex-center">
    <QCircularProgress
      indeterminate
      size="75px"
      :thickness="0.6"
      color="green"
      center-color="grey-8"
      class="q-ma-md"
    />
    <div>Loading...</div>
  </div>
</template>
