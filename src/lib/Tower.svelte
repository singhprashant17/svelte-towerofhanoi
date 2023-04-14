<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type Stack from "./Stack";
    export let stack: Stack;

    let dispatch = createEventDispatcher();

    function isLastElement(index, item) {
        let isLastElement = index == stack.length() - 1;
        // console.log(stack.name, isLastElement, item, index)
        return isLastElement;
    }

    // start drag on the current tower
    function handleDragStart(e) {
        let status = "Dragging the element " + e.target.getAttribute("id");
        console.log(status);
        e.dataTransfer.dropEffect = "move";
        // save data in the transfer object
        // id of the dragged block
        e.dataTransfer.setData("text", e.target.getAttribute("id"));
        // current stack name
        e.dataTransfer.setData("towerName", stack.name);
    }

    function handleDragEnd(e) {
        e.preventDefault();
        let status = "You let the " + e.target.getAttribute("id") + " go.";
        console.log(status);
    }

    function handleDragEnter(event) {
        console.log(
            "You are dragging over the " + event.target.getAttribute("id")
        );
    }

    function handleDragLeave(event) {
        console.log("You left the " + event.target.getAttribute("id"));
    }

    // block is dragged into the current tower
    function handleDragDrop(e) {
        // get the id of the dragged block from the data transfer object
        let incomingValue = e.dataTransfer.getData("text");
        // get id of the block on which drag dropped
        let currentValue = e.target.getAttribute("id");
        let status = "You droped " + incomingValue + " into drop zone";

        // check if block can be dropped
        if (incomingValue < currentValue) {
            console.log("can drop");
        } else {
            console.log("cant drop");
            return;
        }

        // get dragged blocks tower name from data transfer object 
        let incomungTowerName = e.dataTransfer.getData("towerName");
        // get current tower name
        let currentTowerName = stack.name;

        console.log(
            "incomungTowerName =" + incomungTowerName,
            "currentTowerName =" + currentTowerName
        );

        dispatch("updateTower", {
            incomingTowerName: incomungTowerName,
            incomingValue: incomingValue,
            currentTowerName: currentTowerName,
            currentValue: currentValue,
        });
    }

    function handleDragOver(e) {
        // enable drop on the dragged over element
        e.preventDefault();
        var getAttributeId = e.target.getAttribute("id");
        var getDataText = e.dataTransfer.getData("text");
        console.log(
            "handleDragOver = " + "getAttributeId=" + getAttributeId,
            "getDataText=" + getDataText
        );
    }
</script>

<div class="wrapper">
    <div class="stack">
        {#if stack.isEmpty()}
            {@const newId = "99999"}
            <div
                id="{newId}"
                class="emptyblock"
                draggable="true"
                on:dragenter="{handleDragEnter}"
                on:dragleave="{handleDragLeave}"
                on:dragstart="{handleDragStart}"
                on:dragend="{handleDragEnd}"
                on:drop="{handleDragDrop}"
                on:dragover="{handleDragOver}"
            >
                {newId}
            </div>
        {/if}
        {#each stack.getAsArray() as item, i}
            {@const lastElement = isLastElement(i, item)}
            {@const width = item * 30}
            {#if lastElement}
                <div
                    id="{item}"
                    class="block topblock"
                    on:dragenter="{handleDragEnter}"
                    on:dragleave="{handleDragLeave}"
                    on:dragstart="{handleDragStart}"
                    on:dragend="{handleDragEnd}"
                    on:drop="{handleDragDrop}"
                    on:dragover="{handleDragOver}"
                >
                    <div
                        draggable="true"
                        id="{item}"
                        class="innerblock"
                        style="width: {width}px;"
                    >
                        {item}
                    </div>
                </div>
            {:else}
                <div id="{item}" class="block">
                    <div class="innerblock" style="width: {width}px;">
                        {item}
                    </div>
                </div>
            {/if}
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
    .topblock {
        flex: 1;
    }
    .block {
        display: flex;
        flex-direction: column-reverse;
        background-color: transparent;
        width: 100%;
        height: 20px;
        text-align: center;
        align-self: center;
        color: white;
    }
    .innerblock {
        border: 1px solid black;
        border-bottom: none;
        height: 20px;
        align-self: center;
        background-color: red;
        color: white;
    }
    .emptyblock {
        flex: 1;
        background-color: transparent;
        height: 20px;
        width: 200px;
        align-self: center;
        border-bottom: none;
        color: transparent;
    }
    .stack {
        width: 200px;
        height: 210px;
        background-color: transparent;
        opacity: 1;
        position: absolute;
        display: flex;
        justify-content: end;
        flex-direction: column-reverse;
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
