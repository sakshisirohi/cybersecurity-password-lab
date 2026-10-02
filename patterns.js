// =========================
// PASSWORD PATTERN DETECTION
// =========================

export function detectPatterns(password) {

    const patterns = [];

    // Repeated characters
    if (/(.)\1{2,}/.test(password)) {
        patterns.push(
            "Repeated characters detected."
        );
    }


    // Common years
    if (/19\d{2}|20\d{2}/.test(password)) {
        patterns.push(
            "A year pattern was detected."
        );
    }


    // Date-like pattern
    if (
        /\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b/.test(password)
    ) {
        patterns.push(
            "A date-like pattern was detected."
        );
    }


    // Common substitutions
    const lowerPassword =
        password.toLowerCase();

    if (
        lowerPassword.includes("p@ssw0rd") ||
        lowerPassword.includes("passw0rd") ||
        lowerPassword.includes("p@ssword")
    ) {
        patterns.push(
            "A common password substitution pattern was detected."
        );
    }


    // Keyboard walks
    const keyboardPatterns = [
        "qwerty",
        "asdf",
        "zxcv",
        "qwert",
        "asdfg",
        "12345",
        "123456",
        "7890"
    ];

    for (const pattern of keyboardPatterns) {

        if (
            lowerPassword.includes(pattern)
        ) {

            patterns.push(
                "A keyboard sequence was detected."
            );

            break;
        }
    }


    // Sequential numbers
    if (
        /0123|1234|2345|3456|4567|5678|6789/.test(password)
    ) {

        patterns.push(
            "A sequential number pattern was detected."
        );
    }


    return patterns;
}