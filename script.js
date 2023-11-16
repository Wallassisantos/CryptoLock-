// Função para verificar se a chave foi aplicada e alterar a cor do indicador
function verificarChaveAplicada() {
  const chave = localStorage.getItem('chaveDeCriptografia');
  const indicador = document.getElementById('indicador');

  if (chave) {
    indicador.style.backgroundColor = 'green'; // Chave aplicada (cor verde)
  } else {
    indicador.style.backgroundColor = 'red'; // Chave não aplicada (cor vermelha)
  }
}

// Função para gerar uma nova chave aleatória de 256 bits e exibir no campo de texto
function gerarChave() {
  const novaChave = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64); // 32 bytes para 256 bits
  document.getElementById('chaveInput').value = novaChave;
  verificarChaveAplicada(); // Verifica se a chave foi aplicada ao gerar uma nova chave
}

// Função para aplicar a chave inserida no campo de texto e armazená-la no localStorage
function aplicarChave() {
  const chaveInput = document.getElementById('chaveInput').value;
  localStorage.setItem('chaveDeCriptografia', chaveInput);
  document.getElementById('chaveInput').value = ''; // Limpa o campo após inserir a chave
  alert('Chave aplicada com sucesso!');
  verificarChaveAplicada(); // Verifica se a chave foi aplicada ao clicar no botão
}

// Função para deletar a chave de criptografia do localStorage
function deletarChave() {
  localStorage.removeItem('chaveDeCriptografia');
  verificarChaveAplicada(); // Atualiza a visualização da bolinha
}

// Função para criptografar a mensagem usando a chave armazenada
function criptografar() {
  const mensagemOriginal = document.getElementById('mensagemOriginal').value;
  const chave = localStorage.getItem('chaveDeCriptografia');

  // Verifica se há uma chave armazenada
  if (!chave) {
    alert('Nenhuma chave foi inserida. Por favor, insira uma chave antes de criptografar.');
    return;
  }

  const mensagemCriptografada = CryptoJS.AES.encrypt(mensagemOriginal, chave).toString();
  document.getElementById('mensagemCriptografada').value = mensagemCriptografada;
}

// Função para descriptografar a mensagem usando a chave armazenada
function descriptografar() {
  const mensagemCriptografada = document.getElementById('mensagemCriptografada').value;
  const chave = localStorage.getItem('chaveDeCriptografia');

  // Verifica se há uma chave armazenada
  if (!chave) {
    alert('Nenhuma chave foi inserida. Por favor, insira uma chave antes de descriptografar.');
    return;
  }

  const mensagemDescriptografada = CryptoJS.AES.decrypt(mensagemCriptografada, chave).toString(CryptoJS.enc.Utf8);
  const mensagemCriptografadaExtra = CryptoJS.AES.decrypt(document.getElementById('mensagemCriptografadaExtra').value, chave).toString(CryptoJS.enc.Utf8);

  document.getElementById('mensagemDescriptografada').value = mensagemDescriptografada;
  document.getElementById('mensagemCriptografadaExtra').value = mensagemCriptografadaExtra;
}

// Verificar chave aplicada ao carregar a página
verificarChaveAplicada();

// Registro do Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso!', registration);
      })
      .catch(error => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  });
}
