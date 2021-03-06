import type { Card } from "../card/Card";
import { DeckPart } from "./DeckPart";

interface Deck {
    name: string | null;
    parts: {
        [DeckPart.MAIN]: Card[];
        [DeckPart.EXTRA]: Card[];
        [DeckPart.SIDE]: Card[];
    };
}

export { Deck };
