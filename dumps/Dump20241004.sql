-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: crm
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

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
  `titulo` text COLLATE latin1_spanish_ci NOT NULL,
  `contenido` text COLLATE latin1_spanish_ci NOT NULL,
  `activo` bit(1) NOT NULL,
  `id_producto` bigint(20) NOT NULL,
  `image1` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint(20) NOT NULL,
  `nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `descripcion` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `imagen` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
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
INSERT INTO `categorias` VALUES (1,1,'Caja de Filete tilapia','Bolsa de Filete Tilapia, contiene 4 piezas.',NULL,'2023-12-10 00:00:00','2024-07-26 15:02:01',0),(9,1,'Testing 3','Testing 3','','2024-07-13 03:39:42','2024-07-13 03:39:42',2),(2,1,'Pollo','Boneless, Pechuga Agrosuper (sin piel), Milanesa CORDON BLUEA, Piernas KFC.','https://res.cloudinary.com/ddhxa9igj/image/upload/v1721880979/nir/1_cat_2.jpg','2023-12-10 00:00:00','2024-07-25 11:55:12',1),(8,1,'Testing 2','Testing 2','','2024-07-13 03:36:26','2024-07-13 03:36:26',1),(3,1,'Vegetales','Aros de cebolla, Papa frita','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245584/nir/papasyaros_nt79jw.jpg','2023-12-10 00:00:00','2023-12-10 00:00:00',1),(4,1,'Puerco','Tocino','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245824/nir/tocino_jhkilr.jpg','2023-12-10 00:00:00','2023-12-10 00:00:00',1),(5,1,'Lacteos','Leche, Quesos',NULL,'2024-07-04 00:00:00','2024-07-05 17:31:58',0),(6,1,'Mascotas','Croquetas perros y gatos',NULL,'2024-07-04 00:00:00','2024-07-05 17:31:58',0),(7,1,'Testing','Testing',NULL,'2024-07-05 18:13:27','2024-07-05 18:13:27',0);
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
  `empresa` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `telefonos` varchar(90) COLLATE latin1_spanish_ci NOT NULL,
  `celulares` varchar(90) COLLATE latin1_spanish_ci NOT NULL,
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
INSERT INTO `clientes` VALUES (1,1,'HostRegio','Roberto Vázquez Hastings','818.252.2653','818.252.2653',NULL,NULL),(1,2,'Ferreteria La Moderna','Roberto Vázquez Hastings','818.252.2653','818.252.2653',NULL,NULL);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion_tipo_identidad`
--

DROP TABLE IF EXISTS `direccion_tipo_identidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direccion_tipo_identidad` (
  `id_empresa` bigint(20) NOT NULL,
  `id_direccion_tipo_identidad` smallint(6) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_direccion_tipo_identidad`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion_tipo_identidad`
--

LOCK TABLES `direccion_tipo_identidad` WRITE;
/*!40000 ALTER TABLE `direccion_tipo_identidad` DISABLE KEYS */;
INSERT INTO `direccion_tipo_identidad` VALUES (1,1,'Usuario'),(1,2,'Proveedor');
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
  `direccion` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `calle` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `numero` varchar(20) COLLATE latin1_spanish_ci DEFAULT NULL,
  `colonia` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `ciudad` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `estado` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `pais` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `codigo_postal` varchar(10) COLLATE latin1_spanish_ci DEFAULT NULL,
  `latitud` double DEFAULT NULL,
  `longitud` double DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_direccion_tipo_identidad`,`id_direccion`),
  KEY `id_empresa` (`id_empresa`,`identidad`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (1,1,1,1,_binary '\0','Privada del Estanque 135, Fracc. Palmas Diamante, San Nicolás de los Garza., Nuevo León, México, 66478','Privada del Estanque','135','Fracc. Palmas Diamante','San Nicolás de los Garza.','Nuevo León','México','66478',NULL,NULL,'2024-08-09 18:11:30','2024-08-14 12:45:01'),(2,1,1,1,_binary '\0','Italia 122, Fracc. Santa Fé, Monterrey., Nuevo León, México, 64540','Italia','122','Fracc. Santa Fé','Monterrey.','Nuevo León','México','64540',NULL,NULL,'2024-08-13 18:12:48','2024-08-14 12:45:36'),(3,1,1,1,_binary '','ITALIA2 122, FRACCIONAMIENTO SANTA FE, MONTERREY., NUEVO LEÓN, México, 64540','ITALIA2','122','FRACCIONAMIENTO SANTA FE','MONTERREY.','NUEVO LEÓN','México','64540',NULL,NULL,'2024-08-13 18:18:45','2024-08-14 12:45:52');
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
  `nombre` varchar(300) COLLATE latin1_spanish_ci NOT NULL,
  `logo` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'Congelados NIR','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702230600/nir/LogoNIR_fd22wq.png'),(2,'Sorteos','https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
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
  `descripcion` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `informacion_adicional` varchar(200) COLLATE latin1_spanish_ci DEFAULT NULL,
  `activo` tinyint(4) NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_forma_de_pago`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formas_de_pago`
--

LOCK TABLES `formas_de_pago` WRITE;
/*!40000 ALTER TABLE `formas_de_pago` DISABLE KEYS */;
INSERT INTO `formas_de_pago` VALUES (1,1,'Efectivo - contra entrega','',1),(1,2,'Tarjeta Débito/Crédito - contra entrega','',1),(1,3,'Depósito','Cuenta:1243',1),(1,4,'Transferencia','Clabe Interbancaria: 123456',1),(1,5,'Pago en línea','',1),(1,6,'Línea de crédito','$6000',1);
/*!40000 ALTER TABLE `formas_de_pago` ENABLE KEYS */;
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
  `quienes_somos` varchar(800) COLLATE latin1_spanish_ci DEFAULT NULL,
  `servicios` varchar(800) COLLATE latin1_spanish_ci DEFAULT NULL,
  `productos` varchar(800) COLLATE latin1_spanish_ci DEFAULT NULL,
  `mostrar_quienes_somos` tinyint(4) DEFAULT NULL,
  `mostrar_productos` tinyint(4) DEFAULT NULL,
  `mostrar_servicios` tinyint(4) DEFAULT NULL,
  `mostrar_contactanos` tinyint(4) DEFAULT NULL,
  `mostrar_sitioEnMantenimiento` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_landingPage`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `landingpage`
--

LOCK TABLES `landingpage` WRITE;
/*!40000 ALTER TABLE `landingpage` DISABLE KEYS */;
INSERT INTO `landingpage` VALUES (1,1,'Testing 2','<p>Services</p><ol><li>One</li><br></ol>','<p>Productos</p><ol><li>Pescado</li><li>Pollo</li><br></ol>',1,1,0,0,0);
/*!40000 ALTER TABLE `landingpage` ENABLE KEYS */;
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
  `descripcion` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `orden` smallint(6) NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_pedido_estatus`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_estatus`
--

LOCK TABLES `pedido_estatus` WRITE;
/*!40000 ALTER TABLE `pedido_estatus` DISABLE KEYS */;
INSERT INTO `pedido_estatus` VALUES (1,1,'Recibido',0),(1,2,'En Proceso',1),(1,3,'Terminado',2),(1,4,'En Camino',3),(1,5,'Entregado',4);
/*!40000 ALTER TABLE `pedido_estatus` ENABLE KEYS */;
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
  `id_forma_de_pago` smallint(6) NOT NULL,
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
INSERT INTO `pedidos` VALUES (1,1,1,1,1,1,1,1,0,NULL,0,'2024-09-05 17:11:58','2024-09-05 17:11:58'),(1,2,1,1,1,0,1,1,250,0,250,'2024-09-05 17:34:31','2024-09-05 17:34:31'),(1,3,1,1,0,1,2,1,250,0,250,'2024-09-05 18:31:43','2024-09-05 18:31:43'),(1,4,1,1,0,1,4,1,390,0,390,'2024-09-12 18:09:11','2024-09-12 18:09:11');
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
INSERT INTO `pedidos_detalle` VALUES (1,1,2,1,1,250,250,'2024-09-05 17:34:31','2024-09-05 17:34:31'),(1,2,3,1,1,250,250,'2024-09-05 18:31:43','2024-09-05 18:31:43'),(1,3,4,4,2,130,260,'2024-09-12 18:09:11','2024-09-12 18:09:11'),(1,4,4,5,1,130,130,'2024-09-12 18:09:11','2024-09-12 18:09:11');
/*!40000 ALTER TABLE `pedidos_detalle` ENABLE KEYS */;
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
  `nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `descripcion` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `id_proveedor` bigint(20) NOT NULL,
  `id_categoria` bigint(20) NOT NULL,
  `precio` double DEFAULT 0,
  `precio_promocion` double DEFAULT 0,
  `costo` double DEFAULT 0,
  `image1` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `image2` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `image3` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `existencia` int(11) DEFAULT 0,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1,
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
INSERT INTO `productos` VALUES (1,1,'Caja de Filete tilapia','Caja de Filete Tilapia, contiene 4.5 KG aprox.',1,1,260,250,200,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245043/nir/filete_tilapia_lkscvm.webp','https://fiestatijuana.mx/image-not-available.png','https://fiestatijuana.mx/image-not-available.png',0,'2024-07-26 17:43:09','2024-07-26 17:43:09',1,''),(2,1,'Caja de Filete tilapias','Bolsa de Filete Tilapia, contiene 4 piezas',1,1,80,1,20,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245043/nir/filete_tilapia_lkscvm.webp','https://fiestatijuana.mx/image-not-available.png','https://fiestatijuana.mx/image-not-available.png',1,'2024-07-26 17:26:15','2024-07-26 17:26:15',1,'ABC'),(3,1,'Camarón comptelero','Bolsa de Camarón comptelero.',1,1,150,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702249673/nir/camaron_coctelero_dtxd4d.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(4,1,'Boneless','Bolsa de Boneless 1 KG.',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253038/nir/boneless-natural_lmtjzy.png',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(5,1,'Pechuga agrosuper','Pechuga agrosuper natural sin piel. Contiene 4 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245261/nir/pechuga_agrosuper_l9tn8n.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(6,1,'Milenesa Cordon Bleu','Milanesa Cordon Bleu. Bolsa con 7 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253266/nir/cordon-bleu_egaz5t.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(7,1,'Pierna de pollo KFC','Pierna de pollo KFC. Bolsa con 10 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702268973/nir/pierna-kfc_edgehq.png',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(8,1,'Aros de cebolla','Bolsa de aros de cebolla.',1,3,150,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253406/nir/aros-cebolla_dx53ek.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(9,1,'Papa a la francesa','Bolsa de papas a la francesa',1,3,100,1.5,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253552/nir/papas-a-la-francesa_vgywg5.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL),(10,1,'Tocino','Paquete de Tocino Big Buy 453 GR.',1,4,100,1.5,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253721/nir/tocino-big-buy_as4eom.webp',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',1,NULL);
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
  `activo` tinyint(4) DEFAULT NULL,
  `whatsapp` varchar(20) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_empresa`,`id_proveedor`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,1,'Agrowings',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
  `id_puntoDeEntrega` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint(20) NOT NULL,
  `nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `horario` varchar(600) COLLATE latin1_spanish_ci DEFAULT NULL,
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
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint(20) NOT NULL,
  `nombre` varchar(90) COLLATE latin1_spanish_ci NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_rol`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,1,'master','2023-12-10 00:00:00','2023-12-10 00:00:00'),(2,1,'admin','2023-12-10 00:00:00','2023-12-10 00:00:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint(20) NOT NULL,
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
  PRIMARY KEY (`id_empresa`,`id_usuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `celular` (`celular`),
  UNIQUE KEY `idx_login` (`id_empresa`,`email`,`password`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,1,'rob.hst@gmail.com','Roberto','Vazquez Hastings','8110170557',NULL,'$2b$08$DuJlVb7GckLTD6XXICNxBu9.BT1.7VBL/kl0zXvbn074L9J5ylDX6','2023-12-10 00:00:00','2023-12-10 00:00:00','2024-03-30 23:41:28',NULL,'1970-06-25');
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
  `nombre` varchar(90) COLLATE latin1_spanish_ci NOT NULL,
  `comentarios` varchar(800) COLLATE latin1_spanish_ci NOT NULL,
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-04 18:06:46
