
/* ==========================================
   GAMEZONE - LOGIN
========================================== */

async function intializeLogin() {

    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value;

    if (email === "" || senha === "") {
        alert("Digite seu e-mail e sua senha!");
        return;
    }

    try {

        // Busca os usuários no JSON
        const response = await fetch("./engine/user.json");

        if (!response.ok) {
            throw new Error("Erro ao carregar os usuários.");
        }

        const users = await response.json();

        // Procura o usuário correspondente
        const userValided = users.find(u =>
            u.email === email &&
            u.senha === senha
        );

        if (userValided) {

            // Salva o usuário atual
            localStorage.setItem(
                "usuarioAtual",
                JSON.stringify(userValided)
            );

            alert("Bem-vindo ao GameZone, " + userValided.nome + "!");

            // Redireciona para o dashboard
            setTimeout(() => {
                window.location.href = "./dashboard.html";
            }, 1000);

        } else {

            alert("E-mail ou senha incorretos!");
        }

    } catch (e) {

        console.error("Erro ao buscar os dados:", e);
        alert("Não foi possível realizar o login. Verifique o arquivo user.json.");
    }
}


/* ==========================================
   GAMEZONE - CARREGAR PERFIL
========================================== */

async function loadUserStorage() {

    const usuarioSalvo = localStorage.getItem("usuarioAtual");

    // Verifica se existe login
    if (!usuarioSalvo) {
        window.location.href = "./index.html";
        return;
    }

    const loadUser = JSON.parse(usuarioSalvo);

    // Carrega imagem do perfil
    const loadImg = document.getElementById("load-img");

    if (loadImg) {

        if (loadUser.imagem && loadUser.imagem !== "") {

            loadImg.innerHTML = `
                <img src="${loadUser.imagem}"
                     alt="Avatar de ${loadUser.nome}"
                     class="img-fluid rounded-start"
                     width="100%">
            `;

        } else {

            loadImg.innerHTML = `
                <img src="./assets/logo_claro.png"
                     alt="Logo GameZone"
                     class="img-fluid rounded-start"
                     width="100%">
            `;
        }
    }

    // Carrega nome
    const loadNome = document.getElementById("load-nome");

    if (loadNome) {
        loadNome.innerText = loadUser.nome;
    }

    // Carrega e-mail
    const loadEmail = document.getElementById("load-email");

    if (loadEmail) {
        loadEmail.innerText = loadUser.email;
    }

    // Carrega data
    const loadData = document.getElementById("load-data");

    if (loadData) {
        loadData.innerText = new Date().toLocaleDateString("pt-BR");
    }
}


/* ==========================================
   GAMEZONE - SAIR DA CONTA
========================================== */

function logoutGameZone() {

    localStorage.removeItem("usuarioAtual");

    window.location.href = "./index.html";
}


/* ==========================================
   GAMEZONE - VERIFICAR USUÁRIO
========================================== */

function verificarLogin() {

    const usuario = localStorage.getItem("usuarioAtual");

    if (!usuario) {
        window.location.href = "./index.html";
    }
}
