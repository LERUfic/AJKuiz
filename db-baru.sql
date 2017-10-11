CREATE DATABASE  IF NOT EXISTS `ajkuiz` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ajkuiz`;
-- MySQL dump 10.13  Distrib 5.5.57, for debian-linux-gnu (i686)
--
-- Host: 127.0.0.1    Database: ajkuiz
-- ------------------------------------------------------
-- Server version	5.5.57-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kategori_ajkuiz`
--

DROP TABLE IF EXISTS `kategori_ajkuiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kategori_ajkuiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori_ajkuiz`
--

LOCK TABLES `kategori_ajkuiz` WRITE;
/*!40000 ALTER TABLE `kategori_ajkuiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `kategori_ajkuiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soalAjkuiz`
--

DROP TABLE IF EXISTS `soalAjkuiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `soalAjkuiz` (
  `soal_id` int(11) NOT NULL AUTO_INCREMENT,
  `soal_ajkuiz` char(100) NOT NULL,
  `opsiA_ajkuiz` char(100) NOT NULL,
  `opsiB_ajkuiz` char(100) NOT NULL,
  `opsiC_ajkuiz` char(100) NOT NULL,
  `opsiD_ajkuiz` char(100) NOT NULL,
  `jawaban_ajkuiz` char(2) NOT NULL,
  `kategori_id` int(11) NOT NULL,
  PRIMARY KEY (`soal_id`),
  KEY `soal_kategori_FK_idx` (`kategori_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soalAjkuiz`
--

LOCK TABLES `soalAjkuiz` WRITE;
/*!40000 ALTER TABLE `soalAjkuiz` DISABLE KEYS */;
INSERT INTO `soalAjkuiz` VALUES (1,'Apa kepanjangan dari MVC pada konsep framework saat ini?','Model, View, Controller','Modal, View, Controller','Module, View, Controller','Model, Visiter, Controller','A',0),(2,'Versi CSS terbaru?','3','2.5','4','5','A',0),(3,'Laravel dan Yii merupakan contoh dari framework?','PHP','Java','Ruby','C#','A',0),(4,'React js dikembangkan oleh?','Google','Facebook','IBM','Microsoft','B',0),(5,'Angular js dikembangkan oleh?','Google','Oracle','IBM','Facebook','A',0),(6,'NginX merupakan salah satu contoh dari?','Web Server','Web Framework','Web Generator','Web Debugger','A',0),(7,'Dibawah yang bukan merupakan web server?','Litespeed','Apache','IIS','Xampp','D',0),(8,'Port 443 digunakan untuk protokol?','HTTP','HTTPS','IMAP','FTP','B',0),(9,'Apa kepanjangan dari VPS?','Virtual Private Server','Virtual Protocol Server','Virtual Personal Server','Virtual Private Socket','A',0),(10,'Linux adalah?','OS','Web Framework','Web Builder','VPS','A',0);
/*!40000 ALTER TABLE `soalAjkuiz` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-09 21:18:57
