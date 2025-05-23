<?php
// Tangkap IP
$ip = $_SERVER['REMOTE_ADDR'];

// Tangkap User-Agent (informasi perangkat & browser)
$userAgent = $_SERVER['HTTP_USER_AGENT'];

// Waktu akses
$time = date("Y-m-d H:i:s");

// Format log
$log = "$time - IP: $ip - Agent: $userAgent\n";

// Simpan ke file log
file_put_contents("visitor_log.txt", $log, FILE_APPEND);
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beranda Rehan</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(to right, #d4dad6, #0728b9);
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .wrapper {
      background: #fff;
      border-radius: 20px;
      padding: 30px 20px;
      max-width: 700px;
      width: 90%;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      text-align: center;
    }

    .profile-img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .intro-text {
      font-size: 1rem;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .vertical-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  margin-top: 30px;
}

.square-btn {
  width: 180px;
  height: 60px;
  background-color: #000000;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease;
  box-shadow: 0 5px 12px rgba(0,0,0,0.1);
}

.square-btn:hover {
  background-color: #f90000;
  transform: scale(1.05);
}


    @media (max-width: 600px) {
      .profile-img {
        width: 120px;
        height: 120px;
      }

      h1 {
        font-size: 1.5rem;
      }

      .intro-text {
        font-size: 0.95rem;
      }
    }

    .footer {
  text-align: center;
  margin-top: 50px;
  padding: 20px 0;
  background-color: #f1f1f1;
}

.wa-link {
  font-size: 20px;
  color: #25D366; /* warna khas WhatsApp */
  text-decoration: none;
  font-weight: bold;
}

.wa-link i {
  margin-right: 8px;
}


.social-footer {
  text-decoration: none;
  color: #E1306C;
  font-weight: bold;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.social-footer i {
  margin-right: 8px;
}

.social-footer:hover {
  color: #c6285f;
}

.social-link:hover {
  background-color: #c6285f;
  transform: scale(1.05);
}

.social-link i {
  margin-right: 8px;
}
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Foto profil -->
    <img src="2.jpg" alt="Foto Rehan" class="profile-img">
    
    <!-- Judul -->
    <h1>Selamat Datang di Beranda Rehan 👋😊</h1>

    <!-- Teks sambutan -->
    <p class="intro-text">
      Halo, saya Rehan! 👨‍💻<br>
      Silahkan pilih menu! 🚀
    </p>

    <!-- Tombol kembali -->
    <div class="vertical-buttons">
      <a href="index.html" class="square-btn">Kembali ke Halaman Utama</a>
      <a href="😍💐.html" class="square-btn">😍💐</a>
      <a href="random.html" class="square-btn">Random</a>

      <!-- Footer -->
<footer>
  <a href="https://instagram.com/rehannnnap" target="_blank" class="social-footer">
    <i class="fab fa-instagram"></i>
      <a href="https://wa.me/6282243249709" target="_blank" class="wa-link">
        <i class="fab fa-whatsapp"></i> 
    </footer>
  </a>
  <head>
    <!-- Tambahkan ini di dalam <head> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  </head>
</footer>
    </div>
    </body>
  </div>
</body>
</html>

