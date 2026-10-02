
import { analyzePassword } from "./entropy.js";
import { detectPatterns } from "./patterns.js";
import {
    generatePassword,
    generatePassphrase
} from "./generator.js";
import {
    setupLessons
} from "./lessons.js";
import { checkPasswordBreach } from "./breach.js";
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const strengthMeter = document.getElementById("strengthMeter");
const strengthText = document.getElementById("strengthText");

const entropyValue = document.getElementById("entropyValue");
const crackTime = document.getElementById("crackTime");

const feedbackList = document.getElementById("feedbackList");

const passwordLength = document.getElementById("passwordLength");
const lengthOutput = document.getElementById("lengthOutput");

const generateButton = document.getElementById("generatePassword");
const generatedPassword =
    document.getElementById("generatedPassword");

const copyPassword =
    document.getElementById("copyPassword");

const copyMessage =
    document.getElementById("copyMessage");

const generatePassphraseButton =
    document.getElementById("generatePassphrase");

const generatedPassphrase =
    document.getElementById("generatedPassphrase");

const copyPassphrase =
    document.getElementById("copyPassphrase");


/* =========================
   SHOW / HIDE PASSWORD
========================= */

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "Hide";
        togglePassword.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "Show";
        togglePassword.setAttribute(
            "aria-label",
            "Show password"
        );
    }
});


/* =========================
   PASSWORD ANALYSIS
========================= */

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;

    if (password.length === 0) {

        strengthMeter.value = 0;

        strengthText.textContent =
            "Enter a password";

        entropyValue.textContent =
            "0 bits";

        crackTime.textContent = "-";

        feedbackList.innerHTML =
            "<li>Enter a password to receive feedback.</li>";

        return;
    }

    const analysis = analyzePassword(password);

    const patterns = detectPatterns(password);

    strengthMeter.value = analysis.score;

    strengthText.textContent =
        analysis.label;

    entropyValue.textContent =
        `${analysis.entropy.toFixed(1)} bits`;

    crackTime.textContent =
        analysis.crackTime;


    /* SECURITY FEEDBACK */

    feedbackList.innerHTML = "";

    analysis.feedback.forEach(message => {

        const li = document.createElement("li");

        li.textContent = message;

        feedbackList.appendChild(li);
    });


    patterns.forEach(pattern => {

        const li = document.createElement("li");

        li.textContent =
            `Pattern detected: ${pattern}`;

        feedbackList.appendChild(li);
    });

});


/* =========================
   PASSWORD LENGTH
========================= */

passwordLength.addEventListener("input", () => {

    lengthOutput.textContent =
        passwordLength.value;

});


/* =========================
   GENERATE PASSWORD
========================= */

generateButton.addEventListener("click", () => {

    const length =
        Number(passwordLength.value);

    const options = {

        uppercase:
            document.getElementById(
                "includeUppercase"
            ).checked,

        lowercase:
            document.getElementById(
                "includeLowercase"
            ).checked,

        numbers:
            document.getElementById(
                "includeNumbers"
            ).checked,

        symbols:
            document.getElementById(
                "includeSymbols"
            ).checked
    };


    try {

        const password =
            generatePassword(length, options);

        generatedPassword.value =
            password;

        copyMessage.textContent =
            "";

    } catch (error) {

        generatedPassword.value = "";

        copyMessage.textContent =
            error.message;
    }

});


/* =========================
   COPY PASSWORD
========================= */

copyPassword.addEventListener("click", async () => {

    if (!generatedPassword.value) {
        return;
    }

    try {

        await navigator.clipboard.writeText(
            generatedPassword.value
        );

        copyMessage.textContent =
            "Password copied. Clear your clipboard after use.";

    } catch (error) {

        copyMessage.textContent =
            "Copy failed. Please copy manually.";
    }

});


/* =========================
   PASSPHRASE GENERATOR
========================= */

generatePassphraseButton.addEventListener(
    "click",
    () => {

        generatedPassphrase.value =
            generatePassphrase();

    }
);


/* =========================
   COPY PASSPHRASE
========================= */

copyPassphrase.addEventListener(
    "click",
    async () => {

        if (!generatedPassphrase.value) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                generatedPassphrase.value
            );

        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );
        }

    }
);


/* =========================
   SECURITY LESSONS
========================= */

setupLessons();
/* =========================
   BREACH CHECK
========================= */

const checkBreachButton =
    document.getElementById("checkBreach");

const breachStatus =
    document.getElementById("breachStatus");


checkBreachButton.addEventListener(
    "click",
    async () => {

        const password =
            passwordInput.value;


        if (!password) {

            breachStatus.textContent =
                "Please enter a password first.";

            return;
        }


        breachStatus.textContent =
            "Checking breach data...";


        const result =
            await checkPasswordBreach(password);


        if (result.status === "breached") {

            breachStatus.textContent =
                `This password was found in breach data ${result.count.toLocaleString()} times. Choose a different password.`;

        } else if (result.status === "safe") {

            breachStatus.textContent =
                "No match was found in the checked breach dataset.";

        } else {

            breachStatus.textContent =
                "Breach check could not be completed. Please try again later.";
        }

    }
);