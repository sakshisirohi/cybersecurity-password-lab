// =========================
// SECURITY AWARENESS LESSONS
// =========================

export function setupLessons() {

    const lessonButtons =
        document.querySelectorAll(".lesson-option");

    const progressText =
        document.getElementById("progressText");

    let completedLessons =
        Number(
            localStorage.getItem(
                "completedLessons"
            )
        ) || 0;


    // Display saved progress
    updateProgress();


    lessonButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const lesson =
                    button.closest(".lesson");

                const result =
                    lesson.querySelector(
                        ".lesson-result"
                    );


                if (
                    button.dataset.answer ===
                    "correct"
                ) {

                    result.textContent =
                        "Correct! This is a security warning sign.";

                    result.setAttribute(
                        "data-status",
                        "correct"
                    );


                    // Prevent counting the same lesson twice

                    if (
                        lesson.dataset.completed !==
                        "true"
                    ) {

                        lesson.dataset.completed =
                            "true";

                        completedLessons++;

                        localStorage.setItem(
                            "completedLessons",
                            completedLessons
                        );

                        updateProgress();
                    }

                } else {

                    result.textContent =
                        "Not quite. Look for suspicious or unexpected behavior.";

                    result.setAttribute(
                        "data-status",
                        "incorrect"
                    );
                }

            }
        );

    });


    function updateProgress() {

        progressText.textContent =
            `${completedLessons} lessons completed`;

    }

}