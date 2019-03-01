const memoizeOne = fn => {
    let lastProp;
    let lastResult;
    return function(prop) {
        if (prop !== lastProp) {
            lastProp = prop;
            lastResult = fn(prop);
        }
        return lastResult;
    }
};

export const getSynonyms = word => {
    let w = word.replace(/[^A-Za-z-]/g, "");
    return fetch(`https://api.datamuse.com/words?rel_syn=${w}`).then(response => response.json())
};

export const getMemoizedKeys = memoizeOne(object => Object.keys(object));
