<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let count: number;

    function onReset() {
        dispatch("reset");
    }
</script>

<div class="container">
    <div>
        <label>No of blocks</label>
        <input type="number" bind:value="{count}" />
    </div>
    <input id="but" type="button" value="Reset" on:click="{onReset}" />
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        gap: 30px;
    }
    input {
        color: black;
        font-size: medium;
        border-radius: 3px;
        background-color: white;
    }
</style>
