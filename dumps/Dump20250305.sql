-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (x86_64)
--
-- Host: 206.130.120.129    Database: crm
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

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
  `id_empresa` int NOT NULL,
  `id_agenda` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `id_cliente` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_agenda_estatus` smallint DEFAULT NULL,
  `id_jornada` int DEFAULT NULL,
  `clave_confirmacion` varchar(6) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_agenda`),
  UNIQUE KEY `idx_empresa_clave` (`id_empresa`,`clave_confirmacion`),
  KEY `idx_empresa_cliente` (`id_empresa`,`id_cliente`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda`
--

LOCK TABLES `agenda` WRITE;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
INSERT INTO `agenda` VALUES (1,5,'2025-03-04','13:00:00','13:30:00',1,NULL,2,2,'DITWWA'),(1,4,'2025-03-04','12:30:00','13:00:00',1,NULL,2,2,'W9VCFA'),(1,3,'2025-03-04','12:00:00','12:30:00',1,NULL,2,2,'1NUCDW'),(1,2,'2025-03-04','11:30:00','12:00:00',1,NULL,2,2,'KOVVI3'),(1,1,'2025-03-04','11:00:00','11:30:00',1,NULL,2,2,'CGNUDJ');
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agenda_estatus`
--

DROP TABLE IF EXISTS `agenda_estatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda_estatus` (
  `id_agenda_estatus` smallint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(80) CHARACTER SET latin1 COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_agenda_estatus`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda_estatus`
--

LOCK TABLES `agenda_estatus` WRITE;
/*!40000 ALTER TABLE `agenda_estatus` DISABLE KEYS */;
INSERT INTO `agenda_estatus` VALUES (1,'Disponible'),(2,'Reservada'),(3,'Confirmada'),(4,'Cancelada');
/*!40000 ALTER TABLE `agenda_estatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id_empresa` bigint NOT NULL,
  `id_blog` bigint NOT NULL AUTO_INCREMENT,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `titulo` text COLLATE latin1_spanish_ci NOT NULL,
  `contenido` text COLLATE latin1_spanish_ci NOT NULL,
  `activo` bit(1) NOT NULL,
  `id_producto` bigint NOT NULL,
  `image1` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `id_usuario` bigint NOT NULL,
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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint NOT NULL,
  `nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `descripcion` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `imagen` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `activo` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_categoria`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,1,'Del Mar','Filete tilapia, Salmón, Camarones.','https://res.cloudinary.com/ddhxa9igj/image/upload/v1721875358/nir/1_cat_1.jpg','2023-12-10 00:00:00','2024-07-25 04:06:56',0),(9,1,'Testing 3','Testing 3','','2024-07-13 03:39:42','2024-07-13 03:39:42',2),(2,1,'Pollo','Boneless, Pechuga Agrosuper (sin piel), Milanesa CORDON BLUEA, Piernas KFC.','https://res.cloudinary.com/ddhxa9igj/image/upload/v1721880979/nir/1_cat_2.jpg','2023-12-10 00:00:00','2024-07-25 04:16:19',1),(8,1,'Testing 2','Testing 2','','2024-07-13 03:36:26','2024-07-13 03:36:26',1),(3,1,'Vegetales','Aros de cebolla, Papa frita','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245584/nir/papasyaros_nt79jw.jpg','2023-12-10 00:00:00','2023-12-10 00:00:00',1),(4,1,'Puerco','Tocino','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245824/nir/tocino_jhkilr.jpg','2023-12-10 00:00:00','2023-12-10 00:00:00',1),(5,1,'Lacteos','Leche, Quesos',NULL,'2024-07-04 00:00:00','2024-07-05 17:31:58',0),(6,1,'Mascotas','Croquetas perros y gatos',NULL,'2024-07-04 00:00:00','2024-07-05 17:31:58',0),(7,1,'Testing','Testing',NULL,'2024-07-05 18:13:27','2024-07-05 18:13:27',0);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_empresa` bigint NOT NULL,
  `id_cliente` bigint NOT NULL AUTO_INCREMENT,
  `no_cliente` varchar(20) COLLATE latin1_spanish_ci DEFAULT NULL,
  `empresa` varchar(200) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `nombre` varchar(200) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `telefonos` varchar(90) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `celulares` varchar(90) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `fecha_ultima_visita` datetime DEFAULT NULL,
  `fecha_ultima_compra` datetime DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_cliente`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,1,NULL,'HostRegio','Roberto Vázquez Hasting','818.252.2653','818.252.2653',NULL,NULL),(1,2,NULL,'Ferreteria La Moderna','Roberto Vázquez Hastings','818.252.2653','818.252.2653',NULL,NULL),(1,3,NULL,'Aceros Monterrey','Roberto Vázquez Hastings','818.252.2653','818.252.2653',NULL,NULL),(1,4,NULL,'Diseños y Construcciones Alfa','Roberto Vázquez Hastings','818.252.2653','818.252.2653',NULL,NULL);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion_tipo_identidad`
--

DROP TABLE IF EXISTS `direccion_tipo_identidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direccion_tipo_identidad` (
  `id_direccion_tipo_identidad` smallint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id_direccion_tipo_identidad`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion_tipo_identidad`
--

LOCK TABLES `direccion_tipo_identidad` WRITE;
/*!40000 ALTER TABLE `direccion_tipo_identidad` DISABLE KEYS */;
INSERT INTO `direccion_tipo_identidad` VALUES (1,'Usuario'),(2,'Proveedor'),(3,'Cliente');
/*!40000 ALTER TABLE `direccion_tipo_identidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones` (
  `id_direccion` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint NOT NULL,
  `id_direccion_tipo_identidad` int NOT NULL,
  `identidad` bigint NOT NULL,
  `direccion_por_defecto` bit(1) DEFAULT b'0',
  `direccion` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `calle` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `numero` varchar(20) COLLATE latin1_spanish_ci DEFAULT NULL,
  `colonia` varchar(200) CHARACTER SET latin1 COLLATE latin1_spanish_ci DEFAULT NULL,
  `ciudad` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `estado` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `pais` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `codigo_postal` varchar(10) COLLATE latin1_spanish_ci DEFAULT NULL,
  `latitud` double DEFAULT NULL,
  `longitud` double DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `telefonos` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  KEY `id_empresa` (`id_empresa`,`id_direccion_tipo_identidad`,`id_direccion`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (1,1,1,1,_binary '','Privada del Estanque 135, Fracc. Palmas Diamante. San Nicolás de los Garza, N.L.','Del Estanque','135','Fracc. Santa Fe','San Nicolas de los Garza','Nuevo León','México','66478',25.74056981864586,-100.22697930417417,'2023-12-10 00:00:00','2023-12-10 00:00:00','818.252.2653'),(1,2,1,1,_binary '','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','Lorem ipsum','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','Lorem',NULL,NULL,'2024-11-12 03:55:48','2024-11-12 03:55:48',NULL);
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id_empresa` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(300) COLLATE latin1_spanish_ci NOT NULL,
  `logo` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `host` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'Congelados NIR','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702230600/nir/LogoNIR_fd22wq.png',NULL),(2,'hostregio','',NULL);
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formas_de_pago`
--

DROP TABLE IF EXISTS `formas_de_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formas_de_pago` (
  `id_empresa` bigint NOT NULL,
  `id_forma_de_pago` smallint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `informacion_adicional` varchar(200) CHARACTER SET latin1 COLLATE latin1_spanish_ci DEFAULT NULL,
  `activo` tinyint NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_forma_de_pago`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formas_de_pago`
--

LOCK TABLES `formas_de_pago` WRITE;
/*!40000 ALTER TABLE `formas_de_pago` DISABLE KEYS */;
INSERT INTO `formas_de_pago` VALUES (1,1,'Efectivo - contra entrega','',1),(1,2,'Tarjeta Débito/Crédito - contra entrega','',1),(1,3,'Depósito','Cuenta:1243',1),(1,4,'Transferencia','Clabe Interbancaria: 123456',1),(1,5,'Pago en línea','',1),(1,6,'Línea de crédito','$6000',1),(2,3,'Depósito','',1),(2,2,'Tarjeta Débito/Crédito - contra entrega','',0),(2,1,'Efectivo - contra entrega','',1),(2,4,'Transferencia','',1),(2,5,'Pago en línea','',0),(2,6,'Línea de crédito','',0);
/*!40000 ALTER TABLE `formas_de_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geo_localizacion`
--

DROP TABLE IF EXISTS `geo_localizacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `geo_localizacion` (
  `id_empresa` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  `fecha` varchar(8) COLLATE latin1_spanish_ci NOT NULL,
  `id_localidad` int NOT NULL,
  `hora` varchar(8) COLLATE latin1_spanish_ci DEFAULT NULL,
  `latitud` varchar(20) COLLATE latin1_spanish_ci DEFAULT NULL,
  `longitud` varchar(20) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_usuario`,`fecha`,`id_localidad`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geo_localizacion`
--

LOCK TABLES `geo_localizacion` WRITE;
/*!40000 ALTER TABLE `geo_localizacion` DISABLE KEYS */;
INSERT INTO `geo_localizacion` VALUES (1,1,'20241015',12,'21:41:14',NULL,NULL),(1,1,'20241015',13,'21:59:26',NULL,NULL),(1,1,'20241015',14,'22:14:32',NULL,NULL),(1,1,'20241015',15,'22:29:37',NULL,NULL),(1,1,'20241015',16,'22:44:41',NULL,NULL),(1,1,'20241015',17,'22:59:45',NULL,NULL);
/*!40000 ALTER TABLE `geo_localizacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hosts`
--

DROP TABLE IF EXISTS `hosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hosts` (
  `host` varchar(200) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `id_empresa` int NOT NULL,
  PRIMARY KEY (`host`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hosts`
--

LOCK TABLES `hosts` WRITE;
/*!40000 ALTER TABLE `hosts` DISABLE KEYS */;
INSERT INTO `hosts` VALUES ('localhost',1);
/*!40000 ALTER TABLE `hosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jornada_laboral`
--

DROP TABLE IF EXISTS `jornada_laboral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jornada_laboral` (
  `id_empresa` bigint NOT NULL,
  `id_jornada` int unsigned NOT NULL AUTO_INCREMENT,
  `dia_semana` smallint DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_jornada`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jornada_laboral`
--

LOCK TABLES `jornada_laboral` WRITE;
/*!40000 ALTER TABLE `jornada_laboral` DISABLE KEYS */;
INSERT INTO `jornada_laboral` VALUES (1,1,0,'11:00:00','20:00:00'),(1,2,1,'11:00:00','20:00:00'),(1,3,2,'11:00:00','20:00:00'),(1,4,3,'11:00:00','20:00:00'),(1,5,4,'11:00:00','20:00:00'),(1,6,5,'11:00:00','20:00:00'),(1,7,6,'11:00:00','20:00:00');
/*!40000 ALTER TABLE `jornada_laboral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `landingPage`
--

DROP TABLE IF EXISTS `landingPage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `landingPage` (
  `id_empresa` bigint NOT NULL,
  `id_landingPage` bigint NOT NULL AUTO_INCREMENT,
  `quienes_somos` varchar(800) COLLATE latin1_spanish_ci DEFAULT NULL,
  `servicios` varchar(800) COLLATE latin1_spanish_ci DEFAULT NULL,
  `productos` varchar(800) COLLATE latin1_spanish_ci DEFAULT NULL,
  `mostrar_quienes_somos` tinyint DEFAULT NULL,
  `mostrar_productos` tinyint DEFAULT NULL,
  `mostrar_productos_verMas` tinyint DEFAULT NULL,
  `mostrar_servicios` tinyint DEFAULT NULL,
  `mostrar_contactanos` tinyint DEFAULT NULL,
  `mostrar_sitioEnMantenimiento` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_landingPage`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `landingPage`
--

LOCK TABLES `landingPage` WRITE;
/*!40000 ALTER TABLE `landingPage` DISABLE KEYS */;
INSERT INTO `landingPage` VALUES (1,1,'<p>Somos una empresa de alimentos congelados dede 2023.</p><p>Nos <strong>especializamos</strong> en los siguientes congelados:</p><ol><li>Pescado</li><li>Camaron</li><li>Papas</li></ol><p>Nuestro producto de mayor demanda: <u style=\"background-color: rgb(243, 243, 243);\">Boneles</u></p>','<p>Services</p><ol><li>One</li><br></ol>','<p>Productos</p><ol><li>Pescado</li><li>Pollo</li><br></ol>',1,1,1,0,0,1),(2,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',1,1,1,1,1,1);
/*!40000 ALTER TABLE `landingPage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_estatus`
--

DROP TABLE IF EXISTS `pedido_estatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_estatus` (
  `id_empresa` bigint NOT NULL,
  `id_pedido_estatus` smallint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `orden` smallint NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_pedido_estatus`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_estatus`
--

LOCK TABLES `pedido_estatus` WRITE;
/*!40000 ALTER TABLE `pedido_estatus` DISABLE KEYS */;
INSERT INTO `pedido_estatus` VALUES (1,1,'Recibido',0),(1,2,'En proceso',1),(1,3,'Terminado',2),(1,4,'En camino',3),(1,5,'Entregado',4),(2,5,'Entregado',4),(2,4,'En camino',3),(2,3,'Terminado',2),(2,2,'En proceso',1),(2,1,'Recibido',0);
/*!40000 ALTER TABLE `pedido_estatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_empresa` bigint NOT NULL,
  `id_pedido` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint NOT NULL,
  `id_cliente` bigint NOT NULL,
  `id_direccion` bigint NOT NULL,
  `id_pedido_estatus` smallint NOT NULL,
  `id_forma_de_pago` smallint NOT NULL,
  `total` double NOT NULL,
  `importe_pagado` double DEFAULT NULL,
  `saldo` double NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
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
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos_detalle`
--

DROP TABLE IF EXISTS `pedidos_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos_detalle` (
  `id_empresa` bigint NOT NULL,
  `id_pedido_detalle` bigint NOT NULL AUTO_INCREMENT,
  `id_pedido` bigint NOT NULL,
  `id_producto` bigint NOT NULL,
  `cantidad` int NOT NULL,
  `subtotal` double NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_pedido`,`id_pedido_detalle`),
  KEY `id_empresa` (`id_empresa`,`id_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_detalle`
--

LOCK TABLES `pedidos_detalle` WRITE;
/*!40000 ALTER TABLE `pedidos_detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint NOT NULL,
  `nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `descripcion` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `id_proveedor` bigint NOT NULL,
  `id_categoria` bigint NOT NULL,
  `precio` double DEFAULT '0',
  `precio_promocion` double DEFAULT '0',
  `costo` double DEFAULT '0',
  `image1` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `image2` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `image3` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `existencia` int DEFAULT '0',
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  `sku` varchar(20) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_producto`),
  KEY `id_empresa` (`id_empresa`,`id_categoria`),
  KEY `id_empresa_2` (`id_empresa`,`id_proveedor`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,1,'Caja de Filete tilapia','Caja de Filete Tilapia, contiene 4.5 KG aprox.',1,1,260,250,200,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245043/nir/filete_tilapia_lkscvm.webp','https://fiestatijuana.mx/image-not-available.png','https://fiestatijuana.mx/image-not-available.png',1,'2024-07-27 17:07:56','2024-07-27 17:07:56',1,''),(2,1,'Caja de Filete tilapia','Bolsa de Filete Tilapia, contiene 4 piezas.',1,1,80,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245043/nir/filete_tilapia_lkscvm.webp','https://fiestatijuana.mx/image-not-available.png','https://fiestatijuana.mx/image-not-available.png',2,'2024-07-27 18:21:05','2024-07-27 18:21:05',1,''),(3,1,'Camarón comptelero','Bolsa de Camarón comptelero.',1,1,150,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702249673/nir/camaron_coctelero_dtxd4d.jpg','https://fiestatijuana.mx/image-not-available.png','https://fiestatijuana.mx/image-not-available.png',5,'2024-07-27 18:21:32','2024-07-27 18:21:32',1,''),(4,1,'Boneless','Bolsa de Boneless 1 KG.',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253038/nir/boneless-natural_lmtjzy.png',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(5,1,'Pechuga agrosuper','Pechuga agrosuper natural sin piel. Contiene 4 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245261/nir/pechuga_agrosuper_l9tn8n.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(6,1,'Milenesa Cordon Bleu','Milanesa Cordon Bleu. Bolsa con 7 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253266/nir/cordon-bleu_egaz5t.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(7,1,'Pierna de pollo KFC','Pierna de pollo KFC. Bolsa con 10 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702268973/nir/pierna-kfc_edgehq.png',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(8,1,'Aros de cebolla','Bolsa de aros de cebolla.',1,3,150,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253406/nir/aros-cebolla_dx53ek.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(9,1,'Papa a la francesa','Bolsa de papas a la francesa',1,3,100,1.5,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253552/nir/papas-a-la-francesa_vgywg5.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(10,1,'Tocino','Paquete de Tocino Big Buy 453 GR.',1,4,100,1.5,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253721/nir/tocino-big-buy_as4eom.webp',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id_empresa` bigint NOT NULL,
  `id_proveedor` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) COLLATE latin1_spanish_ci NOT NULL,
  `contacto1` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `contacto2` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `telefono1` varchar(20) COLLATE latin1_spanish_ci DEFAULT NULL,
  `telefono2` varchar(20) COLLATE latin1_spanish_ci DEFAULT NULL,
  `email1` varchar(180) COLLATE latin1_spanish_ci DEFAULT NULL,
  `email2` varchar(180) COLLATE latin1_spanish_ci DEFAULT NULL,
  `horario` varchar(180) COLLATE latin1_spanish_ci DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_actualizacion` datetime DEFAULT NULL,
  `activo` tinyint DEFAULT NULL,
  `whatsapp` varchar(20) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_proveedor`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,1,'Agrowings','Liz','','8182522653','8110170557','rob.hst@gmail.com','nelly_oyervides@icloud.com','L-V 9:00 A 6:00 PM',NULL,NULL,1,'8182522653'),(1,2,'Disponible','Disponible','','','','','','',NULL,NULL,0,'');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider` (
  `id_provider` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE latin1_spanish_ci DEFAULT NULL,
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
  `id_puntoDeEntrega` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint NOT NULL,
  `nombre` varchar(200) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `horario` varchar(600) CHARACTER SET latin1 COLLATE latin1_spanish_ci DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_actualizacion` datetime DEFAULT NULL,
  `activo` tinyint DEFAULT NULL,
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
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(90) COLLATE latin1_spanish_ci NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'master','2023-12-10 00:00:00','2023-12-10 00:00:00'),(2,'admin','2023-12-10 00:00:00','2023-12-10 00:00:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint NOT NULL,
  `email` varchar(180) COLLATE latin1_spanish_ci NOT NULL,
  `nombre` varchar(90) COLLATE latin1_spanish_ci NOT NULL,
  `apellidos` varchar(90) COLLATE latin1_spanish_ci NOT NULL,
  `celular` varchar(90) COLLATE latin1_spanish_ci NOT NULL,
  `imagen` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `password` varchar(90) COLLATE latin1_spanish_ci NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `fecha_ultimo_acceso` datetime DEFAULT NULL,
  `id_provider` varchar(45) COLLATE latin1_spanish_ci DEFAULT NULL,
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
INSERT INTO `usuarios` VALUES (1,1,'rob.hst@gmail.com','Roberto','Vázquez Hastings','818.252.2653',NULL,'$2b$08$DuJlVb7GckLTD6XXICNxBu9.BT1.7VBL/kl0zXvbn074L9J5ylDX6','2023-12-10 00:00:00','2023-12-10 00:00:00','2024-03-30 23:41:28',NULL,NULL),(1,2,'rob.hst@gmail.com','Roberto','Vázquez Hastings','818.252.2653',NULL,'$2b$08$DuJlVb7GckLTD6XXICNxBu9.BT1.7VBL/kl0zXvbn074L9J5ylDX6','2024-11-12 03:55:48','2024-11-12 03:55:48',NULL,NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_roles`
--

DROP TABLE IF EXISTS `usuarios_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_roles` (
  `id_empresa` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  `id_rol` bigint NOT NULL,
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
INSERT INTO `usuarios_roles` VALUES (1,1,1,'2023-12-10 00:00:00','2023-12-10 00:00:00'),(2,1,2,'2024-11-12 03:55:48','2024-11-12 03:55:48');
/*!40000 ALTER TABLE `usuarios_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitas`
--

DROP TABLE IF EXISTS `visitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitas` (
  `id_empresa` bigint NOT NULL,
  `id_visita` bigint NOT NULL AUTO_INCREMENT,
  `id_cliente` bigint NOT NULL,
  `id_usuario` bigint DEFAULT NULL,
  `nombre` varchar(90) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `comentarios` varchar(800) CHARACTER SET latin1 COLLATE latin1_spanish_ci DEFAULT NULL,
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
INSERT INTO `visitas` VALUES (1,1,1,1,'Miguel Sanchez.','Se levantó pedido.','2024-08-30 06:01:00','2024-09-01 13:22:45',25.740308,-100.2269586),(1,2,2,1,'Nelly Oyervides Treviño.','compro 1 pieza de llantas automotriz.','2024-09-07 05:23:34','2024-09-09 05:11:02',25.7403385,-100.2269808),(1,3,1,1,'Ian Roberto','info','2024-09-07 05:25:52','2024-09-09 02:35:35',25.7403385,-100.2269808),(1,4,3,1,'Ian Roberto ','Cotización.','2024-09-09 01:51:10','2024-09-09 02:34:54',25.7403385,-100.2269808),(1,5,4,1,'Julio Vazquez','Cotizacion enviada','2024-09-09 02:17:47','2024-09-09 02:33:50',25.7403385,-100.2269808),(1,6,3,1,'Nelly','Cotizo empaques','2024-09-09 02:27:17','2024-09-09 02:33:03',25.7403385,-100.2269808),(1,7,1,1,'Roberto Vazquez Hastings.','Cotización de llantas automotriz auto compacto.','2024-09-09 02:35:51','2024-09-09 05:02:51',25.7403256,-100.226974),(1,8,3,1,'Nelly Oyervides','Cotizacion de neumáticos.','2024-09-09 02:37:44','2024-09-08 08:38:34',25.7403221,-100.2269708),(1,9,2,1,'Test','Test','2024-09-09 05:07:33',NULL,25.7402902,-100.2269464),(1,10,2,1,'Gustavo Martínez ','Cotización de herramientas ferretería pendite por enviar....','2024-09-09 05:11:14','2024-09-09 05:12:42',25.7402925,-100.226939);
/*!40000 ALTER TABLE `visitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whatsapp_frases`
--

DROP TABLE IF EXISTS `whatsapp_frases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `whatsapp_frases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `frase` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `respuesta` text COLLATE latin1_spanish_ci,
  `funcion` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `id_frase_categoria` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_frase` (`frase`),
  KEY `idx_id_frase_categoria` (`id_frase_categoria`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whatsapp_frases`
--

LOCK TABLES `whatsapp_frases` WRITE;
/*!40000 ALTER TABLE `whatsapp_frases` DISABLE KEYS */;
INSERT INTO `whatsapp_frases` VALUES (1,'hola','¡Hola! Para ver nuestro menú de opciones escribe: Menú','MessageText',1),(2,'buen dia','¡Buen día! Para ver nuestro menú de opciones escribe: Menú','MessageText',1),(3,'muy amable','¡De nada! Estamos para servirte.','MessageText',1),(4,'saludos','¡Hola! Para ver nuestro menú de opciones escribe: Menú','MessageText',1),(5,'buenos dias','¡Buenos dias! Para ver nuestro menú de opciones escribe: Menú','MessageText',1),(6,'buenas tardes','¡Buenos tardes! Para ver nuestro menú de opciones escribe: Menú','MessageText',1),(7,'buenas noches','¡Buenos noches! Para ver nuestro menú de opciones escribe: Menú','MessageText',1),(8,'como estas','Muy bien gracias por preguntar y ¿Tú como estas?','MessageText',1),(9,'que tal','Muy bien gracias por preguntar y ¿Tú que tal?','MessageText',1),(10,'bien gracias','¡Me alegro!','MessageText',1),(11,'gracias','¡De nada! Estamos para servirte.','MessageText',1),(12,'muchas gracias','¡De nada! Estamos para servirte.','MessageText',1),(13,'ubicacion','Esta es nuestra ubicación','MessageLocation',2),(14,'direccion','Esta es nuestra ubicación','MessageLocation',2),(15,'donde estan ubicados','Esta es nuestra ubicación','MessageLocation',2),(16,'como llegar','Esta es nuestra ubicación','MessageLocation',2),(17,'como llego','Esta es nuestra ubicación','MessageLocation',2),(18,'ubicar','Esta es nuestra ubicación','MessageLocation',2),(19,'contacto','Nos puedes contactar por','MessageText',3),(20,'dejar un mensaje','En seguida escribe tu mensaje con tu nombre y número de contacto para poder contactarte a la brevedad posible','MessageTextDejarUnMensaje',3),(21,'me pueden contactar','¡Por supuesto! Por favor escribe tu nombre y tu número de celular o whatsapp para ponernos en contacto contigo a la brevedad posible','MessageTextDejarUnMensaje',3),(22,'menu','Este es nuestro menú de opciones','MessageMenu',4),(23,'me puedes ayudar','¡Por supuesto! Este es nuestro menú de opciones','MessageMenu',4),(24,'necesito ayuda','¡Por supuesto! Este es nuestro menú de opciones','MessageMenu',4),(25,'ayuda','¡Por supuesto! Este es nuestro menú de opciones','MessageMenu',4),(26,'help','¡Por supuesto! Este es nuestro menú de opciones','MessageMenu',4),(27,'puedes ayudarme','¡Por supuesto! Este es nuestro menú de opciones','MessageMenu',4),(28,'me ayudas','¡Por supuesto! Este es nuestro menú de opciones','MessageMenu',4),(29,'ayudame','¡Por supuesto! Este es nuestro menú de opciones','MessageMenu',4),(30,'informacion','¡Por supuesto! Este es nuestro menú de opciones','MessageMenu',4),(31,'comprar','Para hacer una compra, has clic en el siguiente link','MessageLinkComprar',5),(32,'hacer un pedido','Para hacer pedido, has clic en el siguiente link','MessageLinkComprar',5),(33,'ordenar','Para hacer pedido, has clic en el siguiente link','MessageLinkComprar',5),(34,'quisiera ordenar','Para hacer pedido, has clic en el siguiente link','MessageLinkComprar',5),(35,'hacer una orden','Para hacer pedido, has clic en el siguiente link','MessageLinkComprar',5),(36,'ver pedido','¡Por supuesto! sigue el siguiente link para ver tus pedidos','MessageLinkMisPedidos',5),(37,'mis pedido','¡Por supuesto! sigue el siguiente link para ver tus pedidos','MessageLinkMisPedidos',5),(38,'ultimo pedido','¡Por supuesto! sigue el siguiente link para ver tus pedidos','MessageLinkMisPedidos',5),(39,'ultimos pedidos','¡Por supuesto! sigue el siguiente link para ver tus pedidos','MessageLinkMisPedidos',5),(40,'tiempo estimado','Tan pronto realices el pedido o si ya lo hiciste te llegará un mensaje sobre el estatus de tu pedido y con un tiempo aproximado de entrega','MessageText',6),(41,'tiempo envio','Tan pronto realices el pedido o si ya lo hiciste te llegará un mensaje sobre el estatus de tu pedido y con un tiempo aproximado de entrega','MessageText',6),(42,'tarda envio','Tan pronto realices el pedido o si ya lo hiciste te llegará un mensaje sobre el estatus de tu pedido y con un tiempo aproximado de entrega','MessageText',6),(43,'en cuanto tiempo','Tan pronto realices el pedido o si ya lo hiciste te llegará un mensaje sobre el estatus de tu pedido y con un tiempo aproximado de entrega','MessageText',6),(44,'estatus del pedido','Tan pronto realices el pedido o si ya lo hiciste te llegará un mensaje sobre el estatus de tu pedido y con un tiempo aproximado de entrega','MessageText',6),(45,'tarda el pedido','Tan pronto realices el pedido o si ya lo hiciste  te llegará un mensaje sobre el estatus de tu pedido y con un tiempo aproximado de entrega','MessageText',6),(46,'tarda un pedido','Tan pronto realices el pedido o si ya lo hiciste  te llegará un mensaje sobre el estatus de tu pedido y con un tiempo aproximado de entrega','MessageText',6),(47,'productos','Sigue el siguiente link para conocer nuestros productos','MessageLinkProductos',7),(48,'precios','Sigue el siguiente link para conocer los precios de nuestros productos','MessageLinkProductos',7),(49,'servicios','Sigue el siguiente link para conocer nuestros servicios','MessageLinkServicio',8),(50,'metodos de pago','Estos son nuestras formas de pago','MessageLinkFormaDePago',9),(51,'aceptan tarjeta','Estos son nuestras formas de pago','MessageLinkFormaDePago',9),(52,'pago con tarjeta','Estos son nuestras formas de pago','MessageLinkFormaDePago',9),(53,'pago con','Estos son nuestras formas de pago','MessageLinkFormaDePago',9),(54,'pago en','Estos son nuestras formas de pago','MessageLinkFormaDePago',9),(55,'puntos de entrega','¡Por supuesto! sigue el siguiente link para ver nuestros puntos de entrega','MessageLinkPuntosDeEntrega',10),(56,'punto de entrega','¡Por supuesto! sigue el siguiente link para ver nuestros puntos de entrega','MessageLinkPuntosDeEntrega',10),(57,'donde entregas','¡Por supuesto! sigue el siguiente link para ver nuestros puntos de entrega','MessageLinkPuntosDeEntrega',10),(58,'horario','Nuestros horarios son:','MessageTextHorarios',11),(59,'horarios','Nuestros horarios son:','MessageTextHorarios',11),(60,'formas de pago','Estos son nuestras formas de pago:','MessageLinkFormaDePago',9),(61,'forma de pago','Estos son nuestras formas de pago:','MessageLinkFormaDePago',9);
/*!40000 ALTER TABLE `whatsapp_frases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whatsapp_frases_categorias`
--

DROP TABLE IF EXISTS `whatsapp_frases_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `whatsapp_frases_categorias` (
  `id_frase_categoria` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_frase_categoria`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whatsapp_frases_categorias`
--

LOCK TABLES `whatsapp_frases_categorias` WRITE;
/*!40000 ALTER TABLE `whatsapp_frases_categorias` DISABLE KEYS */;
INSERT INTO `whatsapp_frases_categorias` VALUES (1,'Saludos'),(2,'Ubicación'),(3,'Contacto'),(4,'Menú'),(5,'Comprar, hacer un pedido, ordenar'),(6,'Tiempo de entrega'),(7,'Productos'),(8,'Servicios'),(9,'Métodos de pago'),(10,'Puntos de entrega'),(11,'Horarios');
/*!40000 ALTER TABLE `whatsapp_frases_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whatsapp_frases_no_reconocidas`
--

DROP TABLE IF EXISTS `whatsapp_frases_no_reconocidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `whatsapp_frases_no_reconocidas` (
  `id_frase` int NOT NULL AUTO_INCREMENT,
  `frase` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `fecha_hora` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `numero` varchar(45) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_frase`),
  KEY `idx_frase` (`frase`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whatsapp_frases_no_reconocidas`
--

LOCK TABLES `whatsapp_frases_no_reconocidas` WRITE;
/*!40000 ALTER TABLE `whatsapp_frases_no_reconocidas` DISABLE KEYS */;
INSERT INTO `whatsapp_frases_no_reconocidas` VALUES (1,'prueba','2025-02-03 22:05:22','8182522653'),(2,'hola','2025-02-03 22:26:46','528182522653'),(3,'excuse me','2025-02-03 22:39:49','528182522653'),(4,'atencion personalizada','2025-02-15 03:46:28','528182522653');
/*!40000 ALTER TABLE `whatsapp_frases_no_reconocidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whatsapp_usuarios`
--

DROP TABLE IF EXISTS `whatsapp_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `whatsapp_usuarios` (
  `id_empresa` bigint NOT NULL,
  `identidad` bigint NOT NULL AUTO_INCREMENT,
  `numero` bigint NOT NULL,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nombre` text CHARACTER SET latin1 COLLATE latin1_spanish_ci,
  `id_usuario` bigint DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`identidad`),
  KEY `empresa_usurio` (`id_empresa`,`id_usuario`),
  KEY `empresa_numero` (`id_empresa`,`numero`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whatsapp_usuarios`
--

LOCK TABLES `whatsapp_usuarios` WRITE;
/*!40000 ALTER TABLE `whatsapp_usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `whatsapp_usuarios` ENABLE KEYS */;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` FUNCTION `fn_genera_clave_confirmacion`(id_empresa INT) RETURNS varchar(6) CHARSET latin1 COLLATE latin1_spanish_ci
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` FUNCTION `fn_solo_numeros`(cadena VARCHAR(255)
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `deleteAgenda`(
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
/*!50003 DROP PROCEDURE IF EXISTS `getAgendaBuscarCita` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getAgendaBuscarCita`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getAgendaDisponibilidad`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getAgendaPorDia`(
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
    SET duracion_cita = 30;
    
	SELECT JL.hora_inicio, JL.hora_fin, JL.hora_inicio INTO _hora_inicio, _hora_fin, _hora_actual 
	FROM jornada_laboral JL
	WHERE JL.dia_semana = dia_semana;      
    
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
    LEFT JOIN agenda_estatus AE ON AE.id_agenda_estatus = IFNULL(A.id_agenda_estatus, 1)
    LEFT JOIN clientes C ON C.id_empresa = prm_id_empresa AND C.id_cliente = A.id_cliente;
	-- WHERE A.id_agenda IS NULL;
    
	-- Eliminar la tabla temporal (opcional)
	DROP TEMPORARY TABLE intervalos_tiempo;   
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getCategorias`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getClientePorTelefonoOCelular`(
	prm_id_empresa INT,
    prm_celular VARCHAR(20)
)
BEGIN
	DECLARE numero VARCHAR(20) DEFAULT ''; 
    DECLARE nombre_cliente VARCHAR(200) DEFAULT '';
    DECLARE id_cliente INT DEFAULT 0;

	SELECT fn_solo_numeros(prm_celular) into numero;
    -- select numero;

	SELECT C.nombre, C.id_cliente INTO nombre_cliente, id_cliente
    FROM clientes C
    WHERE C.id_empresa = prm_id_empresa AND fn_solo_numeros(C.celulares) = numero
	LIMIT 1;
    
    -- SI NO ENCONTRÉ EL CLIENTE LO BUSCO AHORA POR TELEFONO
    IF nombre_cliente = '' THEN
    
		SELECT C.nombre, C.id_cliente INTO nombre_cliente, id_cliente
		FROM clientes C
		WHERE C.id_empresa = prm_id_empresa AND fn_solo_numeros(C.telefonos) = numero
		LIMIT 1; 
    
    END IF;        
    
    SELECT nombre_cliente, id_cliente;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getClientes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getClientes`(
	p_id_empresa BIGINT
)
BEGIN

	SELECT id_cliente, no_cliente, empresa, nombre, telefonos, celulares, fecha_ultima_visita, fecha_ultima_compra
    FROM clientes;

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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getDirecciones`(
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
/*!50003 DROP PROCEDURE IF EXISTS `getFormasDePago` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getFormasDePago`(
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
/*!50003 DROP PROCEDURE IF EXISTS `getGaleria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getGaleria`(
	IN prm_id_empresa INT
)
BEGIN

	SELECT P.id_producto, P.image1 AS image
	FROM productos P
	WHERE P.id_empresa = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getJornadaLaboral` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getJornadaLaboral`(
	IN p_id_empresa BIGINT,
    IN p_fecha DATE,
    IN p_id_usuario BIGINT
)
BEGIN

	SELECT	id_empresa, fecha, id_usuario, 
			id_jornada_laboral, inicio_jornada, fin_jornada, inicio_comida, fin_comida
    FROM jornada_laboral
    WHERE id_empresa = p_id_empresa AND fecha = p_fecha AND id_usuario = p_id_usuario

    
    UNION ALL
    
    SELECT 	p_id_empresa AS id_empresa, p_fecha AS fecha, p_id_usuario AS id_usuario, 
			0 AS id_jornada_laboral, NULL AS inicio_jornada, NULL AS fin_jornada, NULL AS inicio_comida, NULL AS fin_comida
    WHERE NOT EXISTS (
        SELECT 1 
        FROM jornada_laboral
        WHERE id_empresa = p_id_empresa AND fecha = p_fecha AND id_usuario = p_id_usuario
    );
	
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getLandingPage`(
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
            L.id_empresa,
            L.id_landingPage
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
/*!50003 DROP PROCEDURE IF EXISTS `getProductos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getProductos`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getProductosByCategoria`(
	IN prm_id_empresa INT,
    IN prm_id_categoria INT
)
BEGIN
	SELECT 	P.nombre, P.descripcion, 
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
/*!50003 DROP PROCEDURE IF EXISTS `getProductosListing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getProductosListing`(
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
                IFNULL(P.sku, '') AS sku, P.existencia
		FROM productos P
        INNER JOIN proveedores PR ON PR.id_empresa = P.id_empresa AND PR.id_proveedor = P.id_proveedor
        INNER JOIN categorias C ON C.id_empresa = P.id_empresa AND C.id_categoria = P.id_categoria
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getProveedores`(
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
/*!50003 DROP PROCEDURE IF EXISTS `getPuntosDeEntrega` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getPuntosDeEntrega`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getPuntosDeEntregaCarrito`(
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
/*!50003 DROP PROCEDURE IF EXISTS `getUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getUsuario`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getUsuarioLogin`(
	IN id_empresa BIGINT,
    IN email varchar(180),
    IN password VARCHAR(90)
)
BEGIN
	DECLARE mensaje VARCHAR(200);
    DECLARE status_code INT;
	/*REVISO SI EXISTE PRIMERO EL CORREO*/
    IF NOT EXISTS(
		SELECT 1
		FROM usuarios U
		WHERE U.id_empresa = id_empresa AND U.email = email
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
            INNER JOIN roles R ON /*R.id_empresa = UR.id_empresa AND*/ R.id_rol = UR.id_rol
			WHERE U.id_empresa = id_empresa AND U.email = email /*AND U.password = password*/;
            
		/*END IF;*/
	END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getVisitasByIdUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getVisitasByIdUsuario`(
	p_id_empresa BIGINT,
    p_id_usuario BIGINT
)
BEGIN

	SELECT 	V.id_empresa,	
			V.id_visita, 
            V.id_cliente, 
            V.id_usuario, 
            C.empresa,
            V.nombre, 
            V.comentarios, 
            V.fecha_inicio, 
			CASE WHEN V.fecha_final is null then '' ELSE CAST(V.fecha_final AS CHAR) END AS fecha_final, 
            V.latitud, 
            V.longitud
    FROM visitas V
    INNER JOIN clientes C ON C.id_empresa = V.id_empresa AND C.id_cliente = V.id_cliente
    WHERE V.id_empresa = p_id_empresa AND V.id_usuario = p_id_usuario;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getVisitasByIdUsuarioIdVisita` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getVisitasByIdUsuarioIdVisita`(
	p_id_empresa BIGINT,
    p_id_usuario BIGINT,
    p_id_visita BIGINT
)
BEGIN

	SELECT id_visita, id_cliente, nombre, comentarios, fecha_inicio, fecha_final, latitud, longitud
    FROM visitas
    WHERE 	id_empresa = p_id_empresa AND 
			id_usuario = p_id_usuario AND 
            id_visita = p_id_visita;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getWhatsappFormasDePago` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getWhatsappFormasDePago`(
	IN prm_id_empresa INT
)
BEGIN
	
    SELECT 
		CASE 
			WHEN IFNULL(fp.informacion_adicional, '') <> '' THEN CONCAT(fp.descripcion, ': ', fp.informacion_adicional) 
			ELSE fp.descripcion
		END AS FormasDePago
    FROM formas_de_pago fp
    WHERE fp.id_empresa = prm_id_empresa AND fp.activo = 1;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getwhatsappFrases` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getwhatsappFrases`(
	IN prm_frase varchar(255)
)
BEGIN
    DECLARE respuesta VARCHAR(255);
    DECLARE funcion VARCHAR(255);
    
    IF EXISTS(
		SELECT 1
		FROM whatsapp_frases W
        WHERE prm_frase LIKE CONCAT('%', W.frase, '%')
		LIMIT 1
    ) THEN
		SELECT W.respuesta, W.funcion
		FROM whatsapp_frases W
		WHERE prm_frase LIKE CONCAT('%', W.frase, '%')
		LIMIT 1;
	ELSE
		SELECT 'No entiendo...' AS respuesta, '' AS funcion;
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getWhatsapp_ubicacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `getWhatsapp_ubicacion`(
	IN prm_id_empresa INT
)
BEGIN

    select direccion_por_defecto, direccion, calle, numero, colonia, ciudad, estado, pais, codigo_postal, latitud, longitud, telefonos
    from direcciones d
    where d.id_empresa = prm_id_empresa and id_direccion_tipo_identidad = 1 and direccion_por_defecto = 1 ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `new_procedure`(
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
/*!50003 DROP PROCEDURE IF EXISTS `postAgenda` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postAgenda`(
	IN prm_id_empresa INT,
	IN prm_fecha DATE,
    IN intervalo VARCHAR(20),
    IN prm_id_cliente INT   
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
    
    SET _dia_semana = WEEKDAY(prm_fecha);
    SET _id_agenda_estatus = 2;
    
	SELECT JL.id_jornada INTO _id_jornada
	FROM jornada_laboral JL
	WHERE JL.dia_semana = _dia_semana;  
    
    -- Buscar la posición del separador "-" para obtener la fecha y hora 
	SET separador = LOCATE('-', intervalo);    
    SET _hora_inicio = TIME(SUBSTRING(intervalo, 1, separador - 1));
	SET _hora_fin = TIME(SUBSTRING(intervalo, separador + 2));
    
    -- SELECT _hora_inicio, _hora_fin;
    
    -- Busco si no hay cita reservada
    IF NOT EXISTS(
		SELECT 1
		FROM agenda A
		WHERE A.id_empresa = prm_id_empresa AND A.fecha = prm_fecha AND A.hora_inicio = _hora_inicio AND A.hora_fin = _hora_fin
    ) THEN
		
        -- GENERO CLAVE DE CONFIRMACION
        SET _id_clave_confirmacion = fn_genera_clave_confirmacion(prm_id_empresa);
    
		INSERT INTO agenda (id_empresa, fecha, hora_inicio, hora_fin, id_cliente, id_agenda_estatus, id_jornada, clave_confirmacion) 
			VALUES (prm_id_empresa, prm_fecha, _hora_inicio, _hora_fin, prm_id_cliente, _id_agenda_estatus, _id_jornada, _id_clave_confirmacion);
		SET _id_agenda = LAST_INSERT_ID();
	END IF;
    
    SELECT _id_clave_confirmacion AS folio_confirmacion;		
	
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postAuthProvider`(
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
/*!50003 DROP PROCEDURE IF EXISTS `postCategorias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postCategorias`(
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
/*!50003 DROP PROCEDURE IF EXISTS `postDireccion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postDireccion`(
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
/*!50003 DROP PROCEDURE IF EXISTS `postFrasesWhatsappNoReconocidas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postFrasesWhatsappNoReconocidas`(
	IN prm_frase VARCHAR(255),
    IN prm_numero VARCHAR(45)
)
BEGIN

	INSERT INTO whatsapp_frases_no_reconocidas (frase, numero) VALUES (prm_frase, prm_numero);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postGeoLocalizacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postGeoLocalizacion`(
	IN p_id_empresa BIGINT,
    IN p_id_usuario BIGINT,
    IN p_fecha VARCHAR(8),
    IN p_id_localidad INT,
    IN p_hora VARCHAR(8),
    IN p_latitud VARCHAR(20),
    IN p_longitud VARCHAR(20)
)
BEGIN

	INSERT INTO geo_localizacion (id_empresa, id_usuario, fecha, id_localidad, hora, latitud, longitud)
		VALUES (p_id_empresa, p_id_usuario, p_fecha, p_id_localidad, p_hora, p_latitud, p_longitud);

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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postHost`(
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
    INSERT INTO landingPage (id_empresa, quienes_somos, servicios, productos, mostrar_quienes_somos, mostrar_productos, mostrar_servicios, mostrar_contactanos, mostrar_sitioEnMantenimiento)
		VALUES (idEmpresa, lorem, lorem, lorem, 1, 1, 1, 1, 1);
	-- SELECT 'LANDING PAGE';
    
    /*ALTA DE USUARIO MASTER*/
    INSERT INTO usuarios (id_empresa, email, nombre, apellidos, celular, imagen, password, fecha_nacimiento, fecha_creacion, fecha_actualizacion)
    SELECT idEmpresa, U.email, U.nombre, U.apellidos, U.celular, U.imagen, U.password, U.fecha_nacimiento, current_timestamp(), current_timestamp()
    FROM usuarios U
    WHERE U.id_usuario = 1 AND U.id_empresa = 1;
    
    SET idUsuario = last_insert_id();
    -- SELECT 'USUARIO';
    
    /*ALTA DE DIRECCION*/
    INSERT INTO direcciones (id_empresa, id_direccion_tipo_identidad, identidad, direccion_por_defecto, direccion, calle, numero, colonia, ciudad, estado, pais, codigo_postal, fecha_creacion, fecha_actualizacion)
		VALUES (idEmpresa, 1, 1, 1, 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 
			'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem', current_timestamp(), current_timestamp());
	-- SELECT 'DIRECCION';
        
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
    
    -- AGREGAR EL ROL AL USUARIO 
    INSERT INTO usuarios_roles (id_empresa, id_usuario, id_rol, fecha_creacion, fecha_actualizacion)
		VALUES (idEmpresa, idUsuario, 2, current_timestamp, current_timestamp);
    
    -- COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postJornadaLaboral` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postJornadaLaboral`(
	IN p_id_empresa BIGINT,
    IN p_fecha DATE,
    IN p_id_usuario BIGINT,
    IN p_id_jornada_laboral BIGINT,
    IN p_inicio_jornada DATETIME,
    IN p_fin_jornada DATETIME,
    IN p_inicio_comida DATETIME,
    IN p_fin_comida DATETIME
)
BEGIN

	IF p_id_jornada_laboral = 0 THEN
    
		START TRANSACTION;
			INSERT INTO jornada_laboral (id_empresa, fecha, id_usuario, inicio_jornada, fin_jornada, inicio_comida, fin_comida)
				VALUES (p_id_empresa, p_fecha, p_id_usuario, p_inicio_jornada, p_fin_jornada, p_inicio_comida, p_fin_comida);
				
			SET @id_jornada = LAST_INSERT_ID();
        COMMIT;
    
    ELSE
		START TRANSACTION;
			UPDATE jornada_laboral 
				SET inicio_jornada = p_inicio_jornada, 
					fin_jornada 	= p_fin_jornada,
					inicio_comida	= p_inicio_comida,
					fin_comida		= p_fin_comida
			WHERE id_empresa = p_id_empresa AND fecha = p_fecha AND id_usuario = p_id_usuario AND id_jornada_laboral = p_id_jornada_laboral;
			SET @id_jornada = p_id_jornada_laboral;
        COMMIT;
    END IF;
    
    SELECT *
    FROM jornada_laboral
    WHERE id_empresa = p_id_empresa AND id_jornada_laboral = @id_jornada;

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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postProducto`(
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
	IN prm_sku varchar(20) 
)
BEGIN
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postProveedor`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postPuntoDeAcceso`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postPuntoDeEntrega`(
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
/*!50003 DROP PROCEDURE IF EXISTS `postVisita` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `postVisita`(
	p_id_empresa BIGINT,
    p_id_visita BIGINT,
    p_id_cliente BIGINT,
    p_id_usuario BIGINT,
    p_nombre VARCHAR(90),
    p_comentarios VARCHAR(800),
    p_fecha_inicio DATETIME,
    p_fecha_final DATETIME,
    p_latitud DOUBLE,
    p_longitud DOUBLE    
)
BEGIN

	IF p_id_visita = 0 THEN
		START TRANSACTION;
			INSERT INTO visitas (id_empresa, id_cliente, id_usuario, nombre, comentarios, fecha_inicio, latitud, longitud)
				VALUES (p_id_empresa, p_id_cliente, p_id_usuario, p_nombre, p_comentarios, p_fecha_inicio, p_latitud, p_longitud);
				
			SET @id_visita = LAST_INSERT_ID();
        COMMIT;
        
	ELSE
		START TRANSACTION;
			UPDATE visitas SET nombre = p_nombre, comentarios = p_comentarios, fecha_final = p_fecha_final
			WHERE id_empresa = p_id_empresa AND id_visita = p_id_visita;
		
			SET @id_visita = p_id_visita;
        COMMIT;
							
	END IF;
    
    SELECT @id_visita AS id_visita;

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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `putAgenda`(
	IN prm_id_empresa INT,
    IN prm_id_agenda INT,
    IN prm_intervalo VARCHAR(13),
    IN prm_id_cliente INT,
    IN prm_nombre VARCHAR(90)
)
BEGIN
	DECLARE _cambio_efectuado BIT DEFAULT 0;

	-- ACTUALIZO EL NOMBRE DEL USUARIO SI ESTE CAMBIO
	IF EXISTS (
			SELECT 1
			FROM clientes C
			WHERE C.id_empresa = prm_id_empresa AND C.id_cliente = prm_id_cliente AND C.nombre <> prm_nombre
		)
	THEN 
		UPDATE clientes C SET C.nombre = prm_nombre
        WHERE C.id_empresa = prm_id_empresa AND C.id_cliente = prm_id_cliente;
        
        SET _cambio_efectuado = 1;
        
    END IF;
    
    SELECT _cambio_efectuado AS cambio_efectuado;
    
    -- TODO: CAMBIAR EL HORARIO DE LA CITA EN AGENDA
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `putCategoriaImage`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `putCategorias`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `putFormasDePago`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `putLandingPage`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `putLandingPage_Productos`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `putLandingPage_QuienesSomos`(
	IN prm_id_empresa INT,
    IN prm_id_landingPage INT,
    IN prm_quienes_somos VARCHAR(800)
)
BEGIN
	UPDATE landingPage
		SET quienes_somos = prm_quienes_somos
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `putLandingPage_Servicios`(
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `putLandingPage_Settings`(
	IN prm_id_empresa INT,
    IN prm_id_landingPage INT,
    IN prm_mostrar_quienes_somos TINYINT,
    IN prm_mostrar_productos TINYINT,
    IN prm_mostrar_servicios TINYINT,
    IN prm_mostrar_contactanos TINYINT,
    IN prm_mostrar_sitioEnMantenimiento TINYINT
)
BEGIN
	UPDATE landingPage
		SET mostrar_quienes_somos = prm_mostrar_quienes_somos,
			mostrar_productos = prm_mostrar_productos,
            mostrar_servicios = prm_mostrar_servicios,
            mostrar_contactanos = prm_mostrar_contactanos,
            mostrar_sitioEnMantenimiento = prm_mostrar_sitioEnMantenimiento
	WHERE id_empresa = prm_id_empresa AND id_landingPage = prm_id_landingPage;
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
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`appusercrmadmin`@`%` PROCEDURE `putRevisaDireccionPorDefecto`(
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-05  7:49:23
