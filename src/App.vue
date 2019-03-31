<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  text-align: center;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  background: url("./assets/grunge.png");
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}

</style>
