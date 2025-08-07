const emotionButtons = document.querySelectorAll(".emotion-button");
const againButton = document.querySelector(".again-button");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");

//JSONファイルを非同期で読み込む
async function fetchQuotes() {
  try {
    const response = await fetch("quotes.json");
    if (!response.ok) {
      throw new Error("名言データの読み込みに失敗しました。");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    quoteText.textContent = "エラーが発生しました。";
    return null;
  }
}

//JSONファイルから感情別名言をランダムで取得
async function displayRandomQuote(emotion) {
  const quotesData = await fetchQuotes();
  if (quotesData && quotesData[emotion]) {
    const quotes = quotesData[emotion];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // 名言と作者をHTMLに表示
    quoteText.textContent = randomQuote.quote;
    quoteAuthor.textContent = `" ${randomQuote.author} "`;
  }
}

// 表示をリセットする関数
function resetDisplay() {
  quoteText.textContent = "";
  quoteAuthor.textContent = "";
}

// イベントリスナーの設定
emotionButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const emotion = event.target.dataset.emotion;
    displayRandomQuote(emotion);
  });
});

againButton.addEventListener("click", resetDisplay);
