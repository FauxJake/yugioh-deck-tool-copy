<template>
    <div class="builder">
        <BSidebar id="filterSidebar" title="Filter Cards">
            <div class="container">
                <YgoFilter v-model="filter" v-if="loaded" />
                <button class="btn btn-danger" @click="() => resetFilter()">
                    <span
                        class="fas fas-in-button fa-trash"
                        aria-hidden="true"
                    ></span>
                    Reset Filter
                </button>
            </div>
        </BSidebar>
        <div class="builder__details">
            <small class="builder__count">
                Result: {{ filteredCards.length }} of
                {{ formatCards.length }} Cards
            </small>
            <button class="btn btn-primary" v-b-toggle.filterSidebar>
                <span
                    class="fas fas-in-button fa-search"
                    aria-hidden="true"
                ></span>
                Filter Cards
            </button>
        </div>
        <YgoSortingOptions v-model="sortingOptions" />
        <YgoBuilderMatches :matches="filteredCards" :drag-group="dragGroup" />
    </div>
</template>

<script lang="ts">
import { applicationContainer } from "../../inversify.config";
import { APPLICATION_TYPES } from "../../types";
import type {
    Card,
    CardDatabase,
    CardFilter,
    CardPredicate,
    CardService,
    FilterService,
    Format,
    SortingOptions,
    SortingService,
} from "../../../../core/src/main";
import { SortingOrder, SortingStrategy } from "../../../../core/src/main";
import YgoFilter from "../YgoFilter.vue";
import YgoSortingOptions from "./YgoSortingOptions.vue";
import YgoBuilderMatches from "./YgoBuilderMatches.vue";
import type { PropType } from "@vue/composition-api";
import { computed, defineComponent, reactive, ref } from "@vue/composition-api";
import { appStore } from "../../composition/state/appStore";
import { dataLoaded } from "../../composition/state/dataLoaded";
import { BSidebar } from "bootstrap-vue";

const cardDatabase = applicationContainer.get<CardDatabase>(
    APPLICATION_TYPES.CardDatabase
);
const sortingService = applicationContainer.get<SortingService>(
    APPLICATION_TYPES.SortingService
);
const filterService = applicationContainer.get<FilterService>(
    APPLICATION_TYPES.FilterService
);
const cardService = applicationContainer.get<CardService>(
    APPLICATION_TYPES.CardService
);

const createDefaultFilter = (): CardFilter => {
    return {
        name: null,

        typeCategory: null,
        type: null,
        subType: null,

        attribute: null,
        level: null,
        linkMarkers: [],

        archetype: null,
        format: null,
        banState: null,

        sets: [],
    };
};

const addableInAtLeastOneDeckPartCardPredicate: CardPredicate = (card) =>
    card.type.deckParts.size > 0;

// Useful to avoid e.g. alternate artworks
const createUniqueByNameCardPredicate = (): CardPredicate => {
    const seenNames = new Set<string>();
    return (card) => {
        if (seenNames.has(card.name)) {
            return false;
        }
        seenNames.add(card.name);
        return true;
    };
};

export default defineComponent({
    props: {
        dragGroup: {
            required: true,
            type: String as PropType<string>,
        },
    },
    components: {
        YgoFilter,
        YgoSortingOptions,
        YgoBuilderMatches,
        BSidebar,
    },
    setup(props, context) {
        // We have to init all properties even if they are optional, because otherwise vue cant listen to changes.
        const filter = reactive<CardFilter>(createDefaultFilter());
        const resetFilter = (): void => {
            Object.assign(filter, createDefaultFilter());
        };

        const sortingOptions = ref<SortingOptions>({
            strategy: SortingStrategy.DEFAULT,
            order: SortingOrder.DESC,
        });

        const loaded = dataLoaded(context);

        const format = computed<Format | null>(
            () => appStore(context).state.format.active
        );

        const formatCards = computed<Card[]>(() => {
            // Required to ensure render after loading.
            if (!loaded.value) {
                return [];
            }
            return filterService.filter(cardDatabase.getCards(), {
                customPredicates: [
                    addableInAtLeastOneDeckPartCardPredicate,
                    createUniqueByNameCardPredicate(),
                ],
                format: format.value,
            });
        });
        const filteredCards = computed<Card[]>(() => {
            const filtered = filterService.filter(formatCards.value, {
                ...filter,
                format: format.value,
            });
            return sortingService.sort(filtered, sortingOptions.value);
        });

        return {
            filter,
            sortingOptions,

            loaded,
            formatCards,
            filteredCards,

            resetFilter,
        };
    },
});
</script>

<style lang="scss">
@import "../../../../ui/src/styles/variables";
@import "../../../../ui/src/styles/mixins";

.deck-tool {
    .builder {
        &__details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: $margin-md;
        }
    }
}
</style>
