// Game variables
let score = 0;
let correctColor;
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

// Sound effects
const correctSound = new Audio('./sounds/correctAnswer.wav');
const wrongSound = new Audio('./sounds/wrong.mp3');

// DOM elements
const colorOptions = document.querySelectorAll('.color-option');
const colorNameDisplay = document.getElementById('colorName');
const messageDisplay = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const newColorsButton = document.getElementById('newColors');
const gameContainer = document.getElementById('gameContainer');

// Initialize game
function setupNewRound() {
    // Shuffle colors
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    correctColor = shuffledColors[0];
    
    // Update display
    colorNameDisplay.textContent = correctColor;
    messageDisplay.textContent = '';
    gameContainer.style.backgroundColor = 'rgba(20, 20, 20, 0.85)';
    
    // Set colors for options
    colorOptions.forEach((option, index) => {
        option.style.backgroundColor = shuffledColors[index];
    });
}

// Check selected color
function checkColor(selectedColor) {
    if (selectedColor === correctColor) {
        correctSound.play();
        messageDisplay.textContent = 'Correct!';
        messageDisplay.classList.add('correct');
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        
        // Flash effect
        const selectedOption = Array.from(colorOptions).find(
            option => option.style.backgroundColor === selectedColor
        );
        selectedOption.classList.add('correct-flash');
        
        setTimeout(() => {
            messageDisplay.classList.remove('correct');
            selectedOption.classList.remove('correct-flash');
            setupNewRound();
        }, 1000);
    } else {
        wrongSound.play();
        messageDisplay.textContent = 'Wrong! Try again.';
        gameContainer.classList.add('container-flash');
        
        setTimeout(() => {
            gameContainer.classList.remove('container-flash');
        }, 500);
    }
}

// Event listeners
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        checkColor(option.style.backgroundColor);
    });
});

newColorsButton.addEventListener('click', setupNewRound);

// Start the game
setupNewRound(); 