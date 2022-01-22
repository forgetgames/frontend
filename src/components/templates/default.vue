<template>
  <div class="grid grid-rows-[auto,64px] w-3/4 mx-auto p-8 default-template">
    <main class="">
      <router-view />
    </main>
    <footer class="grid grid-cols-[3fr,1fr]">
      <hr class="border-white col-start-1 col-end-3">
      <p class="col-start-1">
        © Copyright {{ new Date().getFullYear() }} by nobody. All rights reversed.
      </p>
      <a href="https://github.com/forgetgames" target="_blank" class="text-right">
        <carbon-logo-github />
      </a>
    </footer>
  </div>
</template>

<style>
.default-template {
  min-height: 100vh;
}
</style>
