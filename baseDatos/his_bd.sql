-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: crossover.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ala`
--

DROP TABLE IF EXISTS `ala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ala` (
  `ID_ala` int NOT NULL AUTO_INCREMENT,
  `Sector` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `Ubicacion` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID_ala`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ala`
--

LOCK TABLES `ala` WRITE;
/*!40000 ALTER TABLE `ala` DISABLE KEYS */;
INSERT INTO `ala` VALUES (1,'Urgencias','ala este'),(2,'Cirugias','ala norte'),(3,'terapia intermedia','ala sur'),(4,'terapia intensiva(UCI)','ala oeste');
/*!40000 ALTER TABLE `ala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `antecedentes_paciente`
--

DROP TABLE IF EXISTS `antecedentes_paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `antecedentes_paciente` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_paciente` int NOT NULL,
  `Enfermedad` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tipo` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Observaciones` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_paciente` (`ID_paciente`),
  CONSTRAINT `antecedentes_paciente_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antecedentes_paciente`
--

LOCK TABLES `antecedentes_paciente` WRITE;
/*!40000 ALTER TABLE `antecedentes_paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `antecedentes_paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `antecendentes_paciente`
--

DROP TABLE IF EXISTS `antecendentes_paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `antecendentes_paciente` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Enfermedad` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tipo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Observaciones` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ID_paciente` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_paciente` (`ID_paciente`),
  CONSTRAINT `antecendentes_paciente_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antecendentes_paciente`
--

LOCK TABLES `antecendentes_paciente` WRITE;
/*!40000 ALTER TABLE `antecendentes_paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `antecendentes_paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atenciones`
--

DROP TABLE IF EXISTS `atenciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atenciones` (
  `ID_paciente` int NOT NULL,
  `ID_Profesional` int NOT NULL,
  `Fecha` datetime NOT NULL,
  `Motivo` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID_paciente`,`ID_Profesional`),
  KEY `ID_paciente` (`ID_paciente`),
  KEY `ID_Profesional` (`ID_Profesional`),
  CONSTRAINT `atenciones_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`),
  CONSTRAINT `atenciones_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atenciones`
--

LOCK TABLES `atenciones` WRITE;
/*!40000 ALTER TABLE `atenciones` DISABLE KEYS */;
INSERT INTO `atenciones` VALUES (1,2,'2025-06-17 20:00:00','Cirugia progamada'),(2,1,'2025-06-19 07:41:00','Consulta'),(3,2,'2025-06-17 15:51:00','Endoscopia'),(7,3,'2025-06-16 15:45:00','Desintoxicación');
/*!40000 ALTER TABLE `atenciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camas`
--

DROP TABLE IF EXISTS `camas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camas` (
  `ID_hab` int NOT NULL,
  `ID_cama` int NOT NULL AUTO_INCREMENT,
  `Numero` int NOT NULL,
  `Estado` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `Sexo_ocupante` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID_cama`),
  KEY `ID_hab` (`ID_hab`),
  CONSTRAINT `camas_ibfk_1` FOREIGN KEY (`ID_hab`) REFERENCES `habitacion` (`ID_hab`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camas`
--

LOCK TABLES `camas` WRITE;
/*!40000 ALTER TABLE `camas` DISABLE KEYS */;
INSERT INTO `camas` VALUES (1,1,1,'Libre',NULL),(1,2,2,'Libre',NULL),(2,3,1,'Libre',NULL),(3,4,1,'Ocupada','masculino'),(3,5,2,'Libre',NULL),(4,6,1,'Libre',NULL),(5,7,1,'Ocupada','femenino'),(5,8,2,'Ocupada','femenino'),(6,9,1,'Libre',NULL),(6,10,2,'Libre',NULL),(7,11,1,'Libre',NULL),(7,12,2,'Libre',NULL);
/*!40000 ALTER TABLE `camas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacion_enfermeria`
--

DROP TABLE IF EXISTS `evaluacion_enfermeria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacion_enfermeria` (
  `ID_eva` int NOT NULL AUTO_INCREMENT,
  `ID_internacion` int NOT NULL,
  `Fecha` date NOT NULL,
  `Necesidades_basicas` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Acciones_inm` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `Medicacion_inicial` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Observaciones` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ID_Profesional` int NOT NULL,
  PRIMARY KEY (`ID_eva`),
  KEY `ID_internacion` (`ID_internacion`),
  KEY `ID_Profesional` (`ID_Profesional`),
  CONSTRAINT `evaluacion_enfermeria_ibfk_1` FOREIGN KEY (`ID_internacion`) REFERENCES `internacion` (`ID_internacion`),
  CONSTRAINT `evaluacion_enfermeria_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacion_enfermeria`
--

LOCK TABLES `evaluacion_enfermeria` WRITE;
/*!40000 ALTER TABLE `evaluacion_enfermeria` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluacion_enfermeria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitacion`
--

DROP TABLE IF EXISTS `habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacion` (
  `ID_ala` int NOT NULL,
  `ID_hab` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `capacidad` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID_hab`),
  KEY `ID_ala` (`ID_ala`),
  CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`ID_ala`) REFERENCES `ala` (`ID_ala`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacion`
--

LOCK TABLES `habitacion` WRITE;
/*!40000 ALTER TABLE `habitacion` DISABLE KEYS */;
INSERT INTO `habitacion` VALUES (1,1,'101','2'),(1,2,'102','1'),(2,3,'201','2'),(2,4,'202','1'),(3,5,'301','2'),(3,6,'302','2'),(4,7,'401','2'),(4,8,'402','2');
/*!40000 ALTER TABLE `habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informes`
--

DROP TABLE IF EXISTS `informes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informes` (
  `Nro_historial` int NOT NULL AUTO_INCREMENT,
  `ID_Profesional` int NOT NULL,
  `ID_paciente` int NOT NULL,
  `Diagnostico` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Descripcion` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`Nro_historial`),
  KEY `ID_paciente` (`ID_paciente`),
  KEY `ID_Profesional` (`ID_Profesional`),
  CONSTRAINT `informes_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`),
  CONSTRAINT `informes_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informes`
--

LOCK TABLES `informes` WRITE;
/*!40000 ALTER TABLE `informes` DISABLE KEYS */;
/*!40000 ALTER TABLE `informes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internacion`
--

DROP TABLE IF EXISTS `internacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internacion` (
  `ID_paciente` int NOT NULL,
  `ID_cama` int NOT NULL,
  `ID_internacion` int NOT NULL AUTO_INCREMENT,
  `Fecha_ingreso` datetime NOT NULL,
  `Motivo` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_internacion`),
  KEY `ID_paciente` (`ID_paciente`),
  KEY `ID_cama` (`ID_cama`),
  CONSTRAINT `internacion_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`),
  CONSTRAINT `internacion_ibfk_2` FOREIGN KEY (`ID_cama`) REFERENCES `camas` (`ID_cama`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internacion`
--

LOCK TABLES `internacion` WRITE;
/*!40000 ALTER TABLE `internacion` DISABLE KEYS */;
INSERT INTO `internacion` VALUES (1,4,1,'2025-06-17 20:00:00','Cirugia programada',1),(3,7,2,'2025-06-17 15:51:00','Neumonia',1),(7,8,3,'2025-06-16 15:45:00','Desintoxicación',1);
/*!40000 ALTER TABLE `internacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicina_paciente`
--

DROP TABLE IF EXISTS `medicina_paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicina_paciente` (
  `ID_med` int NOT NULL AUTO_INCREMENT,
  `ID_paciente` int NOT NULL,
  `Medicina` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Origen` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID_med`),
  KEY `ID_paciente` (`ID_paciente`),
  CONSTRAINT `medicina_paciente_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicina_paciente`
--

LOCK TABLES `medicina_paciente` WRITE;
/*!40000 ALTER TABLE `medicina_paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicina_paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obra_pacientes`
--

DROP TABLE IF EXISTS `obra_pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obra_pacientes` (
  `ID_obra` int NOT NULL AUTO_INCREMENT,
  `ID_paciente` int NOT NULL,
  `Nombre` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `NumSocial` int NOT NULL,
  PRIMARY KEY (`ID_obra`),
  KEY `ID_paciente` (`ID_paciente`),
  CONSTRAINT `obra_pacientes_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra_pacientes`
--

LOCK TABLES `obra_pacientes` WRITE;
/*!40000 ALTER TABLE `obra_pacientes` DISABLE KEYS */;
INSERT INTO `obra_pacientes` VALUES (1,2,'OSdep',8765),(2,6,'swiss medical',234),(3,7,'DOSEP',7894);
/*!40000 ALTER TABLE `obra_pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `observaciones_enfermeria`
--

DROP TABLE IF EXISTS `observaciones_enfermeria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `observaciones_enfermeria` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_internacion` int NOT NULL,
  `Fecha` date NOT NULL,
  `Presion_arterial` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `Frecuencia_cardiaca` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `Temperatura` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `Frecuencia_respiratoria` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_internacion` (`ID_internacion`),
  CONSTRAINT `observaciones_enfermeria_ibfk_1` FOREIGN KEY (`ID_internacion`) REFERENCES `internacion` (`ID_internacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `observaciones_enfermeria`
--

LOCK TABLES `observaciones_enfermeria` WRITE;
/*!40000 ALTER TABLE `observaciones_enfermeria` DISABLE KEYS */;
/*!40000 ALTER TABLE `observaciones_enfermeria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `ID_paciente` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Apellido` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `DNI` bigint NOT NULL,
  `Sexo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Domicilio` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Telefono` bigint NOT NULL,
  PRIMARY KEY (`ID_paciente`),
  UNIQUE KEY `DNI` (`DNI`),
  UNIQUE KEY `DNI_2` (`DNI`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (1,'Branguer','NoventayUnMil',46807958,'masculino','Saturno',2664553),(2,'Leandro','Caesar',35890345,'masculino','Italia',4455891),(3,'Rocio','Limon',28948100,'femenino','San Luis',2664901),(4,'El','Negado',32780541,'masculino','Nogoli',27789),(5,'Yu','Henko',31900123,'masculino','China',789901),(6,'Edgar','Aguero',25444126,'masculino','San Luis',1224556),(7,'Florencia','Magallani',44780237,'femenino','Quines',266457),(8,'Pablo','Gutierrez',42678810,'masculino','La Punta',2664778);
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesionalessalud`
--

DROP TABLE IF EXISTS `profesionalessalud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesionalessalud` (
  `ID_Profesional` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Apellido` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Rol` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Especialidad` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID_Profesional`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesionalessalud`
--

LOCK TABLES `profesionalessalud` WRITE;
/*!40000 ALTER TABLE `profesionalessalud` DISABLE KEYS */;
INSERT INTO `profesionalessalud` VALUES (1,'Federico','Cortazar','medico','Cirujano'),(2,'Anabel','Quiroga','Medico','Diabetodologia'),(3,'Teresita ','Nuñez','Medico','Cardiología'),(4,'Fernando','Saez','medico','Fonoaudiologo'),(5,'Juan Ignacio','Arbia','Medico','Medico generalista');
/*!40000 ALTER TABLE `profesionalessalud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traslados`
--

DROP TABLE IF EXISTS `traslados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traslados` (
  `ID_internacion` int NOT NULL,
  `ID_cama` int NOT NULL,
  `ID_traslado` int NOT NULL AUTO_INCREMENT,
  `Fecha_traslado` date NOT NULL,
  `Motivo` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID_traslado`),
  KEY `ID_internacion` (`ID_internacion`),
  KEY `ID_cama` (`ID_cama`),
  CONSTRAINT `traslados_ibfk_1` FOREIGN KEY (`ID_internacion`) REFERENCES `internacion` (`ID_internacion`),
  CONSTRAINT `traslados_ibfk_2` FOREIGN KEY (`ID_cama`) REFERENCES `camas` (`ID_cama`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traslados`
--

LOCK TABLES `traslados` WRITE;
/*!40000 ALTER TABLE `traslados` DISABLE KEYS */;
/*!40000 ALTER TABLE `traslados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnos`
--

DROP TABLE IF EXISTS `turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turnos` (
  `ID_paciente` int NOT NULL,
  `ID_Profesional` int NOT NULL,
  `Nro_turno` int NOT NULL AUTO_INCREMENT,
  `ObraSocial` varchar(200) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Particular',
  `NumSocial` int DEFAULT NULL,
  `Fecha` datetime NOT NULL,
  `Es_tomado` tinyint(1) NOT NULL,
  `Estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`Nro_turno`),
  KEY `ID_paciente` (`ID_paciente`),
  KEY `ID_Profesional` (`ID_Profesional`),
  CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnos`
--

LOCK TABLES `turnos` WRITE;
/*!40000 ALTER TABLE `turnos` DISABLE KEYS */;
INSERT INTO `turnos` VALUES (1,2,1,'particular',NULL,'2025-06-17 20:00:00',1,0),(2,1,2,'OSdep',8765,'2025-06-19 07:41:00',1,0),(3,2,3,'particular',NULL,'2025-06-17 15:51:00',1,0),(4,1,4,'particular',NULL,'2025-06-18 07:54:00',0,0),(5,3,5,'particular',NULL,'2025-06-16 15:25:00',0,1),(6,2,6,'swiss medical',234,'2025-06-16 15:25:00',0,1),(7,3,7,'DOSEP',7894,'2025-06-16 15:45:00',1,0),(8,1,8,'particular',NULL,'2025-06-16 17:00:00',0,1);
/*!40000 ALTER TABLE `turnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'railway'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-13 18:39:30
