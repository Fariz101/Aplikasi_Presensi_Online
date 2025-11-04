## Aplikasi Presensi Online
# Panduan Mockup API
1. Autentikasi dan Otorisasi
Endpoint: /api/auth/login
Method: POST
Description: Untuk login pengguna dan menghasilkan token autentikasi.
<img width="1269" height="697" alt="image" src="https://github.com/user-attachments/assets/aa89b01c-438a-4f05-8863-8558eaa26156" />

2. Pengelolaan Data Pengguna
- Menambah Pengguna
Endpoint: /api/users
Method: POST
Description: Untuk menambahkan data pengguna baru.
<img width="1265" height="843" alt="image" src="https://github.com/user-attachments/assets/2a2e9e2e-531f-41ab-80a9-617e5023a721" />
- Mengubah Data Pengguna
Endpoint: /api/users/{id}
Method: PUT
Description: Untuk mengubah data pengguna.
<img width="1259" height="827" alt="image" src="https://github.com/user-attachments/assets/15adfa0b-1a27-4617-9f04-52b0e42016c0" />
- Mengambil Data Pengguna
Endpoint: /api/users/{id}
Method: GET
Description: Mengambil data pengguna berdasarkan ID.
<img width="1260" height="872" alt="image" src="https://github.com/user-attachments/assets/3a1c81ff-d5a9-4560-ba0f-732f83f50079" />

3. Pencatatan Presensi
- Melakukan Presensi
Endpoint: /api/attendance
Method: POST
Description: Untuk mencatat kehadiran pengguna pada hari tersebut.
<img width="1259" height="865" alt="image" src="https://github.com/user-attachments/assets/0f1f4d26-06cc-4e28-8911-51894fec9577" />
- Melihat Riwayat Presensi Pengguna
Endpoint: /api/attendance/history/{user_id}
Method: GET
Description: Mengambil riwayat presensi pengguna berdasarkan ID pengguna.
<img width="1262" height="897" alt="image" src="https://github.com/user-attachments/assets/3f6ce696-9649-4856-9e99-d119430b2497" />

4. Analisis Kehadiran
- Melihat Rekap Kehadiran Bulanan
Endpoint: /api/attendance/summary/{user_id}
Method: GET
Description: Menampilkan rekap kehadiran bulanan pengguna.
<img width="1263" height="857" alt="image" src="https://github.com/user-attachments/assets/0a42b34b-b520-4c87-9930-67d4e2ebed90" />
- Analisis Tingkat Kehadiran Berdasarkan Parameter Tertentu
Manajemen ingin mengetahui persentase kehadiran setiap pengguna berdasarkan parameter yang lebih spesifik, misalnya per periode tertentu. Manajemen juga ingin membandingkan tingkat kehadiran antar-kelompok, misalnya berdasarkan kelas atau jabatan, guna mengidentifikasi tren yang mungkin menunjukkan potensi masalah kedisiplinan.
Endpoint: /api/attendance/analysis
Method: POST
Description: Melakukan analisis tingkat kehadiran pengguna berdasarkan periode waktu dan kategori tertentu.








