# AJKuiz

AJKuiz merupakan game online web-based game yang menggunakan Node.JS dan Socket.IO dalam penggunaannya. Gamenya adalah pemain menjawab pertanyaan yang ada di layar terpisah dan menggunakan device pilihan mereka untuk memilih pilihan jawabannya.

---

# What's new in this AJKuiz

Ada beberapa perubahan dari versi sebelumnya. Diantaranya:

1. Multiroom \(1 game-server bisa membuat banyak room\).
2. Ranking pemain dalam setiap permainan.
3. Halaman CRUD untuk melakukan edit soal.

---

# Installation

* **Requirement**s:
  * Linux\(Debian-based\)
  * Npm
  * Mysql
  * NodeJS \(ver 6.x.x\)

* **Cara menginstall game ini:**
  * **Install NodeJS**
    * Download NodeJS ver 6.x.x di [web resmi](https://nodejs.org/en/download/ "Download NodeJS") atau NodeJS [versi 6.11.3](https://intip.in/nodejs6113 "Download NodeJS v6.11.3") saat game ini dibuat.
    * Extract hasil download di /opt.
    * Jalankan di terminal _sudo update-alternatives --install /usr/bin/node node /opt/node-v6.11.3-linux-x64/bin/node 1_
  * **Install Npm**
    * Lakukan langkah 1 & 2 pada installasi NodeJS.
    * Jalankan di terminal _sudo update-alternatives --install /usr/bin/npm npm /opt/node-v6.11.3-linux-x64/bin/npm 1_
  * **Install Mysql**
    * Jalankan di terminal _sudo apt-get install mysql-server_
  * **Install AJKuiz**
    * Jalankan di terminal _git clone https://github.com/LERUfic/AJKuiz.git_
    * Masuk ke folder AJKuiz
    * Jalankan di terminal _npm install --save_
    * Import AJKuiz.sql ke database
    * Silahkan ubah di app.js\(pada bagian koneksi\) dan db.js lalu sesuaikan dengan autentifikasi dan nama database di mysql

---

# How to play

**Cara memainkan permainan AJKuiz:**

1. Game ini memerlukan 3 peran:
   1. Game-server
   2. Room-server
   3. Client
2. Komputer yang bertugas sebagai Game-server menjalankan di terminal _node app.js_
3. Komputer yang bertugas sebagai Room-server membuka di browser IP game-server dengan port 5000 _IPGameServer:5000/dashboard_
4. Device yang bertugas sebagai Client membuka di browser IP game-server dengan port 5000 _IPGameServer:5000_
5. Silahkan device client memasukan username dan nomor room
6. Room-server klik enter dan memilih kategori
7. Mainkan gamenya dengan melihat pertanyaan yang ada di device room-server dan menjawabnya di device client



**Cara melakukan CRUD soal AJKuiz:**

1. membuka di browser IP game-server dengan port 5000 _IPGameServer:5000/admin_
2. Silahkan lakukan CRUD terhadap soal AJKuiz di halaman ini.

---

##### Previous Version:

###### [https://github.com/fathoniadi/ajkuiz](https://github.com/fathoniadi/ajkuiz.git)



