//Değerler Db den çekilcek

let points = 0; //toplam güç
let clickpower = 1;// her tıklandığında alıncak güç
let botInterval; //botun durumu

// Neseneye tıklandığında çalışacak function
function clicka() {
    points = points + clickpower;
    console.log("a");
    console.log(points);
}

// Click power upgrade functionu
function upgrade() {
    if (points >= 10) { // kontrol ediyoruz yeterli pointi
        clickpower += 1;
        points -= 10;  //pointimizden parasını çıkarıyoruz
        console.log("Upgrade yapıldı! Click power şu an: " + clickpower);
    } else {
        console.log("Yeterli points yok!");
    }
}

// Her saniye points'i artıran bot functionu
function buybot() {
    if (points >= 100 && !botInterval) { // kontrol ediyoruz yeterli pointi
        botInterval = setInterval(function() {
            points += 1; // Her saniye points'i 1 artırıyoruz.
            console.log("Bot çalışıyor! Yeni points: " + points);
        }, 1000); //burdaki 1000 ne kadar sürede çalışcağı
        console.log("Bot satın alındı!");
        points -= 100; // pointimizden parayı çıkarıyoruz
    } else if (botInterval) {
        console.log("Bot zaten satın alınmış durumda!");
    } else {
        console.log("Yeterli points yok veya bot zaten çalışıyor!");
    }
}

// botu açmayı/kapatmayı sağlayan function
function botopenorclose() {
    if (botInterval) {
        clearInterval(botInterval); //botu temelde kapatan bu 
        botInterval = null; 
        console.log("Bot kapatıldı.");
    } else {
        console.log("Bot açıldı");
        botInterval
    }
}
