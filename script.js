const home = document.getElementById("home");
const activity = document.getElementById("activity");
const instructionEl = document.getElementById("instruction");
const refreshBtn = document.getElementById("refresh");
const finishBtn = document.getElementById("finish");

// Données des activités
const activities = {
  activite1: {
    text: "Trouvez des points communs entre [liste] et [liste].",
    words: [
	"un chien", "un chat", "un lion", "un tigre", "un éléphant",
     "une girafe", "un zèbre", "un cheval", "une vache", "un mouton",
     "une chèvre", "un cochon", "un lapin", "une souris", "un rat",
     "un ours", "un loup", "un renard", "un singe", "un gorille",
     "un requin", "un dauphin", "une baleine", "un poisson", "une pieuvre"
	  ]
  },
  activite2: {
    text: "Imaginez ce qui se passerait si [liste1] avait le pouvoir de [liste2].",
    lists: {
		liste1:[
		"pomme", "banane", "orange", "fraise", "framboise",
		"cerise", "poire", "kiwi", "mangue", "ananas",
		"raisin", "melon", "pastèque", "citron", "abricot"
		],
		liste2:[
		"un chien", "un chat", "un lion", "un tigre", "un éléphant",
		"une girafe", "un zèbre", "un cheval", "une vache", "un mouton",
		"une chèvre", "un cochon", "un lapin", "une souris", "un rat",
		"un ours", "un loup", "un renard", "un singe", "un gorille",
		"un requin", "un dauphin", "une baleine", "un poisson", "une pieuvre"
		]
	}
  },
  activite3: {
    text: "Trouvez des manières d'utiliser [liste] <br>(pour un usage totalement différent de sa fonction initiale).",
    words: [
      "pomme", "banane", "orange", "fraise", "framboise",
      "cerise", "poire", "kiwi", "mangue", "ananas",
      "raisin", "melon", "pastèque", "citron", "abricot"
    ]
  },
  activite4: {
    text: "Posez-vous des questions inattendues sur : [liste].",
    words: [
      "pomme", "banane", "orange", "fraise", "framboise",
      "cerise", "poire", "kiwi", "mangue", "ananas",
      "raisin", "melon", "pastèque", "citron", "abricot"
    ]
  },
  activite5: {
    text: "Combinez [liste1] avec [liste2], qu'est-ce que cela donnerait ? ",
    lists: {
		liste1:[
		"un chien", "un chat", "un lion", "un tigre", "un éléphant",
		"une girafe", "un zèbre", "un cheval", "une vache", "un mouton",
		"une chèvre", "un cochon", "un lapin", "une souris", "un rat",
		"un ours", "un loup", "un renard", "un singe", "un gorille",
		"un requin", "un dauphin", "une baleine", "un poisson", "une pieuvre"
				],
		liste2:[
		"pomme", "banane", "orange", "fraise", "framboise",
		"cerise", "poire", "kiwi", "mangue", "ananas",
		"raisin", "melon", "pastèque", "citron", "abricot"
		]
	}
  },
  activite6: {
    text: "Comment [liste1] résoudrait la situation suivante: [liste2]? ",
    lists: {
		liste1:[
		"un chien", "un chat", "un lion", "un tigre", "un éléphant",
		"une girafe", "un zèbre", "un cheval", "une vache", "un mouton",
		"une chèvre", "un cochon", "un lapin", "une souris", "un rat",
		"un ours", "un loup", "un renard", "un singe", "un gorille",
		"un requin", "un dauphin", "une baleine", "un poisson", "une pieuvre"
				],
		liste2:[
		"pomme", "banane", "orange", "fraise", "framboise",
		"cerise", "poire", "kiwi", "mangue", "ananas",
		"raisin", "melon", "pastèque", "citron", "abricot"
		]
	}
  },
  activite7: {
    text: "Que se passerait-il si l'inverse de cette situation était vrai ou obligatoire: [liste]?",
    words: [
      "pomme", "banane", "orange", "fraise", "framboise",
      "cerise", "poire", "kiwi", "mangue", "ananas",
      "raisin", "melon", "pastèque", "citron", "abricot"
    ]
  },
  activite8: {
    text: "Décrivez ce que vous feriez si cette situation devenait la norme: [liste].",
    words: [
      "pomme", "banane", "orange", "fraise", "framboise",
      "cerise", "poire", "kiwi", "mangue", "ananas",
      "raisin", "melon", "pastèque", "citron", "abricot"
    ]
  }
};


let currentActivity = null;

// Générer la consigne 
function generateInstruction() {
  if (!currentActivity || !activities[currentActivity]) return;

  const data = activities[currentActivity];
  let resultText = data.text;

  // Trouver tous les placeholders [xxx]
  const placeholders = resultText.match(/\[(.*?)\]/g);
  if (!placeholders) {
    instructionEl.textContent = resultText;
    return;
  }

  placeholders.forEach(placeholder => {
    const key = placeholder.replace(/\[|\]/g, "");

    let randomWord;

    // Cas : activité avec plusieurs listes
    if (data.lists && data.lists[key]) {
      const list = data.lists[key];
      randomWord = list[Math.floor(Math.random() * list.length)];
    }
    // Cas : activité simple (une seule liste "words")
    else if (data.words) {
      const list = data.words;
      randomWord = list[Math.floor(Math.random() * list.length)];
    }

    // Remplacer le placeholder par le mot stylé
    resultText = resultText.replace(
      placeholder,
      `<span class="highlight">${randomWord}</span>`
    );
  });

  // ⚠️ Important : utiliser innerHTML pour que le <span> soit interprété
  instructionEl.innerHTML = resultText;
}


// Clic sur une activité
document.querySelectorAll(".activity-card").forEach(button => {
  button.addEventListener("click", () => {
    currentActivity = button.dataset.activity;
    home.classList.add("hidden");
    activity.classList.remove("hidden");
    generateInstruction();
  });
});

// Régénérer mot
refreshBtn.addEventListener("click", generateInstruction);

// Terminer
finishBtn.addEventListener("click", () => {
  activity.classList.add("hidden");
  home.classList.remove("hidden");

  currentActivity = null;
  instructionEl.textContent = "";
});

