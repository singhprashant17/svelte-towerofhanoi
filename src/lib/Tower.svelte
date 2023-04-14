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

    function handleDragStart(e) {
        let status = "Dragging the element " + e.target.getAttribute("id");
        console.log(status);
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("text", e.target.getAttribute("id"));
        e.dataTransfer.setData("towerName", stack.name);
    }

    function handleDragEnd(e) {
        e.preventDefault();
        let status = "You let the " + e.target.getAttribute("id") + " go.";
        console.log(status);
    }

    function handleDragEnter(event) {
        console.log("You are dragging over the " + event.target.getAttribute("id"));
    }

    function handleDragLeave(event) {
        console.log("You left the " + event.target.getAttribute("id"));
    }

    function handleDragDrop(e) {
        var element_id = e.dataTransfer.getData("text");
        let status = "You droped " + element_id + " into drop zone";
        var getAttributeId = e.target.getAttribute("id");

        let incomingValue = element_id;
        let currentValue = getAttributeId;

        if (incomingValue < currentValue) {
            console.log("can drop");
        } else {
            console.log("cant drop");
            return;
        }

        let incomungTowerName = e.dataTransfer.getData("towerName");
        let currentTowerName = stack.name;

        console.log(status, getAttributeId);

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
                    class="block"
                    style="width: {width}px;"
                    draggable="true"
                    on:dragenter="{handleDragEnter}"
                    on:dragleave="{handleDragLeave}"
                    on:dragstart="{handleDragStart}"
                    on:dragend="{handleDragEnd}"
                    on:drop="{handleDragDrop}"
                    on:dragover="{handleDragOver}"
                >
                    {item}
                </div>
            {:else}
                <div id="{item}" class="block" style="width: {width}px;">
                    {item}
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
    .block {
        background-color: red;
        height: 20px;
        align-self: center;
        border: 1px solid black;
        border-bottom: none;
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
