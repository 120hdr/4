let score = 0;
let clickValue = 1;
let upgradeCost = 10;

// Update the score display
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Handle the click button
document.getElementById('clickButton').addEventListener('click', function() {
    score += clickValue;
    updateScore();
});

// Handle the upgrade button
document.getElementById('upgradeButton').addEventListener('click', function() {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        clickValue += 1;
        upgradeCost *= 2;
        updateScore();
    } else {
        alert('Not enough points to upgrade!');
    }
});

// Save the game state to a file
document.getElementById('saveButton').addEventListener('click', function() {
    const gameData = {
        score: score,
        clickValue: clickValue,
        upgradeCost: upgradeCost
    };

    const blob = new Blob([JSON.stringify(gameData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gameSave.json';
    a.click();
    URL.revokeObjectURL(url);
});

// Load game state from a file
document.getElementById('loadFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const gameData = JSON.parse(e.target.result);
            score = gameData.score;
            clickValue = gameData.clickValue;
            upgradeCost = gameData.upgradeCost;
            updateScore();
        };
        reader.readAsText(file);
    }
});