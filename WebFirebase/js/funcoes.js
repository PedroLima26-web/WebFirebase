var db = firebase.firestore();
var idRegistro = null;
var a2

function pi(){
    document.location.href="WebFirebase.html"
}


function pi2(){
    document.location.href="Listar.html"
}

function cadastrar() {
  //Começo função cadastrar
 a2 = valida();
if(a2 == false){
  alert("Preencha todos os campos antes de cadastrar!")
  return;
} else {
  let nomee = document.getElementById("nome").value;
  let cepeefi = document.getElementById("cpf").value;
  let nascimento = document.getElementById("dataNasc").value;
  let sexo = document.querySelector("input[name='sexo']:checked").value;
  let estadocivil = document.getElementById("estadoc").value;
  let rendamensal = document.getElementById("rendaMes").value;
  let logradouro = document.getElementById("logradouro").value;
  let number = document.getElementById("number").value;
  let complemento = document.getElementById("comp").value;
  let estado = document.getElementById("estado").value;
  let cidade = document.getElementById("cidade").value;

  db.collection("users")
    .add({
      Nome: nomee,
      Cpf: cepeefi,
      Nascimento: nascimento,
      Sexo: sexo,
      EstadoCivil: estadocivil,
      RendaMensal: rendamensal,
      Logradouro: logradouro,
      Numero: number,
      Complemento: complemento,
      Estado: estado,
      Cidade: cidade,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  alert("Cliente cadastrado!");

}
} // fim função cadastrar

function valida() {
	  /*const aa = {
    nomee = document.getElementById("nome").value,
    cepeefi = document.getElementById("cpf").value,
    nascimento = document.getElementById("dataNasc").value,
    sexo = document.querySelector("input[name='sexo']:checked").value,
    estadocivil = document.getElementById("estadoc").value,
    rendamensal: document.getElementById("rendaMes").value,
    logradouro: document.getElementById("logradouro").value,
    number: document.getElementById("number").value,
    complemento: document.getElementById("comp").value,
    estado: document.getElementById("estado").value,
    cidade: document.getElementById("cidade").value
	};*/

	if (document.getElementById("nome").value == "") {
		return false;
	}
  if (document.getElementById("dataNasc").value == "") {
		return false;
	}
	if (document.getElementById("cpf").value == "") {
		return false;
	}
	if (document.getElementById("rendaMes").value == "") {
		return false;
	}
	if (document.getElementById("logradouro").value == "") {
		return false;
	}
	if (document.getElementById("number").value == "") {
		return false;
	}
	if (document.getElementById("comp").value == "") {
		return false;
	}
if (document.getElementById("estado").value == ""){
  return false;
}

	if (document.getElementById("cidade").value == "") {
		return false;
	} else {
		return true;
	}
}// 

function destroi(id) {
  document.getElementById(id).classList.add("d-none");
} // função destroi coisos

function consultar() {
  //função consultar
  var ag = db.collection("users");

  ag.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " --> ", doc.data());
        $("#TableData").append("<tr>");
        $("#TableData").append("<td scope='col'>" + doc.data().Nome + "</td>");
        $("#TableData").append("<td scope='col'>" + doc.data().Cpf + "</td>");
        $("#TableData").append(
          "<td scope='col'>" + doc.data().Nascimento + "</td>"
        );
        $("#TableData").append("<td scope='col'>" + doc.data().Sexo + "</td>");
        $("#TableData").append(
          "<td scope='col'>" + doc.data().EstadoCivil + "</td>"
        );
        $("#TableData").append(
          "<td scope='col'>" + doc.data().RendaMensal + "</td>"
        );
        $("#TableData").append(
          "<td scope='col'>" + doc.data().Logradouro + "</td>"
        );
        $("#TableData").append(
          "<td scope='col'>" + doc.data().Numero + "</td>"
        );
        $("#TableData").append(
          "<td scope='col'>" + doc.data().Complemento + "</td>"
        );
        $("#TableData").append(
          "<td scope='col'>" + doc.data().Estado + "</td>"
        );
        $("#TableData").append(
          "<td scope='col'>" + doc.data().Cidade + "</td>"
        );
        $("#TableData").append(
          `<td scope=\'col\'><button onclick="vaiPraed('${doc.id}')" class="btn btn-primary">Editar</button></td>`
        );
        $("#TableData").append(
          `<td scope=\'col\'><button onclick="excluir('${doc.id}')"class="btn btn-danger">Excluir</button></td>`
        );

        $("#TableData").append("</tr>");
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
} // fim função consultar

function getBaseUrl() {
    return window.location.href.match(/^.*\//);
}
function vaiPraed(id) {
  document.location.href = getBaseUrl() + "Editar.html?=" + id;
}

function pegaRegistro() {
  //função que busca os registros
  var get_id = document.URL.split("=");
  console.log(get_id);
  var ag = db.collection("users").doc(get_id[1]);
  ag.get()
    .then((doc) => {
        console.log(doc.id, " => ", doc.data());
        document.getElementById("nome").value = doc.data().Nome;
        document.getElementById("cpf").value = doc.data().Cpf;
        document.getElementById("dataNasc").value = doc.data().Nascimento;
        if (doc.data().Sexo == "Feminino"){
          document.getElementById("fem").checked=true;
        } else {
          document.getElementById("masc").checked=true;
        }
        document.getElementById("estadoc").value = doc.data().EstadoCivil;
        document.getElementById("rendaMes").value = doc.data().RendaMensal;
        document.getElementById("logradouro").value = doc.data().Logradouro;
        document.getElementById("number").value = doc.data().Numero;
        document.getElementById("comp").value = doc.data().Complemento;
        document.getElementById("estado").value = doc.data().Estado;
        document.getElementById("cidade").value = doc.data().Cidade;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function initialize() {
  document.addEventListener(
    "deviceready",
    this.onDeviceReady.bind(this),
    false
  );
}

function onDeviceReady() {
  document.getElementById("btListar").addEventListener("click", listar);
}

function editar() {
  a2 = valida();
  if(a2 == false){
    alert("Preencha todos os campos antes de editar!")
  }else{
  var get_id = document.URL.split("=");
  let nomee = document.getElementById("nome").value;
  let cepeefi = document.getElementById("cpf").value;
  let nascimento = document.getElementById("dataNasc").value;
  let estadocivil = document.getElementById("estadoc").value;
  let rendamensal = document.getElementById("rendaMes").value;
  let logradouro = document.getElementById("logradouro").value;
  let number = document.getElementById("number").value;
  let complemento = document.getElementById("comp").value;
  let estado = document.getElementById("estado").value;
  let cidade = document.getElementById("cidade").value;

if (document.getElementById("masc").checked) {
    sexo = "Masculino";
  } else if (document.getElementById("fem").checked) {
    sexo = "Feminino";
  }
  db.collection("users").doc(get_id[1]).update({
    Nome: nomee,
    Cpf: cepeefi,
    Nascimento: nascimento,
    Sexo: sexo,
    EstadoCivil: estadocivil,
    RendaMensal: rendamensal,
    Logradouro: logradouro,
    Numero: number,
    Complemento: complemento,
    Estado: estado,
    Cidade: cidade
  }).then((docRef) => {
    console.log("Document updated with ID: ", get_id);
    document.location.href = "Listar.html";
  })
  .catch((error) => {
    console.error("Error updating document: ", error);
  });;
  console.log(get_id);}
}//fim editar

function excluir(docId) {
  console.log(docId);

  if (confirm("Você realmente deseja excluir esse registro?")) {
    console.log(db);
    console.log(db.collection("users"));
    console.log(db.collection("users").doc(docId));

    db.collection("users").doc(docId).delete().then(() => {
        console.log("Document successfully deleted!");
        document.location.href = "Listar.html";
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

} else {
    alert("Exclusão cancelada");
    document.location.href = "Listar.html";
}
}
