// =========================
// PASSWORD ENTROPY
// =========================

export function calculateEntropy(password) {

    let characterPool = 0;

    // Lowercase letters
    if (/[a-z]/.test(password)) {
        characterPool += 26;
    }

    // Uppercase letters
    if (/[A-Z]/.test(password)) {
        characterPool += 26;
    }

    // Numbers
    if (/[0-9]/.test(password)) {
        characterPool += 10;
    }

    // Special characters
    if (/[^A-Za-z0-9]/.test(password)) {
        characterPool += 32;
    }

    if (characterPool === 0) {
        return 0;
    }

    // Entropy formula:
    // Entropy = Length × log2(Character Pool)

    return password.length *
        Math.log2(characterPool);
}


// =========================
// CRACK TIME
// =========================

export function estimateCrackTime(entropy) {

    if (entropy <= 0) {
        return "-";
    }

    // Approximate guesses
    const guesses =
        Math.pow(2, entropy);

    // Educational estimate:
    // 1 billion guesses per second

    const guessesPerSecond =
        1_000_000_000;

    const seconds =
        guesses / guessesPerSecond;

    return formatTime(seconds);
}


// =========================
// FORMAT TIME
// =========================

function formatTime(seconds) {

    if (seconds < 1) {
        return "Less than a second";
    }

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;

    if (seconds < minute) {
        return `${Math.round(seconds)} seconds`;
    }

    if (seconds < hour) {
        return `${Math.round(seconds / minute)} minutes`;
    }

    if (seconds < day) {
        return `${Math.round(seconds / hour)} hours`;
    }

    if (seconds < year) {
        return `${Math.round(seconds / day)} days`;
    }

    const years = seconds / year;

    if (years < 1000) {
        return `${Math.round(years)} years`;
    }

    if (years < 1_000_000) {
        return `${Math.round(years / 1000)} thousand years`;
    }

    return "Extremely long";
}


// =========================
// PASSWORD ANALYSIS
// =========================

export function analyzePassword(password) {

    const entropy =
        calculateEntropy(password);

    const crackTime =
        estimateCrackTime(entropy);

    let score = 0;
    let label = "Very Weak";

    const feedback = [];


    // Length check
    if (password.length >= 8) {
        score++;
    } else {
        feedback.push(
            "Use at least 8 characters."
        );
    }


    // Mixed character types
    if (
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password)
    ) {
        score++;
    } else {
        feedback.push(
            "Use a mix of uppercase and lowercase letters."
        );
    }


    // Numbers
    if (/[0-9]/.test(password)) {
        score++;
    } else {
        feedback.push(
            "Add numbers to increase the character variety."
        );
    }


    // Symbols
    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    } else {
        feedback.push(
            "Add special characters such as !, @ or #."
        );
    }


    // Entropy-based feedback
    if (entropy >= 60) {
        label = "Strong";
    } else if (entropy >= 40) {
        label = "Good";
    } else if (entropy >= 28) {
        label = "Fair";
    } else {
        label = "Weak";
    }


    if (password.length >= 12) {

        feedback.push(
            "Good password length."
        );

    }


    if (feedback.length === 0) {

        feedback.push(
            "No basic weaknesses detected."
        );

    }


    return {
        entropy,
        crackTime,
        score,
        label,
        feedback
    };
}