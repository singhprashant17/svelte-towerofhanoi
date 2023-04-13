<script lang="ts">
    import type Stack from "./Stack";
    export let stack: Stack;
</script>

<div class="wrapper">
    <div class="stack">
        {#each stack.getAsArray().reverse() as item, i}
            <div class="block" style="width: {item * 30}px;"></div>
        {/each}
    </div>
    <div class="background">
        <div class="vertical"></div>
        <div class="horizontal"></div>
    </div>
</div>

<style>
    .background {
        text-align: center;
    }
    .wrapper {
        position: relative;
    }
    .block {
        background-color: red;
        height: 20px;
        align-self: center;
        border: 1px solid black;
        border-bottom: none;
    }
    .stack {
        width: 200px;
        height: 210px;
        background-color: transparent;
        opacity: 1;
        position: absolute;
        display: flex;
        justify-content: end;
        flex-direction: column;
        padding-bottom: 10px;
    }
    .vertical {
        margin: auto;
        width: 10px;
        height: 210px;
        background: blue;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .horizontal {
        width: 200px;
        height: 10px;
        background: blue;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }
</style>
