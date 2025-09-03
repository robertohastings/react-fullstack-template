-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: crm
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `agenda`
--

DROP TABLE IF EXISTS `agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda` (
  `id_empresa` int(11) NOT NULL,
  `id_agenda` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_agenda_estatus` smallint(6) DEFAULT NULL,
  `id_jornada` int(11) DEFAULT NULL,
  `clave_confirmacion` varchar(6) DEFAULT NULL,
  `nombre_asistente` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_agenda`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda`
--

LOCK TABLES `agenda` WRITE;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
INSERT INTO `agenda` VALUES (1,2,'2025-02-21','17:00:00','17:30:00',NULL,1,1,2,NULL,NULL),(1,3,'2025-02-21','15:00:00','15:30:00',NULL,1,1,3,NULL,NULL),(1,4,'2025-03-05','11:00:00','11:30:00',1,NULL,3,3,'YURBQK',NULL),(1,5,'2025-03-05','13:00:00','13:30:00',3,NULL,2,3,'BNROLL',NULL),(1,6,'2025-03-05','15:00:00','15:30:00',1,NULL,3,3,'PGAOYM',NULL),(1,7,'2025-03-05','12:00:00','12:30:00',1,NULL,2,3,'9FTRYQ',NULL),(1,8,'2025-03-05','16:00:00','16:30:00',1,NULL,2,3,'VDYA8C',NULL),(1,9,'2025-03-07','11:30:00','12:00:00',1,NULL,2,5,'IZ4NFB',NULL),(1,10,'2025-03-07','13:00:00','13:30:00',3,NULL,3,5,'V4AIOV',NULL),(1,11,'2025-04-10','11:00:00','11:30:00',3,NULL,2,4,'KPSXAV',NULL),(1,12,'2025-04-10','12:00:00','12:30:00',3,NULL,3,4,'0YIVWN',NULL),(1,13,'2025-04-10','11:30:00','12:00:00',3,NULL,2,4,'8ESOLW',NULL),(1,14,'2025-04-10','12:30:00','13:00:00',1,NULL,4,4,'CXORLW',NULL),(1,15,'2025-05-18','11:00:00','11:20:00',1,NULL,3,7,'KC2YIS','Roberto Vázquez Hastings'),(1,16,'2025-06-06','11:00:00','11:30:00',1,NULL,4,5,'LR0Q6E','Roberto Vázquez Hastings');
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agenda_estatus`
--

DROP TABLE IF EXISTS `agenda_estatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda_estatus` (
  `id_empresa` int(11) NOT NULL,
  `id_agenda_estatus` smallint(6) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_agenda_estatus`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda_estatus`
--

LOCK TABLES `agenda_estatus` WRITE;
/*!40000 ALTER TABLE `agenda_estatus` DISABLE KEYS */;
INSERT INTO `agenda_estatus` VALUES (1,1,'Disponible'),(1,2,'Reservada'),(1,3,'Confirmada'),(1,4,'Cancelada'),(1,5,'No asistió');
/*!40000 ALTER TABLE `agenda_estatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id_empresa` bigint(20) NOT NULL,
  `id_blog` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NULL DEFAULT current_timestamp(),
  `titulo` text NOT NULL,
  `contenido` text NOT NULL,
  `activo` bit(1) NOT NULL,
  `id_producto` bigint(20) NOT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `id_usuario` bigint(20) NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_blog`),
  KEY `id_empresa` (`id_empresa`,`id_usuario`),
  KEY `id_empresa_2` (`id_empresa`,`id_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (1,1,'2024-01-21 19:16:01','2024-01-21 19:16:01','NUEVO PRODUCTO: Pechuga agrosuper sin piel','NUEVO PRODUCTO: Pechuga agrosuper sin piel',_binary '',5,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245261/nir/pechuga_agrosuper_l9tn8n.jpg',1),(1,2,'2024-01-24 02:13:21','2024-01-24 02:13:21','NUEVO PRODUCTO: Milanesa Cordon Bleu. Bolsa con 7 piezas','NUEVO PRODUCTO: Milanesa Cordon Bleu. Bolsa con 7 piezas',_binary '',6,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253266/nir/cordon-bleu_egaz5t.jpg',1),(1,3,'2024-01-24 02:14:30','2024-01-24 02:14:30','Pierna de pollo KFC. Bolsa con 10 piezas','Pierna de pollo KFC. Bolsa con 10 piezas',_binary '',6,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702268973/nir/pierna-kfc_edgehq.png',1),(1,4,'2024-01-24 02:18:42','2024-01-24 02:18:42','Paquete de Tocino Big Buy 453 GR.','Paquete de Tocino Big Buy 453 GR.',_binary '',6,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253721/nir/tocino-big-buy_as4eom.webp',1);
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caja`
--

DROP TABLE IF EXISTS `caja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caja` (
  `id_empresa` int(11) NOT NULL,
  `id_caja` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) DEFAULT NULL,
  `fecha_apertura` datetime NOT NULL,
  `fecha_cierre` datetime DEFAULT NULL,
  `esta_abierta` bit(1) DEFAULT NULL,
  `importe_inicial` decimal(10,0) DEFAULT NULL,
  `importe_otros_ingresos` decimal(10,0) DEFAULT NULL,
  `importe_retiros` decimal(10,0) DEFAULT NULL,
  `importe_Efectivo` decimal(10,0) DEFAULT NULL,
  `importe_formasDePago` decimal(10,0) DEFAULT NULL,
  `importe_diferencia` decimal(10,0) DEFAULT NULL,
  `id_cajero_abre_caja` int(11) DEFAULT NULL,
  `id_cajero_cierra_caja` int(11) DEFAULT NULL,
  `cajacol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_caja`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caja`
--

LOCK TABLES `caja` WRITE;
/*!40000 ALTER TABLE `caja` DISABLE KEYS */;
INSERT INTO `caja` VALUES (1,1,'::1','2025-06-16 00:00:00',NULL,_binary '\0',500,491,1014,NULL,400,307,1,1,NULL),(1,2,'::1','2025-06-27 00:00:00',NULL,_binary '',100,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `caja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caja_formasdepago`
--

DROP TABLE IF EXISTS `caja_formasdepago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caja_formasdepago` (
  `id_empresa` int(11) NOT NULL,
  `id_caja` int(11) NOT NULL,
  `id_forma_de_pago` int(11) NOT NULL,
  `importe` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_caja`,`id_forma_de_pago`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caja_formasdepago`
--

LOCK TABLES `caja_formasdepago` WRITE;
/*!40000 ALTER TABLE `caja_formasdepago` DISABLE KEYS */;
INSERT INTO `caja_formasdepago` VALUES (0,1,1,300.00),(1,1,1,300.00),(0,1,2,100.00),(1,1,2,100.00);
/*!40000 ALTER TABLE `caja_formasdepago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caja_movimientos`
--

DROP TABLE IF EXISTS `caja_movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caja_movimientos` (
  `id_empresa` int(11) NOT NULL,
  `id_caja` int(11) NOT NULL,
  `partida` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_tipo_movimiento_caja` int(11) DEFAULT NULL,
  `motivo` varchar(300) NOT NULL,
  `importe` decimal(10,0) NOT NULL,
  `ingresoOEgreso` bit(1) DEFAULT NULL,
  `fregistro` datetime DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_caja`,`partida`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caja_movimientos`
--

LOCK TABLES `caja_movimientos` WRITE;
/*!40000 ALTER TABLE `caja_movimientos` DISABLE KEYS */;
INSERT INTO `caja_movimientos` VALUES (1,1,1,NULL,'apertura',500,_binary '',NULL),(1,1,2,NULL,'prueba de retiro',10,_binary '\0',NULL),(1,1,3,NULL,'prueba de retiro',10,_binary '\0',NULL),(1,1,4,NULL,'prueba de ingreso',25,_binary '',NULL),(1,1,5,NULL,'prueba de ingreso',26,_binary '',NULL),(1,1,6,NULL,'prueba de ingreso',27,_binary '',NULL),(1,1,7,NULL,'prueba de ingreso',28,_binary '','2025-06-20 00:00:00'),(1,1,8,NULL,'prueba de ingreso',29,_binary '','2025-06-20 00:00:00'),(1,1,9,NULL,'prueba de ingreso',29,_binary '','2025-06-20 11:01:04'),(1,1,10,NULL,'prueba salida',1,_binary '\0','2025-06-20 11:02:12'),(1,1,11,NULL,'prueba de egreso',29,_binary '\0','2025-06-20 11:15:00'),(1,1,12,NULL,'prueba de ingreso',20,_binary '','2025-06-20 12:18:00'),(1,1,13,NULL,'prueba de ingreso',30,_binary '\0','2025-06-20 12:50:49'),(1,1,14,NULL,'prueba',100,_binary '','2025-06-20 15:35:40'),(1,1,15,NULL,'prueba',100,_binary '','2025-06-20 16:15:28'),(1,1,16,NULL,'prueba',100,_binary '','2025-06-20 16:16:17'),(1,1,17,NULL,'prueba',1,_binary '','2025-06-20 16:17:33'),(1,1,18,NULL,'prueba',1,_binary '','2025-06-20 16:20:36'),(1,1,19,NULL,'prueba',1,_binary '','2025-06-20 16:24:28'),(1,1,20,NULL,'prueba',1,_binary '','2025-06-20 16:28:17'),(1,1,21,NULL,'prueba',1,_binary '','2025-06-20 16:28:37'),(1,1,22,NULL,'prueba',1,_binary '','2025-06-20 16:30:44'),(1,1,23,NULL,'prueba',1,_binary '','2025-06-20 16:33:34'),(1,1,24,NULL,'prueba',1,_binary '\0','2025-06-20 16:34:29'),(1,1,25,NULL,'prueba',1,_binary '\0','2025-06-20 16:36:55'),(1,1,26,NULL,'prueba',1,_binary '\0','2025-06-20 16:37:18'),(1,1,27,NULL,'prueba',1,_binary '\0','2025-06-20 16:42:03'),(1,1,28,NULL,'cierre de caja',300,_binary '','2025-06-21 09:33:53'),(1,1,29,NULL,'cierre de caja',300,_binary '','2025-06-21 09:58:10'),(1,1,30,NULL,'cierre de caja',300,_binary '','2025-06-21 11:36:55'),(1,1,31,NULL,'prueba de ingreso',30,_binary '\0','2025-06-23 18:08:31'),(1,2,1,NULL,'ingreso de efectivo a caja',100,_binary '',NULL);
/*!40000 ALTER TABLE `caja_movimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caja_tipo_movimientos`
--

DROP TABLE IF EXISTS `caja_tipo_movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caja_tipo_movimientos` (
  `id_empresa` int(11) NOT NULL,
  `id_tipo_movimiento_caja` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `abre_caja` bit(1) DEFAULT NULL,
  `cierra_caja` bit(1) DEFAULT NULL,
  `suma` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_tipo_movimiento_caja`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caja_tipo_movimientos`
--

LOCK TABLES `caja_tipo_movimientos` WRITE;
/*!40000 ALTER TABLE `caja_tipo_movimientos` DISABLE KEYS */;
INSERT INTO `caja_tipo_movimientos` VALUES (1,1,'Apertura de Caja',_binary '',_binary '',_binary '\0'),(1,2,'Cierre de Caja',_binary '',_binary '',_binary '\0'),(1,3,'Ingreso de Efectivo',_binary '\0',_binary '\0',_binary ''),(1,4,'Retiro de Efectivo',_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `caja_tipo_movimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cajero`
--

DROP TABLE IF EXISTS `cajero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cajero` (
  `id_empresa` int(11) NOT NULL,
  `id_cajero` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_cajero`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cajero`
--

LOCK TABLES `cajero` WRITE;
/*!40000 ALTER TABLE `cajero` DISABLE KEYS */;
INSERT INTO `cajero` VALUES (1,1,'Roberto','1234',1),(1,2,'Nelly','12345',1);
/*!40000 ALTER TABLE `cajero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_categoria`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,1,'Caja de Filete tilapia','Bolsa de Filete Tilapia, contiene 4 piezas...','https://fiestatijuana.mx/image-not-available.png','2023-12-10 00:00:00','2025-04-15 12:59:39',0),(9,1,'Testing 3','Testing 3','','2024-07-13 03:39:42','2024-07-13 03:39:42',2),(2,1,'Pollo','Boneless, Pechuga Agrosuper (sin piel), Milanesa CORDON BLUEA, Piernas KFC.','https://res.cloudinary.com/ddhxa9igj/image/upload/v1721880979/nir/1_cat_2.jpg','2023-12-10 00:00:00','2024-07-25 11:55:12',1),(8,1,'Testing 2','Testing 2','','2024-07-13 03:36:26','2024-07-13 03:36:26',1),(3,1,'Vegetales','Aros de cebolla, Papa frita','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245584/nir/papasyaros_nt79jw.jpg','2023-12-10 00:00:00','2023-12-10 00:00:00',1),(4,1,'Puerco','Tocino','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245824/nir/tocino_jhkilr.jpg','2023-12-10 00:00:00','2023-12-10 00:00:00',1),(5,1,'Lacteos','Leche, Quesos',NULL,'2024-07-04 00:00:00','2024-07-05 17:31:58',0),(6,1,'Mascotas','Croquetas perros y gatos',NULL,'2024-07-04 00:00:00','2024-07-05 17:31:58',0),(7,1,'Testing','Testing',NULL,'2024-07-05 18:13:27','2024-07-05 18:13:27',0);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_empresa` bigint(20) NOT NULL,
  `id_cliente` bigint(20) NOT NULL AUTO_INCREMENT,
  `empresa` varchar(200) DEFAULT NULL,
  `nombre` varchar(200) NOT NULL,
  `telefonos` varchar(90) DEFAULT NULL,
  `celulares` varchar(90) DEFAULT NULL,
  `fecha_ultima_visita` datetime DEFAULT NULL,
  `fecha_ultima_compra` datetime DEFAULT NULL,
  `fecha_alta` datetime DEFAULT NULL,
  `fecha_actualizacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_cliente`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,1,'HostRegio','Roberto Vázquez Hastings','818.252.2653','818.252.2653',NULL,NULL,NULL,NULL),(1,2,'Ferreteria La Moderna','Roberto Vázquez Hastings','818.252.2654','818.252.2654',NULL,NULL,NULL,NULL),(1,3,NULL,'Blanca Nelly Oyervides Treviño',NULL,'8110170557',NULL,NULL,NULL,'2025-08-25 00:00:00'),(1,4,NULL,'Roberto Vázquez Hastings',NULL,'8182522653',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colonias_delivery`
--

DROP TABLE IF EXISTS `colonias_delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colonias_delivery` (
  `id_empresa` int(11) NOT NULL,
  `id_colonia` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `cargo` decimal(10,0) DEFAULT NULL,
  `activa` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_colonia`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colonias_delivery`
--

LOCK TABLES `colonias_delivery` WRITE;
/*!40000 ALTER TABLE `colonias_delivery` DISABLE KEYS */;
INSERT INTO `colonias_delivery` VALUES (1,1,'Palmas Diamante',40,1),(1,2,'Montecarlo',35,1);
/*!40000 ALTER TABLE `colonias_delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combos`
--

DROP TABLE IF EXISTS `combos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combos` (
  `id_empresa` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_producto_combo` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_producto`,`id_producto_combo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combos`
--

LOCK TABLES `combos` WRITE;
/*!40000 ALTER TABLE `combos` DISABLE KEYS */;
INSERT INTO `combos` VALUES (1,1,4,1),(1,1,5,1),(1,2,3,1),(1,2,8,1),(1,2,9,1),(1,2,10,2),(1,2,4,1);
/*!40000 ALTER TABLE `combos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion_tipo_identidad`
--

DROP TABLE IF EXISTS `direccion_tipo_identidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direccion_tipo_identidad` (
  `id_direccion_tipo_identidad` smallint(6) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`id_direccion_tipo_identidad`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion_tipo_identidad`
--

LOCK TABLES `direccion_tipo_identidad` WRITE;
/*!40000 ALTER TABLE `direccion_tipo_identidad` DISABLE KEYS */;
INSERT INTO `direccion_tipo_identidad` VALUES (1,'Usuario'),(2,'Proveedor');
/*!40000 ALTER TABLE `direccion_tipo_identidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones` (
  `id_direccion` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint(20) NOT NULL,
  `id_direccion_tipo_identidad` int(11) NOT NULL,
  `identidad` bigint(20) NOT NULL,
  `direccion_por_defecto` bit(1) DEFAULT b'0',
  `direccion` varchar(255) DEFAULT NULL,
  `calle` varchar(200) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `colonia` varchar(200) DEFAULT NULL,
  `ciudad` varchar(200) DEFAULT NULL,
  `estado` varchar(200) DEFAULT NULL,
  `pais` varchar(200) DEFAULT NULL,
  `codigo_postal` varchar(10) DEFAULT NULL,
  `latitud` double DEFAULT NULL,
  `longitud` double DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `id_colonia` int(11) DEFAULT NULL,
  `entre_calles` varchar(200) DEFAULT NULL,
  `referencia` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_direccion_tipo_identidad`,`id_direccion`),
  KEY `id_empresa` (`id_empresa`,`identidad`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (1,1,1,1,_binary '','Del Estanque 135, Palmas Diamante, San Nicolás de los Garza., Nuevo León, México, 66478','Del Estanque','135','Palmas Diamante','San Nicolás de los Garza.','Nuevo León','México','66478',NULL,NULL,'2024-08-09 18:11:30','2025-08-16 06:41:00',1,'Blvd Palmas Diamante','portón café..'),(2,1,1,1,_binary '\0','Italia 122, Fracc. Santa Fé, Monterrey., Nuevo León, México, 64540',NULL,'122','Fracc. Santa Fé','Monterrey.','Nuevo León','México','64540',NULL,NULL,'2024-08-13 18:12:48','2024-08-14 12:45:36',NULL,NULL,NULL),(3,1,1,1,_binary '\0','ITALIA2 122, FRACCIONAMIENTO SANTA FE, MONTERREY., NUEVO LEÓN, México, 64540',NULL,'122','FRACCIONAMIENTO SANTA FE','MONTERREY.','NUEVO LEÓN','México','64540',NULL,NULL,'2024-08-13 18:18:45','2024-08-14 12:45:52',NULL,NULL,NULL),(1,2,1,1,_binary '','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','Lorem ipsum dolor si','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','Lorem',NULL,NULL,'2024-11-09 10:49:15','0000-00-00 00:00:00',NULL,NULL,NULL),(4,1,1,3,_binary '','Del Estanque 135, Palmas Diamante','Del Estanque','135','Palmas Diamante',NULL,NULL,NULL,NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,'Blvd Palmas Diamante y Acueducto','Portón color chocolate'),(5,1,1,1,_binary '\0',NULL,NULL,'135',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,NULL,NULL);
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id_empresa` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(300) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `host` varchar(100) NOT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'Congelados NIR','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702230600/nir/LogoNIR_fd22wq.png','',1),(2,'hostregio','','localhost',NULL);
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `existencias`
--

DROP TABLE IF EXISTS `existencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `existencias` (
  `id_empresa` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `existencias`
--

LOCK TABLES `existencias` WRITE;
/*!40000 ALTER TABLE `existencias` DISABLE KEYS */;
INSERT INTO `existencias` VALUES (1,1,108),(1,2,102),(1,3,100),(1,4,101),(1,5,100),(1,6,100),(1,7,100),(1,8,100),(1,9,100),(1,10,100);
/*!40000 ALTER TABLE `existencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formas_de_pago`
--

DROP TABLE IF EXISTS `formas_de_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formas_de_pago` (
  `id_empresa` bigint(20) NOT NULL,
  `id_forma_de_pago` smallint(6) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) NOT NULL,
  `informacion_adicional` varchar(200) DEFAULT NULL,
  `activo` tinyint(4) NOT NULL,
  `en_tienda_online` tinyint(4) DEFAULT NULL,
  `en_sitio` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_forma_de_pago`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formas_de_pago`
--

LOCK TABLES `formas_de_pago` WRITE;
/*!40000 ALTER TABLE `formas_de_pago` DISABLE KEYS */;
INSERT INTO `formas_de_pago` VALUES (1,1,'Efectivo','',1,1,1),(1,2,'Tarjeta Débito/Crédito','',1,1,1),(1,3,'Depósito','Cuenta:1243',1,1,0),(1,4,'Transferencia','Clabe Interbancaria: 123456',1,1,1),(1,5,'Pago en línea','',1,1,0),(1,6,'Línea de crédito','$6000',0,1,0),(2,1,'Efectivo - contra entrega','',1,NULL,NULL),(2,2,'Tarjeta Débito/Crédito - contra entrega','',0,NULL,NULL),(2,3,'Depósito','',1,NULL,NULL),(2,4,'Transferencia','',1,NULL,NULL),(2,5,'Pago en línea','',0,NULL,NULL),(2,6,'Línea de crédito','',0,NULL,NULL),(1,7,'rappid','',0,0,1),(1,8,'didi','',0,0,1),(1,9,'ubber eats','',0,0,1);
/*!40000 ALTER TABLE `formas_de_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hosts`
--

DROP TABLE IF EXISTS `hosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hosts` (
  `id_empresa` int(11) NOT NULL,
  `host` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hosts`
--

LOCK TABLES `hosts` WRITE;
/*!40000 ALTER TABLE `hosts` DISABLE KEYS */;
INSERT INTO `hosts` VALUES (1,'nir.hostregio.app');
/*!40000 ALTER TABLE `hosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jornada_laboral`
--

DROP TABLE IF EXISTS `jornada_laboral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jornada_laboral` (
  `id_empresa` int(11) NOT NULL,
  `id_jornada` int(11) NOT NULL AUTO_INCREMENT,
  `dia_semana` smallint(6) DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `duracion_cita` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_jornada`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jornada_laboral`
--

LOCK TABLES `jornada_laboral` WRITE;
/*!40000 ALTER TABLE `jornada_laboral` DISABLE KEYS */;
INSERT INTO `jornada_laboral` VALUES (1,1,0,'11:00:00','20:00:00',30),(1,2,1,'11:00:00','20:00:00',30),(1,3,2,'11:00:00','20:00:00',30),(1,4,3,'11:00:00','20:00:00',30),(1,5,4,'11:00:00','20:00:00',30),(1,6,5,'11:00:00','20:00:00',30),(1,7,6,'11:00:00','20:00:00',20);
/*!40000 ALTER TABLE `jornada_laboral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kardex`
--

DROP TABLE IF EXISTS `kardex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kardex` (
  `id_empresa` int(11) NOT NULL,
  `id_kardex` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_producto` int(11) DEFAULT NULL,
  `fecha_movimiento` datetime DEFAULT NULL,
  `id_tipo_movimiento` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `costo_unitario` double DEFAULT NULL,
  `referencia_documento` varchar(100) DEFAULT NULL,
  `saldo_anterior` int(11) DEFAULT NULL,
  `saldo_actual` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_kardex`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kardex`
--

LOCK TABLES `kardex` WRITE;
/*!40000 ALTER TABLE `kardex` DISABLE KEYS */;
INSERT INTO `kardex` VALUES (1,1,4,'2025-07-24 00:00:00',1,10,50,'101',0,10,1,1),(1,2,4,'2025-07-24 00:00:00',1,1,NULL,'test',100,101,1,NULL),(1,3,1,'2025-08-07 00:00:00',1,NULL,200,'Orden de compra #1',100,102,1,NULL),(1,4,2,'2025-08-07 00:00:00',1,NULL,20,'Orden de compra #1',100,102,1,NULL),(1,5,1,'2025-08-11 00:00:00',1,1,200,'Orden de compra #3',102,103,1,NULL),(1,6,1,'2025-08-11 00:00:00',1,1,200,'Orden de compra #4',103,104,1,1),(1,7,1,'2025-08-11 00:00:00',1,1,200,'5',104,105,1,1),(1,8,1,'2025-08-11 00:00:00',1,2,200,'6',105,107,1,1),(1,9,1,'2025-08-12 00:00:00',1,1,200,'8',107,108,1,1);
/*!40000 ALTER TABLE `kardex` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `landingpage`
--

DROP TABLE IF EXISTS `landingpage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `landingpage` (
  `id_empresa` bigint(20) NOT NULL,
  `id_landingPage` bigint(20) NOT NULL AUTO_INCREMENT,
  `quienes_somos` varchar(800) DEFAULT NULL,
  `servicios` varchar(800) DEFAULT NULL,
  `productos` varchar(800) DEFAULT NULL,
  `mostrar_quienes_somos` tinyint(4) DEFAULT NULL,
  `mostrar_productos` tinyint(4) DEFAULT NULL,
  `mostrar_productos_verMas` tinyint(4) DEFAULT NULL,
  `mostrar_servicios` tinyint(4) DEFAULT NULL,
  `mostrar_contactanos` tinyint(4) DEFAULT NULL,
  `mostrar_sitioEnMantenimiento` tinyint(4) DEFAULT NULL,
  `mostrar_landingPage` tinyint(4) DEFAULT NULL,
  `mostrar_carritoDeCompras` tinyint(1) DEFAULT NULL,
  `inicio_titulo` varchar(800) DEFAULT NULL,
  `inicio_descripcion` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_landingPage`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `landingpage`
--

LOCK TABLES `landingpage` WRITE;
/*!40000 ALTER TABLE `landingpage` DISABLE KEYS */;
INSERT INTO `landingpage` VALUES (1,1,'<p>Testing 5</p>','        <div class=\"container\">\n            <h2 class=\"section-title\">Nuestros Servicios Destacados</h2>\n            <p class=\"section-description\">Impulsa tu productividad y enfócate en el crecimiento de tu negocio con nuestra amplia gama de servicios especializados.</p>\n            \n            <div class=\"services-grid\">\n                <div class=\"service-item\">\n                    <div class=\"service-icon\">\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-briefcase\"><rect x=\"2\" y=\"7\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"></rect><path d=\"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"></path></svg>\n                ','<p>Productos</p><ol><li>Pescado</li><li>Pollo</li><li>Tocino</li><li>Papa</li><br></ol>',1,1,1,1,1,1,0,1,'<p>¡ Bienvenido a Agrowins ! Ya estamos en el línea</p>','<p>Libera tu tiempo y enfócate en lo que realmente importa. Has tu carrito de compras en nuestro nuevo sitio&nbsp;y nosotros nos encargaremos de tenerlo a tiempo, ya sea que pases a recogerlo o lo pidas a domicilio.</p><p>Gracias por tu confianza y preferencia.</p>'),(2,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',1,1,1,1,1,1,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `landingpage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulos` (
  `id_empresa` int(11) NOT NULL,
  `id_modulo` smallint(6) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_modulo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordencompra`
--

DROP TABLE IF EXISTS `ordencompra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordencompra` (
  `id_empresa` int(11) NOT NULL,
  `id_ordencompra` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  `total_orden` double DEFAULT NULL,
  `id_estado_ordencompra` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_ordencompra`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordencompra`
--

LOCK TABLES `ordencompra` WRITE;
/*!40000 ALTER TABLE `ordencompra` DISABLE KEYS */;
INSERT INTO `ordencompra` VALUES (1,1,'2025-08-07 00:00:00',1,500,1,1),(1,2,NULL,NULL,NULL,NULL,1),(1,3,'2025-08-11 00:00:00',1,200,2,1),(1,4,'2025-08-11 00:00:00',1,200,2,1),(1,5,'2025-08-11 00:00:00',1,200,2,1),(1,6,'2025-08-11 00:00:00',1,400,2,1),(1,7,'2025-08-12 00:00:00',1,400,3,1),(1,8,'2025-08-12 00:00:00',1,200,2,1);
/*!40000 ALTER TABLE `ordencompra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordencompra_detalle`
--

DROP TABLE IF EXISTS `ordencompra_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordencompra_detalle` (
  `id_empresa` int(11) NOT NULL,
  `id_ordencompra` int(11) NOT NULL,
  `partida` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `costo_unitario` double DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_ordencompra`,`partida`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordencompra_detalle`
--

LOCK TABLES `ordencompra_detalle` WRITE;
/*!40000 ALTER TABLE `ordencompra_detalle` DISABLE KEYS */;
INSERT INTO `ordencompra_detalle` VALUES (1,1,2,2,5,20,100),(1,1,1,1,2,200,400),(1,3,1,1,1,200,200),(1,4,1,1,1,200,200),(1,5,1,1,1,200,200),(1,6,1,1,2,200,400),(1,7,1,1,2,200,400),(1,8,1,1,1,200,200);
/*!40000 ALTER TABLE `ordencompra_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordencompra_estado`
--

DROP TABLE IF EXISTS `ordencompra_estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordencompra_estado` (
  `id_empresa` int(11) NOT NULL,
  `id_estado_ordencompra` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_estado_ordencompra`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordencompra_estado`
--

LOCK TABLES `ordencompra_estado` WRITE;
/*!40000 ALTER TABLE `ordencompra_estado` DISABLE KEYS */;
INSERT INTO `ordencompra_estado` VALUES (1,1,'Pendiente'),(1,2,'Recibida'),(1,3,'Cancelada');
/*!40000 ALTER TABLE `ordencompra_estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_domicilio`
--

DROP TABLE IF EXISTS `pedido_domicilio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_domicilio` (
  `id_empresa` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_direccion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_pedido`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_domicilio`
--

LOCK TABLES `pedido_domicilio` WRITE;
/*!40000 ALTER TABLE `pedido_domicilio` DISABLE KEYS */;
INSERT INTO `pedido_domicilio` VALUES (1,18,0),(1,19,1),(1,20,4),(1,21,4),(1,22,4),(1,24,4),(1,25,1),(1,26,4),(1,27,4),(1,61,1),(1,63,1),(1,64,1),(1,65,1),(1,66,1),(1,67,1),(1,69,1),(1,70,1),(1,71,1),(1,72,1),(1,73,1),(1,74,1),(1,75,1),(1,76,1),(1,77,1),(1,78,1),(1,81,1),(1,82,1),(1,84,1),(1,86,1),(1,87,1);
/*!40000 ALTER TABLE `pedido_domicilio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_estatus`
--

DROP TABLE IF EXISTS `pedido_estatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_estatus` (
  `id_empresa` bigint(20) NOT NULL,
  `id_pedido_estatus` smallint(6) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `orden` smallint(6) NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_pedido_estatus`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_estatus`
--

LOCK TABLES `pedido_estatus` WRITE;
/*!40000 ALTER TABLE `pedido_estatus` DISABLE KEYS */;
INSERT INTO `pedido_estatus` VALUES (1,1,'Recibido',0),(1,2,'En Proceso',1),(1,3,'Terminado',2),(1,4,'En Camino',3),(1,5,'Entregado',4),(1,6,'Cancelado',5);
/*!40000 ALTER TABLE `pedido_estatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_formas_de_pago`
--

DROP TABLE IF EXISTS `pedido_formas_de_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_formas_de_pago` (
  `id_empresa` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_pedido_formaDePago` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_forma_de_pago` smallint(6) DEFAULT NULL,
  `es_pago_total` tinyint(4) DEFAULT NULL,
  `monto_pagado` double DEFAULT NULL,
  `saldo` double DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_pedido`,`id_pedido_formaDePago`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_formas_de_pago`
--

LOCK TABLES `pedido_formas_de_pago` WRITE;
/*!40000 ALTER TABLE `pedido_formas_de_pago` DISABLE KEYS */;
INSERT INTO `pedido_formas_de_pago` VALUES (1,7,1,1,1,260,NULL),(1,8,1,1,1,151.5,0),(1,9,1,1,0,200,210),(1,9,2,2,0,210,0),(1,10,1,1,0,100,280),(1,10,2,2,0,280,0),(1,11,1,1,1,200,-70),(1,12,1,1,1,130,0),(1,13,1,1,1,130,0),(1,14,1,2,1,130,0),(1,15,1,1,1,260,0),(1,16,1,1,1,130,0),(1,17,1,1,1,130,0),(1,18,1,1,1,130,0),(1,19,1,1,1,130,0),(1,20,1,1,1,130,0),(1,21,1,1,1,200,-70),(1,22,1,1,1,130,0),(1,23,1,1,1,130,0),(1,24,1,1,1,130,0),(1,25,1,1,1,130,0),(1,26,1,1,1,130,0),(1,27,1,1,0,100,30),(1,27,2,2,0,30,0),(1,28,1,1,1,130,0),(1,29,1,1,1,130,0),(1,30,1,1,1,130,0),(1,31,1,1,1,130,0),(1,32,1,1,1,130,0),(1,33,1,1,1,130,0),(1,34,1,1,1,130,0),(1,35,1,1,1,130,0),(1,36,1,1,1,130,0),(1,37,1,1,1,130,0),(1,38,1,1,1,130,0),(1,39,1,1,1,130,0),(1,40,1,1,1,130,0),(1,41,1,1,1,130,0),(1,42,1,1,1,260,0),(1,43,1,1,1,130,0),(1,44,1,1,1,130,0),(1,45,1,1,1,130,0),(1,53,1,1,1,1.5,0),(1,54,1,1,1,130,0),(1,57,1,1,1,130,0),(1,58,1,1,1,130,0),(1,59,1,1,1,260,0),(1,60,1,1,1,130,0),(1,61,1,1,0,100,30),(1,61,2,2,0,30,0),(1,62,1,1,0,100,30),(1,63,1,1,1,155,0),(1,64,1,1,1,155,0),(1,65,1,1,1,155,0),(1,66,1,1,1,155,0),(1,67,1,1,1,285,0),(1,68,1,1,1,155,5),(1,68,2,1,0,5,0),(1,69,1,1,1,155,5),(1,69,2,1,0,5,0),(1,70,1,1,1,160,0),(1,71,1,1,1,165,0),(1,72,1,1,1,165,0),(1,73,1,1,0,1650,-1485),(1,74,1,1,1,165,0),(1,75,1,1,0,100,65),(1,75,2,1,0,65,0),(1,76,1,1,0,100,65),(1,76,2,2,0,65,0),(1,77,1,7,1,165,0),(1,78,1,1,0,80,85),(1,78,2,2,0,85,0),(1,79,1,9,1,130,0),(1,80,1,2,0,100,30),(1,80,2,1,0,30,0),(1,81,1,1,1,295,0),(1,82,1,2,0,100,65),(1,82,2,1,0,65,0),(1,83,1,1,1,260,0),(1,84,1,1,0,100,195),(1,84,2,2,0,195,0),(1,85,1,1,1,250,0),(1,86,1,1,1,165,0),(1,87,1,1,1,185,0);
/*!40000 ALTER TABLE `pedido_formas_de_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_empresa` bigint(20) NOT NULL,
  `id_pedido` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint(20) NOT NULL,
  `id_cliente` bigint(20) NOT NULL,
  `id_direccion` bigint(20) DEFAULT NULL,
  `id_puntoDeEntrega` bigint(20) DEFAULT NULL,
  `id_pedido_estatus` smallint(6) NOT NULL,
  `id_tipo_pedido` smallint(6) DEFAULT NULL,
  `id_forma_de_pago` smallint(6) NOT NULL,
  `total` double NOT NULL,
  `importe_pagado` double DEFAULT NULL,
  `saldo` double NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `motivo_cancelacion` varchar(150) DEFAULT NULL,
  `id_cajero` int(11) DEFAULT NULL,
  `id_caja` int(11) DEFAULT NULL,
  `importe_envio` double DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_pedido`),
  KEY `id_empresa` (`id_empresa`,`id_usuario`),
  KEY `id_empresa_2` (`id_empresa`,`id_direccion`),
  KEY `id_empresa_3` (`id_empresa`,`id_pedido_estatus`),
  KEY `id_empresa_4` (`id_empresa`,`id_forma_de_pago`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,1,1,1,1,1,1,NULL,1,0,NULL,0,'2024-09-05 17:11:58','2024-09-05 17:11:58',NULL,NULL,NULL,NULL),(1,2,1,1,1,0,1,NULL,1,250,0,250,'2024-09-05 17:34:31','2024-09-05 17:34:31',NULL,NULL,NULL,NULL),(1,3,1,1,0,1,2,NULL,1,250,0,250,'2024-09-05 18:31:43','2024-09-05 18:31:43',NULL,NULL,NULL,NULL),(1,4,1,1,0,1,4,NULL,1,390,0,390,'2024-09-12 18:09:11','2024-09-12 18:09:11',NULL,NULL,NULL,NULL),(1,5,1,1,NULL,NULL,1,1,0,130,130,0,'2025-04-25 18:32:25','2025-04-25 18:32:25',NULL,NULL,NULL,NULL),(1,6,1,1,NULL,NULL,1,1,0,260,260,0,'2025-04-26 02:42:39','2025-04-26 02:42:39',NULL,NULL,NULL,NULL),(1,7,1,1,NULL,NULL,1,1,0,260,260,0,'2025-04-26 02:47:16','2025-04-26 02:47:16',NULL,NULL,NULL,NULL),(1,8,1,1,NULL,NULL,1,1,0,151.5,151.5,0,'2025-04-26 03:02:23','2025-04-26 03:02:23',NULL,NULL,NULL,NULL),(1,9,1,1,NULL,NULL,1,1,0,410,410,0,'2025-04-26 03:04:26','2025-04-26 03:04:26',NULL,NULL,NULL,NULL),(1,10,1,1,NULL,NULL,1,1,0,380,380,0,'2025-04-26 03:10:29','2025-04-26 03:10:29',NULL,NULL,NULL,NULL),(1,11,1,3,NULL,NULL,1,1,0,130,200,-70,'2025-04-26 03:12:23','2025-04-26 03:12:23',NULL,NULL,NULL,NULL),(1,12,1,1,NULL,NULL,1,1,0,130,130,0,'2025-04-26 03:15:05','2025-04-26 03:15:05',NULL,NULL,NULL,NULL),(1,13,1,3,4,NULL,1,3,0,130,130,0,'2025-05-03 00:29:36','2025-05-03 00:29:36',NULL,NULL,NULL,NULL),(1,14,1,1,5,NULL,1,2,0,130,130,0,'2025-05-03 00:45:00','2025-05-03 00:45:00',NULL,NULL,NULL,NULL),(1,15,1,1,6,NULL,1,2,0,260,260,0,'2025-05-03 10:11:31','2025-05-03 10:11:31',NULL,NULL,NULL,NULL),(1,16,1,1,6,NULL,1,2,0,130,130,0,'2025-05-04 07:55:09','2025-05-04 07:55:09',NULL,NULL,NULL,NULL),(1,17,1,1,6,NULL,1,2,0,130,130,0,'2025-05-04 08:15:41','2025-05-04 08:15:41',NULL,NULL,NULL,NULL),(1,18,1,1,0,NULL,1,2,0,130,130,0,'2025-05-04 08:24:24','2025-05-04 08:24:24',NULL,NULL,NULL,NULL),(1,19,1,1,0,NULL,1,2,0,130,130,0,'2025-05-04 08:28:25','2025-05-04 08:28:25',NULL,NULL,NULL,NULL),(1,20,1,3,0,NULL,1,2,0,130,130,0,'2025-05-04 08:41:16','2025-05-04 08:41:16',NULL,NULL,NULL,NULL),(1,21,1,3,0,NULL,1,2,0,130,200,-70,'2025-05-04 08:47:18','2025-05-04 08:47:18',NULL,NULL,NULL,NULL),(1,22,1,3,0,NULL,1,2,0,130,130,0,'2025-05-04 08:51:36','2025-05-04 08:51:36',NULL,NULL,NULL,NULL),(1,23,1,3,0,NULL,1,3,0,130,130,0,'2025-05-04 08:52:54','2025-05-04 08:52:54',NULL,NULL,NULL,NULL),(1,24,1,3,0,NULL,1,2,0,130,130,0,'2025-05-04 08:59:04','2025-05-04 08:59:04',NULL,NULL,NULL,NULL),(1,25,1,1,0,NULL,1,2,0,130,130,0,'2025-05-04 14:21:45','2025-05-04 14:21:45',NULL,NULL,NULL,NULL),(1,26,1,3,0,NULL,1,2,0,130,130,0,'2025-05-04 14:39:43','2025-05-04 14:39:43',NULL,NULL,NULL,NULL),(1,27,1,3,0,NULL,1,2,0,130,130,0,'2025-05-04 14:54:59','2025-05-04 14:54:59',NULL,NULL,NULL,NULL),(1,28,1,1,0,NULL,1,1,0,130,130,0,'2025-05-08 23:36:53','2025-05-08 23:36:53','Prueba',NULL,NULL,NULL),(1,29,1,1,0,NULL,1,1,0,130,130,0,'2025-05-08 23:53:22','2025-05-08 23:53:22','prueba',NULL,NULL,NULL),(1,30,1,1,0,NULL,1,6,0,130,130,0,'2025-05-08 23:59:17','2025-05-08 23:59:17','prueba',NULL,NULL,NULL),(1,31,1,1,0,NULL,1,1,0,130,130,0,'2025-05-09 23:55:19','2025-05-09 23:55:19','',NULL,NULL,NULL),(1,32,1,0,0,NULL,1,1,0,130,130,0,'2025-05-09 23:56:23','2025-05-09 23:56:23','Testing',NULL,NULL,NULL),(1,33,1,1,0,NULL,1,1,0,130,130,0,'2025-05-10 00:06:56','2025-05-10 00:06:56','',NULL,NULL,NULL),(1,34,1,1,0,NULL,1,1,0,130,130,0,'2025-05-10 00:09:42','2025-05-10 00:09:42','testing',NULL,NULL,NULL),(1,35,1,1,0,NULL,1,1,0,130,130,0,'2025-05-10 14:38:47','2025-05-10 14:38:47','',NULL,NULL,NULL),(1,36,1,1,0,NULL,1,1,0,130,130,0,'2025-05-10 14:41:39','2025-05-10 14:41:39','prueba',NULL,NULL,NULL),(1,37,1,1,0,NULL,1,1,0,130,130,0,'2025-05-10 15:04:05','2025-05-10 15:04:05','testing',NULL,NULL,NULL),(1,38,1,1,0,NULL,1,1,0,130,130,0,'2025-05-10 15:14:51','2025-05-10 15:14:51','testing',NULL,NULL,NULL),(1,39,1,1,0,NULL,1,1,0,130,130,0,'2025-05-10 15:23:59','2025-05-10 15:23:59','prueba',NULL,NULL,NULL),(1,40,1,1,0,NULL,6,1,0,130,130,0,'2025-05-10 15:36:25','2025-05-10 15:36:25','prueba',NULL,NULL,NULL),(1,41,1,0,0,NULL,6,1,0,130,130,0,'2025-05-11 10:19:46','2025-05-11 10:19:46','',NULL,NULL,NULL),(1,42,1,0,0,NULL,1,1,0,260,260,0,'2025-05-13 03:46:47','2025-05-13 03:46:47','',NULL,NULL,NULL),(1,43,1,0,0,NULL,1,1,0,130,130,0,'2025-05-13 03:53:36','2025-05-13 03:53:36','',NULL,NULL,NULL),(1,44,1,0,0,NULL,6,1,0,130,130,0,'2025-05-13 03:54:36','2025-05-13 03:54:36','prueba de cancelación',NULL,NULL,NULL),(1,45,1,0,0,NULL,6,1,0,130,130,0,'2025-05-13 04:02:37','2025-05-13 04:02:37','prueba de cancelación',NULL,NULL,NULL),(1,46,1,0,0,NULL,6,1,0,130,0,130,'2025-05-13 04:05:02','2025-05-13 04:05:02','test',NULL,NULL,NULL),(1,47,1,0,0,NULL,6,1,0,150,0,150,'2025-05-13 04:07:11','2025-05-13 04:07:11','prueba',NULL,NULL,NULL),(1,48,1,0,0,NULL,6,1,0,1.5,0,1.5,'2025-05-13 04:07:41','2025-05-13 04:07:41','prueba',NULL,NULL,NULL),(1,49,1,0,0,NULL,6,1,0,130,0,130,'2025-05-13 04:08:15','2025-05-13 04:08:15','prueba',NULL,NULL,NULL),(1,50,1,0,0,NULL,6,1,0,130,0,130,'2025-05-13 04:09:05','2025-05-13 04:09:05','cancel',NULL,NULL,NULL),(1,51,1,0,0,NULL,6,1,0,150,0,150,'2025-05-13 04:12:38','2025-05-13 04:12:38','testing',NULL,NULL,NULL),(1,52,1,0,0,NULL,6,1,0,1.5,0,1.5,'2025-05-13 04:16:33','2025-05-13 04:16:33','test',NULL,NULL,NULL),(1,53,1,0,0,NULL,6,1,0,1.5,1.5,0,'2025-05-13 04:17:19','2025-05-13 04:17:19','test',NULL,NULL,NULL),(1,54,1,0,0,NULL,1,1,0,130,130,0,'2025-05-13 04:20:41','2025-05-13 04:20:41','',NULL,NULL,NULL),(1,55,1,0,0,NULL,6,1,0,130,0,130,'2025-05-13 04:21:06','2025-05-13 04:21:06','test',NULL,NULL,NULL),(1,56,1,0,0,NULL,6,1,0,130,0,130,'2025-05-13 04:22:20','2025-05-13 04:22:20','test',NULL,NULL,NULL),(1,57,1,0,0,NULL,6,1,0,130,130,0,'2025-05-13 04:24:38','2025-05-13 04:24:38','prueba',NULL,NULL,NULL),(1,58,1,0,0,NULL,6,1,0,130,130,0,'2025-05-13 04:25:29','2025-05-13 04:25:29','prueba',NULL,NULL,NULL),(1,59,1,0,0,NULL,1,1,0,260,260,0,'2025-05-13 20:57:30','2025-05-13 20:57:30','',NULL,NULL,NULL),(1,60,1,0,0,NULL,6,1,0,130,130,0,'2025-05-13 20:58:33','2025-05-13 20:58:33','prueba',NULL,NULL,NULL),(1,61,1,1,0,NULL,1,2,0,130,130,0,'2025-05-13 20:59:27','2025-05-13 20:59:27','',NULL,NULL,NULL),(1,62,1,0,0,NULL,6,1,0,130,100,30,'2025-05-15 00:03:42','2025-05-15 00:03:42','test',NULL,NULL,NULL),(1,63,1,1,0,NULL,1,2,0,130,155,-25,'2025-05-16 00:18:52','2025-05-16 00:18:52','',NULL,NULL,NULL),(1,64,1,1,0,NULL,1,2,0,130,155,-25,'2025-05-16 15:54:08','2025-05-16 15:54:08','',NULL,NULL,NULL),(1,65,1,1,0,NULL,1,2,0,130,155,-25,'2025-05-16 17:27:37','2025-05-16 17:27:37','',NULL,NULL,NULL),(1,66,1,1,0,NULL,1,2,0,130,155,-25,'2025-05-16 17:50:56','2025-05-16 17:50:56','',NULL,NULL,NULL),(1,67,1,1,0,NULL,1,2,0,260,285,-25,'2025-05-16 21:13:47','2025-05-16 21:13:47','',NULL,NULL,NULL),(1,68,1,1,0,NULL,6,2,0,130,160,-30,'2025-05-17 00:02:29','2025-05-17 00:02:29','testing',NULL,NULL,NULL),(1,69,1,1,0,NULL,1,2,0,130,160,-30,'2025-05-17 00:17:03','2025-05-17 00:17:03','',NULL,NULL,NULL),(1,70,1,1,0,NULL,1,2,0,130,160,-30,'2025-05-17 00:31:44','2025-05-17 00:31:44','',NULL,NULL,NULL),(1,71,1,1,0,NULL,1,2,0,130,165,-35,'2025-05-17 16:56:59','2025-05-17 16:56:59','',NULL,NULL,NULL),(1,72,1,1,0,NULL,1,2,0,130,165,-35,'2025-05-17 17:10:54','2025-05-17 17:10:54','',NULL,NULL,NULL),(1,73,1,1,0,NULL,6,2,0,130,1650,-1520,'2025-05-17 17:17:33','2025-05-17 17:17:33','captura incorrecta de cantidad a pagar',NULL,NULL,NULL),(1,74,1,1,0,NULL,1,2,0,130,165,-35,'2025-05-17 17:33:53','2025-05-17 17:33:53','',NULL,NULL,NULL),(1,75,1,1,0,NULL,1,2,0,130,165,-35,'2025-05-18 02:52:28','2025-05-18 02:52:28','',NULL,NULL,NULL),(1,76,1,1,0,NULL,1,2,0,130,165,-35,'2025-05-18 02:57:14','2025-05-18 02:57:14','',NULL,NULL,NULL),(1,77,1,1,0,NULL,1,2,0,130,165,-35,'2025-05-18 02:57:44','2025-05-18 02:57:44','',NULL,NULL,NULL),(1,78,1,1,0,NULL,1,2,0,130,165,-35,'2025-05-18 03:00:23','2025-05-18 03:00:23','',NULL,NULL,NULL),(1,79,1,0,0,NULL,6,3,0,130,130,0,'2025-05-18 03:04:04','2025-05-18 03:04:04','prueba de cancelacion',NULL,NULL,NULL),(1,80,1,0,0,NULL,1,3,0,130,130,0,'2025-05-18 03:04:36','2025-05-18 03:04:36','',NULL,NULL,NULL),(1,81,1,1,0,NULL,1,2,0,260,295,-35,'2025-05-18 19:13:20','2025-05-18 19:13:20','',NULL,NULL,NULL),(1,82,1,1,0,NULL,1,2,0,130,165,-35,'2025-05-20 00:32:53','2025-05-20 00:32:53','',NULL,NULL,NULL),(1,83,1,1,0,NULL,1,1,0,260,260,0,'2025-05-31 17:41:52','2025-05-31 17:41:52','',1,NULL,NULL),(1,84,1,1,0,NULL,1,2,0,260,295,-35,'2025-06-07 01:53:41','2025-06-07 01:53:41','',1,NULL,NULL),(1,85,1,1,0,NULL,1,1,0,250,250,0,'2025-06-27 23:51:51','2025-06-27 23:51:51','',1,2,NULL),(1,86,1,1,0,NULL,1,2,0,130,165,-35,'2025-06-28 15:57:08','2025-06-28 15:57:08','',1,2,35),(1,87,1,1,0,NULL,1,2,0,150,185,-35,'2025-06-28 19:07:25','2025-06-28 19:07:25','',1,2,35);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos_detalle`
--

DROP TABLE IF EXISTS `pedidos_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos_detalle` (
  `id_empresa` bigint(20) NOT NULL,
  `id_pedido_detalle` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_pedido` bigint(20) NOT NULL,
  `id_producto` bigint(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` double DEFAULT NULL,
  `subtotal` double NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_pedido_detalle`,`id_pedido`),
  KEY `id_empresa` (`id_empresa`,`id_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_detalle`
--

LOCK TABLES `pedidos_detalle` WRITE;
/*!40000 ALTER TABLE `pedidos_detalle` DISABLE KEYS */;
INSERT INTO `pedidos_detalle` VALUES (1,1,2,1,1,250,250,'2024-09-05 17:34:31','2024-09-05 17:34:31'),(1,2,3,1,1,250,250,'2024-09-05 18:31:43','2024-09-05 18:31:43'),(1,3,4,4,2,130,260,'2024-09-12 18:09:11','2024-09-12 18:09:11'),(1,4,4,5,1,130,130,'2024-09-12 18:09:11','2024-09-12 18:09:11'),(1,5,5,4,1,130,130,'2025-04-25 12:32:25','2025-04-25 12:32:25'),(1,6,6,4,2,130,260,'2025-04-25 20:42:39','2025-04-25 20:42:39'),(1,7,7,4,2,130,260,'2025-04-25 20:47:16','2025-04-25 20:47:16'),(1,8,8,8,1,150,150,'2025-04-25 21:02:23','2025-04-25 21:02:23'),(1,9,8,9,1,1.5,1.5,'2025-04-25 21:02:23','2025-04-25 21:02:23'),(1,10,9,8,1,150,150,'2025-04-25 21:04:26','2025-04-25 21:04:26'),(1,11,9,4,1,130,130,'2025-04-25 21:04:26','2025-04-25 21:04:26'),(1,12,9,6,1,130,130,'2025-04-25 21:04:26','2025-04-25 21:04:26'),(1,13,10,1,1,250,250,'2025-04-25 21:10:29','2025-04-25 21:10:29'),(1,14,10,4,1,130,130,'2025-04-25 21:10:29','2025-04-25 21:10:29'),(1,15,11,6,1,130,130,'2025-04-25 21:12:24','2025-04-25 21:12:24'),(1,16,12,4,1,130,130,'2025-04-25 21:15:05','2025-04-25 21:15:05'),(1,17,13,4,1,130,130,'2025-05-02 18:29:37','2025-05-02 18:29:37'),(1,18,14,6,1,130,130,'2025-05-02 18:45:00','2025-05-02 18:45:00'),(1,19,15,5,2,130,260,'2025-05-03 04:11:31','2025-05-03 04:11:31'),(1,20,16,4,1,130,130,'2025-05-04 01:55:09','2025-05-04 01:55:09'),(1,21,17,7,1,130,130,'2025-05-04 02:15:41','2025-05-04 02:15:41'),(1,22,18,7,1,130,130,'2025-05-04 02:24:24','2025-05-04 02:24:24'),(1,23,19,4,1,130,130,'2025-05-04 02:28:25','2025-05-04 02:28:25'),(1,24,20,4,1,130,130,'2025-05-04 02:41:16','2025-05-04 02:41:16'),(1,25,21,5,1,130,130,'2025-05-04 02:47:18','2025-05-04 02:47:18'),(1,26,22,5,1,130,130,'2025-05-04 02:51:36','2025-05-04 02:51:36'),(1,27,23,4,1,130,130,'2025-05-04 02:52:54','2025-05-04 02:52:54'),(1,28,24,6,1,130,130,'2025-05-04 02:59:04','2025-05-04 02:59:04'),(1,29,25,4,1,130,130,'2025-05-04 08:21:45','2025-05-04 08:21:45'),(1,30,26,4,1,130,130,'2025-05-04 08:39:43','2025-05-04 08:39:43'),(1,31,27,4,1,130,130,'2025-05-04 08:54:59','2025-05-04 08:54:59'),(1,32,28,4,1,130,130,'2025-05-08 17:36:53','2025-05-08 17:36:53'),(1,33,29,4,1,130,130,'2025-05-08 17:53:22','2025-05-08 17:53:22'),(1,34,30,7,1,130,130,'2025-05-08 17:59:17','2025-05-08 17:59:17'),(1,35,31,4,1,130,130,'2025-05-09 17:55:20','2025-05-09 17:55:20'),(1,36,32,4,1,130,130,'2025-05-09 17:56:23','2025-05-09 17:56:23'),(1,37,33,6,1,130,130,'2025-05-09 18:06:56','2025-05-09 18:06:56'),(1,38,34,4,1,130,130,'2025-05-09 18:09:42','2025-05-09 18:09:42'),(1,39,35,4,1,130,130,'2025-05-10 08:38:47','2025-05-10 08:38:47'),(1,40,36,6,1,130,130,'2025-05-10 08:41:39','2025-05-10 08:41:39'),(1,41,37,5,1,130,130,'2025-05-10 09:04:05','2025-05-10 09:04:05'),(1,42,38,5,1,130,130,'2025-05-10 09:14:51','2025-05-10 09:14:51'),(1,43,39,4,1,130,130,'2025-05-10 09:23:59','2025-05-10 09:23:59'),(1,44,40,5,1,130,130,'2025-05-10 09:36:25','2025-05-10 09:36:25'),(1,45,41,4,1,130,130,'2025-05-11 04:19:46','2025-05-11 04:19:46'),(1,46,42,4,1,130,130,'2025-05-12 21:46:47','2025-05-12 21:46:47'),(1,47,42,5,1,130,130,'2025-05-12 21:46:47','2025-05-12 21:46:47'),(1,48,43,4,1,130,130,'2025-05-12 21:53:36','2025-05-12 21:53:36'),(1,49,44,5,1,130,130,'2025-05-12 21:54:36','2025-05-12 21:54:36'),(1,50,45,5,1,130,130,'2025-05-12 22:02:37','2025-05-12 22:02:37'),(1,51,46,6,1,130,130,'2025-05-12 22:05:02','2025-05-12 22:05:02'),(1,52,47,8,1,150,150,'2025-05-12 22:07:11','2025-05-12 22:07:11'),(1,53,48,9,1,1.5,1.5,'2025-05-12 22:07:41','2025-05-12 22:07:41'),(1,54,49,7,1,130,130,'2025-05-12 22:08:15','2025-05-12 22:08:15'),(1,55,50,4,1,130,130,'2025-05-12 22:09:05','2025-05-12 22:09:05'),(1,56,51,8,1,150,150,'2025-05-12 22:12:38','2025-05-12 22:12:38'),(1,57,52,10,1,1.5,1.5,'2025-05-12 22:16:33','2025-05-12 22:16:33'),(1,58,53,10,1,1.5,1.5,'2025-05-12 22:17:19','2025-05-12 22:17:19'),(1,59,54,6,1,130,130,'2025-05-12 22:20:41','2025-05-12 22:20:41'),(1,60,55,6,1,130,130,'2025-05-12 22:21:06','2025-05-12 22:21:06'),(1,61,56,6,1,130,130,'2025-05-12 22:22:20','2025-05-12 22:22:20'),(1,62,57,6,1,130,130,'2025-05-12 22:24:38','2025-05-12 22:24:38'),(1,63,58,5,1,130,130,'2025-05-12 22:25:29','2025-05-12 22:25:29'),(1,64,59,4,2,130,260,'2025-05-13 14:57:30','2025-05-13 14:57:30'),(1,65,60,7,1,130,130,'2025-05-13 14:58:33','2025-05-13 14:58:33'),(1,66,61,7,1,130,130,'2025-05-13 14:59:27','2025-05-13 14:59:27'),(1,67,62,7,1,130,130,'2025-05-14 18:03:42','2025-05-14 18:03:42'),(1,68,63,4,1,130,130,'2025-05-15 18:18:52','2025-05-15 18:18:52'),(1,69,64,7,1,130,130,'2025-05-16 09:54:08','2025-05-16 09:54:08'),(1,70,65,7,1,130,130,'2025-05-16 11:27:37','2025-05-16 11:27:37'),(1,71,66,4,1,130,130,'2025-05-16 11:50:56','2025-05-16 11:50:56'),(1,72,67,7,1,130,130,'2025-05-16 15:13:47','2025-05-16 15:13:47'),(1,73,67,4,1,130,130,'2025-05-16 15:13:47','2025-05-16 15:13:47'),(1,74,68,4,1,130,130,'2025-05-16 18:02:29','2025-05-16 18:02:29'),(1,75,69,4,1,130,130,'2025-05-16 18:17:03','2025-05-16 18:17:03'),(1,76,70,4,1,130,130,'2025-05-16 18:31:44','2025-05-16 18:31:44'),(1,77,71,4,1,130,130,'2025-05-17 10:56:59','2025-05-17 10:56:59'),(1,78,72,4,1,130,130,'2025-05-17 11:10:54','2025-05-17 11:10:54'),(1,79,73,4,1,130,130,'2025-05-17 11:17:34','2025-05-17 11:17:34'),(1,80,74,4,1,130,130,'2025-05-17 11:33:53','2025-05-17 11:33:53'),(1,81,75,4,1,130,130,'2025-05-17 20:52:28','2025-05-17 20:52:28'),(1,82,76,7,1,130,130,'2025-05-17 20:57:14','2025-05-17 20:57:14'),(1,83,77,4,1,130,130,'2025-05-17 20:57:44','2025-05-17 20:57:44'),(1,84,78,4,1,130,130,'2025-05-17 21:00:23','2025-05-17 21:00:23'),(1,85,79,4,1,130,130,'2025-05-17 21:04:04','2025-05-17 21:04:04'),(1,86,80,6,1,130,130,'2025-05-17 21:04:36','2025-05-17 21:04:36'),(1,87,81,4,1,130,130,'2025-05-18 13:13:20','2025-05-18 13:13:20'),(1,88,81,6,1,130,130,'2025-05-18 13:13:20','2025-05-18 13:13:20'),(1,89,82,4,1,130,130,'2025-05-19 18:32:53','2025-05-19 18:32:53'),(1,90,83,4,1,130,130,'2025-05-31 11:41:52','2025-05-31 11:41:52'),(1,91,83,5,1,130,130,'2025-05-31 11:41:52','2025-05-31 11:41:52'),(1,92,84,4,1,130,130,'2025-06-06 19:53:42','2025-06-06 19:53:42'),(1,93,84,5,1,130,130,'2025-06-06 19:53:42','2025-06-06 19:53:42'),(1,94,85,1,1,250,250,'2025-06-27 17:51:51','2025-06-27 17:51:51'),(1,95,86,4,1,130,130,'2025-06-28 09:57:08','2025-06-28 09:57:08'),(1,96,87,8,1,150,150,'2025-06-28 13:07:25','2025-06-28 13:07:25');
/*!40000 ALTER TABLE `pedidos_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procmenu`
--

DROP TABLE IF EXISTS `procmenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procmenu` (
  `id_empresa` int(11) NOT NULL,
  `id_procMenu` int(11) NOT NULL AUTO_INCREMENT,
  `id_padre` int(11) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `orden` int(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `linkTo` varchar(255) DEFAULT NULL,
  `icono` varchar(600) DEFAULT NULL,
  `soloLanding` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id_empresa`,`id_procMenu`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procmenu`
--

LOCK TABLES `procmenu` WRITE;
/*!40000 ALTER TABLE `procmenu` DISABLE KEYS */;
INSERT INTO `procmenu` VALUES (1,1,0,'Inicio',0,1,'/erp','',_binary '\0'),(1,2,0,'Landing Page',20,1,'','',_binary '\0'),(1,3,0,'Ventas',30,1,'','',_binary '\0'),(1,4,0,'Compras',40,1,'','',_binary '\0'),(1,5,0,'Cartera',50,1,'','',_binary '\0'),(1,6,0,'Inventario',60,1,'','',_binary '\0'),(1,7,0,'Caja',70,1,'','',_binary '\0'),(1,8,0,'Facturación',80,1,'','',_binary '\0'),(1,9,0,'Admin',90,1,'','',_binary '\0'),(1,10,0,'Mesa de Ayuda',100,1,'','<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-person-raised-hand\" viewBox=\"0 0 16 16\">\n  <path d=\"M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207\"/>\n  <path d=\"M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3\"/>\n</svg>',_binary '\0'),(1,11,0,'Notificaciones',110,1,'','<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-bell\" viewBox=\"0 0 16 16\">\n  <path d=\"M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6\"/>\n</svg>',_binary '\0'),(1,12,0,'Usuario',120,1,'','<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-person-circle\" viewBox=\"0 0 16 16\">\n  <path d=\"M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0\"/>\n  <path fill-rule=\"evenodd\" d=\"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1\"/>\n</svg>',_binary '\0'),(1,13,0,'Admin',115,0,'','<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-sliders\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z\"/>\n</svg>',_binary '\0'),(1,14,2,'¿Quienes somos?',10,1,'AboutUs','',_binary ''),(1,15,2,'Productos',20,1,'Products','',_binary ''),(1,16,2,'Servicio',30,1,'Services','',_binary ''),(1,17,2,'Contáctanos',40,1,'ContactUs','',_binary ''),(1,18,3,'Pedido / Cotizar',10,1,'Ventas/Cotizar','',_binary '\0'),(1,19,4,'ABC Proveedores',10,1,'Compras/Proveedores/ListProveedores','',_binary '\0'),(1,20,4,'Orden de Compra',20,1,'Compras/Proveedores/OrdenCompra','',_binary '\0'),(1,21,4,'Punto de reorden',30,0,'','',_binary '\0'),(1,22,5,'ABC Clientes',10,1,'Cartera/Clientes','',_binary '\0'),(1,23,5,'Agenda',20,1,'Cartera/Agenda','',_binary '\0'),(1,24,5,'Estado de cuente',30,0,'','',_binary '\0'),(1,25,5,'Antiguedad de Saldos',40,0,'','',_binary '\0'),(1,26,6,'ABC Productos',10,1,'Inventario/Productos/ListProductos','',_binary '\0'),(1,27,6,'ABC Categorias',20,1,'Inventario/Categorias/ListCategorias','',_binary '\0'),(1,28,6,'Pedido Canvas',30,1,'Inventario/Canvas/PedidoCanvas','',_binary '\0'),(1,29,6,'Kardex',40,0,'Inventario/Kardex/Kardex','',_binary '\0'),(1,30,6,'Recepción de Mercancía',50,0,'','',_binary '\0'),(1,31,6,'Devoluciones',60,0,'','',_binary '\0'),(1,32,6,'Entrega de Mercancía',70,0,'','',_binary '\0'),(1,33,7,'Recepcion de Pagos',10,0,'','',_binary '\0'),(1,34,7,'Generación de Remisión',20,0,'','',_binary '\0'),(1,35,7,'Generación de Factura',20,0,'','',_binary '\0'),(1,36,8,'Consulta de Facturas',10,0,'','',_binary '\0'),(1,37,8,'Consulta de Comprobantes',20,0,'','',_binary '\0'),(1,38,12,'Entrar',200,1,'','',_binary '\0'),(1,39,12,'Salir',220,1,'','',_binary '\0'),(1,40,12,'Perfil',210,0,'Admin/Perfil','',_binary '\0'),(1,41,9,'Settings',10,1,'Admin/Settings/Settings','',_binary '\0'),(1,42,41,'Menú dinámico',10,1,'','',_binary '\0'),(1,43,42,'Roles',20,1,'','',_binary '\0'),(1,44,42,'Rol - Menú',30,1,'','',_binary '\0'),(1,45,41,'Usuario - Rol',40,1,'','',_binary '\0'),(1,46,9,'Conf. CRM',10,1,'Admin/LandingPage','',_binary '\0'),(1,47,46,'Usuarios',10,1,'','',_binary '\0'),(1,48,46,'Productos',20,1,'','',_binary '\0'),(1,49,46,'Landing Page',30,1,'Admin/LandingPage','',_binary '\0'),(1,50,11,'Ver Notificaciones',10,1,'','',_binary '\0'),(1,51,3,'Movs. de caja',20,1,'Ventas/MovimientosCaja','',_binary '\0');
/*!40000 ALTER TABLE `procmenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `id_proveedor` bigint(20) NOT NULL,
  `id_categoria` bigint(20) NOT NULL,
  `precio` double DEFAULT 0,
  `precio_promocion` double DEFAULT 0,
  `costo` double DEFAULT 0,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `existencia` int(11) DEFAULT 0,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1,
  `sku` varchar(20) NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_producto`),
  UNIQUE KEY `id_empresa_3` (`id_empresa`,`sku`),
  KEY `id_empresa` (`id_empresa`,`id_categoria`),
  KEY `id_empresa_2` (`id_empresa`,`id_proveedor`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,1,'Caja de Filete tilapia','Caja de Filete Tilapia, contiene 4.5 KG aprox.',1,1,260,250,200,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245043/nir/filete_tilapia_lkscvm.webp','https://fiestatijuana.mx/image-not-available.png','https://fiestatijuana.mx/image-not-available.png',0,'2025-07-09 19:52:28','2025-07-09 19:52:28',1,'CJFT1'),(2,1,'Caja de Filete tilapias','Bolsa de Filete Tilapia, contiene 4 piezas',1,1,80,1,20,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245043/nir/filete_tilapia_lkscvm.webp','https://fiestatijuana.mx/image-not-available.png','https://fiestatijuana.mx/image-not-available.png',1,'2025-07-22 18:34:23','2025-07-22 18:34:23',1,'CJFT2'),(3,1,'Camarón comptelero','Bolsa de Camarón comptelero.',1,1,150,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702249673/nir/camaron_coctelero_dtxd4d.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,'CMRCMP'),(4,1,'Boneless','Bolsa de Boneless 1 KG.',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253038/nir/boneless-natural_lmtjzy.png',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,'BNL'),(5,1,'Pechuga agrosuper','Pechuga agrosuper natural sin piel. Contiene 4 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245261/nir/pechuga_agrosuper_l9tn8n.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,'PCHAGR'),(6,1,'Milenesa Cordon Bleu','Milanesa Cordon Bleu. Bolsa con 7 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253266/nir/cordon-bleu_egaz5t.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,'MLNCB'),(7,1,'Pierna de pollo KFC','Pierna de pollo KFC. Bolsa con 10 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702268973/nir/pierna-kfc_edgehq.png',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,'PPKC'),(8,1,'Aros de cebolla','Bolsa de aros de cebolla.',1,3,150,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253406/nir/aros-cebolla_dx53ek.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,'ARSCBL'),(9,1,'Papa a la francesa','Bolsa de papas a la francesa',1,3,100,1.5,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253552/nir/papas-a-la-francesa_vgywg5.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,'PAPFRN'),(10,1,'Tocino','Paquete de Tocino Big Buy 453 GR.',1,4,100,1.5,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253721/nir/tocino-big-buy_as4eom.webp',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,'TCN');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id_empresa` bigint(20) NOT NULL,
  `id_proveedor` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `contacto1` varchar(200) DEFAULT NULL,
  `contacto2` varchar(200) DEFAULT NULL,
  `telefono1` varchar(20) DEFAULT NULL,
  `telefono2` varchar(20) DEFAULT NULL,
  `email1` varchar(180) DEFAULT NULL,
  `email2` varchar(180) DEFAULT NULL,
  `horario` varchar(180) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_actualizacion` datetime DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  `whatsapp` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_proveedor`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,1,'Agrowings',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider` (
  `id_provider` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_provider`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider`
--

LOCK TABLES `provider` WRITE;
/*!40000 ALTER TABLE `provider` DISABLE KEYS */;
INSERT INTO `provider` VALUES (1,'Local'),(2,'Google'),(3,'Facebook');
/*!40000 ALTER TABLE `provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puntosdeentrega`
--

DROP TABLE IF EXISTS `puntosdeentrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puntosdeentrega` (
  `id_puntoDeEntrega` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `horario` varchar(600) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_actualizacion` datetime DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_puntoDeEntrega`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puntosdeentrega`
--

LOCK TABLES `puntosdeentrega` WRITE;
/*!40000 ALTER TABLE `puntosdeentrega` DISABLE KEYS */;
INSERT INTO `puntosdeentrega` VALUES (1,1,'Citadel (Estacionamiento Sears)','Sábados de 4:00 - 6:00 P.M.','2024-08-07 15:24:47','2024-08-14 12:49:52',1);
/*!40000 ALTER TABLE `puntosdeentrega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_menu`
--

DROP TABLE IF EXISTS `rol_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_menu` (
  `id_empresa` int(11) NOT NULL,
  `id_procMenu` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_procMenu`,`id_rol`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_menu`
--

LOCK TABLES `rol_menu` WRITE;
/*!40000 ALTER TABLE `rol_menu` DISABLE KEYS */;
INSERT INTO `rol_menu` VALUES (1,1,1,1),(1,2,1,1),(1,3,1,1),(1,4,1,1),(1,5,1,1),(1,6,1,1),(1,7,1,1),(1,8,1,1),(1,9,1,1),(1,10,1,1),(1,11,1,1),(1,12,1,1),(1,13,1,1),(1,14,1,1),(1,15,1,1),(1,16,1,1),(1,17,1,1),(1,18,1,1),(1,19,1,1),(1,20,1,1),(1,21,1,1),(1,22,1,1),(1,23,1,1),(1,24,1,1),(1,25,1,1),(1,26,1,1),(1,27,1,1),(1,28,1,1),(1,29,1,1),(1,30,1,1),(1,31,1,1),(1,32,1,1),(1,33,1,1),(1,34,1,1),(1,35,1,1),(1,36,1,1),(1,37,1,1),(1,51,1,1),(1,39,1,1),(1,40,1,1),(1,41,1,1),(1,42,1,1),(1,43,1,1),(1,44,1,1),(1,45,1,1),(1,46,1,1),(1,47,1,1),(1,48,1,1),(1,49,1,1),(1,50,0,1),(1,50,1,1);
/*!40000 ALTER TABLE `rol_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_empresa` bigint(20) NOT NULL,
  `id_rol` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(90) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_rol`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,1,'master','2023-12-10 00:00:00','2025-08-23 00:00:00',1),(1,2,'admin','2023-12-10 00:00:00','2025-08-23 00:00:00',1),(1,3,'Landing Page','2025-03-18 00:00:00','2025-08-23 00:00:00',1),(1,4,'Agenda','2025-03-18 00:00:00','2025-08-23 00:00:00',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_movimiento_inventario`
--

DROP TABLE IF EXISTS `tipo_movimiento_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_movimiento_inventario` (
  `id_empresa` int(11) NOT NULL,
  `id_tipo_movimiento` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `tipo_operacion` enum('E','S') NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_tipo_movimiento`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_movimiento_inventario`
--

LOCK TABLES `tipo_movimiento_inventario` WRITE;
/*!40000 ALTER TABLE `tipo_movimiento_inventario` DISABLE KEYS */;
INSERT INTO `tipo_movimiento_inventario` VALUES (1,1,'Orden de Compra','E'),(1,2,'Venta','S'),(1,3,'Ajuste +','E'),(1,4,'Ajuste -','S');
/*!40000 ALTER TABLE `tipo_movimiento_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_pedido`
--

DROP TABLE IF EXISTS `tipo_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_pedido` (
  `id_empresa` int(11) NOT NULL,
  `id_tipo_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_pedido` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_tipo_pedido`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_pedido`
--

LOCK TABLES `tipo_pedido` WRITE;
/*!40000 ALTER TABLE `tipo_pedido` DISABLE KEYS */;
INSERT INTO `tipo_pedido` VALUES (2,1,'En sitio'),(2,2,'Domicilio'),(2,3,'Recoge'),(1,3,'Recoge'),(1,2,'Domicilio'),(1,1,'En sitio');
/*!40000 ALTER TABLE `tipo_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_rol`
--

DROP TABLE IF EXISTS `usuario_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_rol` (
  `id_empresa` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_usuario`,`id_rol`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_rol`
--

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` VALUES (1,1,1);
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_empresa` bigint(20) NOT NULL,
  `id_usuario` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(180) NOT NULL,
  `nombre` varchar(90) NOT NULL,
  `apellidos` varchar(90) NOT NULL,
  `celular` varchar(90) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `password` varchar(90) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `fecha_ultimo_acceso` datetime DEFAULT NULL,
  `id_provider` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_usuario`,`email`),
  UNIQUE KEY `idx_login` (`id_empresa`,`email`,`password`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,1,'rob.hst@gmail.com','Roberto','Vazquez Hastings','8110170557',NULL,'$2b$08$DuJlVb7GckLTD6XXICNxBu9.BT1.7VBL/kl0zXvbn074L9J5ylDX6','2023-12-10 00:00:00','2023-12-10 00:00:00','2024-03-30 23:41:28',NULL,'1970-06-25'),(2,1,'rob.hst@gmail.com','Roberto','Vazquez Hastings','8110170557',NULL,'$2b$08$DuJlVb7GckLTD6XXICNxBu9.BT1.7VBL/kl0zXvbn074L9J5ylDX6','2024-11-09 10:49:15','2024-11-09 10:49:15',NULL,NULL,'1970-06-25');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_roles`
--

DROP TABLE IF EXISTS `usuarios_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_roles` (
  `id_empresa` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL,
  `id_rol` bigint(20) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_usuario`,`id_rol`),
  KEY `id_empresa` (`id_empresa`,`id_rol`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_roles`
--

LOCK TABLES `usuarios_roles` WRITE;
/*!40000 ALTER TABLE `usuarios_roles` DISABLE KEYS */;
INSERT INTO `usuarios_roles` VALUES (1,1,1,'2023-12-10 00:00:00','2023-12-10 00:00:00');
/*!40000 ALTER TABLE `usuarios_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitas`
--

DROP TABLE IF EXISTS `visitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitas` (
  `id_empresa` bigint(20) NOT NULL,
  `id_visita` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_cliente` bigint(20) NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  `nombre` varchar(90) NOT NULL,
  `comentarios` varchar(800) NOT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_final` datetime DEFAULT NULL,
  `latitud` double DEFAULT NULL,
  `longitud` double DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_visita`),
  KEY `id_empresa_cliente` (`id_empresa`,`id_cliente`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitas`
--

LOCK TABLES `visitas` WRITE;
/*!40000 ALTER TABLE `visitas` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'crm'
--
/*!50003 DROP FUNCTION IF EXISTS `fn_genera_clave_confirmacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_genera_clave_confirmacion`(id_empresa INT) RETURNS varchar(6) CHARSET latin1 COLLATE latin1_spanish_ci
    READS SQL DATA
BEGIN
  DECLARE caracteres VARCHAR(62) DEFAULT '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  DECLARE clave VARCHAR(6) DEFAULT '';
  DECLARE intentos INT DEFAULT 0;
  DECLARE clave_encontrada BOOLEAN DEFAULT FALSE;

  WHILE intentos < 6 AND NOT clave_encontrada DO
    SET clave = '';
    SET @i = 0;
    WHILE @i < 6 DO
      SET clave = CONCAT(clave, SUBSTRING(caracteres, FLOOR(1 + RAND() * 62), 1));
      SET @i = @i + 1;
    END WHILE;

    IF (SELECT COUNT(*) FROM agenda WHERE id_empresa = id_empresa AND clave_confirmacion = clave) = 0 THEN
      SET clave_encontrada = TRUE;
    ELSE
      SET intentos = intentos + 1;
    END IF;
  END WHILE;

  IF NOT clave_encontrada THEN
    SET clave = '000000';
  END IF;

  RETURN UPPER(clave);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_solo_numeros` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_solo_numeros`(cadena VARCHAR(255)
) RETURNS varchar(255) CHARSET latin1 COLLATE latin1_spanish_ci
    DETERMINISTIC
BEGIN
    DECLARE resultado VARCHAR(255) DEFAULT '';
    DECLARE i INT DEFAULT 1;
    DECLARE c CHAR(1);

    WHILE i <= CHAR_LENGTH(cadena) DO
        SET c = SUBSTRING(cadena, i, 1);
        IF c REGEXP '[0-9]' THEN
            SET resultado = CONCAT(resultado, c);
        END IF;
        SET i = i + 1;
    END WHILE;

    RETURN resultado;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteAgenda` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteAgenda`(
	IN prm_id_empresa INT,
    in prm_fecha DATE,
    IN prm_celular VARCHAR(20),
    IN prm_intervalo VARCHAR(20)
)
BEGIN
	DECLARE _id_usuario INT;
    DECLARE _hora_inicio TIME;
    DECLARE separador INT;
    
    SET separador = LOCATE('-', prm_intervalo);
    SET _hora_inicio = TIME(SUBSTRING(prm_intervalo, 1, separador - 1));

	-- BUSCO EL USUARIO
    SELECT U.id_usuario INTO _id_usuario
    FROM usuarios U
    WHERE U.id_empresa = prm_id_empresa AND U.celular = prm_celular;
    
    -- BUSCO LA CITA EN LA AGENDA
    IF EXISTS(
		SELECT 1
		FROM agenda A
		WHERE A.id_empresa = prm_id_empresa AND A.fecha = prm_fecha AND A.hora_inicio = _hora_inicio AND A.id_usuario = _id_usuario
    ) THEN
		DELETE
		FROM agenda
		WHERE id_empresa = prm_id_empresa AND fecha = prm_fecha AND hora_inicio = _hora_inicio AND id_usuario = _id_usuario;
        
		SELECT 	1 AS Eliminado;    
	ELSE
		SELECT 	0 AS Eliminado;  
	END IF;
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteOrdenDeCompra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteOrdenDeCompra`(
    IN p_id_empresa INT,
    IN p_id_ordencompra INT,
    IN p_id_usuario INT,
    OUT p_codigo_resultado INT,
    OUT p_mensaje_resultado VARCHAR(255)
)
BEGIN
    -- Inicializar valores de retorno
    SET p_codigo_resultado = 0;
    SET p_mensaje_resultado = 'Orden de Compra fue cancelada exitosamente';

    -- Actualizar la tabla ordencompra
    UPDATE ordencompra
    SET id_estado_ordencompra = 3, -- El estado cambia a 3 ("Recibida")
		id_usuario = p_id_usuario
    WHERE id_empresa = p_id_empresa
      AND id_ordencompra = p_id_ordencompra;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAgendaBuscarCita` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAgendaBuscarCita`(
	IN prm_id_empresa INT,
    IN prm_celular VARCHAR(20)
)
BEGIN
	DECLARE _id_usuario INT;
    
	-- BUSCO EL USUARIO
    SELECT U.id_usuario INTO _id_usuario
    FROM usuarios U
    WHERE U.id_empresa = prm_id_empresa AND U.celular = prm_celular;
    
	-- BUSCO CITAS DEL USUARIO
	SELECT 	A.fecha, A.hora_inicio, A.hora_fin, 
			CONCAT(TIME_FORMAT(A.hora_inicio, '%H:%i'), ' - ', TIME_FORMAT(A.hora_fin, '%H:%i')) AS intervalo,
            CONCAT('Dia: ', A.fecha, '  -  Hora: ', TIME_FORMAT(A.hora_inicio, '%H:%i'), ' - ', TIME_FORMAT(A.hora_fin, '%H:%i')) AS cita
	FROM agenda A
	WHERE A.id_empresa = prm_id_empresa AND A.id_usuario = _id_usuario AND A.fecha >= CURDATE(); 
	    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAgendaDisponibilidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAgendaDisponibilidad`(
	IN prm_id_empresa INT,
	IN prm_fecha DATE,
    IN prm_orden_asc INT,
    IN prm_mostrar_solo_una INT
)
BEGIN
	DECLARE dia_semana INT;    
	DECLARE id_jornada INT;
    DECLARE _hora_inicio TIME;
	DECLARE _hora_fin TIME;
	DECLARE _hora_actual TIME;
    DECLARE duracion_cita INT;
         
    SET dia_semana = WEEKDAY(prm_fecha);
    SET duracion_cita = 60;
    IF prm_orden_asc = 1 
		THEN SET @orden = 'ASC'; 
		ELSE SET @orden = 'DESC';
    END IF;
    
	SELECT JL.hora_inicio, JL.hora_fin, JL.hora_inicio INTO _hora_inicio, _hora_fin, _hora_actual 
	FROM jornada_laboral JL
	WHERE JL.dia_semana = dia_semana;      
    
	-- SELECT _hora_inicio, _hora_fin, _hora_actual;
    
    CREATE TEMPORARY TABLE IF NOT EXISTS intervalos_tiempo (intervalo VARCHAR(20), hora_inicio TIME, hora_fin TIME);
    
    -- bucle WHILE y tabla temporal
	WHILE _hora_actual < _hora_fin DO
        -- Calcular la hora fin del intervalo actual sumando la duración de la cita
        SET @hora_fin_intervalo = ADDTIME(_hora_actual, SEC_TO_TIME(duracion_cita * 60));

        -- Formatear el intervalo de tiempo como una cadena
        SET @intervalo = CONCAT(TIME_FORMAT(_hora_actual, '%H:%i'), ' - ', TIME_FORMAT(@hora_fin_intervalo, '%H:%i'));

        -- Insertar el intervalo en la tabla temporal
        INSERT INTO intervalos_tiempo (intervalo, hora_inicio, hora_fin) VALUES (@intervalo, _hora_actual, @hora_fin_intervalo);

        -- Actualizar la hora actual para el siguiente intervalo
        SET _hora_actual = @hora_fin_intervalo;
	END WHILE;    
    
	-- Mostrar los registros de la tabla temporal
    IF prm_orden_asc = 1 THEN
    
		IF prm_mostrar_solo_una = 0 THEN
			SELECT I.*     
			FROM intervalos_tiempo I
			LEFT JOIN agenda A ON A.id_empresa = prm_id_empresa AND A.fecha = prm_fecha AND A.hora_inicio = I.hora_inicio AND A.hora_fin = I.hora_fin
			WHERE A.id_agenda IS NULL;
		ELSE
			SELECT I.*     
			FROM intervalos_tiempo I
			LEFT JOIN agenda A ON A.id_empresa = prm_id_empresa AND A.fecha = prm_fecha AND A.hora_inicio = I.hora_inicio AND A.hora_fin = I.hora_fin
			WHERE A.id_agenda IS NULL LIMIT 1;
		END IF;
        
	ELSE
		IF prm_mostrar_solo_una = 0 THEN
			SELECT I.*     
			FROM intervalos_tiempo I
			LEFT JOIN agenda A ON A.id_empresa = prm_id_empresa AND A.fecha = prm_fecha AND A.hora_inicio = I.hora_inicio AND A.hora_fin = I.hora_fin
			WHERE A.id_agenda IS NULL
			ORDER BY I.hora_inicio DESC;
		ELSE
			SELECT I.*     
			FROM intervalos_tiempo I
			LEFT JOIN agenda A ON A.id_empresa = prm_id_empresa AND A.fecha = prm_fecha AND A.hora_inicio = I.hora_inicio AND A.hora_fin = I.hora_fin
			WHERE A.id_agenda IS NULL
			ORDER BY I.hora_inicio DESC LIMIT 1;
		END IF;
	END IF;    
    
	-- Eliminar la tabla temporal (opcional)
	DROP TEMPORARY TABLE intervalos_tiempo;    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAgendaPorDia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAgendaPorDia`(
	IN prm_id_empresa INT,
	IN prm_fecha DATE
)
BEGIN
	DECLARE dia_semana INT;    
    DECLARE duracion_cita INT;
    	
    DECLARE _hora_inicio TIME;
	DECLARE _hora_fin TIME;
	DECLARE _hora_actual TIME;
    
    DECLARE id_jornada INT;
         
    SET dia_semana = WEEKDAY(prm_fecha);
    -- SET duracion_cita = 30;
    
	SELECT JL.hora_inicio, JL.hora_fin, JL.hora_inicio, JL.duracion_cita INTO _hora_inicio, _hora_fin, _hora_actual, duracion_cita 
	FROM jornada_laboral JL
	WHERE JL.id_empresa = prm_id_empresa AND JL.dia_semana = dia_semana;      
    
    CREATE TEMPORARY TABLE IF NOT EXISTS intervalos_tiempo (intervalo VARCHAR(20), hora_inicio TIME, hora_fin TIME);
    
    -- bucle WHILE y tabla temporal
	WHILE _hora_actual < _hora_fin DO
        -- Calcular la hora fin del intervalo actual sumando la duración de la cita
        SET @hora_fin_intervalo = ADDTIME(_hora_actual, SEC_TO_TIME(duracion_cita * 60));

        -- Formatear el intervalo de tiempo como una cadena
        SET @intervalo = CONCAT(TIME_FORMAT(_hora_actual, '%H:%i'), ' - ', TIME_FORMAT(@hora_fin_intervalo, '%H:%i'));

        -- Insertar el intervalo en la tabla temporal
        INSERT INTO intervalos_tiempo (intervalo, hora_inicio, hora_fin) VALUES (@intervalo, _hora_actual, @hora_fin_intervalo);

        -- Actualizar la hora actual para el siguiente intervalo
        SET _hora_actual = @hora_fin_intervalo;
	END WHILE;    
    
	-- Mostrar los registros de la tabla temporal
	SELECT 	I.*, C.nombre AS Nombre, IFNULL(fn_solo_numeros(C.celulares), '') AS Celular, IFNULL(AE.descripcion, '') AS Estatus,
			IFNULL(A.id_agenda, 0) AS id_agenda, A.clave_confirmacion, IFNULL(C.id_cliente, 0) AS id_cliente
	FROM intervalos_tiempo I
	LEFT JOIN agenda A ON A.id_empresa = prm_id_empresa AND A.fecha = prm_fecha AND A.hora_inicio = I.hora_inicio AND A.hora_fin = I.hora_fin
    LEFT JOIN agenda_estatus AE ON AE.id_empresa = prm_id_empresa AND AE.id_agenda_estatus = IFNULL(A.id_agenda_estatus, 1)
    LEFT JOIN clientes C ON C.id_empresa = prm_id_empresa AND C.id_cliente = A.id_cliente 
    ORDER BY I.intervalo;
	-- WHERE A.id_agenda IS NULL;
    
	-- Eliminar la tabla temporal (opcional)
	DROP TEMPORARY TABLE intervalos_tiempo;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getCaja` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCaja`(
	IN p_id_empresa INT,
    IN p_ip VARCHAR(20)
)
BEGIN
	DECLARE p_id_caja INT;

	IF EXISTS(
		SELECT esta_abierta
		FROM caja
		WHERE id_empresa = p_id_empresa AND ip = p_ip AND esta_abierta = 1
    ) THEN
    
		SELECT id_caja INTO p_id_caja 
		FROM caja
		WHERE id_empresa = p_id_empresa AND ip = p_ip AND esta_abierta = 1;
    
		SELECT 1 AS cajaAbierta, p_id_caja AS id_caja;
	else
		select 0 AS cajaAbierta, 0 AS id_caja;
	end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getCajeroListing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCajeroListing`(
	IN prm_id_empresa INT,
	IN limite INT,
    IN pagina INT  
)
BEGIN
	SELECT COUNT(*) AS totalRegistros
    FROM cajero
    WHERE id_empresa = prm_id_empresa;

    IF (limite > 0) THEN
		SELECT 	id_cajero, nombre, password, 
                CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo		
		FROM cajero
        WHERE id_empresa = prm_id_empresa
        ORDER BY id_empresa, id_cajero
		LIMIT limite OFFSET pagina;
	ELSE 
		SELECT 	id_cajero, nombre, password, 
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo
		FROM cajero
        WHERE id_empresa = prm_id_empresa
        ORDER BY id_empresa, id_cajero;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getCajeros` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCajeros`(
	IN prm_id_empresa INT
)
BEGIN
	SELECT id_cajero, nombre, password FROM cajero;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getCategorias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCategorias`(
	IN limite INT,
    IN pagina INT    
)
BEGIN
	
    SELECT COUNT(*) AS totalRegistros
    FROM categorias;
    
    IF (limite > 0) THEN
		SELECT 	id_categoria, nombre, descripcion, 
				DATE_FORMAT(fecha_actualizacion, '%m/%d/%Y %H:%i') AS fecha_actualizacion,
                CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo, 
                CASE 
					WHEN imagen IS NULL THEN 'https://fiestatijuana.mx/image-not-available.png'
                    WHEN imagen = '' THEN 'https://fiestatijuana.mx/image-not-available.png'
                    ELSE imagen
				END AS imagen			
		FROM categorias
        ORDER BY id_empresa, id_categoria
		LIMIT limite OFFSET pagina;
	ELSE 
		SELECT 	id_categoria, nombre, descripcion, 
				DATE_FORMAT(fecha_actualizacion, '%m/%d/%Y %H:%i') AS fecha_actualizacion, 
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo, 
                CASE 
					WHEN imagen IS NULL THEN 'https://fiestatijuana.mx/image-not-available.png'
                    WHEN imagen = '' THEN 'https://fiestatijuana.mx/image-not-available.png'
                    ELSE imagen
				END AS imagen	
		FROM categorias C
        WHERE EXISTS(
			SELECT id_categoria FROM productos P WHERE P.id_categoria = C.id_categoria LIMIT 1
        )
        ORDER BY id_empresa, id_categoria;
	END IF;
         
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getClientePorTelefonoOCelular` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getClientePorTelefonoOCelular`(
	prm_id_empresa INT,
    prm_celular VARCHAR(20)
)
BEGIN
	DECLARE numero VARCHAR(20) DEFAULT ''; 
    DECLARE nombre_cliente VARCHAR(200) DEFAULT '';
    DECLARE id_cliente INT DEFAULT 0;
    DECLARE calle VARCHAR(200);
    DECLARE numero_exterior VARCHAR(20);
    DECLARE id_colonia INT;
    DECLARE colonia VARCHAR(100);
    DECLARE entre_calles VARCHAR(200);
    DECLARE referencia VARCHAR(200);
    DECLARE id_direccion INT;
    DECLARE direccion VARCHAR(800);
    DECLARE cargo_delivery DECIMAL;

	SELECT fn_solo_numeros(prm_celular) into numero;
    -- select numero;

	SELECT 	C.nombre, C.id_cliente, D.id_direccion,
			IFNULL(D.calle, ''), IFNULL(D.numero, ''), IFNULL(D.id_colonia, ''), IFNULL(D.entre_calles, ''), IFNULL(D.referencia, ''), IFNULL(CD.nombre, ''),
            D.direccion, CD.cargo
	INTO	nombre_cliente, id_cliente, id_direccion,
			calle, numero_exterior, id_colonia, entre_calles, referencia, colonia, direccion, cargo_delivery
    FROM clientes C
    LEFT JOIN direcciones D ON D.id_empresa = C.id_empresa AND D.id_direccion_tipo_identidad = 1 AND D.identidad = C.id_cliente and D.direccion_por_defecto = 1
    LEFT JOIN colonias_delivery CD ON CD.id_empresa = C.id_empresa AND CD.id_colonia = D.id_colonia
    WHERE C.id_empresa = prm_id_empresa AND fn_solo_numeros(C.celulares) = numero
	LIMIT 1;
    
    -- SI NO ENCONTRÉ EL CLIENTE LO BUSCO AHORA POR TELEFONO
    IF nombre_cliente = '' THEN
    
		SELECT 	C.nombre, C.id_cliente, D.id_direccion,
				IFNULL(D.calle, ''), IFNULL(D.numero, ''), IFNULL(D.id_colonia, ''), IFNULL(D.entre_calles, ''), IFNULL(D.referencia, ''), IFNULL(CD.nombre, ''),
                D.direccion, CD.cargo
        INTO 	nombre_cliente, id_cliente, id_direccion,
				calle, numero_exterior, id_colonia, entre_calles, referencia, colonia, direccion, cargo_delivery
		FROM clientes C
        LEFT JOIN direcciones D ON D.id_empresa = C.id_empresa AND D.id_direccion_tipo_identidad = 1 AND D.identidad = C.id_cliente and D.direccion_por_defecto = 1
        LEFT JOIN colonias_delivery CD ON CD.id_empresa = C.id_empresa AND CD.id_colonia = D.id_colonia
        WHERE C.id_empresa = prm_id_empresa AND fn_solo_numeros(C.telefonos) = numero
		LIMIT 1; 
    
    END IF;        
    
    SELECT 	nombre_cliente, id_cliente, IFNULL(id_direccion, 0) AS id_direccion,
			ifnull(calle, '') AS calle, IFNULL(numero_exterior, '') AS numero_exterior, 
			IFNULL(id_colonia, 0) AS id_colonia, IFNULL(colonia, '') AS colonia, 
            IFNULL(entre_calles, '') AS entre_calles, IFNULL(referencia, '') AS referencia,
            IFNULL(direccion, '') AS direccion, IFNULL(cargo_delivery, 0) AS cargo_delivery;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getClientesListing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getClientesListing`(
	IN prm_id_empresa INT,
	IN limite INT,
    IN pagina INT  
)
BEGIN
	SELECT COUNT(*) AS totalRegistros
    FROM clientes
    WHERE id_empresa = prm_id_empresa;

    IF (limite > 0) THEN
		SELECT 	id_cliente, empresa, nombre,
                telefonos, celulares, fecha_ultima_visita, fecha_ultima_compra
		FROM clientes
        WHERE id_empresa = prm_id_empresa
        ORDER BY id_empresa, id_cliente
		LIMIT limite OFFSET pagina;
	ELSE 
		SELECT 	id_cliente, empresa, nombre,
                telefonos, celulares, fecha_ultima_visita, fecha_ultima_compra
		FROM clientes
        WHERE id_empresa = prm_id_empresa
        ORDER BY id_empresa, id_cliente;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getColoniasDelivery` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getColoniasDelivery`(
	IN p_id_empresa int
)
BEGIN
	
    SELECT id_empresa, id_colonia, nombre, activa
    FROM colonias_delivery
    WHERE id_empresa = p_id_empresa AND activa = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getColoniasDeliveryListing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getColoniasDeliveryListing`(
	IN prm_id_empresa INT,
	IN limite INT,
    IN pagina INT  
)
BEGIN

	SELECT COUNT(*) AS totalRegistros
    FROM colonias_delivery
    WHERE id_empresa = prm_id_empresa;

    IF (limite > 0) THEN
		SELECT 	id_colonia, nombre, cargo, 
                CASE WHEN activa = 1 THEN 'Si' ELSE 'NO' END AS activo		
		FROM colonias_delivery
        WHERE id_empresa = prm_id_empresa
        ORDER BY id_empresa, id_colonia
		LIMIT limite OFFSET pagina;
	ELSE 
		SELECT 	id_colonia, nombre, cargo, 
				CASE WHEN activa = 1 THEN 'Si' ELSE 'NO' END AS activo
		FROM colonias_delivery
        WHERE id_empresa = prm_id_empresa
        ORDER BY id_empresa, id_colonia;
	END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDirecciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDirecciones`(
	IN limite INT,
    IN pagina INT,
    IN prm_id_empresa INT,
    IN prm_id_direccion_tipo_identidad INT,
    IN prm_identidad INT
)
BEGIN

    SELECT COUNT(*) AS totalRegistros
    FROM direcciones;

	IF (limite > 0) THEN
		SELECT 	id_direccion, calle, numero, colonia, ciudad, estado, pais, codigo_postal,
				DATE_FORMAT(fecha_actualizacion, '%m/%d/%Y %H:%i') AS fecha_actualizacion,
                CASE WHEN direccion_por_defecto = 1 THEN 'Si' ELSE 'NO' END AS direccion_por_defecto		
		FROM direcciones
        WHERE id_empresa = prm_id_empresa AND id_direccion_tipo_identidad = prm_id_direccion_tipo_identidad AND identidad = prm_identidad
        ORDER BY id_empresa, id_direccion
		LIMIT limite OFFSET pagina;
	ELSE 
		SELECT 	id_direccion, calle, numero, colonia, ciudad, estado, pais, codigo_postal,
				DATE_FORMAT(fecha_actualizacion, '%m/%d/%Y %H:%i') AS fecha_actualizacion, 
				CASE WHEN direccion_por_defecto = 1 THEN 'Si' ELSE 'NO' END AS direccion_por_defecto
		FROM direcciones
         WHERE id_empresa = prm_id_empresa AND id_direccion_tipo_identidad = prm_id_direccion_tipo_identidad AND identidad = prm_identidad
        ORDER BY id_empresa, id_direccion;
	END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getEmpresasListing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getEmpresasListing`(
	IN limite INT,
    IN pagina INT  
)
BEGIN
	SELECT COUNT(*) AS totalRegistros
    FROM empresas;

    IF (limite > 0) THEN
		SELECT 	E.id_empresa, E.nombre, E.logo, 
				IFNULL(H.host, '') AS host,
                CASE WHEN E.activo = 1 THEN 'Si' ELSE 'NO' END AS activo
		FROM empresas E
        LEFT JOIN hosts H ON H.id_empresa = E.id_empresa
        ORDER BY id_empresa
		LIMIT limite OFFSET pagina;
	ELSE 
		SELECT 	E.id_empresa, E.nombre, E.logo, 
				IFNULL(H.host, '') AS host,
                CASE WHEN E.activo = 1 THEN 'Si' ELSE 'NO' END AS activo
		FROM empresas
        LEFT JOIN hosts H ON H.id_empresa = E.id_empresa
        ORDER BY id_empresa;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFormasDePago` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getFormasDePago`(
	prm_id_empresa INT
)
BEGIN
	
    SELECT id_forma_de_pago, descripcion, informacion_adicional, activo, 
			CASE WHEN activo = 1 THEN "true" ELSE "false" END AS defaultChecked
    FROM formas_de_pago
    WHERE id_empresa = prm_id_empresa;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getKardex` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getKardex`(
	IN p_id_empresa INT,
    IN p_sku VARCHAR(20),
    IN p_id_producto INT,
    IN p_fecha_inicial DATE,
    IN p_tipo_movimiento VARCHAR(1),
    IN p_page INT,
    IN p_rows_per_page INT
)
BEGIN
	DECLARE id_producto INT;
    DECLARE nombre VARCHAR(200);
    DECLARE image1 VARCHAR(255);
    DECLARE activo TINYINT(4);
    DECLARE v_offset INT;
    
	-- Calcular el offset para la paginación
    SET v_offset = (p_page - 1) * p_rows_per_page;
    IF p_sku = '' THEN 
		SET p_sku = NULL ;
	END IF;
    IF p_id_producto = 0 THEN 
		SET p_id_producto = NULL ;
	END IF;   
    IF p_sku IS NULL AND p_id_producto IS NULL THEN 
		SET p_id_producto = 0 ;
	END IF;
    
    -- SELECT p_sku, p_id_producto;
    
    -- Consulta para obtener la información del producto
    SELECT P.id_producto, P.nombre, P.image1, P.activo INTO id_producto, nombre, image1, activo
    FROM productos P
    WHERE 	P.id_empresa = p_id_empresa 
			AND P.sku = IFNULL(p_sku, P.sku)
            AND P.id_producto = IFNULL(p_id_producto, P.id_producto);
    
    SELECT id_producto, nombre, image1, activo;

	SELECT 	K.id_kardex, K.id_producto,
			K.fecha_movimiento, K.id_tipo_movimiento, K.cantidad, K.costo_unitario, 
			K.referencia_documento, K.saldo_anterior, K.saldo_actual, K.id_usuario, K.id_proveedor,
            TM.descripcion AS tipo_movimiento, TM.tipo_operacion
    FROM kardex K
    INNER JOIN productos P ON P.id_empresa = K.id_empresa AND P.id_producto = K.id_producto
    INNER JOIN tipo_movimiento_inventario TM ON TM.id_empresa = P.id_empresa AND TM.id_tipo_movimiento = K.id_tipo_movimiento
    WHERE 	K.id_empresa = p_id_empresa AND K.id_producto = id_producto AND K.fecha_movimiento >= p_fecha_inicial
			AND (p_tipo_movimiento = '' OR K.id_tipo_movimiento = p_tipo_movimiento)
	ORDER BY K.id_empresa, K.id_kardex DESC
	LIMIT p_rows_per_page OFFSET v_offset;
    
    -- Consulta para obtener el total de registros (sin paginación)
    SELECT COUNT(*) AS totalRecords
    FROM kardex k
    INNER JOIN productos p ON k.id_producto = p.id_producto
    WHERE
        k.id_empresa = p_id_empresa
        AND p.sku = IFNULL(p_sku, P.sku)
        AND P.id_producto = IFNULL(p_id_producto, P.id_producto)
        AND k.fecha_movimiento >= p_fecha_inicial
        AND (p_tipo_movimiento = '' OR k.id_tipo_movimiento = p_tipo_movimiento);    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getLandingPage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLandingPage`(
    IN prm_host VARCHAR(200)
)
BEGIN
	SELECT  quienes_somos,
			servicios,
            productos,
            mostrar_quienes_somos,
            mostrar_productos,
            mostrar_productos_verMas,
            mostrar_servicios,
            mostrar_contactanos,
            mostrar_sitioEnMantenimiento,
            mostrar_landingPage,
            mostrar_carritoDeCompras,
            L.id_empresa,
            L.id_landingPage,
            L.inicio_titulo,
            L.inicio_descripcion
    FROM hosts H 
    INNER JOIN landingPage L ON L.id_empresa = H.id_empresa
    WHERE H.host = prm_host ;
	
	SELECT 	id_categoria, nombre, 
			IFNULL(imagen, 'https://fiestatijuana.mx/image-not-available.png') AS imagen
    FROM hosts H
    INNER JOIN categorias C ON C.id_empresa = H.id_empresa
    WHERE H.host = prm_host 
    AND EXISTS(
			SELECT id_categoria FROM productos P WHERE P.id_categoria = C.id_categoria LIMIT 1
        );	
        
	SELECT PM.id_procMenu, PM.nombre, PM.activo, PM.linkTo, PM.icono
	FROM hosts H
	INNER JOIN procMenu PM ON PM.id_empresa = H.id_empresa AND PM.soloLanding = 1 AND activo = 1
	WHERE H.host = prm_host 
	ORDER BY PM.orden;       
    
    /*Obtengo los tipos de pedidos*/
	SELECT TP.id_tipo_pedido, TP.tipo_pedido
	FROM hosts H
	INNER JOIN tipo_pedido TP ON TP.id_empresa = H.id_empresa
	WHERE H.host = prm_host
	ORDER BY TP.id_tipo_pedido;     
    
    /*Obtengo las formas de pago*/
	SELECT FP.id_forma_de_pago, FP.descripcion, FP.informacion_adicional, FP.en_tienda_online, FP.en_sitio
	FROM hosts H
	INNER JOIN formas_de_pago FP ON FP.id_empresa = H.id_empresa
	WHERE H.host = prm_host AND FP.activo = 1
	ORDER BY FP.id_forma_de_pago;      
        
    /*
	SELECT 	id_categoria, nombre, 
			IFNULL(imagen, 'https://fiestatijuana.mx/image-not-available.png') AS imagen
    FROM categorias C
    INNER JOIN hosts H ON H.host = C.host
    WHERE h.host = prm_host 
    AND EXISTS(
			SELECT id_categoria FROM productos P WHERE P.id_categoria = C.id_categoria LIMIT 1
        );
	*/
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMenu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getMenu`(
	IN prm_id_empresa INT,
	IN prm_id_padre INT,
	IN limite INT,
    IN pagina INT  
)
BEGIN

	SELECT COUNT(*) AS totalRegistros
    FROM procmenu
    WHERE id_empresa = prm_id_empresa AND id_padre = prm_id_padre;
    
    IF (limite > 0) THEN
    
		SELECT 	id_procMenu, nombre, orden, 
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo, 
                linkTo, icono, soloLanding, id_padre
		FROM procmenu
		WHERE id_empresa = prm_id_empresa AND id_padre = prm_id_padre
		ORDER BY id_empresa, orden
        LIMIT limite OFFSET pagina;
    
	ELSE 
    
		SELECT 	id_procMenu, nombre, orden, 
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo, 
                linkTo, icono, soloLanding, id_padre
		FROM procmenu
		WHERE id_empresa = prm_id_empresa AND id_padre = prm_id_padre
		ORDER BY id_empresa, orden;
        
	END IF;    
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMenuUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getMenuUsuario`(
    IN hostname VARCHAR(200),
    IN p_id_usuario INT
)
BEGIN
	DECLARE p_id_empresa INT;    
    -- OBTENGO EL id_empresa
    SELECT id_empresa INTO p_id_empresa FROM hosts WHERE host = hostname;
    
	-- Obtener los padres
    SELECT
        pm.id_procMenu,
        pm.id_padre,
        pm.nombre,
        pm.orden,
        pm.activo,
        pm.linkTo,
        pm.icono
    FROM
        usuarios u
    JOIN
        usuario_rol ur ON u.id_empresa = ur.id_empresa AND u.id_usuario = ur.id_usuario
    JOIN
        roles r ON ur.id_empresa = r.id_empresa AND ur.id_rol = r.id_rol
    JOIN
        rol_menu rm ON r.id_empresa = rm.id_empresa AND r.id_rol = rm.id_rol
    JOIN
        procMenu pm ON rm.id_empresa = pm.id_empresa AND rm.id_procMenu = pm.id_procMenu
    WHERE
        u.id_empresa = p_id_empresa AND u.id_usuario = p_id_usuario AND ifnull(pm.id_padre, 0) = 0
    ORDER BY
        pm.orden;
        
   -- Obtener los hijos
    SELECT
        pm.id_procMenu,
        pm.id_padre,
        pm.nombre,
        pm.orden,
        pm.activo,
        pm.linkTo,
        pm.icono
    FROM
        usuarios u
    INNER JOIN
        usuario_rol ur ON u.id_empresa = ur.id_empresa AND u.id_usuario = ur.id_usuario
    INNER JOIN
        roles r ON ur.id_empresa = r.id_empresa AND ur.id_rol = r.id_rol
    INNER JOIN
        rol_menu rm ON r.id_empresa = rm.id_empresa AND r.id_rol = rm.id_rol
    INNER JOIN
        procMenu pm ON rm.id_empresa = pm.id_empresa AND rm.id_procMenu = pm.id_procMenu and pm.activo = 1
    WHERE
        u.id_empresa = p_id_empresa AND u.id_usuario = p_id_usuario AND ifnull(pm.id_padre, 0) > 0
    ORDER BY
       pm.id_procMenu, pm.orden;      
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getModuloListing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getModuloListing`(
	IN prm_id_empresa INT,
	IN limite INT,
    IN pagina INT  
)
BEGIN
	SELECT COUNT(*) AS totalRegistros
    FROM modulos
    WHERE id_empresa = prm_id_empresa;
    
    IF (limite > 0) THEN
    
		SELECT 	id_modulo, nombre,
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo
		FROM modulos
		WHERE id_empresa = prm_id_empresa
		ORDER BY id_empresa
        LIMIT limite OFFSET pagina;
    
	ELSE 
    
		SELECT 	id_modulo, nombre,
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo
		FROM modulos
		WHERE id_empresa = prm_id_empresa
		ORDER BY id_empresa;
        
	END IF; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMovimientosDeCaja` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getMovimientosDeCaja`(
	IN prm_id_empresa INT,
	IN prm_fecha_inicial DATE,
    IN prm_fecha_final DATE
)
BEGIN
	-- Obtengo los datos de la caja
	SELECT
		C.id_empresa,
		C.id_caja,
		C.ip,
		C.fecha_apertura,
		C.fecha_cierre,
		CASE WHEN C.esta_abierta = 0 THEN 'NO' ELSE 'SI' END AS esta_abierta,
		CAST(IFNULL(C.importe_inicial, 0) AS DECIMAL(10, 2)) AS importe_inicial,
		IFNULL(C.importe_otros_ingresos, 0) AS importe_otros_ingresos,
		IFNULL(C.importe_retiros, 0) AS importe_retiros,
		IFNULL(C.importe_Efectivo, 0) AS importe_Efectivo,
		IFNULL(C.importe_formasDePago, 0) AS importe_formasDePago,
		IFNULL(C.importe_diferencia, 0) AS importe_diferencia,
		-- C.id_cajero_abre_caja AS id_cajero_abre,
		CJ1.nombre AS nombre_cajero_abre,
		-- C.id_cajero_cierra_caja AS id_cajero_cierra,
		CJ2.nombre AS nombre_cajero_cierra,
		-- Subconsulta para agregar los movimientos de la caja en formato JSON
		COALESCE(DM.detalle_movimientos_json, '[]') AS detalle_movimientos,
		-- Subconsulta para agregar las formas de pago en formato JSON
		COALESCE(FP.formas_de_pago_json, '[]') AS formas_de_pago
	FROM
		caja C
	LEFT JOIN
		cajero CJ1 ON CJ1.id_empresa = C.id_empresa AND CJ1.id_cajero = C.id_cajero_abre_caja
	LEFT JOIN
		cajero CJ2 ON CJ2.id_empresa = C.id_empresa AND CJ2.id_cajero = C.id_cajero_cierra_caja
	LEFT JOIN (
		-- Subconsulta para generar el JSON de detalle_movimientos por id_caja
		SELECT
			M.id_empresa,
			M.id_caja,
			CONCAT(
				'[',
				GROUP_CONCAT(
					JSON_OBJECT(
						'partida', M.partida,
						'fregistro', M.fregistro, -- JSON_OBJECT maneja bien las fechas/datetimes
						'ingresoOEgreso', CASE WHEN M.ingresoOEgreso = 1 THEN 'ingreso' ELSE 'egreso' END,
						'motivo', M.motivo,
						'importe', M.importe
					)
					ORDER BY M.partida -- Opcional: ordenar los movimientos dentro del JSON
				),
				']'
			) AS detalle_movimientos_json
		FROM
			caja_movimientos M
		GROUP BY
			M.id_empresa, M.id_caja
	) AS DM ON DM.id_empresa = C.id_empresa AND DM.id_caja = C.id_caja
	LEFT JOIN (
		-- Subconsulta para generar el JSON de formas_de_pago por id_caja
		SELECT
			FP.id_empresa,
			FP.id_caja,
			CONCAT(
				'[',
				GROUP_CONCAT(
					JSON_OBJECT(
						'id_forma_de_pago', FP.id_forma_de_pago,
						'importe', FP.importe,
						-- Si quieres la descripción de la forma de pago, descomenta la siguiente línea
						-- y agrega LEFT JOIN formas_de_pago F a esta subconsulta
						'forma_de_pago', F.descripcion
					)
					ORDER BY FP.id_forma_de_pago -- Opcional: ordenar las formas de pago dentro del JSON
				),
				']'
			) AS formas_de_pago_json
		FROM
			caja_formasdepago FP
			LEFT JOIN formas_de_pago F ON F.id_empresa = FP.id_empresa AND F.id_forma_de_pago = FP.id_forma_de_pago
		GROUP BY
			FP.id_empresa, FP.id_caja
	) AS FP ON FP.id_empresa = C.id_empresa AND FP.id_caja = C.id_caja
	WHERE
		C.id_empresa = prm_id_empresa
		AND C.fecha_apertura BETWEEN prm_fecha_inicial AND prm_fecha_final;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getOrdenCompraEstatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getOrdenCompraEstatus`(
	IN p_id_empresa INT
)
BEGIN
	SELECT id_estado_ordencompra, descripcion
    FROM ordencompra_estado
    WHERE id_empresa = p_id_empresa;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getOrdenDeCompra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getOrdenDeCompra`(
	IN p_id_empresa INT,
    IN p_id_ordencompra INT,
    IN p_fecha_inicial DATE,
    IN p_fecha_final DATE,
    IN p_id_proveedor INT,
    IN p_id_estado_ordencompra INT,
    IN p_page INT,
    IN p_rows_per_page INT,
    OUT p_totalRecords INT
)
BEGIN
	DECLARE v_offset INT;
    
    -- Asegurar que el número de página sea al menos 1
    IF p_page < 1 THEN
        SET p_page = 1;
    END IF;

    -- Calcular el offset para la paginación
    SET v_offset = (p_page - 1) * p_rows_per_page;   
    
    IF p_id_ordencompra = 0 THEN SET p_id_ordencompra = NULL; END IF;
    IF p_id_proveedor = 0 THEN SET p_id_proveedor = NULL; END IF;
    IF p_id_estado_ordencompra = 0 THEN SET p_id_estado_ordencompra = NULL; END IF;
    
	-- Consulta para obtener el total de registros (sin paginación)
    SELECT COUNT(*) INTO p_totalRecords
    FROM ordencompra OC
    INNER JOIN proveedores P ON P.id_empresa = OC.id_empresa AND P.id_proveedor = OC.id_proveedor
    INNER JOIN ordencompra_estado OCE ON OCE.id_empresa = OC.id_empresa AND OCE.id_estado_ordencompra = OC.id_estado_ordencompra
    WHERE OC.id_empresa = p_id_empresa
        AND (p_id_ordencompra IS NULL OR OC.id_ordencompra = p_id_ordencompra)
        AND (p_fecha_inicial IS NULL OR OC.fecha >= p_fecha_inicial)
        AND (p_fecha_final IS NULL OR OC.fecha <= p_fecha_final)
        AND (p_id_proveedor IS NULL OR OC.id_proveedor = p_id_proveedor)
        AND (p_id_estado_ordencompra IS NULL OR OC.id_estado_ordencompra = p_id_estado_ordencompra);  
    
	SELECT 	OC.id_ordencompra, 
			OC.fecha, 
            OC.id_proveedor,
            P.nombre AS proveedor, 
            OC.total_orden, 
            OCE.id_estado_ordencompra,
            OCE.descripcion AS estatus,
            OC.id_usuario,
			COALESCE(DOC.ordencompraDetalle_json, '[]') AS ordencompra_detalle
    FROM ordencompra OC
    INNER JOIN proveedores P ON P.id_empresa = OC.id_empresa AND P.id_proveedor = OC.id_proveedor
    INNER JOIN ordencompra_estado OCE ON OCE.id_empresa = OC.id_empresa AND OCE.id_estado_ordencompra = OC.id_estado_ordencompra
    LEFT JOIN (
		SELECT
			OCD.id_empresa,
            OCD.id_ordencompra,
			CONCAT(
				'[',
					GROUP_CONCAT(
						JSON_OBJECT(
							'partida', OCD.partida,
							'id_producto', OCD.id_producto,
                            'nombre_producto', PR.nombre,
							'cantidad', OCD.cantidad,
							'costo_unitario', OCD.costo_unitario,
							'subtotal', OCD.subtotal
						)
						ORDER BY OCD.partida -- Opcional: ordenar los movimientos dentro del JSON
					),
				']'
			) AS ordencompraDetalle_json
		FROM ordencompra_detalle OCD
		INNER JOIN productos PR ON PR.id_empresa = OCD.id_empresa AND PR.id_producto = OCD.id_producto   
		GROUP BY OCD.id_empresa, OCD.id_ordencompra        
    ) AS DOC ON DOC.id_empresa = OC.id_empresa AND DOC.id_ordencompra = OC.id_ordencompra
    WHERE OC.id_empresa = p_id_empresa
        AND (p_id_ordencompra IS NULL OR OC.id_ordencompra = p_id_ordencompra)
        AND (p_fecha_inicial IS NULL OR OC.fecha >= p_fecha_inicial)
        AND (p_fecha_final IS NULL OR OC.fecha <= p_fecha_final)
        AND (p_id_proveedor IS NULL OR OC.id_proveedor = p_id_proveedor)
        AND (p_id_estado_ordencompra IS NULL OR OC.id_estado_ordencompra = p_id_estado_ordencompra);
	-- LIMIT p_rows_per_page OFFSET 0;  
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPedidoCanvas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPedidoCanvas`(
	IN p_id_empresa BIGINT
)
BEGIN

	SELECT 	P.id_pedido, P.fecha_creacion, P.id_cliente, 
			P.id_direccion,
            P.id_puntoDeEntrega,
            PS.descripcion AS estatus_pedido,	
            CASE WHEN P.id_direccion = 1 
				THEN CONCAT(D.calle , ' No: ' , D.numero , 'Colonia: ' , D.colonia)
                ELSE PE.nombre
			END AS lugarDeEntrega,
            FP.descripcion AS formaDePago,
            SUM(PD.cantidad) AS totalPiezas,
            P.total, P.Saldo,
            CONCAT(
				'[', GROUP_CONCAT(
						CONCAT(
							'{
								"id_producto":', PD.id_producto , 
                                ', "cantidad":', PD.cantidad , 
                                ', "precio":', PD.precio , 
                                ', "subtotal":', PD.subtotal , 
                                ', "producto":', '"' , ( SELECT nombre FROM productos PR WHERE PR.id_empresa = P.id_empresa AND PR.id_producto = PD.id_producto ) , '"' , 
                                ', "imagen":', '"' , ( SELECT image1 FROM productos PR WHERE PR.id_empresa = P.id_empresa AND PR.id_producto = PD.id_producto ) , '"' ,
							'}'
						)
                    ),
				']'
            ) AS detalle_pedido
    FROM pedidos P
    INNER JOIN formas_de_pago FP ON FP.id_forma_de_pago = P.id_forma_de_pago
    INNER JOIN pedido_estatus PS on PS.id_pedido_estatus = P.id_pedido_estatus
    INNER JOIN pedidos_detalle PD ON PD.id_empresa = P.id_empresa AND PD.id_pedido = P.id_pedido
    LEFT JOIN puntosdeentrega PE ON PE.id_empresa = P.id_empresa AND PE.id_puntoDeEntrega = P.id_puntoDeEntrega
    LEFT JOIN direcciones D ON D.id_empresa = P.id_empresa AND D.id_direccion = P.id_direccion
    WHERE P.id_empresa = p_id_empresa
    GROUP BY P.id_pedido, P.fecha_creacion, P.id_cliente, P.id_direccion, P.id_pedido_estatus, PS.descripcion, P.id_forma_de_pago, FP.descripcion, P.total, P.Saldo
    ORDER BY P.id_empresa, P.id_usuario, P.id_pedido DESC;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPedidoDetalle` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPedidoDetalle`(
	IN p_id_empresa BIGINT,
    IN p_id_usuario BIGINT
)
BEGIN
 
	SELECT DISTINCT P.id_pedido, P.fecha_creacion, P.id_cliente, 
			P.id_direccion,
            P.id_puntoDeEntrega,
            PS.descripcion AS estatus_pedido,
            JSON_OBJECT(
				'id_pedido_estatus', P.id_pedido_estatus, 
				'descripcion', PS.descripcion
			) AS estatus,
			JSON_OBJECT(
				'id_forma_de_pago', P.id_forma_de_pago, 
				'descripcion', FP.descripcion            
            ) AS formaDePago,			
            P.total, P.Saldo,
            CONCAT(
				'[', GROUP_CONCAT(
						CONCAT(
							'{
								"id_producto":', PD.id_producto , 
                                ', "cantidad":', PD.cantidad , 
                                ', "precio":', PD.precio , 
                                ', "subtotal":', PD.subtotal , 
                                ', "producto":', '"' , ( SELECT PR.nombre FROM productos PR WHERE PR.id_empresa = P.id_empresa AND PR.id_producto = PD.id_producto ) , '"' , 
                                ', "imagen":', '"' , ( SELECT PR.image1 FROM productos PR WHERE PR.id_empresa = P.id_empresa AND PR.id_producto = PD.id_producto ) , '"' ,
							'}'
						)
                    ),
				']'
            ) AS detalle_pedido,
            CASE WHEN P.id_direccion = 1 
				THEN CONCAT(D.calle , ' No: ' , D.numero , 'Colonia: ' , D.colonia)
                ELSE PE.nombre
			END AS lugarDeEntrega
    FROM pedidos P
	INNER JOIN formas_de_pago FP ON FP.id_empresa = P.id_empresa AND FP.id_forma_de_pago = P.id_forma_de_pago
	INNER JOIN pedido_estatus PS ON PS.id_empresa = P.id_empresa AND PS.id_pedido_estatus = P.id_pedido_estatus
    INNER JOIN pedidos_detalle PD ON PD.id_empresa = P.id_empresa AND PD.id_pedido = P.id_pedido
    LEFT JOIN puntosdeentrega PE ON PE.id_empresa = P.id_empresa AND PE.id_puntoDeEntrega = P.id_puntoDeEntrega
    LEFT JOIN direcciones D ON D.id_empresa = P.id_empresa AND D.id_direccion = P.id_direccion
    WHERE P.id_empresa = p_id_empresa AND P.id_usuario = p_id_usuario
    GROUP BY P.id_pedido, P.fecha_creacion, P.id_cliente, P.id_direccion, P.id_pedido_estatus, PS.descripcion, P.id_forma_de_pago, FP.descripcion, P.total, P.Saldo
    ORDER BY P.id_empresa, P.id_usuario, P.id_pedido DESC;
    
    
    /*
SELECT
        P.id_pedido,
        P.fecha_creacion,
        P.id_cliente,
        P.id_direccion,
        P.id_puntoDeEntrega,
        PS.descripcion AS estatus_pedido,
        JSON_OBJECT(
            'id_pedido_estatus', P.id_pedido_estatus,
            'descripcion', PS.descripcion
        ) AS estatus,
        JSON_OBJECT(
            'id_forma_de_pago', P.id_forma_de_pago,
            'descripcion', FP.descripcion
        ) AS formaDePago,
        P.total,
        P.Saldo,
        (
            SELECT
                CONCAT(
                    '[',
                    GROUP_CONCAT(
                        CONCAT(
                            '{
                                "id_producto":', PD.id_producto,
                            ', "cantidad":', PD.cantidad,
                            ', "precio":', PD.precio,
                            ', "subtotal":', PD.subtotal,
                            ', "producto":', '"', (
                                SELECT
                                    PR.nombre
                                FROM
                                    productos PR
                                WHERE
                                    PR.id_empresa = P.id_empresa
                                    AND PR.id_producto = PD.id_producto
                            ), '"',
                            ', "imagen":', '"', (
                                SELECT
                                    PR.image1
                                FROM
                                    productos PR
                                WHERE
                                    PR.id_empresa = P.id_empresa
                                    AND PR.id_producto = PD.id_producto
                            ), '"',
                            '}'
                        )
                        ORDER BY PD.id_producto  -- Añade un ORDER BY para asegurar un orden consistente
                    ),
                    ']'
                )
            FROM
                pedidos_detalle PD
            WHERE
                PD.id_empresa = P.id_empresa
                AND PD.id_pedido = P.id_pedido
        ) AS detalle_pedido,
        CASE
            WHEN P.id_direccion = 1 THEN CONCAT(
                D.calle,
                ' No: ',
                D.numero,
                'Colonia: ',
                D.colonia
            )
            ELSE PE.nombre
        END AS lugarDeEntrega
    FROM
        pedidos P
        INNER JOIN formas_de_pago FP ON FP.id_empresa = P.id_empresa AND FP.id_forma_de_pago = P.id_forma_de_pago
        INNER JOIN pedido_estatus PS ON PS.id_empresa = P.id_empresa AND PS.id_pedido_estatus = P.id_pedido_estatus
        LEFT JOIN puntosdeentrega PE ON PE.id_empresa = P.id_empresa AND PE.id_puntoDeEntrega = P.id_puntoDeEntrega
        LEFT JOIN direcciones D ON D.id_empresa = P.id_empresa AND D.id_direccion = P.id_direccion
    WHERE
        P.id_empresa = p_id_empresa AND P.id_usuario = p_id_usuario
    ORDER BY
        P.id_empresa,
        P.id_usuario,
        P.id_pedido DESC;   
        
*/
/*
SELECT
        P.id_pedido,
        P.fecha_creacion,
        P.id_cliente,
        P.id_direccion,
        P.id_puntoDeEntrega,
        PS.descripcion AS estatus_pedido
    FROM
        pedidos P
        INNER JOIN formas_de_pago FP ON FP.id_empresa = P.id_empresa AND FP.id_forma_de_pago = P.id_forma_de_pago
        INNER JOIN pedido_estatus PS ON PS.id_empresa = P.id_empresa AND PS.id_pedido_estatus = P.id_pedido_estatus
    WHERE
        P.id_empresa = p_id_empresa
        AND P.id_usuario = p_id_usuario
    ORDER BY
        P.id_empresa,
        P.id_usuario,
        P.id_pedido DESC;
        
*/    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPedidosPorIdCaja` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPedidosPorIdCaja`(
	IN p_id_empresa INT,
    IN p_id_caja INT
)
BEGIN

	SELECT 	P.id_caja, P.id_pedido, P.fecha_creacion, P.id_tipo_pedido, TP.tipo_pedido, IFNULL(P.importe_envio, 0) AS importe_envio, IFNULL(P.total, 0) AS total,
			C.celulares AS celular, C.nombre, CJ.nombre AS cajero, 
			IFNULL(CONCAT(D.calle, ' ', numero, ', ', colonia, ' (', referencia), ')') AS domicilio,
			-- subconsulta del detalle del pedido
            coalesce(DTP.detalle_pedido_json, '[]') AS detalle_pedido,
			-- subconsulta del detalle de las formas de pago
            coalesce(DFP.detalle_formas_de_pago_json, '[]') AS detalle_formas_de_pago            
    FROM pedidos P
    INNER JOIN clientes C ON C.id_empresa = P.id_empresa AND C.id_cliente = P.id_cliente
    INNER JOIN cajero CJ ON CJ.id_empresa = P.id_empresa AND CJ.id_cajero = P.id_cajero
    INNER JOIN tipo_pedido TP ON TP.id_empresa = P.id_empresa AND TP.id_tipo_pedido = P.id_tipo_pedido
    LEFT JOIN pedido_domicilio PD ON PD.id_empresa = P.id_empresa AND PD.id_pedido = P.id_pedido
    LEFT JOIN direcciones D ON D.id_empresa = P.id_empresa AND D.id_direccion_tipo_identidad = 1 AND D.identidad = P.id_cliente AND D.id_direccion = PD.id_direccion
    LEFT JOIN (
		-- subconsulta para obtener el detalle del pedido
        SELECT 	DET.id_empresa, DET.id_pedido,
				CONCAT(
					'[',
                    GROUP_CONCAT(
						JSON_OBJECT(
							'id_pedidio_detalle', DET.id_pedido_detalle,
                            'id_producto', DET.id_producto,
                            'producto', PROD.nombre,
                            'cantidad', DET.cantidad,
                            'precio', DET.precio,
                            'subtotal', DET.subtotal
                        )
                        ORDER BY DET.id_pedido_detalle
					),
                    ']'				
                ) AS detalle_pedido_json
        FROM pedidos_detalle DET
        INNER JOIN productos PROD ON PROD.id_empresa = DET.id_empresa AND PROD.id_producto = DET. id_producto
        GROUP BY DET.id_empresa, DET.id_pedido		
    ) AS DTP ON DTP.id_empresa = P.id_empresa AND DTP.id_pedido = P.id_pedido
    LEFT JOIN (
		SELECT 	PFP.id_empresa, PFP.id_pedido,
				CONCAT(
					'[',
                    GROUP_CONCAT(
						JSON_OBJECT(
							'id_pedido_formaDePago', PFP.id_pedido_formaDePago,
                            'id_forma_de_pago', PFP.id_forma_de_pago,
                            'forma_de_pago', FP.descripcion,
                            'monto_pagado', PFP.monto_pagado,
                            'saldo', PFP.saldo
                        )
                        ORDER BY PFP.id_pedido_formaDePago
					),
                    ']'				
                ) AS detalle_formas_de_pago_json
		FROM pedido_formas_de_pago PFP
        INNER JOIN formas_de_pago FP ON FP.id_empresa = PFP.id_empresa AND FP.id_forma_de_pago = PFP.id_forma_de_pago
        GROUP BY PFP.id_empresa, PFP.id_pedido
    ) AS DFP ON DFP.id_empresa = P.id_empresa AND DFP.id_pedido = P.id_pedido
    WHERE P.id_empresa = p_id_empresa AND P.id_caja = p_id_caja;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProductos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductos`(
	 IN id_empresa BIGINT,
	 IN estatus VARCHAR(10)
)
BEGIN
	SELECT P.id_producto,
                    IFNULL(P.sku, '') AS sku,
                    P.nombre,
                    P.descripcion,
                    P.precio, P.precio_promocion, P.costo,
                    P.image1,
                    P.existencia,
                    CASE WHEN P.activo = 1 THEN true ELSE false END AS activo, 
                    JSON_OBJECT(
                        'id_categoria', C.id_categoria, 
                        'descripcion', C.descripcion
                    ) AS categoria
    FROM productos P
    INNER JOIN categorias C ON C.id_categoria = P.id_categoria
    WHERE P.id_empresa = id_empresa AND P.activo = 
    CASE 
		WHEN estatus = 'Activo' THEN 1
		WHEN estatus = 'Inactivo' THEN 0
        ELSE P.activo
	END
    ORDER BY P.id_empresa, P.id_categoria, P.id_producto
    ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProductosByCategoria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductosByCategoria`(
	IN prm_id_empresa INT,
    IN prm_id_categoria INT
)
BEGIN
	SELECT 	P.id_producto, P.nombre, P.descripcion, 
			P.id_proveedor, PR.nombre AS Proveedor,
            P.id_categoria, C.nombre AS categoria,
            P.precio,
            P.precio_promocion,
            P.costo,
            P.image1,
            P.image2,
            P.image3,
            P.existencia,
            P.fecha_creacion,
            P.fecha_actualizacion
    FROM productos P
    INNER JOIN categorias C ON C.id_empresa = P.id_empresa AND C.id_categoria = P.id_categoria
    INNER JOIN proveedores PR ON PR.id_empresa = P.id_empresa AND PR.id_proveedor = P.id_proveedor
    WHERE P.id_empresa = prm_id_empresa AND P.id_categoria = prm_id_categoria AND P.Activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProductosByProveedor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductosByProveedor`(
	IN prm_id_empresa INT,
    IN prm_id_proveedor INT
)
BEGIN
	SELECT 	P.id_producto, 
			CONCAT( RIGHT(concat('00000', P.id_producto), 5), ' - ', P.nombre) AS nombre,
            P.costo,
            P.image1
    FROM productos P
    WHERE P.id_empresa = prm_id_empresa AND P.id_proveedor = prm_id_proveedor AND P.Activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProductosCombo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductosCombo`(
	IN p_id_empresa INT,
    IN p_id_producto INT
)
BEGIN

	-- LISTADO DE PRODUCTOS QUE AUN NO ESTAN EN EL COMBO SEGUN EL PRODUCTO SELECCIONADO
    /*
	SELECT 	P.id_producto,
			CONCAT( RIGHT(concat('00000', P.id_producto), 5), ' - ', P.nombre) AS nombre
			-- P.nombre
    FROM productos P
    LEFT JOIN combos C ON C.id_empresa = P.id_empresa AND C.id_producto = P.id_producto
    WHERE P.id_empresa = p_id_empresa AND P.activo = 1 AND C.id_producto_combo IS NULL
    ORDER BY P.id_empresa, P.id_categoria, P.id_producto;
    */
    
	SELECT 	P.id_producto,
			CONCAT( RIGHT(concat('00000', P.id_producto), 5), ' - ', P.nombre) AS nombre
	FROM productos P
	WHERE P.id_empresa = p_id_empresa
		and p.id_producto NOT IN (
			SELECT C.id_producto_combo FROM combos C where C.id_empresa = p_id_empresa and C.id_producto = p_id_producto
		);    
    
	-- LISTADO DE PRODUCTOS QUE ESTAN EN EL COMBO SEGUN EL PRODUCTO SELECCIONADO
	SELECT 	P.id_producto,
			C.id_producto_combo,
			CONCAT( RIGHT(concat('00000', C.id_producto_combo), 5), ' - ', P2.nombre) AS nombre,
            C.cantidad
			-- P.nombre
    FROM productos P
    INNER JOIN combos C ON C.id_empresa = P.id_empresa AND C.id_producto = P.id_producto
    INNER JOIN productos P2 ON P2.id_empresa = P.id_empresa AND P2.id_producto = C.id_producto_combo
    WHERE P.id_empresa = p_id_empresa AND  P.id_producto = p_id_producto AND P.activo = 1
    ORDER BY P.id_empresa, P.id_categoria, P2.nombre;    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProductosListing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductosListing`(
	IN limite INT,
    IN pagina INT, 
    IN prm_id_categoria INT,
    IN prm_id_proveedor INT,
    IN prm_existencia INT
)
BEGIN
    SELECT COUNT(*) AS totalRegistros
    FROM productos;
    
    IF (limite > 0) THEN
    
        SELECT 	P.id_producto, P.nombre, P.descripcion, 
				IFNULL(P.id_proveedor, 0) AS id_proveedor, PR.nombre AS Proveedor,
                IFNULL(P.id_categoria, 0) AS id_categoria,
                C.nombre AS Categoria,
                P.precio, P.precio_promocion, P.costo,
                IFNULL(P.image1, 'https://fiestatijuana.mx/image-not-available.png') AS image1, 
                IFNULL(P.image2, 'https://fiestatijuana.mx/image-not-available.png') AS image2, 
                IFNULL(P.image3, 'https://fiestatijuana.mx/image-not-available.png') AS image3,
                DATE_FORMAT(IFNULL(P.fecha_actualizacion, now()), '%m/%d/%Y %H:%i') AS fecha_actualizacion,
                CASE WHEN P.activo = 1 THEN 'Si' ELSE 'NO' END AS activo,
                IFNULL(P.sku, '') AS sku, P.existencia,
                -- Subconsulta para agregar los movimientos de la caja en formato JSON
				COALESCE(CM.combos_json, '[]') AS combo
		FROM productos P
        INNER JOIN proveedores PR ON PR.id_empresa = P.id_empresa AND PR.id_proveedor = P.id_proveedor
        INNER JOIN categorias C ON C.id_empresa = P.id_empresa AND C.id_categoria = P.id_categoria
        LEFT JOIN (
			-- Subconsulta para generar el JSON de combos
			SELECT
				C.id_empresa,
				C.id_producto,
				CONCAT(
					'[',
					GROUP_CONCAT(
						JSON_OBJECT(
							'id_producto_combo', C.id_producto_combo,
							'cantidad', C.cantidad
						)
						ORDER BY C.id_producto_combo -- Opcional: ordenar los movimientos dentro del JSON
					),
					']'
				) AS combos_json
			FROM
				combos C
			GROUP BY
				C.id_empresa, C.id_producto
		) AS CM ON CM.id_empresa = P.id_empresa AND CM.id_producto = P.id_producto
        WHERE P.id_categoria = CASE WHEN prm_id_categoria = 0 THEN P.id_categoria ELSE prm_id_categoria END AND
			  P.id_proveedor = CASE WHEN prm_id_proveedor = 0 THEN P.id_proveedor ELSE prm_id_proveedor END AND
              1 = CASE 
					WHEN prm_existencia = 0 THEN 1
                    WHEN prm_existencia = 1 AND P.existencia > 0 THEN 1
                    WHEN prm_existencia = 2 AND P.existencia = 0 THEN 1
                    ELSE 0
				 END			
        ORDER BY P.id_empresa, P.id_proveedor
		LIMIT limite OFFSET pagina;    
    
    ELSE
    
        SELECT 	P.id_producto, P.nombre, P.descripcion, 
				IFNULL(P.id_proveedor, 0) AS id_proveedor, PR.nombre AS Proveedor,
                IFNULL(P.id_categoria, 0) AS id_categoria,
                C.nombre AS Categoria,
                P.precio, P.precio_promocion, P.costo,
                IFNULL(P.image1, 'https://fiestatijuana.mx/image-not-available.png') AS image1, 
                IFNULL(P.image2, 'https://fiestatijuana.mx/image-not-available.png') AS image2, 
                IFNULL(P.image3, 'https://fiestatijuana.mx/image-not-available.png') AS image3,
                DATE_FORMAT(IFNULL(P.fecha_actualizacion, now()), '%m/%d/%Y %H:%i') AS fecha_actualizacion,
                CASE WHEN P.activo = 1 THEN 'Si' ELSE 'NO' END AS activo,
                IFNULL(P.sku, '') AS sku, P.existencia
		FROM productos P
        INNER JOIN proveedores PR ON PR.id_empresa = P.id_empresa AND PR.id_proveedor = P.id_proveedor
        INNER JOIN categorias C ON C.id_empresa = P.id_empresa AND C.id_categoria = P.id_categoria
        WHERE P.id_categoria = CASE WHEN prm_id_categoria = 0 THEN P.id_categoria ELSE prm_id_categoria END AND
			  P.id_proveedor = CASE WHEN prm_id_proveedor = 0 THEN P.id_proveedor ELSE prm_id_proveedor END        
        ORDER BY P.id_empresa, P.id_proveedor;
    
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProveedores` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProveedores`(
	IN limite INT,
    IN pagina INT 
)
BEGIN
    SELECT COUNT(*) AS totalRegistros
    FROM proveedores;
    
    IF (limite > 0) THEN
        SELECT 	id_proveedor, nombre, IFNULL(contacto1, '') AS contacto1, IFNULL(contacto2, '') AS contacto2,
				DATE_FORMAT(IFNULL(fecha_actualizacion, now()), '%m/%d/%Y %H:%i') AS fecha_actualizacion,
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo, 
				IFNULL(telefono1, '') AS telefono1, IFNULL(telefono2, '') AS telefono2, 
                IFNULL(email1, '') AS email1, IFNULL(email2, '') AS email2, 
                IFNULL(horario, '') AS horario, IFNULL(whatsapp, '') AS whatsapp
		FROM proveedores
        ORDER BY id_empresa, id_proveedor
		LIMIT limite OFFSET pagina;
	ELSE 
		SELECT 	id_proveedor, nombre, IFNULL(contacto1, '') AS contacto1, IFNULL(contacto2, '') AS contacto2,
				DATE_FORMAT(IFNULL(fecha_actualizacion, now()), '%m/%d/%Y %H:%i') AS fecha_actualizacion,
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo, 
				IFNULL(telefono1, '') AS telefono1, IFNULL(telefono2, '') AS telefono2, 
                IFNULL(email1, '') AS email1, IFNULL(email2, '') AS email2, 
                IFNULL(horario, '') AS horario, IFNULL(whatsapp, '') AS whatsapp
		FROM proveedores
        ORDER BY id_empresa, id_proveedor;
	END IF;        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProveedoresFiltro` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProveedoresFiltro`(
	IN p_id_empresa INT
)
BEGIN

	SELECT P.id_proveedor, P.nombre
    FROM proveedores P 
    WHERE P.id_empresa = p_id_empresa AND P.activo = 1
	ORDER BY P.nombre ASC;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPuntosDeEntrega` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPuntosDeEntrega`(
	IN limite INT,
    IN pagina INT   
)
BEGIN

	SELECT COUNT(*) AS totalRegistros
    FROM puntosdeentrega;

    IF (limite > 0) THEN
		SELECT 	id_puntoDeEntrega, nombre, horario, 
				DATE_FORMAT(fecha_actualizacion, '%m/%d/%Y %H:%i') AS fecha_actualizacion,
                CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo		
		FROM puntosdeentrega
        ORDER BY id_empresa, id_puntoDeEntrega
		LIMIT limite OFFSET pagina;
	ELSE 
		SELECT 	id_puntoDeEntrega, nombre, horario, 
				DATE_FORMAT(fecha_actualizacion, '%m/%d/%Y %H:%i') AS fecha_actualizacion, 
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo
		FROM puntosdeentrega
        ORDER BY id_empresa, id_puntoDeEntrega;
	END IF;
         
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPuntosDeEntregaCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPuntosDeEntregaCarrito`(
	prm_id_empresa INT,
    prm_id_direccion_tipo_identidad INT,
    prm_identidad INT
)
BEGIN

	SELECT 'Recoger' AS TipoDeEntrega, CONCAT(nombre, ' ', horario) AS puntoentrega, id_puntoDeEntrega AS Identidad
	FROM puntosdeentrega 
	WHERE activo = 1 AND id_empresa = prm_id_empresa
	UNION
	SELECT 'Entregar' AS TipoDeEntrega, direccion, id_direccion AS Identidad
	FROM direcciones
	WHERE id_empresa = prm_id_empresa AND id_direccion_tipo_identidad = prm_id_direccion_tipo_identidad AND identidad = prm_identidad;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getRoles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRoles`(
	IN prm_id_empresa INT
)
BEGIN
	SELECT id_rol, nombre
    FROM roles
    WHERE activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getRolListing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRolListing`(
	IN prm_id_empresa INT,
	IN limite INT,
    IN pagina INT  
)
BEGIN

	SELECT COUNT(*) AS totalRegistros
    FROM roles
    WHERE id_empresa = prm_id_empresa;
    
    IF (limite > 0) THEN
    
		SELECT 	id_rol, nombre,
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo
		FROM roles
		WHERE id_empresa = prm_id_empresa
		ORDER BY id_empresa
        LIMIT limite OFFSET pagina;
    
	ELSE 
    
		SELECT 	id_rol, nombre,
				CASE WHEN activo = 1 THEN 'Si' ELSE 'NO' END AS activo
		FROM roles
		WHERE id_empresa = prm_id_empresa
		ORDER BY id_empresa;
        
	END IF;    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getRolMenuListing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRolMenuListing`(
	IN prm_id_empresa INT,
    IN prm_id_rol INT,
	IN limite INT,
    IN pagina INT 
)
BEGIN

	SELECT 	COUNT(*) AS totalRegistros
	FROM procmenu PM
	INNER JOIN procmenu PMH ON PMH.id_empresa = PM.id_empresa AND PMH.id_padre = PM.id_procMenu AND PMH.activo = 1
	-- LEFT JOIN rol_menu RM ON RM.id_empresa = PMH.id_empresa AND RM.id_procMenu = PMH.id_padre AND RM.id_rol = prm_id_rol
	WHERE PM.id_empresa = prm_id_empresa AND PM.activo = 1 
	ORDER BY PM.id_empresa, PM.id_procMenu, PM.orden;

	IF (limite > 0) THEN
		SELECT 	-- PM.id_procMenu, 
				PM.nombre AS menu, 
				-- PMH.id_padre, 
				PMH.nombre AS opcion, PMH.id_procMenu, 
		IFNULL((
			SELECT activo
			FROM rol_menu RM
			WHERE RM.id_empresa = PM.id_empresa AND RM.id_procMenu = PMH.id_procMenu AND RM.id_rol = prm_id_rol
		), 0) AS activo
		FROM procmenu PM
		INNER JOIN procmenu PMH ON PMH.id_empresa = PM.id_empresa AND PMH.id_padre = PM.id_procMenu AND PMH.activo = 1
		-- LEFT JOIN rol_menu RM ON RM.id_empresa = PMH.id_empresa AND RM.id_procMenu = PMH.id_padre AND RM.id_rol = prm_id_rol
		WHERE PM.id_empresa = prm_id_empresa AND PM.activo = 1 
		ORDER BY PM.id_empresa, PM.id_procMenu, PM.orden
        LIMIT limite OFFSET pagina;
   
    ELSE

		SELECT 	-- PM.id_procMenu, 
				PM.nombre AS menu, 
				-- PMH.id_padre, 
				PMH.nombre AS opcion, PMH.id_procMenu, 
		IFNULL((
			SELECT activo
			FROM rol_menu RM
			WHERE RM.id_empresa = PM.id_empresa AND RM.id_procMenu = PMH.id_procMenu AND RM.id_rol = prm_id_rol
		), 0) AS activo
		FROM procmenu PM
		INNER JOIN procmenu PMH ON PMH.id_empresa = PM.id_empresa AND PMH.id_padre = PM.id_procMenu AND PMH.activo = 1
		-- LEFT JOIN rol_menu RM ON RM.id_empresa = PMH.id_empresa AND RM.id_procMenu = PMH.id_padre AND RM.id_rol = prm_id_rol
		WHERE PM.id_empresa = prm_id_empresa AND PM.activo = 1 
		ORDER BY PM.id_empresa, PM.id_procMenu, PM.orden;

    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTipoPedido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTipoPedido`(
	prm_id_empresa int
)
BEGIN
	SELECT id_tipo_pedido, tipo_pedido FROM tipo_pedido WHERE id_empresa = prm_id_empresa;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsuario`(
	prm_id_empresa INT,
    prm_id_usuario INT    
)
BEGIN
	SELECT nombre, apellidos, celular, DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento
    FROM usuarios
    WHERE id_empresa = prm_id_empresa AND id_usuario = prm_id_usuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getUsuarioLogin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsuarioLogin`(
	IN hostname VARCHAR(200),
    IN email varchar(180),
    IN password VARCHAR(90)
)
BEGIN
	DECLARE mensaje VARCHAR(200);
    DECLARE status_code INT;
    DECLARE idEmpresa INT;
    
    -- OBTENGO EL id_empresa
    SELECT id_empresa INTO idEmpresa FROM hosts WHERE host = hostname;
    
	/*REVISO SI EXISTE PRIMERO EL CORREO*/
    IF NOT EXISTS(
		SELECT 1
		FROM usuarios U
		WHERE U.id_empresa = idEmpresa AND U.email = email
    ) THEN 
		SET mensaje = 'Correo no encontrado', status_code = 401;
        SELECT mensaje AS message, status_code AS status;
	ELSE 
		/*REVISO SI EXISTE EL PASSWORD COINCIDE CON EL CORREO
		IF NOT EXISTS(
			SELECT 1
			FROM usuarios U
			WHERE U.id_empresa = id_empresa AND U.email = email AND U.password = password
        ) THEN
			SET mensaje = 'Contraseña incorrecta', status_code = 401;
            SELECT mensaje AS message, status_code AS status;
		ELSE
        			            
            UPDATE usuarios SET fecha_ultimo_acceso = now()
            WHERE id_empresa = id_empresa AND email = email AND password = password;
            
            */
            SET mensaje = 'Usuario autenticado', status_code = 200;
            
            SELECT 	U.id_usuario, U.email, U.nombre, U.apellidos, U.celular,
					mensaje AS message, status_code AS status, U.password, '' AS token,
                    IFNULL(U.imagen, '') AS fotografia, 
                    R.id_rol, R.nombre AS rol,
                    CASE WHEN R.id_rol IN (1, 2) THEN 1 ELSE 0 END AS isAdmin
			FROM usuarios U
            INNER JOIN usuarios_roles UR ON UR.id_empresa = U.id_empresa AND UR.id_usuario = U.id_usuario
            INNER JOIN roles R ON R.id_empresa = UR.id_empresa AND R.id_rol = UR.id_rol
			WHERE U.id_empresa = idEmpresa AND U.email = email /*AND U.password = password*/;
            
		/*END IF;*/
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postAgenda` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postAgenda`(
	IN prm_id_empresa INT,
	IN prm_fecha DATE,
    IN intervalo VARCHAR(20),
    IN prm_id_cliente INT,
    IN prm_nombre_cliente VARCHAR(200),
    IN prm_celular VARCHAR(90),
    IN prm_nombre_asistente VARCHAR(300)
)
BEGIN
	DECLARE separador INT;
	DECLARE _hora_inicio TIME;
    DECLARE _hora_fin TIME;
    DECLARE _dia_semana INT;
    DECLARE _id_jornada INT;
    DECLARE _id_agenda_estatus SMALLINT;
    DECLARE _id_agenda INT;
    DECLARE _id_clave_confirmacion VARCHAR(6) DEFAULT '';
    -- DECLARE _id_cliente INT;
    
    SET _dia_semana = WEEKDAY(prm_fecha);
    SET _id_agenda_estatus = 2;
    
	SELECT JL.id_jornada INTO _id_jornada
	FROM jornada_laboral JL
	WHERE JL.id_empresa = prm_id_empresa AND JL.dia_semana = _dia_semana;  
    
    -- Buscar la posición del separador "-" para obtener la fecha y hora 
	SET separador = LOCATE('-', intervalo);    
    SET _hora_inicio = TIME(SUBSTRING(intervalo, 1, separador - 1));
	SET _hora_fin = TIME(SUBSTRING(intervalo, separador + 2));
    
    -- SELECT _hora_inicio, _hora_fin;
    
    -- Si el cliente no existe lo doy de alta
    IF NOT EXISTS(
		SELECT 1 FROM clientes C WHERE C.id_empresa = prm_id_empresa AND C.celulares = prm_celular
    ) THEN
		INSERT INTO clientes (id_empresa, nombre, celulares) VALUES (prm_id_empresa, prm_nombre_cliente, prm_celular);
        SET prm_id_cliente = LAST_INSERT_ID();
    END IF;
     
    -- Busco si no hay cita reservada
    IF NOT EXISTS(
		SELECT 1
		FROM agenda A
		WHERE A.id_empresa = prm_id_empresa AND A.fecha = prm_fecha AND A.hora_inicio = _hora_inicio AND A.hora_fin = _hora_fin
    ) THEN
		
        -- GENERO CLAVE DE CONFIRMACION
        SET _id_clave_confirmacion = fn_genera_clave_confirmacion(prm_id_empresa);
    
		INSERT INTO agenda (id_empresa, fecha, hora_inicio, hora_fin, id_cliente, id_agenda_estatus, id_jornada, clave_confirmacion, nombre_asistente) 
			VALUES (prm_id_empresa, prm_fecha, _hora_inicio, _hora_fin, prm_id_cliente, _id_agenda_estatus, _id_jornada, _id_clave_confirmacion, prm_nombre_asistente);
		SET _id_agenda = LAST_INSERT_ID();
	END IF;
    
    SELECT _id_clave_confirmacion AS folio_confirmacion;		
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postAjusteInventario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postAjusteInventario`(
	IN p_id_empresa INT,
    IN p_id_producto INT,
    IN p_cantidad_ajuste INT,
    IN p_tipo_movimiento VARCHAR(1),
    IN p_motivo_ajuste VARCHAR(300),
    IN p_id_usuario INT
)
BEGIN
	DECLARE saldoAnterior INT DEFAULT 0;
    DECLARE saldoActual INT DEFAULT 0;

	-- OBTENGO LA EXISTENCIA ACTUAL
    SELECT E.cantidad INTO saldoAnterior
    FROM existencias E
    WHERE E.id_empresa = p_id_empresa AND E.id_producto = p_id_producto;
    
    IF p_tipo_movimiento = "E" THEN 
		SET saldoActual = saldoAnterior + p_cantidad_ajuste;
	ELSE 
		SET saldoActual = saldoAnterior - p_cantidad_ajuste;
	END IF;

	-- AGREGO MOVIMIENTO EN KARDEX
	insert into kardex (id_empresa, id_producto, fecha_movimiento, id_tipo_movimiento, cantidad, 
						referencia_documento,
						saldo_anterior, saldo_actual, id_usuario)
	values (p_id_empresa, p_id_producto, current_date(), p_tipo_movimiento, p_cantidad_ajuste, 
			'AJUSTE', saldoAnterior, saldoActual, p_id_usuario);
                        
	-- ACTUALIZO LA EXISTENCIA
    UPDATE existencias E SET E.cantidad = saldoActual
    WHERE E.id_empresa = p_id_empresa AND E.id_producto = p_id_producto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postAuthProvider` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postAuthProvider`(
	IN prmid_empresa BIGINT,
	IN prmId BIGINT,
    IN prmId_Provider VARCHAR(20),
    IN prmNombre VARCHAR(90),
    IN prmApellidos VARCHAR(100),
    IN prmEmail VARCHAR(180),
    IN prmImagen VARCHAR(255),
    IN prmPassword VARCHAR(90)
)
BEGIN
	
	DECLARE mensaje VARCHAR(200);
    DECLARE status_code INT;
    
    SET mensaje = 'Usuario autenticado', status_code = 200;

	IF NOT EXISTS(
		SELECT 1
        FROM usuarios U
        WHERE U.email = prmEmail
    ) THEN
		
        INSERT INTO usuarios (id_empresa, nombre, apellidos, email, imagen, fecha_creacion, fecha_ultimo_acceso, password, id_provider)
        VALUES (prmid_empresa, prmNombre, prmApellidos, prmEmail, prmEmail, now(), now(), prmId);
    
    ELSE
    
		UPDATE usuarios SET fecha_ultimo_acceso = NOW(), imagen = prmImagen
        WHERE email = prmEmail;
        
        SELECT 	U.id_usuario, U.email, U.nombre, U.apellidos, U.celular,
					mensaje AS message, status_code AS status, U.password, '' AS token
		FROM usuarios U
		WHERE U.id_empresa = id_empresa AND U.email = prmEmail;
    
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postCajaAbrir` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postCajaAbrir`(
	IN p_id_empresa INT,
    IN p_ip VARCHAR(20),
    IN p_id_cajero INT,
    IN p_password VARCHAR(45),
    IN p_importe DECIMAL(10,2),
    IN p_motivo VARCHAR(300)
)
BEGIN 
	DECLARE id_caja INT;
    
	-- TODO: VERIFICIAR QUE LA CONTRSEÑA DEL CAJERO COINCIDA
    IF NOT EXISTS(
		SELECT 1
        FROM cajero c
        WHERE c.id_empresa = p_id_empresa AND c.id_cajero = p_id_cajero AND c.password = p_password
    ) THEN
		SELECT 'La contraseña del cajero no coinice, revise e intente de nuevo' AS mensaje, 1 AS error, 0 AS id_caja ;	

		ELSE        
			-- TODO: AGREGAR REGISTRO EN caja
            INSERT INTO caja (id_empresa, ip, fecha_apertura, esta_abierta, importe_inicial, id_cajero_abre_caja) VALUES
				(p_id_empresa, p_ip, curdate(), 1, p_importe, p_id_cajero);
			SET id_caja = last_insert_id();
    
			-- TODO: AGREGAR REGISTRO EN caja_movimientos
			INSERT INTO caja_movimientos (id_empresa, id_caja, ingresoOEgreso, motivo, importe, fregistro)
				VALUES (p_id_empresa, id_caja, 1, p_motivo, p_importe, current_timestamp());
                
			SELECT 'Apertura de Caja exitosa' AS mensaje, 0 AS error, id_caja;

	END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postCajaCerrar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postCajaCerrar`(
	IN p_id_empresa INT,
    IN p_id_caja INT,
    IN p_id_cajero INT,
    IN p_password VARCHAR(45),
    IN p_importe DECIMAL(10,2),
    IN p_motivo VARCHAR(300),
    IN p_formas_de_pago  JSON,
    IN P_sumaImportesFormaDePago DECIMAL(10,2),
    IN P_efectivoEnCaja DECIMAL(10,2)
)
BEGIN
	DECLARE partida SMALLINT DEFAULT 0;
    DECLARE nombre_cajero VARCHAR(100);
    DECLARE ingesoOEgreso BIT(1) DEFAULT 1;
	DECLARE i INT DEFAULT 0;
    DECLARE n INT;
    
	-- TODO: VERIFICIAR QUE LA CONTRSEÑA DEL CAJERO COINCIDA
    IF NOT EXISTS(
		SELECT 1
        FROM cajero c
        WHERE c.id_empresa = p_id_empresa AND c.id_cajero = p_id_cajero AND c.password = p_password
    ) THEN
		SELECT 	'La contraseña del cajero no coinice, revise e intente de nuevo' AS mensaje, 
				1 AS error, 
                p_id_caja AS id_caja,
                partida AS partida;	

		ELSE        
			-- ACTUALIZO IMPORTE DEL MOVIMIENTO EN CAJA Y CIERRO LA CAJA
			UPDATE caja SET importe_retiros = ifnull(importe_retiros, 0) + p_importe,
							importe_formasDePago = P_sumaImportesFormaDePago,
                            id_cajero_cierra_caja = p_id_cajero,
                            esta_abierta = 0,
                            fecha_cierre = current_timestamp()
            WHERE id_empresa = p_id_empresa AND id_caja = p_id_caja;
            
            -- ACTUALIZO DIFERENCIA
            UPDATE CAJA SET importe_diferencia = ifnull(importe_inicial, 0) + ifnull(importe_otros_ingresos, 0) + P_efectivoEnCaja - ifnull(importe_retiros, 0)
            WHERE id_empresa = p_id_empresa AND id_caja = p_id_caja;
    
			-- AGREGAR REGISTRO EN caja_movimientos
			INSERT INTO caja_movimientos (id_empresa, id_caja, ingresoOEgreso, motivo, importe, fregistro)
				VALUES (p_id_empresa, p_id_caja, ingesoOEgreso, p_motivo, p_importe, current_timestamp());
			
            SET partida = last_insert_id();
            
            -- AGREGAR FORMAS DE PAGO
            SET n = JSON_LENGTH(p_formas_de_pago);
			WHILE i < n DO
				
				INSERT INTO caja_formasdepago (id_caja, id_forma_de_pago, importe)
				VALUES (
					p_id_caja,
					JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', i, '].idFormaDePago')),
					JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', i, '].importe'))
				);
                
				INSERT INTO caja_formasdepago (id_empresa, id_caja, id_forma_de_pago, importe)    
					VALUES (	p_id_empresa, p_id_caja, 
								JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', i, '].idFormaDePago')),
								JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', i, '].importe'))
                            );
				/*
				select 
					JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', i, '].idFormaDePago')),
					JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', i, '].importe'));
                 */   
				SET i = i + 1;
			END WHILE;                
            
            -- TODO: OBTENGO EL NOMBRE DEL CAJERO
            SELECT nombre INTO nombre_cajero FROM cajero WHERE id_empresa = p_id_empresa AND id_cajero = p_id_cajero;
		
			SELECT 'Movimiento a Caja exitoso' AS mensaje, 
					0 AS error, 
                    p_id_caja AS id_caja,
                    partida AS partida,
                    nombre_cajero,
                    0 AS cajaAbierta;

	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postCajaCerrarTest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postCajaCerrarTest`(
    IN p_formas_de_pago JSON
)
BEGIN

    -- Recorrer el JSON y hacer insert en caja_formasdepago
    DECLARE i INT DEFAULT 0;
    DECLARE n INT;

    SET n = JSON_LENGTH(p_formas_de_pago);

    WHILE i < n DO
		/*
        INSERT INTO caja_formasdepago (id_caja, id_forma_de_pago, importe)
        VALUES (
            p_id_caja,
            JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', i, '].idFormaDePago')),
            JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', i, '].importe'))
        );
        */
        select 
			JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', i, '].idFormaDePago')),
            JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', i, '].importe'));
        SET i = i + 1;
    END WHILE;
            -- SELECT partida, @id_forma_de_pago, @importe;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postCajaMovimientos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postCajaMovimientos`(
	IN p_id_empresa INT,
    IN p_id_caja INT,
    IN p_id_cajero INT,
    IN p_password VARCHAR(45),
    IN p_ingesoOEgreso BIT(1),
    IN p_importe DECIMAL(10,2),
    IN p_motivo VARCHAR(300)
)
BEGIN
	DECLARE partida SMALLINT DEFAULT 0;
    DECLARE nombre_cajero VARCHAR(100);
    
	-- TODO: VERIFICIAR QUE LA CONTRSEÑA DEL CAJERO COINCIDA
    IF NOT EXISTS(
		SELECT 1
        FROM cajero c
        WHERE c.id_empresa = p_id_empresa AND c.id_cajero = p_id_cajero AND c.password = p_password
    ) THEN
		SELECT 	'La contraseña del cajero no coinice, revise e intente de nuevo' AS mensaje, 
				1 AS error, 
                p_id_caja AS id_caja,
                partida AS partida;	

		ELSE        
			-- TODO: ACTUALIZO IMPORTE DEL MOVIMIENTO EN CAJA
			IF p_ingesoOEgreso = 1 THEN 
				UPDATE caja SET importe_otros_ingresos = ifnull(importe_otros_ingresos, 0) + p_importe WHERE id_empresa = p_id_empresa AND id_caja = p_id_caja;
			ELSE
				UPDATE caja SET importe_retiros = ifnull(importe_retiros, 0) + p_importe WHERE id_empresa = p_id_empresa AND id_caja = p_id_caja;
            END IF;
    
			-- TODO: AGREGAR REGISTRO EN caja_movimientos
			INSERT INTO caja_movimientos (id_empresa, id_caja, ingresoOEgreso, motivo, importe, fregistro)
				VALUES (p_id_empresa, p_id_caja, p_ingesoOEgreso, p_motivo, p_importe, current_timestamp());
			
            SET partida = last_insert_id();
            
            -- TODO: OBTENGO EL NOMBRE DEL CAJERO
            SELECT nombre INTO nombre_cajero FROM cajero WHERE id_empresa = p_id_empresa AND id_cajero = p_id_cajero;
                
			SELECT 'Movimiento a Caja exitoso' AS mensaje, 
					0 AS error, 
                    p_id_caja AS id_caja,
                    partida AS partida,
                    nombre_cajero;

	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postCajero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postCajero`(
	IN prm_id_empresa INT,
	IN prm_id_cajero INT,
	IN prm_nombre VARCHAR(100),
	IN prm_password VARCHAR(45),
	IN prm_activo TINYINT
)
BEGIN
	IF prm_id_cajero = 0 THEN
    
		INSERT INTO cajero (id_empresa, nombre, password, activo)
		VALUES (prm_id_empresa, prm_nombre, prm_password, prm_activo);    
    
    ELSE
		
        UPDATE cajero SET 	nombre = prm_nombre, 
							password = prm_password,                                  
							activo = prm_activo
		WHERE id_empresa = prm_id_empresa AND id_cajero = prm_id_cajero;
    	
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postCategorias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postCategorias`(
    IN prm_id_empresa INT,
    IN prm_id_categoria INT,
    IN prm_nombre VARCHAR(200),
    IN prm_descripcion VARCHAR(200),
    IN prm_imagen VARCHAR(255),
    IN prm_activo TINYINT
)
BEGIN

	IF prm_id_categoria = 0 THEN
    
		INSERT INTO categorias (id_empresa, nombre, descripcion, imagen, fecha_creacion, fecha_actualizacion, activo)
		VALUES (prm_id_empresa, prm_nombre, prm_descripcion, prm_imagen, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP, prm_activo);    
    
    ELSE
		
        UPDATE categorias SET 	nombre = prm_nombre, 
								descripcion = prm_descripcion, 
                                imagen = prm_imagen, 
                                activo = prm_activo,
                                fecha_actualizacion = CURRENT_TIMESTAMP()
			WHERE id_empresa = prm_id_empresa AND id_categoria = prm_id_categoria;
    
    
    
	END IF;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postCliente`(
	IN prm_id_empresa INT,
    IN prm_id_cliente INT,
    IN prm_empresa VARCHAR(200),
    IN prm_nombre VARCHAR(200),
    IN prm_telefonos VARCHAR(90),
    IN prm_celulares VARCHAR(90)
)
BEGIN
	IF prm_id_cliente = 0 THEN
    
		INSERT INTO clientes (id_empresa, empresa, nombre, telefonos, celulares, fecha_alta)
		VALUES (prm_id_empresa, prm_empresa, prm_nombre, prm_telefonos, prm_celulares, current_date());    
    
    ELSE
		
        UPDATE clientes SET empresa = prm_empresa,
							nombre = prm_nombre, 
							telefonos = prm_telefonos,                                  
							celulares = prm_celulares,
                            fecha_actualizacion = current_date()
		WHERE id_empresa = prm_id_empresa AND id_cliente = prm_id_cliente;
    	
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postColoniaDelivery` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postColoniaDelivery`(
	IN prm_id_empresa INT,
    IN prm_id_colonia INT,
    IN prm_nombre VARCHAR(100),
    IN prm_cargo DECIMAL(10,0),
    IN prm_activo TINYINT
)
BEGIN
	IF prm_id_colonia = 0 THEN
    
		INSERT INTO colonias_delivery (id_empresa, nombre, cargo, activa)
		VALUES (prm_id_empresa, prm_nombre, prm_cargo, prm_activo);    
    
    ELSE
		
        UPDATE colonias_delivery SET 	nombre = prm_nombre, 
										cargo = prm_cargo,                                  
										activa = prm_activo
		WHERE id_empresa = prm_id_empresa AND id_colonia = prm_id_colonia;
    	
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postDireccion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postDireccion`(
	prm_id_empresa INT,
    prm_id_direccion INT,
    prm_identidad INT,
    prm_id_direccion_tipo_identidad INT,
    prm_direccion_por_defecto BIT,
    prm_calle VARCHAR(200),
    prm_numero VARCHAR(20),
    prm_colonia VARCHAR(200),
    prm_ciudad VARCHAR(200),
    prm_estado VARCHAR(200),
    prm_pais VARCHAR(200),
    prm_codigo_postal VARCHAR(10)    
)
BEGIN

    DECLARE _direccion VARCHAR(800);

    SET _direccion = CONCAT(prm_calle, ' ', prm_numero, ', ', prm_colonia, ', ', prm_ciudad, ', ', prm_estado, ', ', prm_pais, ', ', prm_codigo_postal);
	
    IF prm_id_direccion = 0 THEN
    
		INSERT INTO direcciones 
			(id_empresa, identidad, id_direccion_tipo_identidad, direccion, calle, numero, colonia, ciudad, estado, pais, codigo_postal,
            fecha_creacion, fecha_actualizacion, direccion_por_defecto)
            VALUES
            (prm_id_empresa, prm_identidad, prm_id_direccion_tipo_identidad, _direccion, prm_calle, prm_numero, prm_colonia, prm_ciudad, 
            prm_estado, prm_pais, prm_codigo_postal, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP, prm_direccion_por_defecto);
            
        SET prm_id_direccion = LAST_INSERT_ID();
	
    ELSE
    
		UPDATE direcciones
			SET identidad = prm_identidad, id_direccion_tipo_identidad = prm_id_direccion_tipo_identidad, 
				direccion = _direccion, calle = prm_calle, numero = prm_numero, colonia = prm_colonia, ciudad = prm_ciudad, 
                estado = prm_estado, pais = prm_pais, codigo_postal = prm_codigo_postal,
                fecha_actualizacion = CURRENT_TIMESTAMP(),
                direccion_por_defecto = prm_direccion_por_defecto
        WHERE 	id_empresa = prm_id_empresa AND 
				id_direccion_tipo_identidad = prm_id_direccion_tipo_identidad  AND 
                identidad = prm_identidad AND
                id_direccion = prm_id_direccion;
                		
    END IF;
    
    CALL putRevisaDireccionPorDefecto(prm_id_empresa, prm_id_direccion_tipo_identidad, prm_identidad, prm_id_direccion, prm_direccion_por_defecto);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postEmpresa` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postEmpresa`(
	IN prm_id_empresa INT,
    IN prm_nombre VARCHAR(300),
    IN prm_logo VARCHAR(255),
    IN prm_host VARCHAR(100),
    IN prm_activo TINYINT(4)
)
BEGIN
	IF prm_id_empresa = 0 THEN
    
		INSERT INTO empresas (nombre, logo, host, activo)
		VALUES (prm_nombre, prm_logo, prm_host, prm_activo);
            
    ELSE
		
        UPDATE empresas SET nombre = prm_nombre, 
							logo = prm_logo,   
                            host = prm_host,
							activo = prm_activo
		WHERE id_empresa = prm_id_empresa;        
    	
	END IF;
    -- AGREGO O ACTUALIZO EL HOST
	if prm_host <> '' THEN
		IF NOT EXISTS(
			SELECT 1 
            FROM hosts
            WHERE id_empresa = prm_id_empresa
        ) THEN
			INSERT INTO hosts (id_empresa, host) VALUES (prm_id_empresa, prm_host);
		ELSE
			UPDATE hosts SET host = prm_host WHERE id_empresa = prm_id_empresa;
        END IF;
        
	END IF;    
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postHost` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postHost`(
	IN prm_nombre VARCHAR(300),
    IN prm_logo VARCHAR(255),
	IN prm_host VARCHAR(100)
)
BEGIN
    DECLARE idEmpresa BIGINT;
    DECLARE idUsuario INT;
    DECLARE lorem VARCHAR(800);
	-- DECLARE EXIT HANDLER FOR SQLEXCEPTION
    -- BEGIN
        -- ROLLBACK;
        -- Opcional: Puedes agregar aquí un mensaje de error personalizado
        -- SELECT 'OCURRIÓ UN ERROR', ERROR_MESSAGE();
        
    -- END;        
	
	/*ALTA EN EMPRESAS*/

    SET lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        
    START TRANSACTION;
    
    INSERT INTO empresas (nombre, logo, host) VALUES (prm_nombre, prm_logo, prm_host);
    SET idEmpresa = last_insert_id();

	/*ALTA DE HOST*/
	IF NOT EXISTS(
		SELECT 1 
        FROM hosts H
        WHERE H.host = prm_host
    ) 
    THEN 
		INSERT INTO hosts (host, id_empresa) VALUES (prm_host, idEmpresa);
	ELSE 
		UPDATE hosts SET id_empresa = idEmpresa WHERE host = prm_host;
	END IF;
    -- SELECT 'EMPRESA';
    
    /*ALTA DE LANDING PAGE*/    
    INSERT INTO landingPage (	id_empresa, quienes_somos, servicios, productos, 
								mostrar_quienes_somos, mostrar_productos, mostrar_servicios, mostrar_contactanos, mostrar_sitioEnMantenimiento,
                                mostrar_landingPage, mostrar_carritoDeCompras
							)
		VALUES (idEmpresa, lorem, lorem, lorem, 1, 1, 1, 1, 1, 0, 0);
    
    /*ALTA DE USUARIO MASTER*/
    INSERT INTO usuarios (id_empresa, email, nombre, apellidos, celular, imagen, password, fecha_nacimiento, fecha_creacion, fecha_actualizacion)
    SELECT idEmpresa, U.email, U.nombre, U.apellidos, U.celular, U.imagen, U.password, U.fecha_nacimiento, current_timestamp(), current_timestamp()
    FROM usuarios U
    WHERE U.id_usuario = 1 AND U.id_empresa = 1;
    
    SET idUsuario = last_insert_id();
    
    /*ALTA DE DIRECCION*/
    INSERT INTO direcciones (id_empresa, id_direccion_tipo_identidad, identidad, direccion_por_defecto, direccion, calle, numero, colonia, ciudad, estado, pais, codigo_postal, fecha_creacion, fecha_actualizacion)
		VALUES (idEmpresa, 1, 1, 1, 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 
			'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem', current_timestamp(), current_timestamp());
        
    /*ALTA DE FORMAS DE PAGO*/
    /*/Efectivo*/
    INSERT INTO formas_de_pago (id_empresa, descripcion, informacion_adicional, activo)
    SELECT idEmpresa, F.descripcion, '', 1 FROM formas_de_pago F WHERE F.id_empresa = 1 AND F.id_forma_de_pago = 1; 
    /*/Tarjeta contra entrega*/
    INSERT INTO formas_de_pago (id_empresa, descripcion, informacion_adicional, activo)
    SELECT idEmpresa, F.descripcion, '', 0 FROM formas_de_pago F WHERE F.id_empresa = 1 AND F.id_forma_de_pago = 2;     
    /*/Deposito*/
    INSERT INTO formas_de_pago (id_empresa, descripcion, informacion_adicional, activo)
    SELECT idEmpresa, F.descripcion, '', 1 FROM formas_de_pago F WHERE F.id_empresa = 1 AND F.id_forma_de_pago = 3;   
    /*/Transferencia*/
    INSERT INTO formas_de_pago (id_empresa, descripcion, informacion_adicional, activo)
    SELECT idEmpresa, F.descripcion, '', 1 FROM formas_de_pago F WHERE F.id_empresa = 1 AND F.id_forma_de_pago = 4; 
    /*/Pago en Linea*/
    INSERT INTO formas_de_pago (id_empresa, descripcion, informacion_adicional, activo)
    SELECT idEmpresa, F.descripcion, '', 0 FROM formas_de_pago F WHERE F.id_empresa = 1 AND F.id_forma_de_pago = 5;         
    /*/Linea de Crédito*/
    INSERT INTO formas_de_pago (id_empresa, descripcion, informacion_adicional, activo)
    SELECT idEmpresa, F.descripcion, '', 0 FROM formas_de_pago F WHERE F.id_empresa = 1 AND F.id_forma_de_pago = 6;  
    -- SELECT 'FORMAS DE PAGO';
    
    /*AGREGAR DATOS EN TABLA: pedido_estatus*/
    INSERT INTO pedido_estatus (id_empresa, descripcion, orden)
    SELECT idEmpresa, descripcion, orden FROM pedido_estatus WHERE id_empresa = 1;
    
    -- MENU Y ROLES
    INSERT INTO procMenu (id_empresa, id_padre, nombre, orden, activo, linkTo, icono, soloLanding)
    SELECT idEmpresa, P.id_padre, P.nombre, P.orden, P.activo, P.linkTo, P.icono, P.soloLanding FROM procMenu P WHERE P.id_empresa = 1;
    
    INSERT roles (id_empresa, nombre, fecha_creacion, fecha_actualizacion)
    SELECT idEmpresa, R.nombre, CURDATE(), CURDATE() FROM roles R WHERE R.id_empresa = 1;
    
    INSERT INTO rol_menu (id_empresa, id_rol, id_procMenu)
    SELECT idEmpresa, id_rol, id_procMenu FROM rol_menu WHERE id_empresa = 1;
    
	INSERT INTO usuario_rol (id_empresa, id_usuario, id_rol)
    SELECT idEmpresa, UR.id_usuario, UR.id_rol FROM usuario_rol UR WHERE UR.id_empresa = 1;
    
    -- AGENDA
    INSERT INTO jornada_laboral (id_empresa, dia_semana, hora_inicio, hora_fin, duracion_cita)
    SELECT idEmpresa, JL.dia_semana, JL.hora_inicio, JL.hora_fin, JL.duracion_cita FROM jornada_laboral JL WHERE JL.id_empresa = 1;
    
    INSERT INTO agenda_estatus (id_empresa, descripcion)
    SELECT idEmpresa, descripcion FROM agenda_estatus WHERE id_empresa = 1;
    
    -- CAJA
	insert into caja_tipo_movimientos (id_empresa, descripcion, abre_caja, cierra_caja, suma) 
		values 	(1, 'Apertura de Caja', 1, 0, 0), (1, 'Cierre de Caja', 0, 1, 0),
				(1, 'Ingreso de Efectivo', 0, 0, 1), (1, 'Retiro de Efectivo', 0, 0, 0);
    
    -- PEDIDOS
	INSERT INTO tipo_pedido (id_empresa, tipo_pedido) VALUES (1, 'En sitio'), (1, 'Domicilio'), (1, 'Recoge');	    
    
    -- INVENTARIOS
    insert into tipo_movimiento_inventario (id_empresa, descripcion, tipo_operacion) 
	VALUES 	(idEmpresa, 'Entrada por Compra', 'E'), (idEmpresa, 'Salida por Venta', 'S'), 
            (idEmpresa, 'Ajuste positivo', 'E'),  (idEmpresa, 'Ajuste negativo', 'S');
            
	-- ordencompra_estado
	insert into ordencompra_estado (id_empresa, descripcion) 
		values (idEmpresa, 'Pendiente'), (idEmpresa, 'Recibida'), (1, 'Cancelada');    
	
    -- COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postMenu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postMenu`(
	IN prm_id_empresa INT,
    IN prm_procMenu INT,
    IN prm_nombre VARCHAR(255),
    IN prm_orden INT,
    IN prm_activo TINYINT,
    IN prm_linkTo VARCHAR(255),
    IN prm_icono VARCHAR(600),
    IN prm_soloLanding BIT,
    IN prm_id_padre INT
)
BEGIN
	IF prm_procMenu = 0 THEN
    
		INSERT INTO cajero (id_empresa, id_padre, nombre, orden, activo, linkTo, icono, soloLanding)
		VALUES (prm_id_empresa, prm_id_padre, prm_nombre, prm_orden, prm_activo, prm_linkTo, prm_icono);    
    
    ELSE
		
        UPDATE procmenu SET id_padre = prm_id_padre,
							nombre = prm_nombre, 
							orden = prm_orden,                                  
							activo = prm_activo,
                            linkTo = prm_linkTo, 
                            icono = prm_icono,
                            soloLanding = prm_soloLanding
		WHERE id_empresa = prm_id_empresa AND id_procMenu = prm_procMenu;
    	
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postModulo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postModulo`(
	IN prm_id_empresa INT,
	IN prm_id_modulo INT,
	IN prm_nombre VARCHAR(60),
	IN prm_activo TINYINT
)
BEGIN
	IF prm_id_modulo = 0 THEN
    
		INSERT INTO modulos (id_empresa, nombre, activo)
		VALUES (prm_id_empresa, prm_nombre, prm_activo);    
    
    ELSE
		
        UPDATE modulos SET 	nombre = prm_nombre, 
							activo = prm_activo
		WHERE id_empresa = prm_id_empresa AND id_modulo = prm_id_modulo;
    	
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postOrdenDeCompra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postOrdenDeCompra`(
    IN p_id_empresa INT,
    IN p_fecha DATETIME,
    IN p_id_proveedor INT,
    IN p_total_orden DOUBLE,
    IN p_id_usuario INT,
    IN p_ordencompra_detalle JSON,
    OUT p_id_ordencompra INT,
    OUT p_codigo_resultado INT,
    OUT p_mensaje_resultado VARCHAR(255)
)
BEGIN

DECLARE i INT DEFAULT 0;
    DECLARE detalle_length INT;
    DECLARE producto_id INT;
    DECLARE producto_cantidad INT;
    DECLARE producto_costo_unitario DECIMAL(10, 2);
    DECLARE producto_subtotal DECIMAL(10, 2);
    DECLARE estado_ordencompra INT default 1;

    -- Inicializar valores de retorno
    SET p_codigo_resultado = 0;
    SET p_mensaje_resultado = 'Orden de compra creada exitosamente';

    -- Insertar en la tabla ordencompra
    INSERT INTO ordencompra (id_empresa, fecha, id_proveedor, total_orden, id_estado_ordencompra, id_usuario)
    VALUES (p_id_empresa, p_fecha, p_id_proveedor, p_total_orden, estado_ordencompra, p_id_usuario);

    -- Obtener el ID de la orden de compra generada
    SET p_id_ordencompra = LAST_INSERT_ID();

    -- Obtener la cantidad de elementos en el JSON
    SET detalle_length = JSON_LENGTH(p_ordencompra_detalle);

    -- Loop para insertar en la tabla ordencompra_detalle
    WHILE i < detalle_length DO
        -- Obtener los valores del JSON
        SET producto_id = JSON_EXTRACT(p_ordencompra_detalle, CONCAT('$[', i, '].id_producto'));
        SET producto_cantidad = JSON_EXTRACT(p_ordencompra_detalle, CONCAT('$[', i, '].cantidad'));
        SET producto_costo_unitario = JSON_EXTRACT(p_ordencompra_detalle, CONCAT('$[', i, '].costo_unitario'));
        SET producto_subtotal = JSON_EXTRACT(p_ordencompra_detalle, CONCAT('$[', i, '].subtotal'));

        -- Insertar en la tabla ordencompra_detalle
        INSERT INTO ordencompra_detalle (id_empresa, id_ordencompra, partida, id_producto, cantidad, costo_unitario, subtotal)
        VALUES (p_id_empresa, p_id_ordencompra, i + 1, producto_id, producto_cantidad, producto_costo_unitario, producto_subtotal);

        SET i = i + 1;
    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postPedido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postPedido`(
	IN p_id_empresa BIGINT,
    IN p_id_usuario BIGINT,
    IN p_id_cliente BIGINT,
    IN P_id_direccion BIGINT,
    IN P_id_pedido_estatus BIGINT,
    IN P_id_tipo_pedido INT,
    IN P_total DOUBLE,
    IN P_importe_pagado DOUBLE,
    IN P_saldo DOUBLE,
	IN P_fecha_creacion DATETIME,
    IN P_fecha_actualizacion DATETIME,
    IN P_motivo_cancelacion VARCHAR(150),
    IN p_partidas_pedido  JSON,
    IN p_formas_de_pago  JSON,
    IN p_pedido_domicilio JSON,
    IN p_id_cajero INT,
    IN p_id_caja INT
)
BEGIN
	DECLARE p_id_pedido BIGINT;
    DECLARE partida JSON;
    DECLARE idx INT DEFAULT 0;  
    DECLARE total_pedido DOUBLE;
    DECLARE subtotal DOUBLE;
    DECLARE _direccion VARCHAR(800);
    
    /*
    IF P_motivo_cancelacion <> "" THEN 
		SET P_id_pedido_estatus = 6;
	END IF;   
    */
    
	INSERT INTO pedidos (id_empresa, id_usuario, id_cliente, id_direccion, id_pedido_estatus, 
						 id_tipo_pedido, total, importe_pagado, saldo,
                         fecha_creacion, fecha_actualizacion, motivo_cancelacion, id_cajero, id_caja)	
		VALUES (p_id_empresa, p_id_usuario, p_id_cliente, P_id_direccion, P_id_pedido_estatus,
				P_id_tipo_pedido, P_total, P_importe_pagado, P_saldo,
                P_fecha_creacion, P_fecha_actualizacion, P_motivo_cancelacion, p_id_cajero, p_id_caja);
        
	SET p_id_pedido = LAST_INSERT_ID();
    
    SET total_pedido = 0;
    -- Lógica para procesar los PRODUCTOS     
    WHILE idx < JSON_LENGTH(p_partidas_pedido) DO
        SET partida = JSON_EXTRACT(p_partidas_pedido, CONCAT('$[', idx, ']'));
        
        -- Extraer los campos individuales
        SET @id_producto = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.id_producto'));
        SET @cantidad = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.cantidad'));
        SET @precio = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.precio'));
        
        SET subtotal = @cantidad * @precio;
        SET total_pedido = total_pedido + subtotal;
        
		INSERT INTO pedidos_detalle (id_empresa, id_pedido, id_producto, cantidad, precio, subtotal, fecha_creacion, fecha_actualizacion)    
			VALUES (p_id_empresa, p_id_pedido, @id_producto, @cantidad, @precio, subtotal, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP() );

        -- AGREGO MOVIMIENTO EN KARDEX Y DECREMENTO LAS EXISTECIAS DEL PRODUCTO COMBO SI EXISTE
        IF EXISTS(
			SELECT 1
            FROM combos C
            WHERE C.id_empresa = p_id_empresa AND C.id_producto = @id_producto
            LIMIT 1
        ) THEN        
			-- ACTUALIZO EL KARDEX
			INSERT INTO kardex (id_empresa, id_producto, fecha_movimiento, id_tipo_movimiento, cantidad, costo_unitario, referencia_documento, saldo_anterior, saldo_actual, id_usuario)
			SELECT p_id_empresa, @id_producto, current_timestamp(), 'S', ( C.cantidad * @cantidad), P.costo, p_id_pedido, E.cantidad, ( E.cantidad - ( C.cantidad * @cantidad) ), p_id_usuario
			FROM productos P 
			INNER JOIN combos C ON C.id_empresa = p_id_empresa AND C.id_producto = P.id_producto
			INNER JOIN existencias E ON E.id_empresa = p_id_empresa AND E.id_producto = C.id_producto
			WHERE P.id_empresa = p_id_empresa AND P.id_producto = @id_producto;  
        
			-- DECREMENTO EXISTENCIAS A NIVEL COMBO:
			UPDATE existencias AS E
			INNER JOIN combos AS C ON E.id_empresa = C.id_empresa AND E.id_producto = C.id_producto_combo
			SET E.cantidad = (E.cantidad - (@cantidad * C.cantidad))
			WHERE C.id_empresa = p_id_empresa AND C.id_producto = @id_producto;
        ELSE
			-- DECREMENTO EXISTENCIAS A NIVEL PRODUCTO
			UPDATE existencias SET cantidad = ( cantidad - @cantidad )
			WHERE id_empresa = p_id_empresa AND id_producto = @id_producto;
        
			-- AGREGO MOVIMIENTO EN KARDEX DEL PRODUCTO PADRE
			INSERT INTO kardex (id_empresa, id_producto, fecha_movimiento, id_tipo_movimiento, cantidad, costo_unitario)
			SELECT p_id_empresa, @id_producto, current_timestamp(), 'S', @cantidad, P.costo
			FROM productos P 
			WHERE P.id_empresa = p_id_empresa AND P.id_producto = @id_producto;  
        
        END IF;
		SET idx = idx + 1;
        
    END WHILE; 
    
    -- actulizo las formas de pago
    SET idx = 0;
    WHILE idx < JSON_LENGTH(p_formas_de_pago) DO
        SET partida = JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', idx, ']'));
        
        -- Extraer los campos individuales
        SET @id_forma_de_pago = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.id_forma_de_pago'));
        SET @es_pago_total = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.es_pago_total'));
        SET @monto_pagado = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.monto_pagado'));
        SET @saldo = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.saldo'));
                
		INSERT INTO pedido_formas_de_pago (id_empresa, id_pedido, id_forma_de_pago, es_pago_total, monto_pagado, saldo)    
			VALUES (p_id_empresa, p_id_pedido, @id_forma_de_pago, @es_pago_total, @monto_pagado, @saldo);

        SET idx = idx + 1;
    END WHILE;     
    
	SET idx = 0;
    WHILE idx < JSON_LENGTH(p_pedido_domicilio) DO
        SET partida = JSON_EXTRACT(p_pedido_domicilio, CONCAT('$[', idx, ']'));
        
        -- Extraer los campos individuales
		SET @id_direccion = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.id_direccion'));
        SET @id_colonia = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.id_colonia'));
        SET @colonia = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.colonia'));
        SET @calle = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.calle'));
        SET @numero_exterior = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.numero_exterior'));
        SET @entre_calles = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.entre_calles'));
        SET @referencia = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.referencia'));
        SET _direccion = CONCAT(@calle, ' ', @numero_exterior, ', ', @colonia);
        SET @cargo_nueva_colonia = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.cargo_nueva_colonia'));
        
        -- actualizo el importe del cargo por envio
        UPDATE pedidos SET importe_envio = IFNULL(@cargo_nueva_colonia, 0) WHERE id_empresa = p_id_empresa AND id_pedido = p_id_pedido;
        
        -- Si se ingreso una nueva colonia
        IF @id_colonia = 0 THEN
			INSERT INTO colonias_delivery (id_empresa, nombre, cargo, activa)
				VALUES (p_id_empresa, @colonia, @cargo_nueva_colonia, 1);
			SET @id_colonia = last_insert_id();
		else
			SELECT nombre INTO @colonia FROM colonias_delivery WHERE id_empresa = p_id_empresa AND id_colonia = @id_colonia;
		END IF;
        
        -- reviso si no existe la dirección captura para el cliente para darla de alta o actualizarla
        IF @id_direccion = 0 THEN
        
			INSERT INTO direcciones (id_empresa, id_direccion_tipo_identidad, identidad, 
									 direccion_por_defecto, calle, numero, id_colonia, entre_calles,
                                     referencia, direccion, colonia)
			VALUES (p_id_empresa, 1, p_id_cliente, 1, @calle, @numero_exterior, @id_colonia, @entre_calles,
					@referencia, _direccion, @colonia);
			SET P_id_direccion = last_insert_id();
            
            -- actualizo la nueva dirección en el pedido
            UPDATE pedidos SET id_direccion = P_id_direccion
            WHERE id_empresa = p_id_empresa AND id_pedido = p_id_pedido;
		
        ELSE
        
			UPDATE direcciones
				SET calle = @calle, id_colonia = @id_colonia, entre_calles = @entre_calles, 
					referencia = @referencia, direccion = _direccion,
                    colonia = @colonia, numero = @numero_exterior
            WHERE id_empresa = p_id_empresa AND identidad = p_id_cliente AND id_direccion = @id_direccion;
            
            -- Actualizo el cargo de la colonia 
            UPDATE colonias_delivery SET cargo = @cargo_nueva_colonia WHERE id_empresa = p_id_empresa AND id_colonia = @id_colonia;
            
        END IF;
        
        -- agrego la dirección al pedido
        INSERT INTO pedido_domicilio (id_empresa, id_pedido, id_direccion) VALUES (p_id_empresa, p_id_pedido, @id_direccion);
        
        SET idx = idx + 1;
        
    END WHILE; 
    
	SELECT p_id_pedido AS id_pedido;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postPedidoTest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postPedidoTest`(
	IN p_id_empresa BIGINT,
    IN p_id_usuario BIGINT,
    IN p_id_cliente BIGINT,
    IN P_id_direccion BIGINT,
    IN P_id_pedido_estatus BIGINT,
    IN P_id_tipo_pedido INT,
    IN P_total DOUBLE,
    IN P_importe_pagado DOUBLE,
    IN P_saldo DOUBLE,
	IN P_fecha_creacion DATETIME,
    IN P_fecha_actualizacion DATETIME,
    IN P_motivo_cancelacion VARCHAR(150),
    IN p_partidas_pedido  JSON,
    IN p_formas_de_pago  JSON,
    IN p_pedido_domicilio JSON,
    IN p_id_cajero INT
)
BEGIN
	DECLARE p_id_pedido BIGINT;
    DECLARE partida JSON;
    DECLARE idx INT DEFAULT 0;  
    DECLARE total_pedido DOUBLE;
    DECLARE subtotal DOUBLE;
    DECLARE _direccion VARCHAR(800);
    
    /*
    IF P_motivo_cancelacion <> "" THEN 
		SET P_id_pedido_estatus = 6;
	END IF;   
    */
    
	INSERT INTO pedidos (id_empresa, id_usuario, id_cliente, id_direccion, id_pedido_estatus, 
						 id_tipo_pedido, total, importe_pagado, saldo,
                         fecha_creacion, fecha_actualizacion, motivo_cancelacion, id_cajero)	
		VALUES (p_id_empresa, p_id_usuario, p_id_cliente, P_id_direccion, P_id_pedido_estatus,
				P_id_tipo_pedido, P_total, P_importe_pagado, P_saldo,
                P_fecha_creacion, P_fecha_actualizacion, P_motivo_cancelacion, p_id_cajero);
        
	SET p_id_pedido = LAST_INSERT_ID();
    
    SET total_pedido = 0;
    -- Lógica para procesar los datos    
    WHILE idx < JSON_LENGTH(p_partidas_pedido) DO
        SET partida = JSON_EXTRACT(p_partidas_pedido, CONCAT('$[', idx, ']'));
        
        -- Extraer los campos individuales
        SET @id_producto = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.id_producto'));
        SET @cantidad = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.cantidad'));
        SET @precio = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.precio'));

        -- Aquí puedes realizar la operación que desees con los datos
        -- Por ejemplo, insertar o actualizar en una tabla
        
        SET subtotal = @cantidad * @precio;
        SET total_pedido = total_pedido + subtotal;
        
		INSERT INTO pedidos_detalle (id_empresa, id_pedido, id_producto, cantidad, precio, subtotal, fecha_creacion, fecha_actualizacion)    
			VALUES (p_id_empresa, p_id_pedido, @id_producto, @cantidad, @precio, subtotal, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP() );

        SET idx = idx + 1;
    END WHILE; 
    
    -- actulizo las formas de pago
    SET idx = 0;
    WHILE idx < JSON_LENGTH(p_formas_de_pago) DO
        SET partida = JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', idx, ']'));
        
        -- Extraer los campos individuales
        SET @id_forma_de_pago = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.id_forma_de_pago'));
        SET @es_pago_total = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.es_pago_total'));
        SET @monto_pagado = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.monto_pagado'));
        SET @saldo = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.saldo'));
                
		INSERT INTO pedido_formas_de_pago (id_empresa, id_pedido, id_forma_de_pago, es_pago_total, monto_pagado, saldo)    
			VALUES (p_id_empresa, p_id_pedido, @id_forma_de_pago, @es_pago_total, @monto_pagado, @saldo);

        SET idx = idx + 1;
    END WHILE;     
    
	SET idx = 0;
    WHILE idx < JSON_LENGTH(p_pedido_domicilio) DO
        SET partida = JSON_EXTRACT(p_pedido_domicilio, CONCAT('$[', idx, ']'));
        
        -- Extraer los campos individuales
		SET @id_direccion = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.id_direccion'));
        SET @id_colonia = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.id_colonia'));
        SET @colonia = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.colonia'));
        SET @calle = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.calle'));
        SET @numero_exterior = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.numero_exterior'));
        SET @entre_calles = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.entre_calles'));
        SET @referencia = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.referencia'));
        SET _direccion = CONCAT(@calle, ' ', @numero_exterior, ', ', @colonia);
        SET @cargo_nueva_colonia = JSON_UNQUOTE(JSON_EXTRACT(partida, '$.cargo_nueva_colonia'));
        
        
        -- Si se ingreso una nueva colonia
        IF @id_colonia = 0 THEN
			INSERT INTO colonias_delivery (id_empresa, nombre, cargo, activa)
				VALUES (p_id_empresa, @colonia, @cargo_nueva_colonia, 1);
			SET @id_colonia = last_insert_id();
		else
			SELECT nombre INTO @colonia FROM colonias_delivery WHERE id_empresa = p_id_empresa AND id_colonia = @id_colonia;
		END IF;
        
        -- reviso si no existe la dirección captura para el cliente para darla de alta o actualizarla
        IF @id_direccion = 0 THEN
        
			INSERT INTO direcciones (id_empresa, id_direccion_tipo_identidad, identidad, 
									 direccion_por_defecto, calle, numero, id_colonia, entre_calles,
                                     referencia, direccion, colonia)
			VALUES (p_id_empresa, 1, p_id_cliente, 1, @calle, @numero_exterior, @id_colonia, @entre_calles,
					@referencia, _direccion, @colonia);
			SET P_id_direccion = last_insert_id();
            
            -- actualizo la nueva dirección en el pedido
            UPDATE pedidos SET id_direccion = P_id_direccion
            WHERE id_empresa = p_id_empresa AND id_pedido = p_id_pedido;
		
        ELSE
        
			UPDATE direcciones
				SET calle = @calle, id_colonia = @id_colonia, entre_calles = @entre_calles, 
					referencia = @referencia, direccion = _direccion,
                    colonia = @colonia, numero = @numero_exterior
            WHERE id_empresa = p_id_empresa AND identidad = p_id_cliente AND id_direccion = @id_direccion;
            
            -- Actualizo el cargo de la colonia 
            UPDATE colonias_delivery SET cargo = @cargo_nueva_colonia WHERE id_empresa = p_id_empresa AND id_colonia = @id_colonia;
            
        END IF;
        
        -- agrego la dirección al pedido
        INSERT INTO pedido_domicilio (id_empresa, id_pedido, id_direccion) VALUES (p_id_empresa, p_id_pedido, @id_direccion);
        
        SET idx = idx + 1;
        
    END WHILE; 
    
	SELECT p_id_pedido AS id_pedido;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postProducto`(
	IN prm_id_empresa INT,
    IN prm_id_producto INT,
	IN prm_nombre varchar(200) ,
	IN prm_descripcion varchar(200),
	IN prm_id_proveedor bigint(20),
    IN prm_id_categoria bigint(20),
	IN prm_precio double, 
	IN prm_precio_promocion double,
	IN prm_costo double,
	IN prm_image1 varchar(255),
	IN prm_image2 varchar(255),
	IN prm_image3 varchar(255),
	IN prm_existencia INT,
	IN prm_activo TINYINT(4),
	IN prm_sku varchar(20),
    IN prm_combo JSON
)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE json_length INT;
    DECLARE current_id_producto_combo INT;
    DECLARE current_cantidad INT;

	IF @prm_id_producto = 0 THEN
		
        INSERT INTO 
			productos (nombre, descripcion, id_proveedor, id_categoria, precio,
					   precio_promocion, costo, image1, image2, image3, existencia,
                       fecha_creacion, fecha_actualizacion, activo, sku)
			VALUES (prm_nombre, prm_descripcion, prm_id_proveedor, prm_id_categoria, prm_precio,
					prm_precio_promocion, prm_costo, prm_image1, prm_image2, prm_image3,
                    prm_existencia, now(), now(), prm_activo, prm_sku);    
    ELSE
    
        UPDATE productos
			SET nombre = prm_nombre, descripcion = prm_descripcion,
				id_proveedor = prm_id_proveedor, id_categoria = prm_id_categoria,
                precio = prm_precio, precio_promocion = prm_precio_promocion,
                costo = prm_costo, 
                image1 = prm_image1, image2 = prm_image2, image3 = prm_image3,
                existencia = prm_existencia, 
                fecha_creacion = now(), fecha_actualizacion = now(),
                activo = prm_activo, sku = prm_sku            
		WHERE id_empresa = prm_id_empresa AND id_producto = prm_id_producto;    
    
    END IF;
    
    -- Tabla temporal para almacenar los productos del JSON
    CREATE TEMPORARY TABLE IF NOT EXISTS TempComboProductos (
        id_producto_combo INT,
        cantidad INT
    );

    -- Limpiar la tabla temporal por si se usó antes
    TRUNCATE TABLE TempComboProductos;
    
	-- Obtener la longitud del array JSON
    SET json_length = JSON_LENGTH(prm_combo);
    
    -- Recorrer el array JSON y insertar en la tabla temporal
    WHILE i < json_length DO
        SET current_id_producto_combo = JSON_UNQUOTE(JSON_EXTRACT(prm_combo, CONCAT('$[', i, '].id_producto_combo')));
        SET current_cantidad = JSON_UNQUOTE(JSON_EXTRACT(prm_combo, CONCAT('$[', i, '].cantidad')));

        INSERT INTO TempComboProductos (id_producto_combo, cantidad)
        VALUES (current_id_producto_combo, current_cantidad);

        SET i = i + 1;
    END WHILE;
	
    -- Paso 1: Insertar nuevos productos de combo o actualizar la cantidad si ya existen
    INSERT INTO combos (id_empresa, id_producto, id_producto_combo, cantidad)
    SELECT
        prm_id_empresa,
        prm_id_producto,
        tcp.id_producto_combo,
        tcp.cantidad
    FROM
        TempComboProductos tcp
    ON DUPLICATE KEY UPDATE
        cantidad = VALUES(cantidad);

    -- Paso 2: Eliminar los productos de combo que ya no están en el JSON
    DELETE c
    FROM
        combos c
    LEFT JOIN
        TempComboProductos tcp ON c.id_producto_combo = tcp.id_producto_combo
    WHERE
        c.id_empresa = prm_id_empresa
        AND c.id_producto = prm_id_producto
        AND tcp.id_producto_combo IS NULL;

    -- Eliminar la tabla temporal
    DROP TEMPORARY TABLE IF EXISTS TempComboProductos;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postProducto_Test` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postProducto_Test`(
	IN prm_id_empresa INT,
    IN prm_id_producto INT,
    IN prm_combo JSON
)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE json_length INT;
    DECLARE current_id_producto_combo INT;
    DECLARE current_cantidad INT;
    
    -- Tabla temporal para almacenar los productos del JSON
    CREATE TEMPORARY TABLE IF NOT EXISTS TempComboProductos (
        id_producto_combo INT,
        cantidad INT
    );

    -- Limpiar la tabla temporal por si se usó antes
    TRUNCATE TABLE TempComboProductos;
    
	-- Obtener la longitud del array JSON
    SET json_length = JSON_LENGTH(prm_combo);
    
    select json_length;
    
    -- Recorrer el array JSON y insertar en la tabla temporal
    WHILE i < json_length DO
        -- SET current_id_producto_combo = JSON_UNQUOTE(JSON_EXTRACT(prm_combo, CONCAT('$[', i, '].id_producto_combo')));
        -- SET current_cantidad = JSON_UNQUOTE(JSON_EXTRACT(prm_combo, CONCAT('$[', i, '].cantidad')));
        
        SET current_id_producto_combo = JSON_EXTRACT(prm_combo, CONCAT('$[', i, '].id_producto_combo'));
        SET current_cantidad = JSON_EXTRACT(prm_combo, CONCAT('$[', i, '].cantidad'));

        INSERT INTO TempComboProductos (id_producto_combo, cantidad)
        VALUES (current_id_producto_combo, current_cantidad);

        SET i = i + 1;
        SELECT i;
    END WHILE;
    
    select * from TempComboProductos;
	
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postProveedor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postProveedor`(
	IN prm_id_empresa INT,
    IN prm_id_proveedor INT,
    IN prm_nombre varchar(500),
	IN prm_contacto1 varchar(200),
	IN prm_contacto2 varchar(200),
    IN prm_telefono1 varchar(20),
    IN prm_telefono2 varchar(20),
    IN prm_whatsapp varchar(20),
	IN prm_email1 varchar(180),
    IN prm_email2 varchar(180),
    IN prm_horario varchar(180),
    IN prm_activo tinyint
)
BEGIN
    IF prm_id_proveedor = 0 THEN
		INSERT INTO proveedores (id_empresa, id_proveedor, nombre, contacto1, contacto2, telefono1, telefono2, whatsapp,
								 email1, email2, horario, activo)
		VALUES (prm_id_empresa, prm_id_proveedor, prm_nombre, prm_contacto1, prm_contacto2, prm_telefono1, prm_telefono2, prm_whatsapp,
				prm_email1, prm_email2, prm_horario, prm_activo);
    ELSE
		UPDATE proveedores 
			SET nombre = prm_nombre, contacto1 = prm_contacto1, contacto2 = prm_contacto2, telefono1 = prm_telefono1,
				telefono2 = prm_telefono2, whatsapp = prm_whatsapp, email1 = prm_email1, email2 = prm_email2,
                horario = prm_horario, activo = prm_activo
        WHERE id_empresa = prm_id_empresa AND id_proveedor = prm_id_proveedor;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postPuntoDeAcceso` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postPuntoDeAcceso`(
	IN prm_id_empresa INT,
    IN prm_id_puntoDeAcceso INT,
    IN prm_nombre VARCHAR(200),
    IN prm_horario VARCHAR(600),
    IN prm_activo TINYINT
)
BEGIN

	IF prm_id_puntoDeAcceso = 0 THEN
    
		INSERT INTO puntosdeacceso (id_empresa, nombre, horario, fecha_creacion, fecha_actualizacion, activo)
		VALUES (prm_id_empresa, prm_nombre, prm_nombre, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP, prm_activo);    
    
    ELSE
		
        UPDATE puntosdeacceso SET 	nombre = prm_nombre, 
									horario = prm_nombre,                                  
									activo = prm_activo,
									fecha_actualizacion = CURRENT_TIMESTAMP()
		WHERE id_empresa = prm_id_empresa AND id_puntoDeAcceso = prm_id_puntoDeAcceso;
    	
	END IF;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postPuntoDeEntrega` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postPuntoDeEntrega`(
	IN prm_id_empresa INT,
    IN prm_id_puntoDeEntrega INT,
    IN prm_nombre VARCHAR(200),
    IN prm_horario VARCHAR(600),
    IN prm_activo TINYINT
)
BEGIN

	IF prm_id_puntoDeEntrega = 0 THEN
    
		INSERT INTO puntosdeentrega (id_empresa, nombre, horario, fecha_creacion, fecha_actualizacion, activo)
		VALUES (prm_id_empresa, prm_nombre, prm_horario, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP, prm_activo);    
    
    ELSE
		
        UPDATE puntosdeentrega SET 	nombre = prm_nombre, 
									horario = prm_horario,                                  
									activo = prm_activo,
									fecha_actualizacion = CURRENT_TIMESTAMP()
		WHERE id_empresa = prm_id_empresa AND id_puntoDeEntrega = prm_id_puntoDeEntrega;
    	
	END IF;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postRol` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postRol`(
	IN prm_id_empresa INT,
	IN prm_id_rol INT,
	IN prm_nombre VARCHAR(90),
	IN prm_activo TINYINT
)
BEGIN
	IF prm_id_rol = 0 THEN
    
		INSERT INTO roles (id_empresa, nombre, activo, fecha_creacion, fecha_actualizacion)
		VALUES (prm_id_empresa, prm_nombre, prm_activo, current_date(), current_date());    
    
    ELSE
		
        UPDATE roles SET 	nombre = prm_nombre, 
							activo = prm_activo,
                            fecha_actualizacion = current_date()
		WHERE id_empresa = prm_id_empresa AND id_rol = prm_id_rol;
    	
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postRolMenu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postRolMenu`(
	IN prm_id_empresa INT,
	IN prm_id_procMenu INT,
    IN prm_id_rol INT,
    IN prm_activo TINYINT
)
BEGIN
	IF NOT EXISTS (
		SELECT 1
        FROM rol_menu RM
        WHERE RM.id_empresa = prm_id_empresa AND RM.id_rol = prm_id_rol AND RM.id_procMenu = prm_id_procMenu
    ) THEN
    
		INSERT INTO rol_menu (id_empresa, id_procMenu, id_rol, activo)
		VALUES (prm_id_empresa, prm_id_procMenu, prm_id_rol, prm_activo);    
    
    ELSE
		
        UPDATE rol_menu SET activo = prm_activo
		WHERE id_empresa = prm_id_empresa AND id_procMenu = prm_id_procMenu AND id_rol = prm_id_rol;
    	
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postVisita` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postVisita`(	
	p_id_empresa BIGINT,
    p_id_visita BIGINT,
    p_id_cliente BIGINT,
    p_id_usuario BIGINT,
    p_nombre VARCHAR(0),
    p_comentarios VARCHAR(800),
    p_fecha_inicio DATETIME,
    p_fecha_final DATETIME,
    p_latitud DOUBLE,
    p_longitud DOUBLE    
)
BEGIN

	IF p_id_visita = 0 THEN
		
        INSERT INTO visitas (id_empresa, id_cliente, id_usuario, nombre, comentarios, fecha_inicio, latidud, longitud)
			VALUES (p_id_empresa, p_id_cliente, p_id_usuario, p_nombre, p_comentarios, p_fecha_inicio, p_latitud, p_longitud);
            
		SET p_id_visita = LAST_INSERT_ID();
        
	ELSE
    
		UPDATE visitas SET id_cliente = p_id_cliente, nombre = p_nombre, comentarios = p_comentarios, fecha_final = p_fecha_final
        WHERE id_empresa = p_id_empresa AND id_visita = p_id_visita;
							
	END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putAgenda` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putAgenda`(
	IN `prm_id_empresa` INT, 
    IN `prm_id_agenda` INT, 
    IN `intervalo` VARCHAR(20), 
    IN `prm_id_cliente` INT, 
    IN `prm_nombre_cliente` VARCHAR(200), 
    IN `prm_fecha` DATE, 
    IN `prm_celular` VARCHAR(90),
    IN `prm_nombre_asistente` VARCHAR(300)
)
BEGIN
	DECLARE separador INT;
	DECLARE _hora_inicio TIME;
    DECLARE _hora_fin TIME;
    DECLARE _dia_semana INT;
    DECLARE _id_jornada INT;
    DECLARE _id_agenda_estatus SMALLINT;
    DECLARE _id_agenda INT;
    DECLARE _id_clave_confirmacion VARCHAR(6) DEFAULT '';
    -- DECLARE _id_cliente INT;
    
    SET _dia_semana = WEEKDAY(prm_fecha);
    SET _id_agenda_estatus = 2;
    
	SELECT JL.id_jornada INTO _id_jornada
	FROM jornada_laboral JL
	WHERE JL.id_empresa = prm_id_empresa AND JL.dia_semana = _dia_semana;    
    
    -- Buscar la posición del separador "-" para obtener la fecha y hora 
	SET separador = LOCATE('-', intervalo);    
    SET _hora_inicio = TIME(SUBSTRING(intervalo, 1, separador - 1));
	SET _hora_fin = TIME(SUBSTRING(intervalo, separador + 2));
    
    -- SELECT _hora_inicio, _hora_fin;
    
    -- Si el cliente no existe lo doy de alta
    IF NOT EXISTS(
		SELECT 1 FROM clientes C WHERE C.id_empresa = prm_id_empresa AND C.celulares = prm_celular
    ) THEN
		INSERT INTO clientes (id_empresa, nombre, celulares) VALUES (prm_id_empresa, prm_nombre_cliente, prm_celular);
        SET prm_id_cliente = LAST_INSERT_ID();
    END IF;
     
    -- Busco si no hay cita reservada
    IF NOT EXISTS(
		SELECT 1
		FROM agenda A
		WHERE A.id_empresa = prm_id_empresa AND A.fecha = prm_fecha AND A.hora_inicio = _hora_inicio AND A.hora_fin = _hora_fin
    ) THEN
		
        -- GENERO CLAVE DE CONFIRMACION
        SET _id_clave_confirmacion = fn_genera_clave_confirmacion(prm_id_empresa);
    
		INSERT INTO agenda (id_empresa, fecha, hora_inicio, hora_fin, id_cliente, id_agenda_estatus, id_jornada, clave_confirmacion, nombre_asistente) 
			VALUES (prm_id_empresa, prm_fecha, _hora_inicio, _hora_fin, prm_id_cliente, _id_agenda_estatus, _id_jornada, _id_clave_confirmacion, prm_nombre_asistente);
		SET _id_agenda = LAST_INSERT_ID();
        
	ELSE 

		-- GENERO CLAVE DE CONFIRMACION
        SET _id_clave_confirmacion = fn_genera_clave_confirmacion(prm_id_empresa);
    
		UPDATE agenda SET id_cliente = prm_id_cliente, id_agenda_estatus = _id_agenda_estatus, nombre_asistente = prm_nombre_asistente
        WHERE id_empresa = prm_id_empresa AND id_agenda = prm_id_agenda;
        
	END IF;
    
    SELECT _id_clave_confirmacion AS folio_confirmacion;		
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putAgendaCambiaEstatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putAgendaCambiaEstatus`(
	IN prm_id_empresa INT,
    IN prm_id_agenda INT,
    IN prm_id_agenda_estatus SMALLINT
)
BEGIN

	UPDATE agenda SET id_agenda_estatus = prm_id_agenda_estatus 
    WHERE id_empresa = prm_id_empresa and id_agenda = prm_id_agenda;
    
    SELECT _cambio_efectuado AS cambio_efectuado;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putAgendaCancelar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putAgendaCancelar`(
	IN prm_id_empresa INT,
    IN prm_id_agenda INT
)
BEGIN

	UPDATE agenda SET id_agenda_estatus = 4 WHERE id_empresa = prm_id_empresa and id_agenda = prm_id_agenda;
    
    SELECT _cambio_efectuado AS cambio_efectuado;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putAgendaConfirmar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putAgendaConfirmar`(
	IN prm_id_empresa INT,
    IN prm_id_agenda INT
)
BEGIN

	UPDATE agenda SET id_agenda_estatus = 3 WHERE id_empresa = prm_id_empresa and id_agenda = prm_id_agenda;
    
    SELECT _cambio_efectuado AS cambio_efectuado;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putCategoriaImage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putCategoriaImage`(
	IN prm_id_categoria INT,
    IN prm_id_empresa INT,
    in prm_imagen VARCHAR(255)
)
BEGIN
	UPDATE categorias 
		SET imagen = prm_imagen,
			fecha_actualizacion = now()
        WHERE id_empresa = prm_id_empresa AND  id_categoria = prm_id_categoria;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putCategorias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putCategorias`(
	IN prm_id_categoria INT,
    IN prm_id_empresa INT,
    IN prm_nombre VARCHAR(200),
    IN prm_descripcion VARCHAR(200),
    IN prm_imagen VARCHAR(255),
    IN prm_activo TINYINT,
    IN prm_fecha_actualizacion DATETIME
)
BEGIN

	UPDATE categorias 
		SET nombre = prm_nombre, descripcion = prm_descripcion, imagen = prm_imagen, activo = IFNULL(prm_activo, 0),
			fecha_actualizacion = prm_fecha_actualizacion
        WHERE id_empresa = prm_id_empresa AND  id_categoria = prm_id_categoria;
		
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putFormasDePago` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putFormasDePago`(
	IN p_id_empresa INT,
	IN p_formas_de_pago  JSON
)
BEGIN

    -- Lógica para procesar los datos
    DECLARE formaPago JSON;
    DECLARE idx INT DEFAULT 0;
    
    WHILE idx < JSON_LENGTH(p_formas_de_pago) DO
        SET formaPago = JSON_EXTRACT(p_formas_de_pago, CONCAT('$[', idx, ']'));

        -- Extraer los campos individuales
        SET @id_forma_de_pago = JSON_UNQUOTE(JSON_EXTRACT(formaPago, '$.id_forma_de_pago'));
        SET @activo = JSON_UNQUOTE(JSON_EXTRACT(formaPago, '$.activo'));
        SET @informacion_adicional = JSON_UNQUOTE(JSON_EXTRACT(formaPago, '$.informacion_adicional'));

        -- Aquí puedes realizar la operación que desees con los datos
        -- Por ejemplo, insertar o actualizar en una tabla
        
		UPDATE formas_de_pago SET 
			informacion_adicional = @informacion_adicional,
			activo = @activo
		WHERE id_empresa = p_id_empresa AND id_forma_de_pago = @id_forma_de_pago;        

        SET idx = idx + 1;
    END WHILE;    
    
    



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putLandingPage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putLandingPage`(
	IN prm_id_empresa INT,
    IN prm_id_landingPage VARCHAR(800),
    IN prm_quienes_somos VARCHAR(800),
    IN prm_servicios VARCHAR(800),
    IN prm_productos VARCHAR(800),
    IN prm_mostrar_quienes_somos TINYINT,
    IN prm_mostrar_productos TINYINT,
    IN prm_mostrar_servicios TINYINT,
    IN prm_mostrar_contactanos TINYINT,
    IN prm_mostrar_productos_verMas TINYINT
)
BEGIN

	UPDATE landingPage
		SET quienes_somos = prm_quienes_somos,
			servicios = prm_servicios,
            productos = prm_productos,
            mostrar_quienes_somos = prm_mostrar_quienes_somos,
            mostrar_productos = prm_mostrar_productos,
            mostrar_servicios = prm_mostrar_servicios,
            mostrar_contactanos = prm_mostrar_contactanos,
            mostrar_productos_verMas = prm_mostrar_productos_verMas
	WHERE id_empresa = prm_id_empresa AND id_landingPage = prm_id_landingPage;
            

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putLandingPage_Productos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putLandingPage_Productos`(
	IN prm_id_empresa INT,
    IN prm_id_landingPage INT,
    IN prm_productos VARCHAR(800)
)
BEGIN
	UPDATE landingPage
		SET productos = prm_productos
	WHERE id_empresa = prm_id_empresa AND id_landingPage = prm_id_landingPage;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putLandingPage_QuienesSomos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putLandingPage_QuienesSomos`(
	IN prm_id_empresa INT,
    IN prm_id_landingPage INT,
    IN prm_quienes_somos VARCHAR(800),
    IN prm_inicio_titulo VARCHAR(800),
    IN prm_inicio_descripcion VARCHAR(800)
    
)
BEGIN
	UPDATE landingPage
		SET quienes_somos = prm_quienes_somos,
			inicio_titulo = prm_inicio_titulo,
            inicio_descripcion = prm_inicio_descripcion
	WHERE id_empresa = prm_id_empresa AND id_landingPage = prm_id_landingPage;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putLandingPage_Servicios` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putLandingPage_Servicios`(
	IN prm_id_empresa INT,
    IN prm_id_landingPage INT,
    IN prm_servicios VARCHAR(800)
)
BEGIN
	UPDATE landingPage
		SET servicios = prm_servicios
	WHERE id_empresa = prm_id_empresa AND id_landingPage = prm_id_landingPage;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putLandingPage_Settings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putLandingPage_Settings`(
	IN prm_id_empresa INT,
    IN prm_id_landingPage INT,
    IN prm_mostrar_quienes_somos TINYINT,
    IN prm_mostrar_productos TINYINT,
    IN prm_mostrar_productos_verMas TINYINT,
    IN prm_mostrar_servicios TINYINT,
    IN prm_mostrar_contactanos TINYINT,
    IN prm_mostrar_sitioEnMantenimiento TINYINT,
    IN prm_mostrar_carritoDeCompras TINYINT
)
BEGIN
	UPDATE landingPage
		SET mostrar_quienes_somos = prm_mostrar_quienes_somos,
			mostrar_productos = prm_mostrar_productos,
            mostrar_productos_verMas = prm_mostrar_productos_verMas,
            mostrar_servicios = prm_mostrar_servicios,
            mostrar_contactanos = prm_mostrar_contactanos,
            mostrar_sitioEnMantenimiento = prm_mostrar_sitioEnMantenimiento,
            mostrar_carritoDeCompras = prm_mostrar_carritoDeCompras
	WHERE id_empresa = prm_id_empresa AND id_landingPage = prm_id_landingPage;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putOrdenDeCompra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putOrdenDeCompra`(
    IN p_id_empresa INT,
    IN p_id_ordencompra INT,
    IN p_fecha DATETIME,
    IN p_id_proveedor INT,
    IN p_total_orden DOUBLE,
    IN p_id_estado_ordencompra INT,
    IN p_id_usuario INT,
    IN p_ordencompra_detalle JSON,
    OUT p_codigo_resultado INT,
    OUT p_mensaje_resultado VARCHAR(255)
)
BEGIN

    DECLARE i INT DEFAULT 0;
    DECLARE detalle_length INT;
    DECLARE producto_id INT;
    DECLARE producto_cantidad INT;
    DECLARE producto_costo_unitario DECIMAL(10, 2);
    DECLARE producto_subtotal DECIMAL(10, 2);
    DECLARE saldo_anterior DECIMAL(10, 2);
    DECLARE saldo_actual DECIMAL(10, 2);
    DECLARE diferencia INT;

    -- Inicializar valores de retorno
    SET p_codigo_resultado = 0;
    SET p_mensaje_resultado = 'Orden de Compra ingresada exitosamente';

    -- Actualizar la tabla ordencompra
    UPDATE ordencompra
    SET fecha = p_fecha,
        id_proveedor = p_id_proveedor,
        total_orden = p_total_orden,
        id_estado_ordencompra = p_id_estado_ordencompra, -- El estado cambia a 3 ("Recibida")
        id_usuario = p_id_usuario
    WHERE id_empresa = p_id_empresa
      AND id_ordencompra = p_id_ordencompra;

    -- Eliminar los registros existentes en ordencompra_detalle para esta orden de compra
    DELETE FROM ordencompra_detalle
    WHERE id_empresa = p_id_empresa
      AND id_ordencompra = p_id_ordencompra;

    -- Obtener la cantidad de elementos en el JSON
    SET detalle_length = JSON_LENGTH(p_ordencompra_detalle);

    -- Loop para insertar los nuevos registros en la tabla ordencompra_detalle
    WHILE i < detalle_length DO
        -- Obtener los valores del JSON
        SET producto_id = JSON_EXTRACT(p_ordencompra_detalle, CONCAT('$[', i, '].id_producto'));
        SET producto_cantidad = JSON_EXTRACT(p_ordencompra_detalle, CONCAT('$[', i, '].cantidad'));
        SET producto_costo_unitario = JSON_EXTRACT(p_ordencompra_detalle, CONCAT('$[', i, '].costo_unitario'));
        SET producto_subtotal = JSON_EXTRACT(p_ordencompra_detalle, CONCAT('$[', i, '].subtotal'));

        -- Insertar en la tabla ordencompra_detalle
        INSERT INTO ordencompra_detalle (id_empresa, id_ordencompra, id_producto, partida, cantidad, costo_unitario, subtotal)
        VALUES (p_id_empresa, p_id_ordencompra, i + 1, producto_id, producto_cantidad, producto_costo_unitario, producto_subtotal);

		-- Si el estado es recibida
		IF p_id_estado_ordencompra = 2 THEN
			-- Obtener el saldo anterior
			SELECT cantidad INTO saldo_anterior
			FROM existencias
			WHERE id_empresa = p_id_empresa
			  AND id_producto = producto_id;

			-- Calcular la diferencia entre la cantidad anterior y la nueva cantidad
			-- SET diferencia = producto_cantidad - saldo_anterior;

			-- Actualizar la existencia del producto
			UPDATE existencias
			SET cantidad = cantidad + producto_cantidad -- diferencia
			WHERE id_empresa = p_id_empresa
			  AND id_producto = producto_id;

			-- Calcular el saldo actual
			SET saldo_actual = saldo_anterior + producto_cantidad; -- diferencia;

			-- Insertar en la tabla kardex
			INSERT INTO kardex (id_empresa, id_producto, fecha_movimiento, id_tipo_movimiento, cantidad, costo_unitario,
								 referencia_documento, saldo_anterior, saldo_actual, id_usuario)
			VALUES (p_id_empresa, producto_id, p_fecha, 1, diferencia, producto_costo_unitario,
					CONCAT('Orden de compra #', p_id_ordencompra), saldo_anterior, saldo_actual, p_id_usuario);
                    
		END IF;

        SET i = i + 1;
    END WHILE;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putOrdenDeCompraRecibo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putOrdenDeCompraRecibo`(
    IN p_id_empresa INT,
    IN p_id_ordencompra INT,
    IN p_id_usuario INT,
    OUT p_codigo_resultado INT,
    OUT p_mensaje_resultado VARCHAR(255)    
)
BEGIN
	DECLARE detalle_length INT;
    DECLARE i INT DEFAULT 0;
	DECLARE producto_id INT;
    DECLARE producto_cantidad INT;
    DECLARE producto_costo_unitario DECIMAL(10, 2);
    DECLARE producto_subtotal DECIMAL(10, 2);
    DECLARE saldo_anterior DECIMAL(10, 2);
    DECLARE saldo_actual DECIMAL(10, 2);
    DECLARE diferencia INT;
    DECLARE fecha datetime default current_date();
    DECLARE id_proveedor INT;
    
    -- Inicializar valores de retorno
    SET p_codigo_resultado = 0;
    SET p_mensaje_resultado = '';

	IF EXISTS(
		SELECT 1
        FROM ordencompra OC 
        WHERE OC.id_empresa = p_id_empresa AND OC.id_ordencompra = p_id_ordencompra AND id_estado_ordencompra <> 1
    ) THEN
		SET p_codigo_resultado = 1;
        SET p_mensaje_resultado = 'La orden de compra debe estar en estatus pendiente para poder ingresar la al almacén';
        
	ELSE
		-- Actualizar la tabla ordencompra
		UPDATE ordencompra
		SET fecha = fecha,			
			id_estado_ordencompra = 2, -- El estado cambia a 2 ("Recibida")
			id_usuario = p_id_usuario
		WHERE id_empresa = p_id_empresa AND id_ordencompra = p_id_ordencompra;
        
        -- Obtengo el id_proveedor de la orden de compra
        SELECT OC.id_proveedor INTO id_proveedor
        FROM ordencompra OC
        WHERE OC.id_empresa = p_id_empresa AND OC.id_ordencompra = p_id_ordencompra;
     
        -- Obtener la cantidad de elementos en la tabla ordencompra_detalle
        SELECT COUNT(*) INTO detalle_length
        FROM ordencompra_detalle OD
        WHERE OD.id_empresa = p_id_empresa AND OD.id_ordencompra = p_id_ordencompra;
        
		-- Loop para insertar los nuevos registros en la tabla ordencompra_detalle
		WHILE i < detalle_length DO

			SELECT id_producto, cantidad, costo_unitario, subtotal
				INTO producto_id, producto_cantidad, producto_costo_unitario, producto_subtotal
            FROM ordencompra_detalle OCD
            WHERE OCD.id_empresa = p_id_empresa AND OCD.id_ordencompra = p_id_ordencompra AND OCD.partida = (i + 1);	

			-- Obtener el saldo anterior
			SELECT cantidad INTO saldo_anterior
			FROM existencias
			WHERE id_empresa = p_id_empresa AND id_producto = producto_id;

			IF saldo_anterior IS NULL THEN
                SET saldo_anterior = 0;
                
                INSERT INTO existencias (id_empresa, id_producto, cantidad)
                VALUES (p_id_empresa, producto_id, 0);
            END IF;
            
			-- Calcular la diferencia entre la cantidad recibida y el saldo anterior
            SET diferencia = producto_cantidad; --  No necesitas restar el saldo anterior, solo la cantidad recibida

			-- Actualizar la existencia del producto
			UPDATE existencias
			SET cantidad = cantidad + producto_cantidad -- diferencia
			WHERE id_empresa = p_id_empresa AND id_producto = producto_id;

			-- Calcular el saldo actual
			SET saldo_actual = saldo_anterior + producto_cantidad; -- diferencia;

			-- Insertar en la tabla kardex
			INSERT INTO kardex (id_empresa, id_producto, fecha_movimiento, id_tipo_movimiento, cantidad, costo_unitario, referencia_documento, saldo_anterior, saldo_actual, id_usuario, id_proveedor)
			VALUES (p_id_empresa, producto_id, fecha, 1, diferencia, producto_costo_unitario,
					p_id_ordencompra, saldo_anterior, saldo_actual, p_id_usuario, id_proveedor);
						
			SET i = i + 1;
		END WHILE;        
		SET p_codigo_resultado = 0;
        SET p_mensaje_resultado = 'La orden de compra fue ingresada correctamente al almacén';
    
	END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putPedidoEstatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putPedidoEstatus`(
	IN prm_id_empresa BIGINT,
    IN prm_id_pedido BIGINT,
    IN prm_id_pedido_estatus INT
)
BEGIN

	UPDATE pedidos SET id_pedido_estatus = prm_id_pedido_estatus WHERE id_empresa = prm_id_empresa AND id_pedido = prm_id_pedido;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putRevisaDireccionPorDefecto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putRevisaDireccionPorDefecto`(
	prm_id_empresa INT,
    prm_id_direccion_tipo_identidad INT,
    prm_identidad INT,
    prm_id_direccion INT,
    prm_direccion_por_defecto BIT
)
BEGIN
	DECLARE cantidadPorDefecto SMALLINT;
    
	/*Si es verdadera entonces pongo las demás en false*/
	IF prm_direccion_por_defecto = true THEN
		UPDATE direcciones SET direccion_por_defecto = FALSE
        WHERE 	id_empresa = prm_id_empresa AND 
				id_direccion_tipo_identidad = prm_id_direccion_tipo_identidad  AND 
                identidad = prm_identidad AND
                id_direccion <> prm_id_direccion;
    END IF;
    
    /*Si no hay verdaderas entonces la que se esta modificando la pongo en true*/
	IF prm_direccion_por_defecto = false THEN
    
		IF EXISTS(
			SELECT IFNULL(COUNT(*), 0) > 0
			FROM direcciones
			WHERE 	id_empresa = prm_id_empresa AND 
					id_direccion_tipo_identidad = prm_id_direccion_tipo_identidad  AND 
					identidad = prm_identidad AND
					direccion_por_defecto = TRUE
        ) THEN         

			UPDATE direcciones SET direccion_por_defecto = TRUE
			WHERE 	id_empresa = prm_id_empresa AND 
					id_direccion_tipo_identidad = prm_id_direccion_tipo_identidad  AND 
					identidad = prm_identidad AND
					id_direccion = prm_id_direccion;
		END IF;

                        
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `putUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putUsuario`(
	prm_id_empresa INT,
    prm_id_usuario INT,
    prm_nombre VARCHAR(90),
    prm_apellidos VARCHAR(90),
    prm_celular VARCHAR(90),
    prm_fecha_nacimiento DATE
)
BEGIN
	UPDATE usuarios
		SET nombre = prm_nombre,
			apellidos = prm_apellidos,
            celular = prm_celular,
            fecha_nacimiento = prm_fecha_nacimiento
	WHERE id_empresa = prm_id_empresa AND id_usuario = prm_id_usuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `testing_Categorias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `testing_Categorias`()
BEGIN
	SELECT * FROM categorias;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-03  7:06:42
