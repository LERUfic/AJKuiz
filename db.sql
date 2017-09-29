-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 07, 2016 at 11:21 PM
-- Server version: 5.5.52-0ubuntu0.14.04.1
-- PHP Version: 5.5.35-1+donate.sury.org~trusty+4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ajkuiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `soalAjkuiz`
--

CREATE TABLE IF NOT EXISTS `soalAjkuiz` (
  `soal_id` int(11) NOT NULL AUTO_INCREMENT,
  `soal_ajkuiz` char(100) NOT NULL,
  `opsiA_ajkuiz` char(100) NOT NULL,
  `opsiB_ajkuiz` char(100) NOT NULL,
  `opsiC_ajkuiz` char(100) NOT NULL,
  `opsiD_ajkuiz` char(100) NOT NULL,
  `kategori_ajkuiz` varchar(45) NOT NULL,
  `jawaban_ajkuiz` char(2) NOT NULL,
  PRIMARY KEY (`soal_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `soalAjkuiz`
--

INSERT INTO `soalAjkuiz` (`soal_id`, `soal_ajkuiz`, `opsiA_ajkuiz`, `opsiB_ajkuiz`, `opsiC_ajkuiz`, `opsiD_ajkuiz`, `kategori_ajkuiz`, `jawaban_ajkuiz`) VALUES
(1, 'Apa kepanjangan dari MVC pada konsep framework saat ini?', 'Model, View, Controller', 'Modal, View, Controller', 'Module, View, Controller', 'Model, Visiter, Controller', 'teknologi', 'A'),
(2, 'Versi CSS terbaru?', '3', '2.5', '4', '5', 'teknologi', 'A'),
(3, 'Laravel dan Yii merupakan contoh dari framework?', 'PHP', 'Java', 'Ruby', 'C#', 'teknologi', 'A'),
(4, 'React js dikembangkan oleh?', 'Google', 'Facebook', 'IBM', 'Microsoft', 'teknologi', 'B'),
(5, 'Angular js dikembangkan oleh?', 'Google', 'Oracle', 'IBM', 'Facebook', 'teknologi', 'A'),
(6, 'NginX merupakan salah satu contoh dari?', 'Web Server', 'Web Framework', 'Web Generator', 'Web Debugger', 'teknologi', 'A'),
(7, 'Dibawah yang bukan merupakan web server?', 'Litespeed', 'Apache', 'IIS', 'Xampp', 'teknologi', 'D'),
(8, 'Port 443 digunakan untuk protokol?', 'HTTP', 'HTTPS', 'IMAP', 'FTP', 'teknologi', 'B'),
(9, 'Apa kepanjangan dari VPS?', 'Virtual Private Server', 'Virtual Protocol Server', 'Virtual Personal Server', 'Virtual Private Socket', 'teknologi', 'A'),
(10, 'Linux adalah?', 'OS', 'Web Framework', 'Web Builder', 'VPS', 'teknologi', 'A');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;