
Nama :Muhammad Rizki Zulfauzi

NIM :20240140039


1. Tampilan ui
<img width="1920" height="1080" alt="Screenshot 2026-08-12 194139" src="https://github.com/user-attachments/assets/e85bfa40-2e67-4655-806a-90f8b955459a" />
2. Tampilan Riwayat
<img width="1920" height="1080" alt="Screenshot 2026-08-12 194147" src="https://github.com/user-attachments/assets/898eb1d1-6b31-4d01-a585-1e59428034ef" />
3. Post Chat
<img width="1920" height="1080" alt="Screenshot 2026-08-12 191237" src="https://github.com/user-attachments/assets/0460922e-0c36-4a4d-9912-c66773c9c356" />
4. Post History
<img width="1920" height="1080" alt="Screenshot 2026-08-12 191458" src="https://github.com/user-attachments/assets/b3ac9926-ee75-46b6-b3ca-113a1921d732" />
5. Get/Read History 
<img width="1920" height="1080" alt="Screenshot 2026-08-12 191613" src="https://github.com/user-attachments/assets/3e206d69-c9fa-47a3-b422-4a7eefeb4864" />







1. Deskripsi

Pada tugas WEEK 10 dilakukan pengembangan fitur penyimpanan riwayat percakapan (message history) pada fitur Chat With AI.

Fitur yang dikembangkan meliputi:

Chat dengan AI.

Menyimpan pesan dan balasan AI ke database.

Menampilkan kembali riwayat percakapan.

Penyimpanan riwayat hanya dilakukan apabila user menyetujui.

Menggunakan Sequelize ORM.

Menambahkan tampilan Chat With AI menggunakan HTML dan Tailwind CSS.

2. Teknologi yang Digunakan

Node.js

Express.js

PostgreSQL

Sequelize ORM

Gemini AI

HTML

JavaScript

Tailwind CSS

Postman

3. Kontrak API

3.1 Chat dengan AI

Endpoint

POST /api/chat

Request

{
  "message": "Ada produk apa?"
}

Response

{
  "code": 200,
  "success": true,
  "message": "Berhasil dapat balasan",
  "data": {
    "reply": "..."
  }
}

Endpoint digunakan untuk mengirim pesan kepada AI dan mendapatkan balasan.

3.2 Create Message History

Endpoint

POST /api/chat/history

Request

{
  "message": "Ada produk apa?",
  "reply": "Ada beberapa produk yang tersedia.",
  "saveHistory": true
}

Response Berhasil

Status: 201 Created

{
  "code": 201,
  "success": true,
  "message": "Riwayat percakapan berhasil disimpan"
}

Jika saveHistory bernilai true, percakapan disimpan ke database menggunakan Sequelize ORM.

3.3 Penyimpanan Ditolak

Endpoint

POST /api/chat/history

Request

{
  "message": "Chat ini jangan disimpan",
  "reply": "Baik, chat ini tidak akan disimpan.",
  "saveHistory": false
}

Response

Status: 400 Bad Request

{
  "code": 400,
  "success": false,
  "message": "Riwayat tidak disimpan karena user tidak menyetujui"
}

Jika user tidak menyetujui penyimpanan, data tidak dimasukkan ke database.

3.4 Read Message History

Endpoint

GET /api/chat/history

Request

Tidak membutuhkan body.

Response

Status: 200 OK

{
  "code": 200,
  "success": true,
  "message": "Berhasil mengambil riwayat percakapan",
  "data": [
    {
      "id": 1,
      "message": "Ada produk apa?",
      "reply": "Ada beberapa produk yang tersedia.",
      "save_history": true
    }
  ]
}

Endpoint digunakan untuk menampilkan kembali riwayat percakapan yang telah tersimpan.

4. Model Database

Model message dibuat menggunakan Sequelize ORM.

Tabel: messages

Field

Tipe

Keterangan

id

INTEGER

Primary key dan auto increment

message

TEXT

Pesan dari user

reply

TEXT

Balasan dari AI

save_history

BOOLEAN

Status persetujuan penyimpanan

createdAt

DATETIME

Waktu data dibuat

updatedAt

DATETIME

Waktu data diperbarui

5. Implementasi

File yang dikembangkan:

models/message.model.js — model Sequelize untuk message history.

controllers/chat.controller.js — logic chat, create history, dan read history.

routes/chat.routes.js — endpoint API.

public/index.html — tampilan Chat With AI.

public/script.js — integrasi frontend dengan API.

6. Screenshot Tampilan

6.1 Chat With AI



6.2 Message History



7. Screenshot Testing API

7.1 Chat AI

POST /api/chat



7.2 Create History

POST /api/chat/history

Hasil: 201 Created



7.3 Read History

GET /api/chat/history

Hasil: 200 OK



7.4 History Tidak Disimpan

Jika saveHistory: false, API memberikan 400 Bad Request dan data tidak disimpan.



8. Kesimpulan

Fitur message history berhasil diimplementasikan pada aplikasi Chat With AI.

Fitur yang berhasil dibuat:

Chat dengan AI.

Create message history.

Read message history.

Persetujuan penyimpanan history.

Penolakan penyimpanan apabila user tidak menyetujui.

Penyimpanan menggunakan Sequelize ORM.

Tampilan Chat With AI menggunakan HTML dan Tailwind CSS.

Pengujian endpoint menggunakan Postman.
