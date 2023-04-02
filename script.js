/* Selecionar o botão, e chamar getElementById porque voce quer pegar um elemento pelo ID dele */
const btnMobile = document.getElementById("btn-mobile");

function toggleMenu(event) {
  /* Se o evento for um evento de touchstart define o padrão */
  if (event.type === "touchstart")
    event.preventDefault(); /* não ativa mais nada que ele for fazer ( no caso ativar o click)  */
  const nav =
    document.getElementById(
      "nav"
    ); /* Dentro dessa função eu quero que ocorra, eu vou selecionar a navegação nesse caso o NAV */
  nav.classList.toggle(
    "active"
  ); /* classList voce ira listar todas as classes, toggle porque significa adicione caso não tenha, remova caso tenha*/
  const active =
    nav.classList.contains("active"); /* Verifica se existe a classe active */
  event.currentTarget.setAttribute(
    "aria-expanded",
    active
  ); /* Se conter active vai ser True e se não conter vai ser false */
  if (active) {
    event.currentTarget.setAttribute(
      "aria-label",
      "Fechar Menu"
    ); /* Se não estiver ativo coloque para abrir o menu*/
  } else {
    event.currentTarget.setAttribute("aria-label", "Abrir Menu");
  }
}
/* Ele vai ficar olhando para um evento, o evento que esta passando e o evento de click, então ao clicar ative a seguinte função */
btnMobile.addEventListener(
  "click",
  toggleMenu
); /* Nesse caso a função é toggleMenu */
btnMobile.addEventListener("touchstart", toggleMenu);

const fields = document.querySelectorAll("[required]");

function ValidateField(field) {
  // logica para verificar se existem erros
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      // se não for customError
      // então verifica se tem erro
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Por favor, preencha este campo",
      },
      email: {
        valueMissing: "Email é obrigatório",
        typeMismatch: "Por favor, preencha um email válido",
      },
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);

      field.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      field.style.borderColor = "green";
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  const field = event.target;
  const validation = ValidateField(field);

  validation();
}

for (field of fields) {
  field.addEventListener("invalid", (event) => {
    // eliminar o bubble
    event.preventDefault();

    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}

document.querySelector("form").addEventListener("submit", (event) => {
  console.log("enviar o formulário");

  // não vai enviar o formulário
  event.preventDefault();
});
