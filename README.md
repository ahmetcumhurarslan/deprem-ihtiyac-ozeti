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
