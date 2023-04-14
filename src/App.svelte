<script lang="ts">
  import ControlButtons from "./lib/ControlButtons.svelte";
  import Stack from "./lib/Stack";
  import Tower from "./lib/Tower.svelte";

  let tower1: Stack;
  let tower2: Stack;
  let tower3: Stack;
  resetState();

  function handleUpdateTower(event) {
    let payload = event.detail;
    let currentTower: Stack = getTowerWithName(payload["currentTowerName"]);
    let currentValue = Number(payload["currentValue"]);
    let incomingValue = Number(payload["incomingValue"]);
    let incomingTower: Stack = getTowerWithName(payload["incomingTowerName"]);

    // push incoming value to current tower
    currentTower.push(incomingValue);
    updateTowerReference(currentTower);

    // pop element from dragged tower
    incomingTower.pop();
    updateTowerReference(incomingTower);
  }

  function updateTowerReference(tower: Stack) {
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

  function resetState() {
    tower1 = new Stack("tower1", [6, 5, 4, 3, 2, 1]);
    tower2 = new Stack("tower2");
    tower3 = new Stack("tower3");
  }
</script>

<main class="main">
  <Tower bind:stack="{tower1}" on:updateTower="{handleUpdateTower}" />
  <Tower bind:stack="{tower2}" on:updateTower="{handleUpdateTower}" />
  <Tower bind:stack="{tower3}" on:updateTower="{handleUpdateTower}" />
</main>
<br />
<br />
<ControlButtons on:reset="{resetState}" />

<style>
  .main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }
</style>
