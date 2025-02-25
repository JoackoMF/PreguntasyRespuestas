document.addEventListener("DOMContentLoaded", loadCards);

function addCard() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;
    if (question && answer) {
        const faqList = JSON.parse(localStorage.getItem("faqList")) || [];
        faqList.push({ question, answer });
        localStorage.setItem("faqList", JSON.stringify(faqList));
        renderCard(question, answer);
        document.getElementById("question").value = "";
        document.getElementById("answer").value = "";
    }
}

function renderCard(question, answer) {
    const container = document.createElement("div");
    container.classList.add("card-container");

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="front">${question}</div>
        <div class="back">${answer}</div>
    `;
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
        
        // Agregar clase expandida a la tarjeta cuando muestra la respuesta
        if (card.classList.contains("flipped")) {
            container.classList.add("expanded");
        } else {
            container.classList.remove("expanded");
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = function (e) {
        e.stopPropagation(); // Evitar que el clic se propague a la tarjeta
        container.remove();
        removeCardFromStorage(question);
    };

    container.appendChild(card);
    container.appendChild(deleteBtn);
    document.getElementById("faqContainer").appendChild(container);
}

function loadCards() {
    const faqList = JSON.parse(localStorage.getItem("faqList")) || [];
    faqList.forEach(({ question, answer }) => renderCard(question, answer));
}

function clearCards() {
    localStorage.removeItem("faqList");
    document.getElementById("faqContainer").innerHTML = "";
}

function removeCardFromStorage(question) {
    let faqList = JSON.parse(localStorage.getItem("faqList")) || [];
    faqList = faqList.filter(item => item.question !== question);
    localStorage.setItem("faqList", JSON.stringify(faqList));
}