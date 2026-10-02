// =========================
// SECURE PASSWORD GENERATOR
// =========================

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";

const NUMBERS = "0123456789";

const SYMBOLS = "!@#$%^&*()_+-=[]{}<>?";


// =========================
// SECURE RANDOM NUMBER
// =========================

function secureRandom(max) {

    const array = new Uint32Array(1);

    crypto.getRandomValues(array);

    return array[0] % max;
}


// =========================
// PASSWORD GENERATOR
// =========================

export function generatePassword(length, options) {

    let characters = "";

    const requiredCharacters = [];


    if (options.uppercase) {

        characters += UPPERCASE;

        requiredCharacters.push(
            UPPERCASE[secureRandom(UPPERCASE.length)]
        );
    }


    if (options.lowercase) {

        characters += LOWERCASE;

        requiredCharacters.push(
            LOWERCASE[secureRandom(LOWERCASE.length)]
        );
    }


    if (options.numbers) {

        characters += NUMBERS;

        requiredCharacters.push(
            NUMBERS[secureRandom(NUMBERS.length)]
        );
    }


    if (options.symbols) {

        characters += SYMBOLS;

        requiredCharacters.push(
            SYMBOLS[secureRandom(SYMBOLS.length)]
        );
    }


    if (characters.length === 0) {

        throw new Error(
            "Select at least one character type."
        );
    }


    if (length < requiredCharacters.length) {

        throw new Error(
            "Password length is too short for selected options."
        );
    }


    let password =
        requiredCharacters.join("");


    while (password.length < length) {

        password +=
            characters[
                secureRandom(characters.length)
            ];
    }


    // Shuffle password characters

    const passwordArray =
        password.split("");


    for (
        let i = passwordArray.length - 1;
        i > 0;
        i--
    ) {

        const j =
            secureRandom(i + 1);

        [
            passwordArray[i],
            passwordArray[j]
        ] =
        [
            passwordArray[j],
            passwordArray[i]
        ];
    }


    return passwordArray.join("");
}


// =========================
// PASSPHRASE GENERATOR
// =========================

const WORDS = [
    "river",
    "cloud",
    "forest",
    "planet",
    "orange",
    "silver",
    "garden",
    "tiger",
    "rocket",
    "sunset",
    "mountain",
    "window",
    "coffee",
    "thunder",
    "ocean",
    "castle",
    "violet",
    "pencil",
    "winter",
    "bright"
];


export function generatePassphrase() {

    const selectedWords = [];

    const numberOfWords = 4;


    for (
        let i = 0;
        i < numberOfWords;
        i++
    ) {

        const index =
            secureRandom(WORDS.length);

        selectedWords.push(
            WORDS[index]
        );
    }


    return selectedWords.join("-");
}