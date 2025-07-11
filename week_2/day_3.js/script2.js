const baslatBtn = document.getElementById("baslatBtn");
const sifirlaBtn = document.getElementById("sifirlaBtn");
const saniyeInput = document.getElementById("saniyeInput");
const geriSayimText = document.getElementById("geriSayimText");


let intervalId;
let kalanSure = 0;

baslatBtn.addEventListener("click", function() {
    const girilenSaniye = parseInt(saniyeInput.value)


if(isNaN(girilenSaniye) || girilenSaniye <=0 ) {
    alert("Lütfen geçerli bir saniye değeri girin.")
    return;
}

 kalanSure = girilenSaniye;
 geriSayimText.textContent = `Süre: ${kalanSure}`;

 saniyeInput.disabled = true;
  baslatBtn.disabled = true;



 clearInterval(intervalId);

 intervalId = setInterval(() => {
    kalanSure--;
    if(kalanSure >0 ) {
        geriSayimText.textContent= `Kalan Süre: ${kalanSure}`

        } else {
        clearInterval(intervalId);
        geriSayimText.textContent = "Süre doldu!";

            saniyeInput.value = "";

       saniyeInput.disabled = false;
        baslatBtn.disabled = false;

        }
    },1000 )
 })


 sifirlaBtn.addEventListener("click" , function () {
  clearInterval(intervalId);
  kalanSure = 0;
  geriSayimText.textContent = "Süre: -";
  saniyeInput.value = "";

  saniyeInput.disabled = false;
  baslatBtn.disabled = false;
});



