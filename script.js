document.addEventListener("DOMContentLoaded", function () {
    const playsoundInput = document.getElementById("playsound");
    const pitchbendInput = document.getElementById("pitchbend");
    const calculateButton = document.getElementById("calculate");
    const resultDisplay = document.getElementById("result");
    const historyList = document.getElementById("history");
    const clearHistoryButton = document.getElementById("clearHistory");

    function calculatePlaysound(basePlaysound, pitchbend) {
        const semitoneShift = pitchbend / 683; // 683で1音（半音）変化
        const newPlaysound = basePlaysound * Math.pow(2, semitoneShift / 12);
        return newPlaysound;
    }

    calculateButton.addEventListener("click", function () {
        const basePlaysound = parseFloat(playsoundInput.value);
        const pitchbend = parseInt(pitchbendInput.value, 10);

        if (isNaN(basePlaysound) || isNaN(pitchbend)) {
            resultDisplay.textContent = "無効な入力です";
            return;
        }

        const newPlaysound = calculatePlaysound(basePlaysound, pitchbend);
        resultDisplay.textContent = `結果: ${newPlaysound.toFixed(9)}`;

        // 履歴を追加
        const historyItem = document.createElement("li");
        historyItem.textContent = `基準: ${basePlaysound}, Pitchbend: ${pitchbend} → ${newPlaysound.toFixed(9)}`;
        historyList.appendChild(historyItem);

        // 履歴が10個を超えたら最も古いものを削除
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.children[0]);
        }
    });

    clearHistoryButton.addEventListener("click", function () {
        historyList.innerHTML = "";
    });
});
