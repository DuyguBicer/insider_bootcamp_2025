
const name = prompt("Adınız nedir?");
const age = prompt("Yaşınız kaç?");
const job = prompt("Mesleğiniz nedir?");

const user = {
  name: name,
  age: Number(age),
  job: job
};

const userDiv = document.getElementById("kullanici-bilgileri");

const userTitle = document.createElement("h2");
userTitle.textContent = "Kullanıcı Bilgileri";
userDiv.appendChild(userTitle);

const userName = document.createElement("p");
userName.textContent = `Ad: ${user.name}`;
userDiv.appendChild(userName);

const userAge = document.createElement("p");
userAge.textContent = `Yaş: ${user.age}`;
userDiv.appendChild(userAge);

const userJob = document.createElement("p");
userJob.textContent = `Meslek: ${user.job}`;
userDiv.appendChild(userJob);


const sepet = [];


while (true) {
  const urunIsmi = prompt("Sepete eklemek istediğiniz ürünü yazın (çıkmak için 'q'):");

  if (urunIsmi.toLowerCase() === "q") {
    break;
  }

  const urunFiyati = Number(prompt("Ürünün fiyatı:"));

  if (isNaN(urunFiyati)) {
    alert("Geçerli bir fiyat giriniz!");
    continue;
  }

  sepet.push({
    product: urunIsmi,
    price: urunFiyati
  });
}


const silinecekUrun = prompt("Silmek istediğiniz ürün adı var mı? (Yoksa boş bırakın)");

if (silinecekUrun) {
  const index = sepet.findIndex(urun => urun.product.toLowerCase() === silinecekUrun.toLowerCase());

  if (index !== -1) {
    sepet.splice(index, 1);
    alert(`${silinecekUrun} sepetten silindi.`);
  } else {
    alert(`${silinecekUrun} adlı ürün sepette bulunamadı.`);
  }
}


const sepetDiv = document.getElementById("sepet-liste");

const sepetTitle = document.createElement("h2");
sepetTitle.textContent = "Sepetiniz";
sepetDiv.appendChild(sepetTitle);

const ul = document.createElement("ul");

sepet.forEach(urun => {
  const li = document.createElement("li");
  li.textContent = `${urun.product} - ${urun.price} TL`;
  ul.appendChild(li);
});

sepetDiv.appendChild(ul);


const toplamFiyat = sepet.reduce((acc, urun) => acc + urun.price, 0);

const toplamDiv = document.getElementById("toplam-fiyat");
const toplamYazi = document.createElement("h3");
toplamYazi.textContent = `Toplam Fiyat: ${toplamFiyat} TL`;
toplamDiv.appendChild(toplamYazi);
