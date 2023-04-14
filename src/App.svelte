<script lang="ts">
  import Stack from "./lib/Stack";
  import Tower from "./lib/Tower.svelte";

  let tower1 = new Stack("tower1", [6 ,5, 4, 3, 2, 1]);
  let tower2 = new Stack("tower2");
  let tower3 = new Stack("tower3");

  function handleUpdateTower(event) {
    let payload = event.detail;
    let currentTower: Stack = getTowerWithName(payload["currentTowerName"]);
    let currentValue = Number(payload["currentValue"]);
    let incomingValue = Number(payload["incomingValue"]);
    let incomingTower: Stack = getTowerWithName(payload["incomingTowerName"]);

    currentTower.push(incomingValue);
    hydrateTower(currentTower);

    incomingTower.pop();
    hydrateTower(incomingTower);
  }

  function hydrateTower(tower: Stack) {
    switch (tower.name) {
      case "tower1":
        tower1 = tower;
        break;
      case "tower2":
        tower2 = tower;
        break;
      case "tower3":
        tower3 = tower;
        break;
      default:
        break;
    }
  }

  function getTowerWithName(name) {
    switch (name) {
      case "tower1":
        return tower1;
      case "tower2":
        return tower2;
      case "tower3":
        return tower3;
      default:
        break;
    }
  }
</script>

<main class="main">
  <Tower bind:stack="{tower1}" on:updateTower="{handleUpdateTower}" />
  <Tower bind:stack="{tower2}" on:updateTower="{handleUpdateTower}" />
  <Tower bind:stack="{tower3}" on:updateTower="{handleUpdateTower}" />
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
