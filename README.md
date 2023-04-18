## challenge coding

### terlebih dahulu anda harus menginstall mysql & Node Package Manager di laptop/komputer anda

tutorial untuk task 2 (folder api):
1. jalan kan server mysql di laptop/komputer anda, kemudian buat database seperti di konfigurasi **api/config/config.json** pada "development"
2. install node modules dependency nya dengan cara mengetikkan **npm install** di dalam terminal/cmd, tunggu sampai selesai
3. generate tabel dengan cara mengetikan **npx sequelize-cli db:migrate** di dalam terminal/cmd
4. jalankan server dengan mengetikkan **npm start** di dalam terminal
5. gunakan postman untuk menjalan kan program nya.

6. route ke http://localhost:4000/user/register untuk melakukan register user, contoh:
{
    "name":"m. andi",
    "username":"andi",
    "password":"pass123"
}

7. route ke http://localhost:4000/user/login untuk melakukan login user, contoh:
{
    "username":"andi",
    "password":"pass123"
}

8. route ke http://localhost:4000/user untuk menampilkan semua user (harus memasukkan accesstoken yang di dapat dari login ke postman tab authorization, type bearer token )

9. route ke http://localhost:4000/user/token untuk menggenerate accesstoken yg telah expired tanpa harus login lagi

10. route ke http://localhost:4000/user/logout untuk logout user