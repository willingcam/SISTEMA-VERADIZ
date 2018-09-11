-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-09-2018 a las 00:27:58
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
-- Estructura de tabla para la tabla `funciones`
--

CREATE TABLE `funciones` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(128) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `url_referencia` varchar(128) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `nivel` int(11) DEFAULT NULL,
  `secuencia` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `idPadre` int(11) DEFAULT NULL,
  `idModulo` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `nombre` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `clase_icono` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `campo_state` varchar(128) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `funciones`
--

INSERT INTO `funciones` (`id`, `descripcion`, `url_referencia`, `nivel`, `secuencia`, `estado`, `idPadre`, `idModulo`, `nombre`, `clase_icono`, `campo_state`, `rol`) VALUES
(4, 'Usuarios', 'veradiz.html#/usuarios', 0, 1, 1, NULL, 'ADM', 'Usuarios', NULL, 'usuarios', 1),
(13, 'Clientes', 'veradiz.html#/clientes', 0, 2, 1, NULL, NULL, 'Clientes', NULL, 'clientes', 1),
(15, 'Servicios', 'veradiz.html#/servicios', 0, 3, 1, NULL, NULL, 'Servicios', NULL, 'servicios', 1),
(16, 'Noticias', 'veradiz.html#/noticias', 0, 4, 1, NULL, NULL, 'Noticias', NULL, 'noticias', 1),
(19, 'Registro de informes', 'veradiz.html#/informes', 0, 5, 1, NULL, NULL, 'Registro de informes', NULL, 'informes', 3),
(20, 'Revisión de informes', 'veradiz.html#/informess', 0, 7, 1, NULL, NULL, 'Revisión de informes', NULL, 'informess', 2),
(23, 'Informes publicados', 'veradiz.html#/informesenviados', 0, 8, 1, NULL, NULL, 'Informes publicados', NULL, 'informesenviados', 2),
(25, 'Consulta de informes', 'veradiz.html#/clientesinformes', 0, 11, 1, NULL, NULL, 'Consulta de informes', NULL, 'clientesinformes', 4),
(26, 'Agregar usuarios', 'veradiz.html#/usuariosAdd/', 0, 15, 1, NULL, NULL, 'Agregar usuarios', NULL, 'usuariosAdd', 1),
(28, 'Editar usuarios', 'veradiz.html#/usuariosEdit/', 0, 16, 1, NULL, NULL, 'Editar usuarios', NULL, 'usuariosEdit', 1),
(29, 'Agregar clientes', 'veradiz.html#/clientesAdd/', 0, 17, 1, NULL, NULL, 'Agregar clientes', NULL, 'clientesAdd', 1),
(30, 'Editar clientes', 'veradiz.html#/clientesEdit/', 0, 18, 1, NULL, NULL, 'Editar clientes', NULL, 'clientesEdit', 1),
(33, 'Asignar usuario cliente', 'veradiz.html#/clientesResp/', 0, 19, 1, NULL, NULL, 'Asignar usuario cliente', NULL, 'clientesResp', 1),
(34, 'Agregar noticias', 'veradiz.html#/noticiasAdd/', 0, 20, 1, NULL, NULL, 'Agregar noticias', NULL, 'noticiasAdd', 1),
(37, 'Editar noticias', 'veradiz.html#/noticiasEdit/', 0, 21, 1, NULL, NULL, 'Editar noticias', NULL, 'noticiasEdit', 1),
(38, 'Agregar servicios', 'veradiz.html#/serviciosAdd/', 0, 22, 1, NULL, NULL, 'Agregar servicios', 'serviciosAdd', NULL, 1),
(41, 'Editar servicios', 'veradiz.html#/serviciosEdit/', 0, 23, 1, NULL, NULL, 'Editar servicios', NULL, 'serviciosEdit', 1),
(42, 'Agregar informes rol empleado', 'veradiz.html#/informesAdd/', 0, 24, 1, NULL, NULL, 'Agregar informes rol empleado', NULL, 'informesAdd', 3),
(45, 'Editar informes rol empleado', 'veradiz.html#/informesEdit/', 0, 26, 1, NULL, NULL, 'Editar informes rol empleado', NULL, 'informesEdit', 3),
(47, 'Agregar informes rol socio', 'veradiz.html#/informessAdd/', 0, 27, 1, NULL, NULL, 'Agregar informes rol socio', NULL, 'informesAdd', 2),
(48, 'Editar informes rol socio', 'veradiz.html#/informessEdit/', 0, 28, 1, NULL, NULL, 'Editar informes rol socio', NULL, 'informessEdit', 2),
(49, 'Tipo de informe', 'veradiz#/clientesinformesTipo/', 0, 30, 1, NULL, NULL, 'Tipo de informe', NULL, 'clientesinformesTipo', 4),
(50, 'Cetes', 'veradiz.html#/cetes', 0, 35, 1, NULL, NULL, 'Cetes', NULL, 'cetes', 1),
(51, 'Cetes', 'veradiz.html#/cetes', 0, 36, 1, NULL, NULL, 'Cetes', NULL, 'cetes', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `funciones`
--
ALTER TABLE `funciones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `funciones`
--
ALTER TABLE `funciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
