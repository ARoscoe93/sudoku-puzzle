// Define the puzzle variable globally
let puzzle;

// Function to generate a partially filled Sudoku puzzle
function generateSudoku() {
    // Create a 9x9 2D array filled with zeros
    const newPuzzle = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

    // Call the helper function to fill some cells
    fillCells(newPuzzle);

    return newPuzzle;
}

// Helper function to fill some cells in the Sudoku puzzle
function fillCells(newPuzzle) {
    // Randomly fill some cells with numbers
    for (let i = 0; i < 20; i++) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        const num = Math.floor(Math.random() * 9) + 1;
        if (isValidMove(newPuzzle, row, col, num)) {
            newPuzzle[row][col] = num;
        }
    }
}

// Function to check if a move is valid
function isValidMove(puzzle, row, col, num) {
    // Check if the number is not already in the same row or column
    for (let i = 0; i < 9; i++) {
        if (puzzle[row][i] === num || puzzle[i][col] === num) {
            return false;
        }
    }

    // Check if the number is not already in the 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (puzzle[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

// Helper functions to check if a number is already present in a row, column, or box
function isInRow(puzzle, row, num) {
    return puzzle[row].includes(num);
}

function isInCol(puzzle, col, num) {
    for (let row = 0; row < 9; row++) {
        if (puzzle[row][col] === num) {
            return true;
        }
    }
    return false;
}

function isInBox(puzzle, startRow, startCol, num) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (puzzle[row + startRow][col + startCol] === num) {
                return true;
            }
        }
    }
    return false;
}

// Function to display the Sudoku grid on the webpage
function displayGrid(newPuzzle) {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; // Clear previous grid

    // Loop through each row and column to create grid items
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            // Check if the number is fixed (part of the initial puzzle)
            if (newPuzzle[row][col] !== 0) {
                gridItem.textContent = newPuzzle[row][col];
                gridItem.classList.add('fixed');
            } else {
                gridItem.textContent = ''; // Empty cell for user input
                gridItem.contentEditable = true; // Allow user input for empty cells
            }

            // Add event listener to update cell value
            gridItem.addEventListener('input', updateCellValue);
            gridItem.dataset.row = row;
            gridItem.dataset.col = col;

            // Append the grid item to the grid container
            gridContainer.appendChild(gridItem);
        }
        // Add a line break after every 9 grid items to form a 9x9 grid
        gridContainer.appendChild(document.createElement('br'));
    }

    // Assign the new puzzle to the global variable
    puzzle = newPuzzle;
}



// Function to update cell value in the puzzle array
function updateCellValue(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const value = parseInt(event.target.textContent);
    puzzle[row][col] = value;
}

// Function to restart the game
function restartGame() {
    const newPuzzle = generateSudoku();
    displayGrid(newPuzzle);
}

// Function to check if the puzzle is complete
function checkPuzzleCompletion() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (puzzle[row][col] === 0) {
                // If any cell is empty, the puzzle is incomplete
                return false;
            }
        }
    }
    // If all cells are filled, the puzzle is complete
    return true;
}

// Function to display a message based on puzzle completion
function displayCompletionMessage() {
    const completionMessage = document.getElementById('completion-message');
    if (checkPuzzleCompletion()) {
        completionMessage.textContent = 'Congratulations! Puzzle Complete!';
        completionMessage.style.color = 'green';
    } else {
        completionMessage.textContent = 'Puzzle Incomplete. Keep Going!';
        completionMessage.style.color = 'red';
        completionMessage.style.fontWeight = 'bold';
    }
}

// Add event listener to the "Check" button
const checkButton = document.getElementById('check-button');
checkButton.addEventListener('click', displayCompletionMessage);


// Add event listener to restart button
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);

// Generate Sudoku puzzle and display it on page load
const newPuzzle = generateSudoku();
displayGrid(newPuzzle);
