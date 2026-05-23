# Menggunakan image Nginx versi ringan
FROM nginx:alpine

# Menyalin seluruh file frontend ke direktori default Nginx
COPY . /usr/share/nginx/html

# Mengekspos port 80 agar bisa diakses
EXPOSE 80

# Menjalankan Nginx di foreground
CMD ["nginx", "-g", "daemon off;"]