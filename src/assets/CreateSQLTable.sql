-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 149.165.168.142    Database: ParkingMaster
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `DataLog`
--

DROP TABLE IF EXISTS `DataLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DataLog` (
  `LogID` int(11) NOT NULL AUTO_INCREMENT,
  `VehicleID` int(50) DEFAULT NULL,
  `StudentID` int(50) DEFAULT NULL,
  `Location` varchar(25) DEFAULT NULL,
  `DateLog` datetime DEFAULT NULL,
  `TagStatus` tinyint(1) NOT NULL,
  PRIMARY KEY (`LogID`),
  UNIQUE KEY `LogID_UNIQUE` (`LogID`),
  KEY `Vehicle_ID_FK_DataLog_idx` (`VehicleID`),
  KEY `Student_ID_FK_DataLog_idx` (`StudentID`),
  CONSTRAINT `Student_ID_FK_DataLog` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Vehicle_ID_FK_DataLog` FOREIGN KEY (`VehicleID`) REFERENCES `Vehicles` (`VehicleID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Students` (
  `StudentID` int(11) NOT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `VehicleID` int(11) DEFAULT NULL,
  PRIMARY KEY (`StudentID`),
  UNIQUE KEY `StudentID_UNIQUE` (`StudentID`),
  KEY `Vehicle_ID_FK_idx` (`VehicleID`),
  CONSTRAINT `Vehicle_ID_FK` FOREIGN KEY (`VehicleID`) REFERENCES `Vehicles` (`VehicleID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Vehicles`
--

DROP TABLE IF EXISTS `Vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vehicles` (
  `VehicleID` int(11) NOT NULL AUTO_INCREMENT,
  `StudentID` int(11) DEFAULT NULL,
  `Make` varchar(25) DEFAULT NULL,
  `Model` varchar(25) DEFAULT NULL,
  `Year` int(4) DEFAULT NULL,
  `LicencePlate` varchar(7) DEFAULT NULL,
  `TagNum` varchar(45) DEFAULT NULL,
  `TagStatus` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`VehicleID`),
  UNIQUE KEY `VehicleID_UNIQUE` (`VehicleID`),
  UNIQUE KEY `TagID_UNIQUE` (`TagNum`),
  UNIQUE KEY `Licence Plate_UNIQUE` (`LicencePlate`),
  KEY `Student_ID_FK_idx` (`StudentID`),
  CONSTRAINT `Student_ID_FK` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-23 12:00:30
