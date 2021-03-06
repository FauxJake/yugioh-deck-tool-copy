<template>
    <BDropdownItemButton @click="() => screenshot()" v-b-modal.deckScreenshot>
        <span class="fas fa-image fas-in-button" aria-hidden="true"></span>
        To Screenshot
    </BDropdownItemButton>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { getLogger } from "../../../../../core/src/main";
import { BDropdownItemButton } from "bootstrap-vue";
import { createScreenshot, downloadFile } from "../../../../../ui/src/main";
import { deckEmpty } from "../../../composition/state/deckEmpty";
import {
    showError,
    showInfo,
    showSuccess,
} from "../../../composition/feedback";
import { appStore } from "../../../composition/state/appStore";

const logger = getLogger("YgoExportScreenshot");

export default defineComponent({
    components: { BDropdownItemButton },
    props: {},
    setup(props, context) {
        const isDeckEmpty = deckEmpty(context);
        const store = appStore(context);
        const screenshotReady = ref<boolean>(false);

        const screenshot = (): void => {
            const deckEl = document.getElementById("deckToolDeck");
            if (deckEl == null) {
                throw new TypeError("Could not get deck element!");
            }

            window.scrollTo(0, 0); // Reset scroll position as this may affect the screenshot rendering.

            showInfo(
                context,
                "Creating screenshot, please wait.",
                "deck-tool__portal"
            );
            createScreenshot(
                deckEl,
                store.state.deck.active.name ?? "Deck Screenshot",
                {
                    scale: 2,
                    onClone: (doc) => {
                        doc.body.classList.add("deck-tool__screenshot-context");
                    },
                }
            )
                .then((file) => {
                    showSuccess(
                        context,
                        "Screenshot created.",
                        "deck-tool__portal"
                    );
                    downloadFile(file, document);
                })
                .catch((err) => {
                    logger.error("Could not create screenshot!", err);
                    showError(
                        context,
                        "Could not create screenshot.",
                        "deck-tool__portal"
                    );
                });
        };

        return { isDeckEmpty, screenshotReady, screenshot };
    },
});
</script>
