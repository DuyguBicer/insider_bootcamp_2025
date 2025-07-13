const form = document.querySelector("form");
const liste = document.getElementById("gorevListesi");
const filtreBtn = document.getElementById("filtreBtn");
const siralaBtn = document.getElementById("siralaBtn");

let gorevler = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const baslik = document.getElementById("baslik").value.trim();
  const aciklama = document.getElementById("aciklama").value.trim();
  const oncelikInput = document.querySelector('input[name="oncelik"]:checked');
  const tamamlandiMi = document.getElementById("tamamlandiMi").checked;

  if (!baslik || !oncelikInput) {
    alert("Başlık ve öncelik seçimi zorunludur!");
    return;
  }

  try {
    const gorev = {
      id: Date.now(),
      baslik,
      aciklama,
      oncelik: oncelikInput.value,
      tamamlandi: tamamlandiMi,
    };

    gorevler.push(gorev);
    form.reset();
    listeyiGuncelle();
  } catch (err) {
    console.error(err);
    alert("Bir hata oluştu.");
  }
});

liste.addEventListener("click", function (e) {
  const gorevElemani = e.target.closest("li");
  const id = Number(gorevElemani?.dataset?.id);

  if (e.target.classList.contains("sil")) {
    gorevler = gorevler.filter(g => g.id !== id);
  }

  if (e.target.classList.contains("tamamla")) {
    const gorev = gorevler.find(g => g.id === id);
    if (gorev) gorev.tamamlandi = !gorev.tamamlandi;
  }

  listeyiGuncelle();
  e.stopPropagation();
});

filtreBtn.addEventListener("click", function () {
  const filtreli = gorevler.filter(g => g.tamamlandi);
  listeyiGuncelle(filtreli);
});

siralaBtn.addEventListener("click", function () {
  gorevler.sort((a, b) => {
    const oncelikSira = { dusuk: 1, orta: 2, yuksek: 3 };
    return oncelikSira[b.oncelik] - oncelikSira[a.oncelik];
  });
  listeyiGuncelle();
});

function listeyiGuncelle(listeKaynak = gorevler) {
  liste.innerHTML = "";

  listeKaynak.forEach(gorev => {
    const li = document.createElement("li");
    if (gorev.tamamlandi) li.classList.add("tamamlandi");
    li.dataset.id = gorev.id;

    li.innerHTML = `
      <div>
        <strong>${gorev.baslik}</strong><br/>
        <small>${gorev.aciklama}</small><br/>
        <em>Öncelik: ${gorev.oncelik}</em>
      </div>
      <div>
        <button class="tamamla">✔</button>
        <button class="sil">🗑</button>
      </div>
    `;

    liste.appendChild(li);
  });
}
