-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table julian_app.carts
DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idProduct` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table julian_app.carts: ~9 rows (approximately)
DELETE FROM `carts`;
INSERT INTO `carts` (`id`, `idProduct`, `idUser`, `createdAt`, `updatedAt`, `deletedAt`, `quantity`) VALUES
	(1, 2, 2, '2023-09-19 20:43:34', '2023-09-19 20:43:34', NULL, 1),
	(2, 1, 1, '2023-09-19 20:43:34', '2023-09-19 20:43:34', NULL, 1),
	(3, 1, 2, '2023-09-25 22:53:46', '2023-09-25 22:53:46', NULL, 1),
	(4, 4, 2, '2023-09-26 17:57:15', '2023-09-26 17:57:15', NULL, 1),
	(5, 2, 11, '2023-10-19 16:58:08', '2023-10-19 16:58:08', '2023-10-19 22:35:38', 1),
	(6, 1, 11, '2023-10-19 16:58:17', '2023-10-19 16:58:17', '2023-10-19 22:35:38', 1),
	(7, 1, 11, '2023-10-24 20:01:05', '2023-10-24 20:01:05', NULL, 1),
	(8, 2, 11, '2023-10-24 20:01:09', '2023-10-24 20:06:36', NULL, 3),
	(9, 3, 11, '2023-10-24 20:06:38', '2023-10-24 20:06:38', NULL, 1);

-- Dumping structure for table julian_app.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table julian_app.categories: ~10 rows (approximately)
DELETE FROM `categories`;
INSERT INTO `categories` (`id`, `categoryName`, `createdAt`, `deletedAt`, `updatedAt`) VALUES
	(1, 'Electro y tecnología', NULL, NULL, NULL),
	(2, 'Bazar y textil', NULL, NULL, NULL),
	(3, 'Almacén', NULL, NULL, NULL),
	(4, 'Bebidas', NULL, NULL, NULL),
	(5, 'Lácteos y productos frescos', NULL, NULL, NULL),
	(6, 'Carnes y pescados', NULL, NULL, NULL),
	(7, 'Frutas y verduras', NULL, NULL, NULL),
	(8, 'Panadería', NULL, NULL, NULL),
	(9, 'Limpieza', NULL, NULL, NULL),
	(10, 'Indumentaria', NULL, NULL, NULL);

-- Dumping structure for table julian_app.orders
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `estate` varchar(50) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `codPostal` int(11) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `receipt` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table julian_app.orders: ~2 rows (approximately)
DELETE FROM `orders`;
INSERT INTO `orders` (`id`, `idUser`, `total`, `status`, `firstName`, `lastName`, `email`, `address`, `estate`, `phone`, `codPostal`, `payment_method`, `receipt`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(18, 11, 4300, 'comprobante_enviado', 'prueba', 'compra', 'compra@gmail.com', 'qwe 123', 'bsas', 4115522, 221, 'transferencia', '1697754508158__Proyecto nuevo (1).pdf', '2023-10-19 22:28:28', '2023-10-19 22:28:28', NULL),
	(19, 11, 4300, 'comprobante_enviado', 'prueba', 'compra', 'prueba@gmail.com', 'qwe 123', 'bsas', 4115522, 211, 'transferencia', '1697754938095__Proyecto nuevo (1).pdf', '2023-10-19 22:35:38', '2023-10-19 22:35:38', NULL);

-- Dumping structure for table julian_app.orders_lists
DROP TABLE IF EXISTS `orders_lists`;
CREATE TABLE IF NOT EXISTS `orders_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idProduct` int(11) DEFAULT NULL,
  `idOrder` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table julian_app.orders_lists: ~4 rows (approximately)
DELETE FROM `orders_lists`;
INSERT INTO `orders_lists` (`id`, `idProduct`, `idOrder`) VALUES
	(3, 2, 18),
	(4, 1, 18),
	(5, 2, 19),
	(6, 1, 19);

-- Dumping structure for table julian_app.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(50) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `barCode` varchar(50) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table julian_app.products: ~10 rows (approximately)
DELETE FROM `products`;
INSERT INTO `products` (`id`, `productName`, `description`, `barCode`, `idCategoria`, `price`, `image`, `stock`, `createdAt`, `deletedAt`, `updatedAt`, `status`, `discount`) VALUES
	(1, 'logitech g31', NULL, '12312345224', 1, 2000, NULL, 5, NULL, NULL, NULL, 'activo', NULL),
	(2, 'silla gamer', NULL, '636751132', 1, 2300, NULL, 4, NULL, NULL, NULL, 'activo', 12),
	(3, 'logitech g31', NULL, '12312345224', 1, 100, NULL, 5, NULL, NULL, NULL, 'activo', NULL),
	(4, 'prueba', 'qwe', '123456', 1, 10000, NULL, 6, '2023-09-18 20:20:41', NULL, '2023-09-18 20:20:41', 'activo', NULL),
	(6, 'qwe', '1qwekhgqwjkhekj', '2000', 1, 1, NULL, 5, '2023-09-19 19:25:21', NULL, '2023-09-19 19:25:21', NULL, 5),
	(10, 'prueba mouse', 'mouse asd ', '12312312', 3, 12000, '1695494608805--ofertas1.png', 5, '2023-09-23 18:43:28', NULL, '2023-09-23 18:43:28', NULL, NULL),
	(11, 'prueba1', 'qwe', '1251654', 3, 2000, '1695752449031--prod2.png', 4, '2023-09-26 18:20:49', NULL, '2023-09-26 18:20:49', NULL, 15),
	(12, 'asd1', 'qwe qwe ', '16564213', 5, 2000, '1695752670540--prod5.png', 30, '2023-09-26 18:24:30', NULL, '2023-09-26 18:24:30', NULL, NULL),
	(13, 'algo', 'algo algo algo', '465146516', 4, 1000, '1695753883824--prod6.png', 300, '2023-09-26 18:44:43', NULL, '2023-09-26 18:44:43', NULL, NULL),
	(14, 'mesa', 'mesa madera', '1233512316462', 3, 12000, '1698187513149__Proyecto nuevo (2).jpg', 5, '2023-10-24 22:45:13', NULL, '2023-10-24 22:45:13', NULL, NULL);

-- Dumping structure for table julian_app.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) DEFAULT NULL,
  `fullName` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table julian_app.users: ~5 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `usuario`, `fullName`, `password`, `email`, `createdAt`, `deletedAt`, `updatedAt`, `rol`, `image`) VALUES
	(1, 'julian', NULL, '123asd', 'julian@gmail.com', NULL, NULL, NULL, 'administrador', NULL),
	(2, 'santi', NULL, '123asd', 'santi@gmail.com', '2023-09-18 17:15:47', NULL, NULL, 'cliente', NULL),
	(11, 'prueba', 'prueba', '123asd', 'prueba@gmail.com', NULL, NULL, NULL, 'cliente', '1697734252880__default-image_450.png'),
	(12, 'prueba2', 'prueba2', '123asd', 'prueba2@gmail.com', '2023-10-19 16:53:20', NULL, '2023-10-19 16:53:20', 'cliente', '1697734400008__prod3.png'),
	(13, 'prueba3', 'prueba3 algo3', '123asd', 'prueba3@gmail.com', '2023-10-24 22:43:03', NULL, '2023-10-24 22:43:03', 'cliente', '1698187383806__hexagono_4.png');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
