// ---------- LOGIN ---------- //
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("loginError");

    if (username === "admin" && password === "password") {
        window.location.href = "mainPage.html";
    } else {
        errorMsg.style.display = "block";
    }
}

function forgotPassword() {
    alert("Usuário: admin\nSenha: password");
}

// ---------- CARROSSEL ---------- //
const slider = document.querySelectorAll('.slider');
const next = document.getElementById('next');
const back = document.getElementById('back');
let currentSlide = 0;

// Esconde todos os slides
function hideSlider() {
    slider.forEach(item => item.classList.remove('on'));
}

// Inicializa slider de acordo com a largura da tela
function initSlider() {
    const width = window.innerWidth;

    if (width >= 992) {
        // Desktop: mostrar todos os slides
        slider.forEach(item => item.classList.add('on'));
        next.style.display = "none";
        back.style.display = "none";
    } else {
        // Mobile/Tablet: resetar e mostrar primeiro(s)
        slider.forEach(item => item.classList.remove('on'));
        currentSlide = 0;

        const visibleSlides = width >= 600 ? 2 : 1; // tablet=2, mobile=1
        for (let i = 0; i < visibleSlides && i < slider.length; i++) {
            slider[i].classList.add('on');
        }

        next.style.display = "block";
        back.style.display = "block";
    }
}

// Avançar slide
function nextSlider() {
    const width = window.innerWidth;
    const visibleSlides = width >= 600 ? 2 : 1;

    hideSlider();
    currentSlide += visibleSlides;
    if (currentSlide >= slider.length) currentSlide = 0;

    for (let i = currentSlide; i < currentSlide + visibleSlides && i < slider.length; i++) {
        slider[i].classList.add('on');
    }
}

// Voltar slide
function backSlider() {
    const width = window.innerWidth;
    const visibleSlides = width >= 600 ? 2 : 1;

    hideSlider();
    currentSlide -= visibleSlides;
    if (currentSlide < 0) currentSlide = slider.length - visibleSlides;

    for (let i = currentSlide; i < currentSlide + visibleSlides && i < slider.length; i++) {
        slider[i].classList.add('on');
    }
}

// Eventos
next.addEventListener('click', nextSlider);
back.addEventListener('click', backSlider);
window.addEventListener('resize', initSlider);
window.addEventListener('load', initSlider);

// ------------------ Popup ------------------ //
function abrirPopup(elemento) {
    const nomeProduto = elemento.dataset.product;
    let quantidadeEstoque = parseInt(elemento.dataset.amount);

    // Fundo do popup
    const popupFundo = document.createElement("div");
    popupFundo.style.position = "fixed";
    popupFundo.style.top = 0;
    popupFundo.style.left = 0;
    popupFundo.style.width = "100vw";
    popupFundo.style.height = "100vh";
    popupFundo.style.backgroundColor = "rgba(0,0,0,0.6)";
    popupFundo.style.display = "flex";
    popupFundo.style.alignItems = "center";
    popupFundo.style.justifyContent = "center";
    popupFundo.style.zIndex = "1000";

    // Conteúdo do popup
    const popup = document.createElement("div");
    popup.style.background = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "12px";
    popup.style.textAlign = "center";
    popup.style.minWidth = "280px";
    popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    popup.style.fontFamily = "Arial, sans-serif";

    const titulo = document.createElement("h2");
    titulo.textContent = nomeProduto;

    const estoqueInfo = document.createElement("p");
    estoqueInfo.textContent = `Estoque atual: ${quantidadeEstoque}`;

    let valorAtual = 0;
    const valorDisplay = document.createElement("span");
    valorDisplay.textContent = valorAtual;
    valorDisplay.style.margin = "0 10px";
    valorDisplay.style.fontSize = "22px";
    valorDisplay.style.fontWeight = "bold";

    const botaoMais = document.createElement("button");
    botaoMais.textContent = "+";
    botaoMais.onclick = () => { valorAtual++; valorDisplay.textContent = valorAtual; };

    const botaoMenos = document.createElement("button");
    botaoMenos.textContent = "-";
    botaoMenos.onclick = () => { valorAtual--; valorDisplay.textContent = valorAtual; };

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.textContent = "Confirmar";
    botaoConfirmar.style.marginTop = "15px";
    botaoConfirmar.style.display = "block";
    botaoConfirmar.style.width = "100%";
    botaoConfirmar.style.padding = "8px";
    botaoConfirmar.style.border = "none";
    botaoConfirmar.style.borderRadius = "8px";
    botaoConfirmar.style.backgroundColor = "#007bff";
    botaoConfirmar.style.color = "white";
    botaoConfirmar.style.fontSize = "16px";
    botaoConfirmar.style.cursor = "pointer";

    botaoConfirmar.onclick = () => {
        quantidadeEstoque += valorAtual;
        elemento.dataset.amount = quantidadeEstoque;

        // Atualiza célula
        const h3 = elemento.querySelector("h3");
        const p = elemento.querySelector("p");
        if (h3) h3.textContent = elemento.dataset.product;
        if (p) p.textContent = quantidadeEstoque;

        // Atualiza cor
        elemento.classList.remove("cellRed", "cellYellow", "cellGreen");
        if (quantidadeEstoque < 30) elemento.classList.add("cellRed");
        else if (quantidadeEstoque < 100) elemento.classList.add("cellYellow");
        else elemento.classList.add("cellGreen");

        document.body.removeChild(popupFundo);
    };

    // Montagem do popup
    popup.appendChild(titulo);
    popup.appendChild(estoqueInfo);
    popup.appendChild(botaoMenos);
    popup.appendChild(valorDisplay);
    popup.appendChild(botaoMais);
    popup.appendChild(botaoConfirmar);
    popupFundo.appendChild(popup);
    document.body.appendChild(popupFundo);

    popupFundo.addEventListener("click", (e) => {
        if (e.target === popupFundo) document.body.removeChild(popupFundo);
    });
}