<template>
    <BDropdownItemButton v-b-modal.clearDeck :disabled="isDeckEmpty">
        <span class="fas fa-trash fas-in-button" aria-hidden="true"></span>
        Clear
        <BModal
            id="clearDeck"
            modal-class="deck-tool__portal"
            title="Clear Deck"
            @ok="() => clear()"
        >
            <p>Are you sure you want to clear the deck?</p>
        </BModal>
    </BDropdownItemButton>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { appStore } from "../../../composition/state/appStore";
import { DECK_CLEAR } from "../../../store/modules/deck";
import { BDropdownItemButton, BModal } from "bootstrap-vue";
import { deckEmpty } from "../../../composition/state/deckEmpty";

export default defineComponent({
    components: {
        BModal,
        BDropdownItemButton,
    },
    props: {},
    setup(props, context) {
        const clear = (): void => appStore(context).commit(DECK_CLEAR);
        const isDeckEmpty = deckEmpty(context);

        return { isDeckEmpty, clear };
    },
});
</script>
