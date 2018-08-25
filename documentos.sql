-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-08-2018 a las 18:01:59
-- Versión del servidor: 10.1.32-MariaDB
-- Versión de PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veradiz`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `archivo` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `ubicacion` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `clienteId` int(11) DEFAULT NULL,
  `tipoAccesoId` int(11) DEFAULT NULL,
  `tipoDocumentoId` int(11) DEFAULT NULL,
  `fechaRegistro` date DEFAULT NULL,
  `autorId` int(11) DEFAULT NULL,
  `estadodocumento` int(11) DEFAULT NULL,
  `informedescargado` int(11) DEFAULT NULL,
  `fechadescarga` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`id`, `descripcion`, `archivo`, `ubicacion`, `clienteId`, `tipoAccesoId`, `tipoDocumentoId`, `fechaRegistro`, `autorId`, `estadodocumento`, `informedescargado`, `fechadescarga`) VALUES
(45, 'Informe de cliente 1 NADRO', '1534998530admin.pdf', '/api_veradiz/Repository/Upload/documentos/', 13, 1, 1, '2018-08-23', 1, 2, 0, '2018-08-23'),
(46, 'Estatus fiscal 1 NADRO', '1534998613adminbecarios.pdf', '/api_veradiz/Repository/Upload/documentos/', 13, 1, 2, '2018-08-23', 1, 1, 0, '0000-00-00'),
(47, 'Pago de impuestos 1 ceMIESol', '1534998657fichacurricular.pdf', '/api_veradiz/Repository/Upload/documentos/', 14, 1, 4, '2018-08-23', 1, 1, 0, '2018-08-23'),
(48, 'Información financiera 1 Chantilly', '1534998724personal.pdf', '/api_veradiz/Repository/Upload/documentos/', 15, 1, 3, '2018-08-23', 1, 1, 0, '2018-08-23'),
(49, 'Clave fiscal 1 Colegio Williams', '1534998928lider.pdf', '/api_veradiz/Repository/Upload/documentos/', 16, 1, 5, '2018-08-23', 1, 3, 0, '2018-08-23'),
(50, 'Estatus del mes agosto hamsa', '1535211280CR.pdf', '/api_veradiz/Repository/Upload/documentos/', 18, 1, 2, '2018-08-25', 30, 3, 0, '2018-08-25');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
