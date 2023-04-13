<script lang="ts">
  import Stack from "./lib/Stack";
  import Tower from "./lib/Tower.svelte";

  let tower1 = new Stack([6, 5, 4, 3, 2, 1]);
  let tower2 = new Stack();
  let tower3 = new Stack();
</script>

<main class="main">
  <Tower bind:stack="{tower1}" />
  <Tower bind:stack="{tower2}" />
  <Tower bind:stack="{tower3}" />
</main>

<style>
  .main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }
</style>
