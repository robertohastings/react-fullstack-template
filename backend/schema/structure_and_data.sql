CREATE DATABASE  IF NOT EXISTS `crm` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_spanish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `crm`;
-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (x86_64)
--
-- Host: 104.200.137.56    Database: crm
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.22.04.3

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
INSERT INTO `categorias` VALUES (1,1,'Del Mar','Filete tilapia, Salmón, Camarones.','','2023-12-10 00:00:00','2024-07-14 03:32:42',0),(9,1,'Testing 3','Testing 3','','2024-07-13 03:39:42','2024-07-13 03:39:42',2),(2,1,'Pollo','Boneless, Pechuga Agrosuper (sin piel), Milanesa CORDON BLUEA, Piernas KFC.','','2023-12-10 00:00:00','2024-07-13 03:30:18',1),(8,1,'Testing 2','Testing 2','','2024-07-13 03:36:26','2024-07-13 03:36:26',1),(3,1,'Vegetales','Aros de cebolla, Papa frita','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245584/nir/papasyaros_nt79jw.jpg','2023-12-10 00:00:00','2023-12-10 00:00:00',1),(4,1,'Puerco','Tocino','https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245824/nir/tocino_jhkilr.jpg','2023-12-10 00:00:00','2023-12-10 00:00:00',1),(5,1,'Lacteos','Leche, Quesos',NULL,'2024-07-04 00:00:00','2024-07-05 17:31:58',0),(6,1,'Mascotas','Croquetas perros y gatos',NULL,'2024-07-04 00:00:00','2024-07-05 17:31:58',0),(7,1,'Testing','Testing',NULL,'2024-07-05 18:13:27','2024-07-05 18:13:27',0);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
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
  `tipo_identidad` enum('Usuario','Proveedor') COLLATE latin1_spanish_ci DEFAULT NULL,
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
  PRIMARY KEY (`id_empresa`,`id_direccion`),
  KEY `id_empresa` (`id_empresa`,`tipo_identidad`,`identidad`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (1,1,'Proveedor',1,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-12-10 00:00:00','2023-12-10 00:00:00');
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
INSERT INTO `landingPage` VALUES (1,1,'<p>Somos una empresa de alimentos congelados dede 2023.</p><p>Nos <strong>especializamos</strong> en los siguientes congelados:</p><ol><li>Pescado</li><li>Camaron</li><li>Papas</li></ol><p>Nuestro producto de mayor demanda: <u style=\"background-color: rgb(243, 243, 243);\">Boneles</u></p>','<p>Services</p><ol><li>One</li><br></ol>','<p>Productos</p><ol><li>Pescado</li><li>Pollo</li><br></ol>',1,1,0,0,0);
/*!40000 ALTER TABLE `landingPage` ENABLE KEYS */;
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
  `activo` bit(1) NOT NULL DEFAULT b'1',
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
INSERT INTO `productos` VALUES (1,1,'Caja de Filete tilapia','Caja de Filete Tilapia, contiene 4.5 KG aprox.',1,1,260,250,200,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245043/nir/filete_tilapia_lkscvm.webp',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',_binary '',NULL),(2,1,'Caja de Filete tilapia','Bolsa de Filete Tilapia, contiene 4 piezas.',1,1,60,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245043/nir/filete_tilapia_lkscvm.webp',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',_binary '',NULL),(3,1,'Camarón comptelero','Bolsa de Camarón comptelero.',1,1,150,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702249673/nir/camaron_coctelero_dtxd4d.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',_binary '',NULL),(4,1,'Boneless','Bolsa de Boneless 1 KG.',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253038/nir/boneless-natural_lmtjzy.png',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',_binary '',NULL),(5,1,'Pechuga agrosuper','Pechuga agrosuper natural sin piel. Contiene 4 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702245261/nir/pechuga_agrosuper_l9tn8n.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',_binary '',NULL),(6,1,'Milenesa Cordon Bleu','Milanesa Cordon Bleu. Bolsa con 7 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253266/nir/cordon-bleu_egaz5t.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',_binary '',NULL),(7,1,'Pierna de pollo KFC','Pierna de pollo KFC. Bolsa con 10 piezas',1,2,130,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702268973/nir/pierna-kfc_edgehq.png',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',_binary '',NULL),(8,1,'Aros de cebolla','Bolsa de aros de cebolla.',1,3,150,0,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253406/nir/aros-cebolla_dx53ek.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',_binary '',NULL),(9,1,'Papa a la francesa','Bolsa de papas a la francesa',1,3,100,1.5,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253552/nir/papas-a-la-francesa_vgywg5.jpg',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',_binary '',NULL),(10,1,'Tocino','Paquete de Tocino Big Buy 453 GR.',1,4,100,1.5,0,'https://res.cloudinary.com/ddhxa9igj/image/upload/v1702253721/nir/tocino-big-buy_as4eom.webp',NULL,NULL,0,'2023-12-11 00:00:00','2023-12-11 00:00:00',_binary '',NULL);
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
  PRIMARY KEY (`id_empresa`,`id_proveedor`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,1,'Agrowings',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint NOT NULL,
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
INSERT INTO `usuarios` VALUES (1,1,'rob.hst@gmail.com','Roberto','Vázquez Hastings','818.252.2653',NULL,'$2b$08$DuJlVb7GckLTD6XXICNxBu9.BT1.7VBL/kl0zXvbn074L9J5ylDX6','2023-12-10 00:00:00','2023-12-10 00:00:00','2024-03-30 23:41:28',NULL);
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
INSERT INTO `usuarios_roles` VALUES (1,1,1,'2023-12-10 00:00:00','2023-12-10 00:00:00');
/*!40000 ALTER TABLE `usuarios_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'crm'
--
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
	IN prm_id_empresa INT,
    IN prm_id_landingPage BIGINT
)
BEGIN
	SELECT  quienes_somos,
			servicios,
            productos,
            mostrar_quienes_somos,
            mostrar_productos,
            mostrar_servicios,
            mostrar_contactanos,
            mostrar_sitioEnMantenimiento
    FROM landingPage
    WHERE id_empresa = prm_id_empresa AND id_landingPage = prm_id_landingPage;
                    
	SELECT id_categoria, nombre 
    FROM categorias C 
    WHERE id_empresa = prm_id_empresa
    AND EXISTS(
			SELECT id_categoria FROM productos P WHERE P.id_categoria = C.id_categoria LIMIT 1
        );
    

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
            INNER JOIN roles R ON R.id_empresa = UR.id_empresa AND R.id_rol = UR.id_rol
			WHERE U.id_empresa = id_empresa AND U.email = email /*AND U.password = password*/;
            
		/*END IF;*/
	END IF;
    
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
    IN prm_mostrar_contactanos TINYINT
)
BEGIN

	UPDATE landingPage
		SET quienes_somos = prm_quienes_somos,
			servicios = prm_servicios,
            productos = prm_productos,
            mostrar_quienes_somos = prm_mostrar_quienes_somos,
            mostrar_productos = prm_mostrar_productos,
            mostrar_servicios = prm_mostrar_servicios,
            mostrar_contactanos = prm_mostrar_contactanos
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-16  6:53:51
