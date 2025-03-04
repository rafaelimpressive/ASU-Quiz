document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const quizContainer = document.getElementById("quiz-container");
    const questionContainers = document.querySelectorAll(".question-container");
    const optionButtons = document.querySelectorAll(".option-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const resultsContainer = document.getElementById("results-container");
    const resultsBox = resultsContainer.querySelector(".question-box");
    const mainBtn = document.getElementById("main-btn");

    let currentQuestionIndex = 0;
    let userAnswers = [];
    let score = 0;

    // Define correct answers
    const correctAnswers = ["A", "B", "A", "C", "B", "D", "C", "B", "A", "A", "B", "D", "C", "C", "B"]; 

    // Hide quiz and results initially
    quizContainer.style.display = "none";
    resultsContainer.style.display = "none";

    // 🎵 Music setup
    const audio = new Audio("music.mp3"); // Change this to your actual file

    function playMusic() {
        audio.currentTime = 0; // Restart music from the beginning
        audio.play().catch(error => console.log("Autoplay blocked:", error));
    }

    function stopMusic() {
        audio.pause();
        audio.currentTime = 0; // Reset music
    }

    // Play music when the page loads
    playMusic();

    // Start the quiz
    startBtn.addEventListener("click", function () {
        document.querySelector(".box-intro").style.display = "none";
        document.querySelector(".quote").style.display = "none";
        startBtn.style.display = "none";
        quizContainer.style.display = "block";
        showQuestion(currentQuestionIndex);

        // Restart music when "START" is clicked again
        playMusic();
    });

    // Function to show a question
    function showQuestion(index) {
        questionContainers.forEach((container, i) => {
            container.style.display = i === index ? "block" : "none";
        });

        prevBtn.style.display = index === 0 ? "none" : "inline-block";
        nextBtn.textContent = index === questionContainers.length - 1 ? "Finish" : "Next";

        nextBtn.disabled = !userAnswers[index];
    }

    // Handle answer selection
    optionButtons.forEach(button => {
        button.addEventListener("click", function () {
            const questionIndex = [...questionContainers].indexOf(this.closest(".question-container"));
            const selectedAnswer = this.textContent.charAt(0);

            userAnswers[questionIndex] = selectedAnswer;

            this.parentNode.querySelectorAll(".option-btn").forEach(btn => {
                btn.style.backgroundColor = "white";
                btn.style.color = "green";
            });

            this.style.backgroundColor = "green";
            this.style.color = "white";

            nextBtn.disabled = false;
        });
    });

    // Next button event
    nextBtn.addEventListener("click", function () {
        if (currentQuestionIndex < questionContainers.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            score = userAnswers.filter((answer, index) => answer === correctAnswers[index]).length;
            quizContainer.style.display = "none";
            resultsContainer.style.display = "block";
            resultsBox.innerHTML = `<h2> You scored ${score} out of ${correctAnswers.length}!</h2>`;

            // Stop music when results are shown
            stopMusic();
        }
    });

    // Prev button event
    prevBtn.addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    // Restart quiz
    mainBtn.addEventListener("click", function () {
        location.reload(); // Reload page (music will also restart)
    });

    showQuestion(currentQuestionIndex);
});
