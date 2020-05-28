import "reflect-metadata";
import { container } from "../../../../../src/inversify.config";
import { TYPES } from "../../../../../src/types";
import { DeckService } from "../../../../../src/core/business/service/DeckService";
import {
    DeckPartConfig,
    DefaultDeckPartConfig,
} from "../../../../../src/core/model/ygo/DeckPartConfig";
import { Card } from "../../../../../src/core/model/ygo/Card";
import { createCard, createCardType } from "../../../helper/dataFactories";
import { Format } from "../../../../../src/core/model/ygo/Format";
import { DefaultBanState } from "../../../../../src/core/model/ygo/BanState";
import { CardTypeGroup } from "../../../../../src/core/model/ygo/CardTypeGroup";
import { DeckPart } from "../../../../../src/core/model/ygo/DeckPart";

describe("DeckService", () => {
    let deckService: DeckService;

    beforeEach(() => {
        container.snapshot();

        deckService = container.get<DeckService>(TYPES.DeckService);
    });

    afterEach(() => {
        container.restore();
    });

    describe("createEmptyDeck", () => {
        it("creates empty deck", () => {
            expect(deckService.createEmptyDeck()).toEqual({
                name: null,
                parts: {
                    [DeckPart.MAIN]: [],
                    [DeckPart.EXTRA]: [],
                    [DeckPart.SIDE]: [],
                },
            });
        });
    });

    describe("getAllCards", () => {
        it("gets all cards", () => {
            const card1 = createCard({ passcode: "123" });
            const card2 = createCard({ passcode: "456" });
            const card3 = createCard({ passcode: "789" });
            expect(
                deckService.getAllCards({
                    name: null,
                    parts: {
                        [DeckPart.MAIN]: [card1],
                        [DeckPart.EXTRA]: [card2, card2],
                        [DeckPart.SIDE]: [card3],
                    },
                })
            ).toEqual([card1, card2, card2, card3]);
        });
    });

    describe("canAdd", () => {
        it("checks deck part card types", () => {
            expect(
                deckService.canAdd(
                    {
                        name: null,
                        parts: {
                            [DeckPart.MAIN]: [],
                            [DeckPart.EXTRA]: [],
                            [DeckPart.SIDE]: [],
                        },
                    },
                    DeckPart.MAIN,
                    Format.TCG,
                    createCard({
                        passcode: "456",
                        type: createCardType({
                            deckPart: new Set([DeckPart.EXTRA]),
                        }),
                    })
                )
            ).toBeFalse();
        });

        it("checks deck part limit", () => {
            expect(
                deckService.canAdd(
                    {
                        name: null,
                        parts: {
                            [DeckPart.MAIN]: [],
                            [DeckPart.EXTRA]: [],
                            [DeckPart.SIDE]: new Array(15).fill(
                                createCard({ passcode: "123" })
                            ),
                        },
                    },
                    DeckPart.SIDE,
                    Format.TCG,
                    createCard({ passcode: "456" })
                )
            ).toBeFalse();
        });

        it("checks total link card count", () => {
            const card = createCard({
                passcode: "456",
                type: createCardType({ group: CardTypeGroup.SKILL }),
            });
            expect(
                deckService.canAdd(
                    {
                        name: null,
                        parts: {
                            [DeckPart.MAIN]: [],
                            [DeckPart.EXTRA]: [],
                            [DeckPart.SIDE]: [card],
                        },
                    },
                    DeckPart.SIDE,
                    Format.OCG,
                    card
                )
            ).toBeFalse();
        });

        it("checks against ban list", () => {
            const card = createCard({
                passcode: "456",
                banlist: {
                    [Format.OCG]: DefaultBanState.LIMITED,
                    [Format.TCG]: DefaultBanState.UNLIMITED,
                    [Format.GOAT]: DefaultBanState.UNLIMITED,
                },
            });
            expect(
                deckService.canAdd(
                    {
                        name: null,
                        parts: {
                            [DeckPart.MAIN]: [],
                            [DeckPart.EXTRA]: [],
                            [DeckPart.SIDE]: [card],
                        },
                    },
                    DeckPart.SIDE,
                    Format.OCG,
                    card
                )
            ).toBeFalse();
        });

        it("returns true if a card can be added", () => {
            const card = createCard({
                passcode: "456",
            });
            expect(
                deckService.canAdd(
                    {
                        name: null,
                        parts: {
                            [DeckPart.MAIN]: [],
                            [DeckPart.EXTRA]: [],
                            [DeckPart.SIDE]: [],
                        },
                    },
                    DeckPart.SIDE,
                    Format.OCG,
                    card
                )
            ).toBeTrue();
        });
    });

    describe("addCard", () => {
        it("adds card", () => {
            const card = createCard({
                passcode: "456",
            });
            const deck = {
                name: null,
                parts: {
                    [DeckPart.MAIN]: [],
                    [DeckPart.EXTRA]: [],
                    [DeckPart.SIDE]: [],
                },
            };

            const result = deckService.addCard(deck, DeckPart.SIDE, card);
            expect(result).toEqual({
                name: null,
                parts: {
                    [DeckPart.MAIN]: [],
                    [DeckPart.EXTRA]: [],
                    [DeckPart.SIDE]: [card],
                },
            });
        });
    });

    describe("removeCard", () => {
        it("removes card", () => {
            const card = createCard({
                passcode: "456",
            });
            const deck = {
                name: null,
                parts: {
                    [DeckPart.MAIN]: [],
                    [DeckPart.EXTRA]: [],
                    [DeckPart.SIDE]: [card],
                },
            };

            const result = deckService.removeCard(deck, DeckPart.SIDE, card);
            expect(result).toEqual({
                name: null,
                parts: {
                    [DeckPart.MAIN]: [],
                    [DeckPart.EXTRA]: [],
                    [DeckPart.SIDE]: [],
                },
            });
        });
    });
});
