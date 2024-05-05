const readline = require('readline')
const userEkle=require('./randUser')
const input=require('input')

const rl = readline.createInterface(process.stdin, process.stdout)
const rehber = [{
    ad: 'ahmet',
    soyad: 'tekel',
    cinsiyet: 'male',
    sehir: 'istanbul',
    telno: '0532'
}, {
    ad: 'ali',
    soyad: 'tek',
    cinsiyet: 'male',
    sehir: 'bolu',
    telno: '0533'
}, {
    ad: 'duru',
    soyad: 'akay',
    cinsiyet: 'female',
    sehir: 'bursa',
    telno: '0534'
}, {
    ad: 'durssu',
    soyad: 'akssay',
    cinsiyet: 'female',
    sehir: 'bursa',
    telno: '0535'
}
]



const addReh = async() => {
        let sec= await input.text('kişi bilgilerini aralarında bir boşluk olacak şekilde giriniz.(ad soyad şehir cinsiyet numara):',{default:'kişiad kişisoyad istanbul kadın 531564'})
    
       let gecici = []
        gecici = sec.split(' ')
        rehber.push({ ad: gecici[0], soyad: gecici[1], cinsiyet: gecici[2], sehir: gecici[3], telno: gecici[4] })
        console.log(rehber)
        rehProg()

}

const delReh =async () => {
    let sec= await input.text('Silinecek kişini telnosunu yazın:')
    
        var sayac = false;
        for (let i = 0; i < rehber.length; i++) {
            if (rehber[i].telno == sec) {
                rehber.splice(i, 1)
                sayac = true
            }
        }
        if (sayac == false) {
            console.log('Bu telno ya ait bir kişi bulunamadı. Aşağıdan rehberi kontrol edebilirsiniz')
        }
        console.log(rehber)
    rehProg()

}
const updateReh = async() => {
    let sec= await input.text('Güncellemek istediğiniz kişiin telefon nosunu giriniz:')
        var control = false;
        const kisi = rehber.filter((item) => item.telno == sec)
        if (kisi.length > 0) {
            let sec= await input.text('Güncellenecek kişi bilgilerini aralarında bir boşluk olacak şekilde giriniz.(ad soyad şehir cinsiyet numara):')
                let tut = sec.split(' ')

                kisi[0].ad = tut[0];
                kisi[0].soyad = tut[1]; 
                kisi[0].cinsiyet = tut[2]
                kisi[0].sehir = tut[3]; 
                kisi[0].telno = tut[4]
                console.log(rehber)
                control = true
                rehProg() 
            
        }

        else if (kisi.length == 0) { console.log('Böyle bir kişi yok. Kontrol ediniz.') 
        rehProg() 
    }
      
}
const listele=async()=>{
    let sec= await input.text('Listelenecek cinsiyeti girin:(male/female)')
        const list=rehber.filter((items)=>items.cinsiyet==sec)
        if(list.length>0){
            console.log(list)
        }else {
            console.log('Listede cinsiyette kayıtlı kimse yok. lütfen kontrol edin')
        }
        rehProg()
}
const tumListe=()=>{
    console.log('güncel liste')
    let list=rehber.forEach((items)=>console.log(items))
    rehProg()
}

function cik(){
    console.log('Çıkılıyor..')
    setTimeout(()=>{
    rl.close();},1000)
    
}
 
         

const randomEkle=async()=>{
    let sec= await input.checkboxes('Lütfen api seçimi yapınız(Lütfen tek bir seçim yapınız):',['1.Apiden Getir','2.Apiden Getir','İki apiden de getir','Hızlı olanı getir',])
    let x;
    if(sec[0]==='1.Apiden Getir'){
    x=await userEkle.randomUser1()
    rehber.push({ad:x.ad, soyad:x.soyad, cinsiyet:x.cinsiyet,sehir:x.sehir,telno:x.telno})
    console.log('eklenen kişi:\n ', x)
    
}else if(sec[0]==='2.Apiden Getir'){
    x=await userEkle.randomUser2()
    rehber.push({ad:x.ad, soyad:x.soyad, cinsiyet:x.cinsiyet,sehir:x.sehir,telno:x.telno})
    console.log('eklenen kişi: ', x)
    
}else if(sec[0]==='İki apiden de getir'){
    var a= await userEkle.ikili()
    rehber.push({ad:a[0].ad, soyad:a[0].soyad, cinsiyet:a[0].cinsiyet,sehir:a[0].sehir,telno:a[0].telno})
    rehber.push({ad:a[1].ad, soyad:a[1].soyad, cinsiyet:a[1].cinsiyet,sehir:a[1].sehir,telno:a[1].telno})
    console.log('eklenen kişiler: ', a)

}else if(sec[0]==='Hızlı olanı getir'){
    x=await userEkle.races()
    rehber.push({ad:x.ad, soyad:x.soyad, cinsiyet:x.cinsiyet,sehir:x.sehir,telno:x.telno})
    console.log('eklenen kişi: ', x)
}
tumListe()

}



async function rehProg(){
    let sec= await input.checkboxes('İşlemler Yapmak istediğiniz işlemi giriniz(Lütfen tek bir seçim yapınız):',['Kişi Ekle','Kişi Sil','Kişi Güncelle','Cinsiyete göre Listele','Tüm kayıtları Listele','Random kişi ekle','Çıkış'])
        if(sec=='Kişi Ekle'){
            addReh();
        }else if(sec=='Kişi Sil'){
             delReh();
        }else if(sec=='Kişi Güncelle'){
             updateReh();
        }else if(sec=='Cinsiyete göre Listele'){
             listele();
        }else if(sec=='Tüm kayıtları Listele'){
             tumListe();
        }else if(sec=='Çıkış'){
             cik()
        } else if (sec=='Random kişi ekle'){
            randomEkle() 
        }
       else {
            console.log("Geçersiz işlem! Lütfen geçerli bir işlem seçiniz.");
            rehProg();
        }
}
rehProg();