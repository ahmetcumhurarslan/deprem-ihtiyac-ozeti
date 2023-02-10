# deprem-ihtiyac-ozeti
deprem bölgesindeki acil ihtiyaçların belirlenip sınıflandırmasını kolaylaştırmak için openai tabanlı özetleme scripti. bilgiler ekşi sözlükteki deprem yardımlaşma başlığından çekilmektedir ancak istenildiği takdirde başka kaynaklar da kullanılabilir.

500 karakterden fazla olan girdiler dikkate alınmamaktadır. 
~~~node
//eksi.js
if (content.length < 500) list.push(content);
~~~

bilgilerin alınmasının istendiği sayfalar index.js'de ki satır değiştirilerek ayarlanabilir:
~~~nodejs
//index.js
asyncMain('https://eksisozluk.com/6-subat-2023-deprem-yardimlasma-basligi--7568616',1310,1308);
~~~

## kurulum
1. gerekli kütüphaneleri kurmak için:
~~~
npm install
~~~

2. yeni bir .env dosyası oluşturmak için:
~~~
cp .env-sample .env
~~~

3. .env dosyası içindeki OPENAI_API_KEY değişkenini doldurulması gerekiyor:
~~~
OPENAI_API_KEY: "......"
~~~

4. çalıştırmak için:
~~~
node index.js
~~~



## örnek çıktılar

çıktılar data klasöründe yer alacaktır. aşağıda ekşi sözlükteki bir sayfada olan girdiler yer almaktadır:

~~~
(bkz: afet bölgelerinde yardım tırlarının konumları)(bkz: afet bölgelerinde sağlık alanlarının konumları)

gaziantep-teyitliçok acil!ulaş mahallesi 70101 nolu sokak no.31 kat.2yeni doğmuş bir bebek var. sokaktalar. gıda, bez ve battaniyeye ihtiyaç var.&#x2B;90 538 043 66 05-rukiye

huriye:kahramanmaraş&#x27;ta ihtiyaç sahibi ailemiz var ise battaniye bebek bezi bebek maması kuru gıda temini vardır ihtiyac sahibi var ise yönlendirinhidayet 05393692534

öğretmen olan arkadaşlarımın ısıtıcı, çadır ve gıda ihtiyacı varmış. lütfen yardım eder misiniz.server erturk : 0537 948 0252ıskenderun ısmet inonu mahallesi ( tam adres arayip ulasabilir)mehmet öğünç05542549692 ikisi de aynı yerde

https://twitter.com/&#x2026;?t=iw9nspjgkrg-g4alyhfnwq&amp;s=19 gündemde olması gerekiyor bunun

adıyamanda sokakta kalan 5 kişilik bir aile ankaraya gelmek istiyor ve kalacak yer arıyorlar. biri çok yaşlı bir kadın. hasan bey adıyaman0 545 202 40 44https://twitter.com/&#x2026;?s=20&amp;t=ypleg1zx90mqptcdufpnlq

sırasöğüt mahallesi. gaziantep şahinbey, 60 kişi sayı artmaya devam ediyor. bebek bezi maması gıda yiyecek içecek gerekli. 80 yaş üzeri yaşlı insanlar var ısıtma gerekli. 0507 245 8376 belgin hanım iletişim numarası.https://twitter.com/&#x2026;?s=20&amp;t=ypleg1zx90mqptcdufpnlq

--gaziantep--yeni bademli mahallesi nurdağı - gaziantepiletişim 0552 799 39 55çadır , ısıtıcı, battaniye ve gıda ihtiyacı var. küçük çocuklar da var besin eksiği çekiliyor.https://twitter.com/&#x2026;?s=20&amp;t=ypleg1zx90mqptcdufpnlq

-hatay !!!!galip kurt0534 638 7950hatay hassa aktepe köyüerzakları var çadır ve ısıtıcı ihtiyaçları var. elektrikleri yokhttps://twitter.com/&#x2026;?s=20&amp;t=ypleg1zx90mqptcdufpnlq
~~~


bu sayfada yer alan bilgilerin tablo halindeki özeti şu şekilde olmaktadır:

~~~
| --- | --- | --- | --- |
| Gıda, Bez, Battaniye | Yeni Doğmuş Bebek, Ulaş Mahallesi, 70101 Nolu Sokak No.31 Kat.2, Gaziantep | 90 538 043 66 05 | Rukiye |
| Battaniye, Bebek Bezi, Bebek Maması, Kuru Gıda | Kahramanmaraş | 05393692534 | Huriye | 
| Çadır, Isıtıcı, Gıda | Ismet Inonu Mahallesi, Ankara | 0537 948 0252 | Server Erturk |
| Çadır, Isıtıcı, Battaniye, Gıda | Yeni Bademli Mahallesi, Nurdağı, Gaziantep | 0552 799 39 55 | - |
| Erzakları, Çadır, Isıtıcı | Galip Kurt, Hassa Aktepe Köyü, Hatay | 0534 638 7950 | - |
~~~


Önemli Uyarı!!!
============

elde edilecek bilgiler hatalara sahip olma ihtimali yüksek olup teyite muhtaçtır. kesinlik arzetmeyen bu bilgiler sadece yardımcı bir araç olarak kullanılmalıdır.



## TODO

- adres bilgilerini koordinatlara çevirip harita üzerinde görüntülenmesi sağlanılabilir.
- filtreler eklenip konular daraltılabilir.
- openai script'inde iyileştirmeler yapılabilir.
- gerekli görülürse bir arayüz yazılabilir.
- ekşisözlük dışındaki kaynaklarla da denemeler yapılabilir.



