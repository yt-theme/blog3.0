<template>
    <div class="menuSection_container">
        {{menuLabel}}
    </div>
</template>

<script>
export default {
    props: ['menuLabel','menuAction']
}
</script>

<style>
.menuSection_container {
    text-shadow: 0 0 9px #f9f8f7;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    box-sizing: unset;
    margin-right: 6px;
    padding: 1px 6px;
    cursor: pointer;
}
.menuSection_container:hover {
    text-shadow: 0 0 14px #666;
    box-shadow: 0 0 9px #999;
    background-color: #f9f8f7;
}
</style>
