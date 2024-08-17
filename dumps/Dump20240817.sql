CREATE DATABASE  IF NOT EXISTS `crm` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_spanish_ci */;
USE `crm`;
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
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_forma_de_pago`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Dumping routines for database 'crm'
--
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
	
    SELECT id_forma_de_pago, descripcion, informacion_adicional
    FROM formas_de_pago
    WHERE id_empresa = prm_id_empresa AND activo = 1;
    
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
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLandingPage`(
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
	SELECT 	P.id_producto,
			P.nombre, P.descripcion, 
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
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductosListing`(
	IN limite INT,
    IN pagina INT    
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
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsuarioLogin`(
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
	IN prm_existencia int(11),
	IN prm_activo TINYINT,
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
/*!50003 DROP PROCEDURE IF EXISTS `putLandingPage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
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
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putLandingPage_QuienesSomos`(
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
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `putLandingPage_Settings`(
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

-- Dump completed on 2024-08-17 12:30:55
