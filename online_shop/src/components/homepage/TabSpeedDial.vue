<template>
<v-speed-dial
        location="top center"
        transition="scale-transition"
        >
        <template v-slot:activator="{ props: activatorProps }">
            <v-fab
            v-bind="activatorProps"
            size="large"
            icon="$plus"
            class="tabSpeedDial"></v-fab>
        </template>

        <v-btn key="1" icon="$heart" class="bg-black text-white">
            <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn key="2" icon="$cart" class="bg-black text-white">
            <v-icon>mdi-cart</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<style lang="scss" scoped>
.tabSpeedDial {
    position: absolute;
    right: 10px;
    bottom: 10px;
    height: auto !important;

    :deep(button) {
        background-color: #191919;
        color: white;
        z-index: 1;
    }
}
:deep(.v-btn--icon) {
    border-radius: 0!important;
}

.v-btn--icon{
    border-radius: 0!important;
}
</style>