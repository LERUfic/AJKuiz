-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 31, 2017 at 11:11 PM
-- Server version: 10.0.31-MariaDB-0ubuntu0.16.04.2
-- PHP Version: 7.0.25-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ajkuiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategori_ajkuiz`
--

CREATE TABLE `kategori_ajkuiz` (
  `id` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kategori_ajkuiz`
--

INSERT INTO `kategori_ajkuiz` (`id`, `nama`) VALUES
(1, 'teknologi'),
(12, 'biologi'),
(13, 'Trivia ITS'),
(14, 'Schematics'),
(15, 'File Management'),
(16, 'EXPO ITS');

-- --------------------------------------------------------

--
-- Table structure for table `soalAjkuiz`
--

CREATE TABLE `soalAjkuiz` (
  `soal_ajkuiz` char(100) NOT NULL,
  `opsiA_ajkuiz` char(100) NOT NULL,
  `opsiB_ajkuiz` char(100) NOT NULL,
  `opsiC_ajkuiz` char(100) NOT NULL,
  `opsiD_ajkuiz` char(100) NOT NULL,
  `kategori_id` int(11) NOT NULL,
  `jawaban_ajkuiz` char(2) NOT NULL,
  `soal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soalAjkuiz`
--

INSERT INTO `soalAjkuiz` (`soal_ajkuiz`, `opsiA_ajkuiz`, `opsiB_ajkuiz`, `opsiC_ajkuiz`, `opsiD_ajkuiz`, `kategori_id`, `jawaban_ajkuiz`, `soal_id`) VALUES
('Apa kepanjangan dari MVC pada konsep framework saat ini?', 'Model, View, Controller', 'Modal, View, Controller', 'Module, View, Controller', 'Model, Visiter, Controller', 1, 'A', 1),
('Versi CSS terbaru?', '3', '2.5', '4', '5', 1, 'A', 2),
('Laravel dan Yii merupakan contoh dari framework?', 'PHP', 'Java', 'Ruby', 'C#', 1, 'A', 3),
('React js dikembangkan oleh?', 'Google', 'Facebook', 'IBM', 'Microsoft', 1, 'B', 4),
('Angular js dikembangkan oleh?', 'Google', 'Oracle', 'IBM', 'Facebook', 1, 'A', 5),
('NginX merupakan salah satu contoh dari?', 'Web Server', 'Web Framework', 'Web Generator', 'Web Debugger', 1, 'A', 6),
('Dibawah yang bukan merupakan web server?', 'Litespeed', 'Apache', 'IIS', 'XAMPP', 1, 'D', 7),
('Port 443 digunakan untuk protokol?', 'HTTP', 'HTTPS', 'IMAP', 'FTP', 1, 'B', 8),
('Apa kepanjangan dari VPS?', 'Virtual Private Server', 'Virtual Protocol Server', 'Virtual Personal Server', 'Virtual Private Socket', 1, 'A', 9),
('Linux adalah?', 'OS', 'Web Framework', 'Web Builder', 'VPS', 1, 'A', 10),
('Teratai dapat terapung di permukaan air karena mmepunyai....', 'Batang yang berongga', 'Akar yang panjang', 'Daun yang kecil', 'Duri yang tajam', 12, 'A', 26),
('Fungsi paruh bebek yang lebar dan tipis yaitu ....', 'Mengoyak daging', 'Meminum air sebanyak-banyaknya', 'Menyaring makanan dari air', 'Menggaruk tanah', 12, 'C', 27),
('Bebek melakukan adaptasi berupa ....', 'Memiliki bulu yang tipis', 'Mempunyai paruh yang tajam', 'Memiliki selaput pada kaki', 'Memiliki cakar pada kaki', 12, 'C', 28),
('Beruang kutub dapat terlindung dari cuaca dingin karena mempunyai ....', 'Bulu yang keras dan runcing', 'Lapisan lemak dan bulu tebal', 'Darah yang panas', 'Lapisan kulit yang tajam', 12, 'B', 29),
('Contoh tumbuhan yang melakukan adaptasi untuk memperoleh makanan yaitu....', 'Kantung semar', 'Mawar', 'Kaktus', 'Teratai', 12, 'A', 30),
('Kemampuan bunglon mengubah warna tubuhnya yaitu untuk ....', 'Memudahkan berkembangbiak', 'Memudahkan mengendap menangkap mangsa', 'Menarik perhatian mangsa', 'Memudahkan memanjat pohon', 12, 'B', 31),
(' Unta memiliki punuk dipunggungnya yang berguna untuk ....', 'Menarik perhatian betina', 'Menyimpan cadangan makanan dan air', 'Melindungi diri dari musuh', 'Menarik penampilan di gurun', 12, 'B', 32),
('Hewan yang melindungi diri dengan mengeluarkan bau yang menyengat yaitu ....', ' Walangsangit', 'Gajah', 'Komodo', 'Jangrik', 12, 'A', 33),
('Hewan yang melumpuhkan mangsa dengan racun yang dimilikinya yaitu ....', 'lipan dan musang', 'macan dan kalajengking', 'ular dan singa', 'ular dan kalajengking', 12, 'D', 34),
('Landak melindungi diri dengan cara....', 'Sirip yang luas', 'Kulit duri yang tajam', 'Bau yang menyengat', 'Racun yang berbisa', 12, 'B', 35),
('Kepanjangan dari ITS', 'Institut Teknologi Sepuluh November', 'Institut Teknologi Sepuluh Nopember', 'Institut Teknologi Surabaya', 'Institut Teknologi Singapore', 13, 'B', 36),
('Nama rektor ITS saat ini...', 'Prof. Ir. Priyo Suprobo, MS. PhD', 'Prof. Dr. Ir. Mohammad Nuh DEA', 'Prof. Dr. Ir. Triyogi Yuwono, DEA', 'Prof. Ir. Joni Hermana, M.Sc.ES. Ph.D', 13, 'D', 37),
('Dies Natalis ITS keberapa tahun ini?', '55', '56', '57', '58', 13, 'C', 38),
('Jumlah fakultas di ITS (Januari 2017)...', '8', '7', '6', '5', 13, 'A', 39),
('Website ITS...', 'www.its.ac.id', 'www.its.com', 'www.its.co.id', 'www.its.go.id', 13, 'A', 40),
('Apa Kepanjangan dari NLC', 'National Logic Contest', 'National Logic Competition', 'National Lomba Cerpen', 'National Lomba Ceria', 14, 'B', 41),
('Kepanjangan NST', 'National Seminar of Technology', 'National Seminar of Technique', 'National Semesta Teknologi', 'Nasi Sayur Tempe', 14, 'A', 42),
('Departemen apa yang mengadakan Schematics', 'TC', 'Informatika', 'Teknik Informatika', 'Informatics', 14, 'A', 43),
('Apa kepanjangan kamzin', 'Keamanan Gizi Nasional', 'Kameramen Perizinan', 'Keamanan Perizinan', 'kamzzzzziiiiiiiiiiiinnnnnnnnnnnnn', 14, 'C', 44),
('Kepanjangan NPC adalah...', 'National Programming Contest', 'Nasi Pecel Cireng', 'Nasi Padang Cendol', 'National Programming Competition', 14, 'A', 45),
('7777 = ????', 'rwxrwxrwx', 'rwxrwsrwt', 'rwsrwsrwt', 'rwrrwrrwr', 15, 'C', 46),
('r-xr-xr-x', '244', '0444', '0555', '1111', 15, 'C', 47),
('1473 = ???', 'r--rwx-wxt', '--xrwx-xT', '---rwsrwx', 'invalid', 15, 'A', 48),
('0777 = ???', 'rw-rw-rw-', '---------', '-wx-wx-wx', 'rwxrwxrwx', 15, 'D', 49),
('0420 = ???', 'r---w----', 'rw-r-----', 'r--r-----', '-w-------', 15, 'A', 50),
('0312 = ???', 'r----x-w-', '-wx--x-w-', 'r-x-w--w-', '---------', 15, 'B', 51),
('-w-r-x--- = ???', '0250', '0341', '2500', '0333', 15, 'A', 52),
('-wx-wx--x = ???', '0331', '0665', '0223', '0442', 15, 'A', 53),
('rws--x--x = ???', '4511', '2633', '3142', '4711', 15, 'D', 54),
('2415 = ???', 'r----xr-x', 'r-s--xr-x', 'r----sr-x', 'rwxrwxrwx', 15, 'C', 55),
('Apa slogan ITS EXPO.', 'salam budaya, seni, dan ilmu', 'salam seni, ilmu, dan budaya', 'salam ilmu, seni, dan budaya', 'salam budaya, ilmu dan seni', 16, 'B', 56),
('Apa saja maskot ITS EXPO?', 'cilpa soca cosa', 'cilpa soka kosa', 'silpa soca kosa', 'cilpa soca kosa', 16, 'D', 57),
('apa web dari ITS EXPO?', 'expo.its.ac.id', 'www.expoits.com', 'http:/www.itsexpo.co.id', 'its.expo.ac.id', 16, 'A', 58),
('Merchandise yang tidak dijual oleh panitia ITS EXPO', 'kaos', 'gelang', 'tumblr', 'gantungan kunci', 16, 'C', 59);

-- --------------------------------------------------------

--
-- Table structure for table `tblWinner`
--

CREATE TABLE `tblWinner` (
  `username` varchar(30) NOT NULL,
  `channel` varchar(30) NOT NULL,
  `urutan` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblWinner`
--

INSERT INTO `tblWinner` (`username`, `channel`, `urutan`, `score`, `timestamp`) VALUES
('satria', '784', 1, 5, '2017-10-13 18:20:18'),
('thinosaurus', '912', 1, 9, '2017-10-13 20:26:45'),
('wechuck', '912', 2, 8, '2017-10-13 20:26:45'),
('halo', '912', 3, 8, '2017-10-13 20:26:45'),
('ambonghina', '228', 1, 9, '2017-10-13 20:26:46'),
('Big_Daddy', '228', 2, 7, '2017-10-13 20:26:46'),
('cron', '228', 3, 5, '2017-10-13 20:26:46'),
('satria1', '892', 1, 5, '2017-10-14 00:36:43'),
('satria2', '892', 2, 4, '2017-10-14 00:36:43'),
('sadasd', '889', 1, 4, '2017-10-14 00:59:15'),
('Satria', '133', 1, 3, '2017-10-14 01:06:38'),
('sadasd', '133', 2, 2, '2017-10-14 01:06:38'),
('satria1', '133', 3, 1, '2017-10-14 01:06:38'),
('satria1', '588', 1, 2, '2017-10-14 01:13:32'),
('sadasd', '588', 2, 0, '2017-10-14 01:13:32'),
('satria1', '101', 1, 2, '2017-10-14 01:19:41'),
('sadasd', '101', 2, 1, '2017-10-14 01:19:41'),
('sadasd', '114', 1, 3, '2017-10-14 01:35:31'),
('satria1', '114', 2, 3, '2017-10-14 01:35:32'),
('satria1', '290', 1, 3, '2017-10-14 01:43:25'),
('qwerr', '627', 1, 3, '2017-10-14 13:28:41'),
('asdsaas', '627', 2, 2, '2017-10-14 13:28:41'),
('Rld', '274', 1, 7, '2017-10-15 00:27:21'),
('raldo', '274', 2, 7, '2017-10-15 00:27:21'),
('Rafi', '160', 1, 4, '2017-10-15 10:32:52'),
('adisazhar123', '160', 2, 2, '2017-10-15 10:32:52'),
('Irham', '831', 1, 4, '2017-10-15 10:43:58'),
('hai', '398', 1, 3, '2017-10-15 10:57:54'),
('Hehehe', '398', 2, 2, '2017-10-15 10:57:54'),
('rey_hanzo', '856', 1, 2, '2017-10-15 11:07:02'),
('Bayun', '189', 1, 10, '2017-10-15 11:12:59'),
('Masaya', '189', 2, 10, '2017-10-15 11:12:59'),
('Samz', '189', 3, 10, '2017-10-15 11:12:59'),
('Naja', '189', 4, 8, '2017-10-15 11:12:59'),
('Masaya', '664', 1, 6, '2017-10-15 11:16:20'),
('Idlavon', '664', 2, 4, '2017-10-15 11:16:20'),
('Samz', '664', 3, 1, '2017-10-15 11:16:20'),
('Hana', '967', 1, 3, '2017-10-15 11:33:10'),
('Nokia', '703', 1, 10, '2017-10-15 11:49:17'),
('Dennis1', '703', 2, 9, '2017-10-15 11:49:17'),
('Rld', '554', 1, 2, '2017-10-15 11:57:38'),
('Tolski', '650', 1, 4, '2017-10-15 12:01:20'),
('Jancok', '650', 2, 4, '2017-10-15 12:01:20'),
('Aku', '445', 1, 4, '2017-10-15 12:05:40'),
('Nenen', '445', 2, 4, '2017-10-15 12:05:40'),
('Roico', '958', 1, 3, '2017-10-15 12:14:26'),
('Anc', '958', 2, 2, '2017-10-15 12:14:26'),
('Thoni', '272', 1, 10, '2017-10-15 12:25:54'),
('Thoni_huma_4_ever', '272', 2, 7, '2017-10-15 12:25:54'),
('Qhastalani', '986', 1, 8, '2017-10-15 12:34:09'),
('Batsuyaski', '986', 2, 8, '2017-10-15 12:34:09'),
('Hamidah', '674', 1, 8, '2017-10-15 12:38:15'),
('', '674', 2, 5, '2017-10-15 12:38:15'),
('Hamidah', '667', 1, 9, '2017-10-15 13:11:37'),
('Nahda', '912', 1, 5, '2017-10-15 13:25:38'),
('Aku', '912', 2, 3, '2017-10-15 13:25:38'),
('Fafa', '687', 1, 4, '2017-10-15 13:34:42'),
('Inini', '687', 2, 4, '2017-10-15 13:34:42'),
('Bon', '108', 1, 4, '2017-10-15 14:09:33'),
('Nindy', '108', 2, 4, '2017-10-15 14:09:33'),
('Bon', '642', 1, 9, '2017-10-15 14:13:52'),
('Nindy', '642', 2, 9, '2017-10-15 14:13:52'),
('Bontang', '207', 1, 4, '2017-10-15 14:22:11'),
('Irsa', '207', 2, 3, '2017-10-15 14:22:11'),
('Bon', '245', 1, 6, '2017-10-15 14:32:55'),
('Nah', '245', 2, 6, '2017-10-15 14:32:55'),
('Rld', '152', 1, 5, '2017-10-15 14:47:41'),
('denise', '152', 2, 4, '2017-10-15 14:47:41'),
('jancokers', '932', 1, 9, '2017-10-15 14:56:20'),
('932', '932', 2, 6, '2017-10-15 14:56:21'),
('jancokers', '431', 1, 4, '2017-10-15 15:00:13'),
('Fadilla', '431', 2, 3, '2017-10-15 15:00:13'),
('fadilla', '429', 1, 3, '2017-10-15 15:02:39'),
('jancokers', '429', 2, 3, '2017-10-15 15:02:39'),
('Edwin', '898', 1, 2, '2017-10-15 17:59:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategori_ajkuiz`
--
ALTER TABLE `kategori_ajkuiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `soalAjkuiz`
--
ALTER TABLE `soalAjkuiz`
  ADD PRIMARY KEY (`soal_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategori_ajkuiz`
--
ALTER TABLE `kategori_ajkuiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `soalAjkuiz`
--
ALTER TABLE `soalAjkuiz`
  MODIFY `soal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
