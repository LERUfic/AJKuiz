AJKuiz
===================


**AJKuiz** merupakan web application yang dapat digunakan sebagai media kuis online. **AJKuiz** memiliki dua bagian utama yaitu halaman soal dan halaman control jawaban yang terletak secara terpisah. Halaman control dapat dikendalikan melalui perangkat apapun.

**AJKuiz** dibuat menggunakan NodeJs, ExpressJs dan plugin Socket.io. Socket.io inilah yang menjadikan controll jawaban bisa terpisah dengan soal.
	 

----------


Instalasi
-------------



> **Requirement:**

> - NodeJs
> - Npm
> - nodemon (optional)
> - mysql


#### Instalasi NodeJs

sudo apt-get install nodejs nodejs-dev nodejs-legacy


#### Instalasi NPM
sudo apt-get install npm

####  Instalasi nodemon
sudo npm install -g nodemon

####  Instalasi mysql
sudo apt-get install mysql-server

#### Instalasi AJKuiz
1. Setelah Requirement terpenuhi langkah selanjutnya download / clone repo ajkuiz (https://github.com/fathoniadi/ajkuiz.git).
2. Buka command promp atau terminal
3. Pindah ke direktori ajkuiz
4. ketikan perintah <i>npm install --save</i> dan tunggu sampai proses selesai.
5. Setelah itu import file <i>.sql</i> yang sudah disediakan



----------


Konfigurasi
-------------------

Pada **AJKuiz** terdapat file app.js yang merupakan file server js. Secara default ketika dijalankan **AJKuiz** akan menggunakan port 5000.

Selain listen port pada app.js juga konfigurasi database yang dapat diganti.

----------


Cara Penggunaan
-------------
> 1. Ketikan nodemon app.js
> 2. Untuk halaman soal terdapat pada http://localhost:(port)/dashboard
> 3. Untuk halaman controll jawaban pada http://localhost:(port)/
> *port default : 5000

