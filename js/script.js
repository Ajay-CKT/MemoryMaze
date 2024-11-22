const flipTile = document.querySelector(".flip-tile");
const restartBtn = document.getElementById("restart");

const tileArr = [
  "🍎",
  "🍇",
  "🍋",
  "🍐",
  "🍎",
  "🍇",
  "🍋",
  "🍐",
  "🍍",
  "🍋‍🟩",
  "🍍",
  "🍋‍🟩",
];

// Shuffle the tiles array
const shuffleTiles = () => {
  return tileArr.sort(() => Math.random() - 0.5);
};

// Render the random tiles
const renderTiles = (tiles) => {
  flipTile.innerHTML = "";
  for (let i = 0; i < tiles.length; i++) {
    const tileElement = document.createElement("div");
    tileElement.classList.add(
      "tile",
      "backdrop-blur-xl",
      "border",
      "border-black",
      "text-white",
      "flex",
      "justify-center",
      "items-center",
      "rounded-lg",
      "shadow-md",
      "cursor-pointer",
      "p-2",
      "h-24",
      "md:h-28"
    );
    tileElement.innerHTML = `<span class="text-5xl md:text-6xl hidden">${tiles[i]}</span>`;
    flipTile.appendChild(tileElement);
  }
};

// Initialize values in the game
let shuffledTiles = shuffleTiles();
let flippedTiles = [];
let matchedTiles = [];

// Initialize the game
const initializeGame = () => {
  console.log("Game Started...");
  shuffledTiles = shuffleTiles();
  renderTiles(shuffledTiles);
};

// Handle flip
flipTile.addEventListener("click", (event) => {
  console.log("tile clicked");
  const target = event.target.closest(".tile");
  if (!target || flippedTiles.length >= 2 || matchedTiles.includes(target))
    return;

  // Show card
  target.querySelector("span").classList.remove("hidden");
  target.classList.add("flipped");
  flippedTiles.push(target);

  // Check for a match
  if (flippedTiles.length == 2) {
    console.log("only 2");
    const [tile_1, tile_2] = flippedTiles;
    if (tile_1.innerText === tile_2.innerText) {
      console.log("Tile Matched");
      matchedTiles.push(tile_1.innerText, tile_2.innerText);
      flippedTiles = [];
      checkWin();
    } else {
      setTimeout(() => {
        flippedTiles.forEach((tile) => {
          tile.querySelector("span").classList.add("hidden");
          tile.classList.remove("flipped");
        });
        flippedTiles = [];
      }, 1000);
    }
  }
});

const checkWin = () => {
  if (matchedTiles.length === shuffledTiles.length) {
    console.log("WON");
    const winBox = document.querySelector(".won");
    winBox.className = "text-center";
    winBox.innerHTML = `
    <h2 class="text-3xl font-bold font-HennyPenny">You Won!</h2>
    <button class="font-HennyPenny play-again px-8 py-2 bg-blue-500 border-b-2 text-white shadow-xl rounded-lg">
        Play Again
    </button>
    `;

    // Play again
    document.querySelector(".play-again").addEventListener("click", () => {
      winBox.remove();
      initializeGame();
    });
  }
};

// Restart the game
restartBtn.addEventListener("click", initializeGame);

// Start the game
initializeGame();
