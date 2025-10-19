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

// ---------- Mostrar/esconder senha ---------- //
document.addEventListener("DOMContentLoaded", () => {
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            togglePassword.textContent = type === "password" ? "👁‍🗨" : "👁";
        });
    } else {
        console.warn("togglePassword ou passwordInput não encontrados!");
    }
});

// A função showArmario foi movida para dentro do DOMContentLoaded do Carrossel abaixo.


// ---------- Esqueci a senha ---------- //
function forgotPassword() {
    forgotPasswordPopup();
}

// ---------- POPUP DE RECUPERAÇÃO DE SENHA ---------- //
function forgotPasswordPopup() {
    const usuario = "admin";
    const senha = "password";

    const popupFundo = document.createElement("div");
    Object.assign(popupFundo.style, {
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 1000
    });

    const popup = document.createElement("div");
    Object.assign(popup.style, {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        minWidth: "280px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        fontFamily: "Arial, sans-serif"
    });

    const titulo = document.createElement("h2");
    titulo.textContent = "Recuperar senha!";

    const info = document.createElement("p");
    info.innerHTML = `<strong>Usuário:</strong> ${usuario}<br><strong>Senha:</strong> ${senha}`;

    const botaoFechar = document.createElement("button");
    botaoFechar.textContent = "Fechar";
    Object.assign(botaoFechar.style, {
        marginTop: "15px",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        fontSize: "16px"
    });
    botaoFechar.onclick = () => document.body.removeChild(popupFundo);

    popup.append(titulo, info, botaoFechar);
    popupFundo.appendChild(popup);
    document.body.appendChild(popupFundo);

    popupFundo.addEventListener("click", e => {
        if (e.target === popupFundo) document.body.removeChild(popupFundo);
    });
}

// ---------- CARROSSEL / ARMÁRIO (ESCOPO CORRIGIDO) ---------- //
document.addEventListener("DOMContentLoaded", () => {
    const next = document.getElementById('next');
    const back = document.getElementById('back');
    const slider = document.querySelectorAll('.slider');
    if (slider.length === 0) {
        return; 
    }
    
    let currentSlide = 0;



    function hideSlider() {
        slider.forEach(item => item.classList.remove('on'));
    }

    function initSlider() {
        const width = window.innerWidth;

        if (width >= 992) {
            slider.forEach(item => item.classList.add('on'));
            if (next) next.style.display = "none";
            if (back) back.style.display = "none";
        } else {
            slider.forEach(item => item.classList.remove('on'));
            currentSlide = 0;

            slider[currentSlide].classList.add('on');

            if (next) next.style.display = "block";
            if (back) back.style.display = "block";
        }
    }
    
    // Funções do Carrossel
    function nextSlider() {
        hideSlider();
        currentSlide++;
        if (currentSlide >= slider.length) currentSlide = 0;
        slider[currentSlide].classList.add('on');
    }

    function backSlider() {
        hideSlider();
        currentSlide--;
        if (currentSlide < 0) currentSlide = slider.length - 1;
        slider[currentSlide].classList.add('on');
    }

    // Função showArmario (Movida para o escopo correto)
    window.showArmario = function(index) {
        hideSlider();
    };


    if (next) next.addEventListener('click', nextSlider);
    if (back) back.addEventListener('click', backSlider);

    window.addEventListener('resize', initSlider);
    window.addEventListener('load', initSlider);
});


function showArmario(index) {
    console.warn("showArmario(index) chamada. Esta função deve ser implementada no escopo do Carrossel.");
}


// ---------- POPUP DE ESTOQUE ---------- //
function abrirPopup(elemento) {
    const nomeProduto = elemento.dataset.product;
    let quantidadeEstoque = parseInt(elemento.dataset.amount);


    const popupFundo = document.createElement("div");
    Object.assign(popupFundo.style, {
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 1000
    });

    const popup = document.createElement("div");
    Object.assign(popup.style, {
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        minWidth: "300px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        fontFamily: "Arial, sans-serif"
    });

    const titulo = document.createElement("h2");
    titulo.textContent = nomeProduto;

    const estoqueInfo = document.createElement("p");
    estoqueInfo.textContent = `Estoque atual: ${quantidadeEstoque}`;

    let valorAtual = 0;
    const valorDisplay = document.createElement("span");
    valorDisplay.textContent = valorAtual;
    Object.assign(valorDisplay.style, {
        margin: "0 20px", fontSize: "26px", fontWeight: "bold", color: "#000"
    });

    function atualizarPreview() {
        // Validação de limite: se o estoque final for negativo, mostra em vermelho
        const estoquePrevisto = quantidadeEstoque + valorAtual;
        estoqueInfo.textContent = `Estoque final previsto: ${estoquePrevisto}`;
        valorDisplay.style.color = valorAtual < 0 ? "#dc3545" : valorAtual > 0 ? "#28a745" : "#000";
        // Adicionando uma verificação visual se o estoque final for negativo.
        if (estoquePrevisto < 0) {
             estoqueInfo.style.color = "#dc3545"; 
        } else {
             estoqueInfo.style.color = "#555";
        }
    }

    function estilizarBotao(botao, cor) {
        Object.assign(botao.style, {
            width: "50px", height: "50px",
            borderRadius: "50%",
            fontSize: "22px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            backgroundColor: cor,
            color: "#fff",
            transition: "0.2s"
        });
        botao.onmouseover = () => botao.style.opacity = "0.8";
        botao.onmouseout = () => botao.style.opacity = "1";
    }

    const botaoMais = document.createElement("button");
    botaoMais.textContent = "+";
    estilizarBotao(botaoMais, "#28a745");
    botaoMais.onclick = () => { 
        // Removi a limitação 'if (valorAtual < quantidadeEstoque)' do '+'
        // para permitir que o usuário adicione qualquer valor, mesmo que irrealista.
        valorAtual++; 
        valorDisplay.textContent = valorAtual; 
        atualizarPreview(); 
    };

    const botaoMenos = document.createElement("button");
    botaoMenos.textContent = "−";
    estilizarBotao(botaoMenos, "#dc3545");
    botaoMenos.onclick = () => { 
    
        if (valorAtual > -quantidadeEstoque) { 
            valorAtual--; 
            valorDisplay.textContent = valorAtual; 
            atualizarPreview(); 
        } 
    };

    const botaoMais10 = document.createElement("button");
    botaoMais10.textContent = "+10";
    estilizarBotao(botaoMais10, "#28a745");
    botaoMais10.onclick = () => { 
    
        valorAtual += 10;
        valorDisplay.textContent = valorAtual; 
        atualizarPreview(); 
    };

    const botaoMenos10 = document.createElement("button");
    botaoMenos10.textContent = "-10";
    estilizarBotao(botaoMenos10, "#dc3545");
    botaoMenos10.onclick = () => { 
        
        if (valorAtual - 10 >= -quantidadeEstoque) {
            valorAtual -= 10;
        } else {
           
            valorAtual = -quantidadeEstoque; 
        }
        valorDisplay.textContent = valorAtual; 
        atualizarPreview(); 
    };

    const botoesContainer = document.createElement("div");
    Object.assign(botoesContainer.style, {
        margin: "15px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px"
    });
    botoesContainer.append(botaoMenos10, botaoMenos, valorDisplay, botaoMais, botaoMais10);

    const botoesAcoes = document.createElement("div");
    Object.assign(botoesAcoes.style, {
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        marginTop: "15px"
    });

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.textContent = "Confirmar";
    Object.assign(botaoConfirmar.style, {
        flex: "1", padding: "10px",
        border: "none", borderRadius: "8px",
        backgroundColor: "#007bff", color: "white",
        fontSize: "16px", cursor: "pointer"
    });

    const botaoCancelar = document.createElement("button");
    botaoCancelar.textContent = "Cancelar";
    Object.assign(botaoCancelar.style, {
        flex: "1", padding: "10px",
        border: "none", borderRadius: "8px",
        backgroundColor: "#6c757d", color: "white",
        fontSize: "16px", cursor: "pointer"
    });

    // ---------- CONFIRMAÇÃO COM BOTÃO DESFAZER ----------
    botaoConfirmar.onclick = () => {
        
         if (quantidadeEstoque + valorAtual < 0) {
            alert("Atenção: A quantidade final do estoque não pode ser negativa!");
            return; 
        }
        
        
        const popupFundoConfirm = document.createElement("div");
        Object.assign(popupFundoConfirm.style, {
            position: "fixed",
            top: 0, left: 0,
            width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1100
        });

        const popupConfirm = document.createElement("div");
        Object.assign(popupConfirm.style, {
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "300px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            fontFamily: "Arial, sans-serif"
        });

        const mensagem = document.createElement("p");
        if (valorAtual > 0) mensagem.textContent = `Você vai adicionar ${valorAtual} unidade(s) de ${nomeProduto}.`;
        else if (valorAtual < 0) mensagem.textContent = `Você vai remover ${-valorAtual} unidade(s) de ${nomeProduto}.`;
        else mensagem.textContent = `Nenhuma alteração será feita no estoque de ${nomeProduto}.`;

        const btnContainer = document.createElement("div");
        Object.assign(btnContainer.style, {
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "15px"
        });

        const btnConfirmarFinal = document.createElement("button");
        btnConfirmarFinal.textContent = "Confirmar";
        Object.assign(btnConfirmarFinal.style, {
            flex: "1", padding: "10px",
            border: "none", borderRadius: "8px",
            backgroundColor: "#007bff", color: "white",
            fontSize: "16px", cursor: "pointer"
        });

        const btnDesfazer = document.createElement("button");
        btnDesfazer.textContent = "Desfazer";
        Object.assign(btnDesfazer.style, {
            flex: "1", padding: "10px",
            border: "none", borderRadius: "8px",
            backgroundColor: "#dc3545", color: "white",
            fontSize: "16px", cursor: "pointer"
        });
        

        btnConfirmarFinal.onclick = () => {
          
            quantidadeEstoque += valorAtual;
            elemento.dataset.amount = quantidadeEstoque;

            const p = elemento.querySelector("p");
            if (p) p.textContent = quantidadeEstoque;

       
            elemento.classList.remove("cellRed", "cellYellow", "cellGreen");
            if (quantidadeEstoque <= 10) elemento.classList.add("cellRed");
            else if (quantidadeEstoque <= 50) elemento.classList.add("cellYellow");
            else elemento.classList.add("cellGreen");

            document.body.removeChild(popupFundoConfirm);
            document.body.removeChild(popupFundo);
        };

        btnDesfazer.onclick = () => document.body.removeChild(popupFundoConfirm);

        btnContainer.append(btnDesfazer, btnConfirmarFinal);
        popupConfirm.append(mensagem, btnContainer);
        popupFundoConfirm.appendChild(popupConfirm);
        document.body.appendChild(popupFundoConfirm);

        popupFundoConfirm.addEventListener("click", e => {
            if (e.target === popupFundoConfirm) document.body.removeChild(popupFundoConfirm);
        });
    };

    botaoCancelar.onclick = () => document.body.removeChild(popupFundo);

    popup.append(titulo, estoqueInfo, botoesContainer);
    botoesAcoes.append(botaoCancelar, botaoConfirmar);
    popup.appendChild(botoesAcoes);
    popupFundo.appendChild(popup);
    document.body.appendChild(popupFundo);

    popupFundo.addEventListener("click", e => {
        if (e.target === popupFundo) document.body.removeChild(popupFundo);
    });
}

// ---------- FIM DO CÓDIGO ----------