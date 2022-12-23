const resultView = document.querySelector(".result");

const hj = new Date();
const natal = new Date(hj.getFullYear(), 11, 25);
const um_dia = 1000 * 60 * 60 * 24;

if (hj.getMonth() == 11 && hj.getDate() > 25)
  natal.setFullYear(natal.getFullYear() + 1);

const dias = Math.ceil((natal.getTime() - hj.getTime()) / um_dia);
console.log(`${dias} dias(s) para o natal`);

resultView.textContent = `Faltam 0${dias} dias para o Natal`;

//Count Natal 2022
//Contagem regressiva para o natal de 2022

function contagem() {
  var now = new Date();

  //coloque a data aqui para alterar os dias da contagem

  var dataEvento = new Date("Dec 24, 2022 00:00:00");
  var tempoAtual = now.getTime(); //nosso horário
  var tempoEvento = dataEvento.getTime();
  var totalTempo = tempoEvento - tempoAtual;

  //Calculado o dia, hora, minuto e segundo

  //var d = Math.floor(totalTempo / (1000 * 60 * 60 * 24));
  var h = Math.floor((totalTempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var m = Math.floor((totalTempo % (1000 * 60 * 60)) / (1000 * 60));
  var s = Math.floor((totalTempo % (1000 * 60)) / 1000);

  //document.getElementById("days").textContent = d;
  //document.getElementById("days").innerText = d;
  document.getElementById("hours").textContent = h;
  document.getElementById("minutes").textContent = m;
  document.getElementById("seconds").textContent = s;
  setTimeout(contagem, 1000);

  //Trecho para verificar o periodo do evento terminou

  if (totalTempo < 0) {
    clearInterval(contagem);
    //elements da page
    //document.getElementById("days").innerHTML = "<small>00</small>";
    document.getElementById("hours").innerHTML = "<small>00</small>";
    document.getElementById("minutes").innerHTML = "<small>00</small>";
    document.getElementById("seconds").innerHTML = "<small>00</small> ";
    document.getElementById("mensagem").innerHTML =
      "<small>Não poderia deixar essa data passar! Feliz natal e um próspero ano novo para todos, que vocês possam passar esse dia com a família em paz, e que o maior presente foi o nascimento de Jesus e vocês poderem estar unidos com as pessoas que se ama. Encham a pança! <br/> <br/>Fiquem com Deus, até a próxima!</small>";
  }
}
contagem();