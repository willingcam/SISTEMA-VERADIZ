-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-09-2018 a las 05:26:26
-- Versión del servidor: 10.1.34-MariaDB
-- Versión de PHP: 7.2.8

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
-- Estructura de tabla para la tabla `funciones_rol`
--

CREATE TABLE `funciones_rol` (
  `id` int(11) NOT NULL,
  `rol` int(11) DEFAULT NULL,
  `funcion` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `funciones_rol`
--

INSERT INTO `funciones_rol` (`id`, `rol`, `funcion`, `estado`) VALUES
(1, 1, 4, 1),
(3, 1, 5, 1),
(4, 1, 6, 1),
(5, 1, 7, 1),
(6, 1, 8, 1),
(7, 1, 9, 1),
(8, 1, 10, 1),
(9, 1, 11, 1),
(10, 1, 12, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `funciones_rol`
--
ALTER TABLE `funciones_rol`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `funciones_rol`
--
ALTER TABLE `funciones_rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
