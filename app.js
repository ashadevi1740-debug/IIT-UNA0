/* =========================
   SCREEN CONTROL
========================= */
function go(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

/* =========================
   GLOBAL STATE
========================= */
let currentLang = "";
let letterIndex = 0;
let quizIndex = 0;
let lessonIndex = 0;
let score = Number(localStorage.getItem("score")) || 0;

/* =========================
   AI PRONUNCIATION
========================= */
function speak(text, lang = "hi-IN") {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  speechSynthesis.speak(u);
}

/* =========================
   DATA
========================= */
const data = {

  /* ---------- HINDI ---------- */
  hindi: {
    type: "alphabet",
    alphabets: [
      {letter:"अ", word:"अनार", image:"images/hindi/a.jpg"},
      {letter:"आ", word:"आम", image:"images/hindi/aa.jpg"},
      {letter:"इ", word:"इमली", image:"images/hindi/i.jpg"},
      {letter:"ई", word:"ईख", image:"images/hindi/ii.jpg"},
      {letter:"उ", word:"उल्लू", image:"images/hindi/u.jpg"},
      {letter:"ऊ", word:"ऊँट", image:"images/hindi/uu.jpg"},
      {letter:"ऋ", word:"ऋषि", image:"images/hindi/ri.jpg"},
      {letter:"ए", word:"एक", image:"images/hindi/e.jpg"},
      {letter:"ऐ", word:"ऐनक", image:"images/hindi/ai.jpg"},
      {letter:"ओ", word:"ओखली", image:"images/hindi/o.jpg"},
      {letter:"औ", word:"औरत", image:"images/hindi/au.jpg"},
      {letter:"क", word:"कबूतर", image:"images/hindi/ka.jpg"},
      {letter:"ख", word:"खरगोश", image:"images/hindi/kha.jpg"},
      {letter:"ग", word:"गमला", image:"images/hindi/ga.jpg"},
      {letter:"घ", word:"घर", image:"images/hindi/gha.jpg"},
      {letter:"च", word:"चमचा", image:"images/hindi/cha.jpg"},
      {letter:"छ", word:"छाता", image:"images/hindi/chha.jpg"},
      {letter:"ज", word:"जहाज", image:"images/hindi/ja.jpg"},
      {letter:"झ", word:"झंडा", image:"images/hindi/jha.jpg"},
      {letter:"ट", word:"टमाटर", image:"images/hindi/ta.jpg"},
      {letter:"ठ", word:"ठेला", image:"images/hindi/tha.jpg"},
      {letter:"ड", word:"डमरू", image:"images/hindi/da.jpg"},
      {letter:"ढ", word:"ढोल", image:"images/hindi/dha.jpg"},
      {letter:"त", word:"तरबूज", image:"images/hindi/ta2.jpg"},
      {letter:"थ", word:"थैला", image:"images/hindi/tha2.jpg"},
      {letter:"द", word:"दरवाज़ा", image:"images/hindi/da2.jpg"},
      {letter:"ध", word:"धूप", image:"images/hindi/dha2.jpg"},
      {letter:"न", word:"नल", image:"images/hindi/na2.jpg"},
      {letter:"प", word:"पतंग", image:"images/hindi/pa.jpg"},
      {letter:"फ", word:"फूल", image:"images/hindi/pha.jpg"},
      {letter:"ब", word:"बतख", image:"images/hindi/ba.jpg"},
      {letter:"भ", word:"भालू", image:"images/hindi/bha.jpg"},
      {letter:"म", word:"मकड़ी", image:"images/hindi/ma.jpg"},
      {letter:"य", word:"यज्ञ", image:"images/hindi/ya.jpg"},
      {letter:"र", word:"रोटी", image:"images/hindi/ra.jpg"},
      {letter:"ल", word:"लट्टू", image:"images/hindi/la.jpg"},
      {letter:"व", word:"वृक्ष", image:"images/hindi/va.jpg"},
      {letter:"श", word:"शेर", image:"images/hindi/sha.jpg"},
      {letter:"स", word:"सूरज", image:"images/hindi/sa.jpg"},
      {letter:"ह", word:"हाथी", image:"images/hindi/ha.jpg"}
    ]
  },

  /* ---------- PUNJABI ---------- */
  punjabi: {
    type: "alphabet",
    alphabets: [
      {letter:"ਅ", word:"ਅੰਬ", image:"images/punjabi/aa.jpg"},
      {letter:"ਕ", word:"ਕਬੂਤਰ", image:"images/punjabi/ha.jpg"},
      {letter:"ਖ", word:"ਖਰਗੋਸ਼", image:"images/punjabi/u.jpg"},
      {letter:"ਗ", word:"ਗੱਡੀ", image:"images/punjabi/uu.jpg"},
      {letter:"ਚ", word:"ਚੰਨ", image:"images/punjabi/o.jpg"},
      {letter:"ਜ", word:"ਜਹਾਜ਼", image:"images/punjabi/ka.jpg"},
      {letter:"ਟ", word:"ਟਮਾਟਰ", image:"images/punjabi/cha.jpg"},
      {letter:"ਡ", word:"ਡੰਡਾ", image:"images/punjabi/ja.jpg"},
      {letter:"ਤ", word:"ਤਾਰਾ", image:"images/punjabi/ta.jpg"},
      {letter:"ਦ", word:"ਦਰਵਾਜ਼ਾ", image:"images/punjabi/da.jpg"},
      {letter:"ਨ", word:"ਨਾਰੀਅਲ", image:"images/punjabi/na.jpg"},
      {letter:"ਪ", word:"ਪਤੰਗ", image:"images/punjabi/ta2.jpg"},
      {letter:"ਬ", word:"ਬਤਖ", image:"images/punjabi/da2.jpg"},
      {letter:"ਮ", word:"ਮਕੜੀ", image:"images/punjabi/na2.jpg"},
      {letter:"ਰ", word:"ਰੋਟੀ", image:"images/punjabi/sha.jpg"},
      {letter:"ਲ", word:"ਲੱਤ", image:"images/punjabi/sa.jpg"}
    ]
  },

  /* ---------- LESSON LANGUAGES ---------- */
  kangri: { type: "lesson", lessons: [] },
  mandeali: { type: "lesson", lessons: [] },
  pahadi: { type: "lesson", lessons: [] }
};

/* =========================
   SENTENCES (ALL 10)
========================= */
const sentences = [
  {en:"What are you doing?", hi:"क्या कर रहे हो?", kangri:"क्या करदा ऐं?", mandeali:"क्या करदे ऐं?", pahadi:"क्या करि रये हो?"},
  {en:"Where are you going?", hi:"कहाँ जा रहे हो?", kangri:"कित्थे जांदा ऐं?", mandeali:"कुत्थे जांदे ऐं?", pahadi:"क्यां जा रये हो?"},
  {en:"What happened?", hi:"क्या हुआ?", kangri:"क्या होया?", mandeali:"क्या होया?", pahadi:"क्या हो ग्या?"},
  {en:"Have you eaten food?", hi:"खाना खाया?", kangri:"रोटी खाई?", mandeali:"रोटी खादी?", pahadi:"खानो खा ल्यो?"},
  {en:"I am fine", hi:"मैं ठीक हूँ", kangri:"मैं ठीक ऐं", mandeali:"मैं ठीक ऐं", pahadi:"मैं ठीक छूं"},
  {en:"Come here", hi:"यहाँ आओ", kangri:"इत्ते आ", mandeali:"इत्ते आ", pahadi:"इजै आ"},
  {en:"Sit here", hi:"यहाँ बैठो", kangri:"इत्ते बेह", mandeali:"इत्ते बेह", pahadi:"इजै बैस"},
  {en:"I don’t know", hi:"मुझे नहीं पता", kangri:"मैनू नी पता", mandeali:"मैनू नी पता", pahadi:"मैंनू नी पता"},
  {en:"What is your name?", hi:"तुम्हारा नाम क्या है?", kangri:"तेरा नांऽ क्या ऐ?", mandeali:"तेरा नांऽ क्या ऐ?", pahadi:"तेरो नांऽ क्या छा?"},
  {en:"Let’s go", hi:"चलो चलते हैं", kangri:"चलिये चलां", mandeali:"चलिये चलां", pahadi:"चलां जा"}
];

sentences.forEach(s => {
  data.kangri.lessons.push({en:s.en, hi:s.hi, local:s.kangri});
  data.mandeali.lessons.push({en:s.en, hi:s.hi, local:s.mandeali});
  data.pahadi.lessons.push({en:s.en, hi:s.hi, local:s.pahadi});
});

/* =========================
   LANGUAGE SELECT
========================= */
function selectLanguage(lang) {
  currentLang = lang;
  document.getElementById("langTitle").innerText = lang.toUpperCase();

  document.getElementById("btnAlphabet").style.display =
    data[lang].type === "alphabet" ? "inline-block" : "none";
  document.getElementById("btnQuiz").style.display =
    data[lang].type === "alphabet" ? "inline-block" : "none";
  document.getElementById("btnGame").style.display =
    data[lang].type === "alphabet" ? "inline-block" : "none";
  document.getElementById("btnLesson").style.display =
    data[lang].type === "lesson" ? "inline-block" : "none";

  go("menu");
}

/* =========================
   ALPHABET
========================= */
function startAlphabet() {
  letterIndex = 0;
  showLetter();
  go("alphabet");
}

function showLetter() {
  const d = data[currentLang].alphabets[letterIndex];
  letter.innerText = d.letter;
  word.innerText = d.word;
  letterImg.src = d.image;
}

function nextLetter() {
  letterIndex = (letterIndex + 1) % data[currentLang].alphabets.length;
  showLetter();
}

function prevLetter() {
  letterIndex = (letterIndex - 1 + data[currentLang].alphabets.length) %
    data[currentLang].alphabets.length;
  showLetter();
}

function playAudio() {
  const d = data[currentLang].alphabets[letterIndex];
  speak(d.letter + " " + d.word);
}

/* =========================
   QUIZ
========================= */
function startQuiz() {
  quizIndex = 0;
  loadQuiz();
  go("quiz");
}

function loadQuiz() {
  const a = data[currentLang].alphabets[quizIndex];
  quizQuestion.innerText = a.word + " किस अक्षर से शुरू होता है?";
  quizOptions.innerHTML = "";
  quizResult.innerText = "";

  const options = [a.letter];
  while (options.length < 3) {
    const r = data[currentLang].alphabets[
      Math.floor(Math.random() * data[currentLang].alphabets.length)
    ].letter;
    if (!options.includes(r)) options.push(r);
  }

  options.sort(() => Math.random() - 0.5);
  options.forEach(o => {
    const b = document.createElement("button");
    b.innerText = o;
    b.onclick = () => {
      if (o === a.letter) {
        quizResult.innerText = "Correct ✅";
        score += 5;
      } else quizResult.innerText = "Wrong ❌";
      localStorage.setItem("score", score);
    };
    quizOptions.appendChild(b);
  });
}

function nextQuiz() {
  quizIndex = (quizIndex + 1) % data[currentLang].alphabets.length;
  loadQuiz();
}

/* =========================
   GAME
========================= */
function startGame() {
  newGame();
  go("game");
}

function newGame() {
  const item = data[currentLang].alphabets[
    Math.floor(Math.random() * data[currentLang].alphabets.length)
  ];

  gamePrompt.innerText = "Match word for: " + item.letter;
  gameOptions.innerHTML = "";
  gameResult.innerText = "";

  const options = [item.word, "गलत", "Wrong"];
  options.sort(() => Math.random() - 0.5);

  options.forEach(o => {
    const b = document.createElement("button");
    b.innerText = o;
    b.onclick = () => {
      if (o === item.word) {
        gameResult.innerText = "Matched ✅";
        score += 3;
      } else gameResult.innerText = "Try Again ❌";
      localStorage.setItem("score", score);
    };
    gameOptions.appendChild(b);
  });
}

/* =========================
   LESSON
========================= */
function startLesson() {
  lessonIndex = 0;
  showLesson();
  go("lesson");
}

function showLesson() {
  const l = data[currentLang].lessons[lessonIndex];
  lessonEnglish.innerText = l.en;
  lessonHindi.innerText = l.hi;
  lessonLocal.innerText = l.local;
  lessonLangName.innerText = currentLang.toUpperCase();
}

function nextLesson() {
  lessonIndex = (lessonIndex + 1) % data[currentLang].lessons.length;
  showLesson();
}

function prevLesson() {
  lessonIndex = (lessonIndex - 1 + data[currentLang].lessons.length) %
    data[currentLang].lessons.length;
  showLesson();
}

function playLessonAudio() {
  speak(data[currentLang].lessons[lessonIndex].local);
}
