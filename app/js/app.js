!function(e){"use strict";e="default"in e?e.default:e;var t=[{id:"dollar_us",name:"US Dollar",label:"$",val:1},{id:"euro",name:"Euro",label:"€",val:.918603},{id:"pound",name:"Pound",label:"£",val:.793752},{id:"dollar_ca",name:"Canadian Dollar",label:"$",val:1.33448},{id:"dollar_au",name:"Australian Dollar",label:"$",val:1.30931}],n=[{id:"low",name:"Low"},{id:"average",name:"Average"},{id:"high",name:"High"}],a=[{id:"main",name:"Main",fileId:"#main",size:[40,60]},{id:"extra",name:"Extra",fileId:"#extra",size:[0,15]},{id:"side",name:"Side",fileId:"!side",size:[0,15]}],r={deckparts:a,deck:{name:"Unnamed",link:"",list:{main:[],extra:[],side:[]}},cards:{pairs:[],data:{}},builder:{filter:"",pairsFiltered:[]},price:{activeCurrency:"dollar_us",modes:n,currencies:t},ajax:{currentlyLoading:!1,namesLoaded:!1,pricesLoaded:!1}},i=function(){return location.origin+location.pathname},o=function(e,t){for(var n=Object.keys(e),a=n.length,r=0;r<a;){var i=n[r];t(e[i],i,r),r++}},d=function(){var e=this;e.ajax.currentlyLoading=!0,e.ajax.namesLoaded=!1,fetch("./api/names/names.min.json").then(function(e){return e.json()}).then(function(t){var n={},a=[],r=[];o(t,function(e,t){n[t]={name:e,img:"https://ygoprodeck.com/pics/"+t+".jpg",link:"http://yugiohprices.com/card_price?name="+encodeURI(e),price:!1},-1===r.indexOf(e)&&a.push([t,e]),r.push(e)}),e.cards.data=n,e.cards.pairs=a.sort(function(e,t){return e[1].localeCompare(t[1])}),e.builderUpdateNames(),e.ajax.currentlyLoading=!1,e.ajax.namesLoaded=!0})},c=function(){var e=this,t=e.deckCardsWithoutPriceData();if(t.length>0){var n=t.map(function(t){return e.cards.data[t].name}),a=btoa(JSON.stringify(n));e.ajax.currentlyLoading=!0,e.ajax.pricesLoaded=!1,fetch("./api/prices/prices.php?n="+a).then(function(e){return e.json()}).then(function(n){t.forEach(function(t,a){var r=n[a],i=e.cards.data[t];i&&(i.price={low:r.low,average:r.average,high:r.high})}),e.ajax.currentlyLoading=!1,e.ajax.pricesLoaded=!0})}else e.ajax.pricesLoaded=!0},u=function(e){var t=e.replace(/#created.+/,"").trim(),n=t.split(/[#!].+/g).splice(1),r=n.map(function(e){return e.split("\n").filter(function(e){return e.length>1}).map(Number)}),i={};return a.forEach(function(e,t){i[e.id]=r[t]}),i},s=function(e){var t=new FileReader,n=this;t.onload=function(t){var a=t.target.result,r=u(a);n.deck.name=e.name.replace(".ydk",""),n.deck.list=r,n.deckUpdate()},t.readAsText(e)},l=function(e){var t=JSON.parse(atob(e.replace("?d=",""))),n={};return a.forEach(function(e,a){n[e.id]=t[1][a]}),[t[0],n]},f=function(e){var t=this,n=l(e);t.deck.name=n[0],t.deck.list=n[1],t.deckUpdate(e)},p=function(e){var t=[e.name,Object.values(e.list)];return"?d="+btoa(JSON.stringify(t))},v=function(e){var t=this;t.deck.link=e||p(t.deck),t.ajax.pricesLoaded=!1},h=function(){var e=this,t=e.cards.data,n=[];return o(e.deck.list,function(e){e.forEach(function(e){-1!==n.indexOf(e)||t[e].price||n.push(e)})}),n},m=function(e){var t=this,n=t.price.currencies.find(function(e){return e.id===t.price.activeCurrency});return(e*n.val).toFixed(2)+n.label},g=function(e,t){var n=this,a=n.cards.data[e].price[t];return a?n.priceConvert(a):"Not found"},k=function(e,t){var n=function(e){var n=0;return e&&e.length&&e.forEach(function(e){var r=a.cards.data[e];r&&r.price&&r.price[t]&&(n+=r.price[t])}),n},a=this,r=0;return"*"===e?o(a.deck.list,function(e){r+=n(e)}):r=n(a.deck.list[e]),a.priceConvert(r)},w=function(){var e=this,t=e.builder.filter.toLowerCase(),n=e.cards.pairs.filter(function(e){return-1!==e[1].toLowerCase().indexOf(t)});n.length>500&&(n=n.splice(0,500)),e.builder.pairsFiltered=n},y=function(e,t){var n=this,a=Number(e),r=n.deck.list[t],i=n.deckparts.find(function(e){return e.id===t}).size[1];r.length<i&&r.filter(function(e){return e===a}).length<3&&(r.push(a),n.deckUpdate())},b=function(e,t){var n=this,a=!1;n.deck.list[t]=n.deck.list[t].filter(function(t){return!(!a&&e===t)||(a=!0,!1)}),n.deckUpdate()},L="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},x=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(e){var t=t||function(e){if(!(void 0===e||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var t=e.document,n=function(){return e.URL||e.webkitURL||e},a=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in a,i=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},o=/constructor/i.test(e.HTMLElement)||e.safari,d=/CriOS\/[\d]+/.test(navigator.userAgent),c=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},u=function(e){var t=function(){"string"==typeof e?n().revokeObjectURL(e):e.remove()};setTimeout(t,4e4)},s=function(e,t,n){t=[].concat(t);for(var a=t.length;a--;){var r=e["on"+t[a]];if("function"==typeof r)try{r.call(e,n||e)}catch(e){c(e)}}},l=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e},f=function(t,c,f){f||(t=l(t));var p,v=this,h=t.type,m="application/octet-stream"===h,g=function(){s(v,"writestart progress write writeend".split(" "))};if(v.readyState=v.INIT,r)return p=n().createObjectURL(t),void setTimeout(function(){a.href=p,a.download=c,i(a),g(),u(p),v.readyState=v.DONE});!function(){if((d||m&&o)&&e.FileReader){var a=new FileReader;return a.onloadend=function(){var t=d?a.result:a.result.replace(/^data:[^;]*;/,"data:attachment/file;");e.open(t,"_blank")||(e.location.href=t),t=void 0,v.readyState=v.DONE,g()},a.readAsDataURL(t),void(v.readyState=v.INIT)}if(p||(p=n().createObjectURL(t)),m)e.location.href=p;else{e.open(p,"_blank")||(e.location.href=p)}v.readyState=v.DONE,g(),u(p)}()},p=f.prototype,v=function(e,t,n){return new f(e,t||e.name||"download",n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return t=t||e.name||"download",n||(e=l(e)),navigator.msSaveOrOpenBlob(e,t)}:(p.abort=function(){},p.readyState=p.INIT=0,p.WRITING=1,p.DONE=2,p.error=p.onwritestart=p.onprogress=p.onwrite=p.onabort=p.onerror=p.onwriteend=null,v)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||L.content);e.exports&&(e.exports.saveAs=t)}),O=function(e){var t=[];return a.forEach(function(n){t.push(n.fileId),t=t.concat(e[n.id])}),t.join("\n")},j=function(){var e=this,t=O(e.deck.list),n=new File([t],e.deck.name+".ydk",{type:"text/ydk"});return x.saveAs(n)},S={uriLocationNoParam:i,apiLoadNames:d,apiLoadPrices:c,deckLoad:s,deckLoadUri:f,deckUpdate:v,deckCardsWithoutPriceData:h,priceConvert:m,priceForCard:g,priceForSection:k,builderUpdateNames:w,builderDeckAdd:y,builderDeckRemove:b,fileDownloadDeck:j,onFileChange:function(e){var t=this,n=e.target.files||e.dataTransfer.files;t.deckLoad(n[0])}};document.addEventListener("DOMContentLoaded",function(){var t=location.search,n=new e({el:"#app",data:r,methods:S});n.apiLoadNames(),-1!==t.indexOf("?d")&&n.deckLoadUri(t)})}(Vue);
//# sourceMappingURL=app.js.map
