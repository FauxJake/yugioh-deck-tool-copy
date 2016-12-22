"use strict";

import {
    priceAPI
} from "../data/apiURLs";
//import utilEachObject from "./utilEachObject";

const apiLoadPrices = function() {
    const vm = this;

    if (vm.deck.unique.length) {
        const uniqueNames = vm.deck.unique.map(id => {
            if (vm.cards.data[id]) {
                return encodeURI(vm.cards.data[id].name);
            } else {
                return null;
            }
        });
        const priceQuery = btoa(JSON.stringify(uniqueNames));

        vm.ajax.currentlyLoading = true;
        vm.ajax.pricesLoaded = false;

        fetch(priceAPI + priceQuery)
            .then(response => {
                return response.json();
            })
            .then(function(json) {
                vm.deck.unique.forEach((id, index) => {
                    const priceData = json[index];

                    if (vm.cards.data[id]) {
                        vm.cards.data[id].price = {
                            low: priceData.low,
                            average: priceData.average,
                            high: priceData.high
                        };
                    }
                });

                vm.ajax.currentlyLoading = false;
                vm.ajax.pricesLoaded = true;
            });
    }
};

export default apiLoadPrices;