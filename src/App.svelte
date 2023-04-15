<script lang="ts">
  import ControlButtons from "./lib/ControlButtons.svelte";
  import Stack from "./lib/Stack";
  import Tower from "./lib/Tower.svelte";

  var count: number = 3;
  $: count, resetState();

  var numberOfMoves: number;

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

    numberOfMoves = numberOfMoves + 1;

    if (tower1.isEmpty() && tower2.isEmpty()) {
      setTimeout(() => {
        alert("Game over");
      }, 100);
    }
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
    numberOfMoves = 0;
    if (count <= 0) {
      return
    }
    tower1 = new Stack(
      "tower1",
      Array(count)
        .fill(0)
        .map((value, index) => {
          return index + 1;
        })
        .reverse()
    );
    tower2 = new Stack("tower2");
    tower3 = new Stack("tower3");
  }
</script>

<h2>Move all blocks to the last tower</h2>
<p>No. of moves = {numberOfMoves}</p>
<br />
<br />
<main class="main">
  <Tower bind:stack="{tower1}" on:updateTower="{handleUpdateTower}" />
  <Tower bind:stack="{tower2}" on:updateTower="{handleUpdateTower}" />
  <Tower bind:stack="{tower3}" on:updateTower="{handleUpdateTower}" />
</main>
<br />
<br />
<ControlButtons on:reset="{resetState}" bind:count="{count}" />

<style>
  .main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }
</style>
