// =========================
// PASSWORD BREACH AWARENESS
// =========================

// This module uses the Have I Been Pwned
// k-anonymity approach.
//
// The complete password is NEVER sent.
// Only the first 5 characters of its SHA-1
// hash are sent to the API.


// =========================
// SHA-1 HASH
// =========================

async function sha1(password) {

    const encoder =
        new TextEncoder();

    const data =
        encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-1",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(byte =>
            byte.toString(16).padStart(2, "0")
        )
        .join("")
        .toUpperCase();
}


// =========================
// BREACH CHECK
// =========================

export async function checkPasswordBreach(
    password
) {

    if (!password) {

        return {
            status: "empty",
            count: 0
        };
    }


    try {

        // Create SHA-1 hash

        const hash =
            await sha1(password);


        // First 5 characters are sent

        const prefix =
            hash.substring(0, 5);

        // Remaining characters stay local

        const suffix =
            hash.substring(5);


        const response =
            await fetch(
                `https://api.pwnedpasswords.com/range/${prefix}`,
                {
                    method: "GET"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Breach service unavailable."
            );
        }


        const text =
            await response.text();


        const lines =
            text.split("\n");


        for (const line of lines) {

            const parts =
                line.trim().split(":");

            if (parts.length !== 2) {
                continue;
            }


            const returnedSuffix =
                parts[0].trim();


            const count =
                Number(parts[1].trim());


            if (
                returnedSuffix === suffix
            ) {

                return {
                    status: "breached",
                    count: count
                };
            }
        }


        return {
            status: "safe",
            count: 0
        };


    } catch (error) {

        console.error(
            "Breach check failed:",
            error
        );

        return {
            status: "error",
            count: 0
        };
    }
}