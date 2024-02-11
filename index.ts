import {toHash, toSeed} from './src/drops.js'
import { publicKey, session } from "./src/config.js";

const firstHash = '0000362d8f82f99e'
let lastHash = firstHash
let permutations = 0
let found = 0
const difficulty = 4
const complexity = "0".repeat(difficulty);
const start = Number(new Date());

console.info(`Session: ${session.actor}@${session.permission} [${publicKey}]`)
console.info(`Mining difficulty=${difficulty} (${complexity})`);

// TO-DO: get seeds by owner
const seeds = [
    "4401923787868110936",
    "5726655965881647833",
    "8605113039096860317",
    "9706891609076330013",
    "10814766670851299620",
    "13435165894189426480",
    "13543550088521432651",
    "13961508228619715749",
    "15557569409105811391",
    "15573566445817901349",
]

function computeHash(data: string[]) {
    const seed = toSeed(data.join("") + lastHash);
    const hash = toHash(seed)
    if ( hash.startsWith(complexity)) {
        found++
        const timeMs = Number(new Date()) - start;
        const avgCalcPerMs = Number((permutations / timeMs).toFixed(2))
        const avgCalculations = Number((permutations / found).toFixed(0))
        const avgtimeMs = Number((timeMs / found).toFixed(0))
        console.log({found, seeds: data.length, permutations, lastHash, data, hash, avgCalculations, avgtimeMs, avgCalcPerMs})
        lastHash = hash
        // TO-DO: send transaction
    }
}

function generatePermutations(array: string[], callback?: (data: string[]) => void, n = array.length) {
    if (n <= 1) {
        permutations++;
        if ( callback ) callback(array.slice());
        return;
    }

    generatePermutations(array, callback, n - 1);

    for (let i = 0; i < n - 1; i++) {
        if (n % 2 === 0) {
            swap(array, i, n - 1); // Swap for even n
        } else {
            swap(array, 0, n - 1); // Swap for odd n
        }
        generatePermutations(array, callback, n - 1);
    }
}

function swap(array: string[], i: number, j: number) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

console.time("generatePermutations");
generatePermutations(seeds, computeHash);
console.log({seeds: seeds.length, found, difficulty, permutations});
console.timeEnd("generatePermutations");
