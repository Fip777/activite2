/* =============
   COPYRIGHT
================
Copyright (C) 2026, Audrey Bourgeois. Tous droits réservés. 
Les informations contenues ici, code et concepts intellectuels, sont la propriété de Audrey Bourgeois 
et sont protégés par le droit d'auteur. 
Toute diffusion ou reproduction même partielle, quel qu’en soit le support, est interdite.*/

const home = document.getElementById("home");
const activity = document.getElementById("activity");
const instructionEl = document.getElementById("instruction");
const refreshBtn = document.getElementById("refresh");
const finishBtn = document.getElementById("finish");

// Données des activités
const activities = {
  activite1: {
    text: "Description détaillée."
     },
  
  activite2: {
      text: "Description détaillée."
     },
  
  activite3: {
      text: "Description détaillée."
     },
  
  activite4: {
      text: "Description détaillée."
     },
   
  activite5: {
      text: "Description détaillée."
     },
  
   activite6: {
      text: "Description détaillée."
     },
   
  activite7: {
      text: "Description détaillée."
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

