import { inflate } from "./compress";

const apiLoadCards = urls =>
    new Promise((resolve, reject) => {
        fetch(urls.nameAPI)
            .then(response => response.arrayBuffer())
            .then(buffer => resolve(JSON.parse(inflate(buffer))))
            .catch(reject);
    });

export default apiLoadCards;