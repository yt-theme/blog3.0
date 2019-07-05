<template>
    <div class="menuList_container">
        <template v-for="i in this.$store.state.menuData">
            <MenuSection :menuLabel="i.label"></MenuSection>
        </template>
    </div>
</template>

<script>
import MenuSection from './menuSection'
export default {
    components: {
        MenuSection
    },
    data () {
        return {
            menuData: []
        }
    },
    created () {
        this.$store.commit('requestMenuData')
    }
}
</script>

<style>
.menuList_container {
    display: flex;
}
</style>
