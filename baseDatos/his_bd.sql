-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2025 a las 20:35:21
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `his_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ala`
--

CREATE TABLE `ala` (
  `ID_ala` int(11) NOT NULL,
  `Sector` varchar(200) NOT NULL,
  `Ubicacion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ala`
--

INSERT INTO `ala` (`ID_ala`, `Sector`, `Ubicacion`) VALUES
(1, 'Urgencias', 'ala este'),
(2, 'Cirugias', 'ala norte'),
(3, 'terapia intermedia', 'ala sur'),
(4, 'terapia intensiva(UCI)', 'ala oeste');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `antecedentes_paciente`
--

CREATE TABLE `antecedentes_paciente` (
  `ID` int(11) NOT NULL,
  `ID_paciente` int(11) NOT NULL,
  `Enfermedad` varchar(200) DEFAULT NULL,
  `Tipo` varchar(200) DEFAULT NULL,
  `Observaciones` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `antecendentes_paciente`
--

CREATE TABLE `antecendentes_paciente` (
  `ID` int(11) NOT NULL,
  `Enfermedad` varchar(255) DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `Observaciones` varchar(255) DEFAULT NULL,
  `ID_paciente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atenciones`
--

CREATE TABLE `atenciones` (
  `ID_paciente` int(11) NOT NULL,
  `ID_Profesional` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Motivo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camas`
--

CREATE TABLE `camas` (
  `ID_hab` int(11) NOT NULL,
  `ID_cama` int(11) NOT NULL,
  `Numero` int(11) NOT NULL,
  `Estado` varchar(200) NOT NULL,
  `Sexo_ocupante` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camas`
--

INSERT INTO `camas` (`ID_hab`, `ID_cama`, `Numero`, `Estado`, `Sexo_ocupante`) VALUES
(1, 1, 1, 'Ocupada', 'masculino'),
(1, 2, 2, 'Ocupada', 'masculino'),
(2, 3, 1, 'Libre', NULL),
(3, 4, 1, 'Libre', NULL),
(3, 5, 2, 'Libre', NULL),
(4, 6, 1, 'Libre', NULL),
(5, 7, 1, 'Libre', NULL),
(5, 8, 2, 'Libre', NULL),
(6, 9, 1, 'Libre', NULL),
(6, 10, 2, 'Libre', NULL),
(7, 11, 1, 'Libre', NULL),
(7, 12, 2, 'Libre', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_enfermeria`
--

CREATE TABLE `evaluacion_enfermeria` (
  `ID_eva` int(11) NOT NULL,
  `ID_internacion` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Necesidades_basicas` varchar(200) DEFAULT NULL,
  `Acciones_inm` varchar(200) NOT NULL,
  `Medicacion_inicial` varchar(200) DEFAULT NULL,
  `Observaciones` varchar(200) DEFAULT NULL,
  `ID_Profesional` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `ID_ala` int(11) NOT NULL,
  `ID_hab` int(11) NOT NULL,
  `numero` varchar(200) NOT NULL,
  `capacidad` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`ID_ala`, `ID_hab`, `numero`, `capacidad`) VALUES
(1, 1, '101', '2'),
(1, 2, '102', '1'),
(2, 3, '201', '2'),
(2, 4, '202', '1'),
(3, 5, '301', '2'),
(3, 6, '302', '2'),
(4, 7, '401', '2'),
(4, 8, '402', '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informes`
--

CREATE TABLE `informes` (
  `Nro_historial` int(11) NOT NULL,
  `ID_Profesional` int(11) NOT NULL,
  `ID_paciente` int(11) NOT NULL,
  `Diagnostico` varchar(200) DEFAULT NULL,
  `Descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `internacion`
--

CREATE TABLE `internacion` (
  `ID_paciente` int(11) NOT NULL,
  `ID_cama` int(11) NOT NULL,
  `ID_internacion` int(11) NOT NULL,
  `Fecha_ingreso` date NOT NULL,
  `Motivo` varchar(200) DEFAULT NULL,
  `Activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `internacion`
--

INSERT INTO `internacion` (`ID_paciente`, `ID_cama`, `ID_internacion`, `Fecha_ingreso`, `Motivo`, `Activo`) VALUES
(1, 1, 1, '2025-06-13', 'Estres y paranoia severa', 1),
(2, 2, 2, '2025-06-19', ' Accidente laboral', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicina_paciente`
--

CREATE TABLE `medicina_paciente` (
  `ID_med` int(11) NOT NULL,
  `ID_paciente` int(11) NOT NULL,
  `Medicina` varchar(200) DEFAULT NULL,
  `Origen` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obra_pacientes`
--

CREATE TABLE `obra_pacientes` (
  `ID_obra` int(11) NOT NULL,
  `ID_paciente` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `NumSocial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `obra_pacientes`
--

INSERT INTO `obra_pacientes` (`ID_obra`, `ID_paciente`, `Nombre`, `NumSocial`) VALUES
(1, 2, 'DOSEP', 760910);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observaciones_enfermeria`
--

CREATE TABLE `observaciones_enfermeria` (
  `ID` int(11) NOT NULL,
  `ID_internacion` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Presion_arterial` varchar(200) NOT NULL,
  `Frecuencia_cardiaca` varchar(200) NOT NULL,
  `Temperatura` varchar(200) NOT NULL,
  `Frecuencia_respiratoria` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `ID_paciente` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Apellido` varchar(200) NOT NULL,
  `DNI` int(8) NOT NULL,
  `Sexo` varchar(200) NOT NULL,
  `Domicilio` varchar(200) NOT NULL,
  `Telefono` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`ID_paciente`, `Nombre`, `Apellido`, `DNI`, `Sexo`, `Domicilio`, `Telefono`) VALUES
(1, 'Branguer', '91000', 46807958, 'masculino', 'Pluton', 2147483647),
(2, 'Paciente', 'Uno', 10000000, 'masculino', 'Domicilio falso', 12345678),
(3, 'Paciente', 'Dos', 20000000, 'femenino', 'Domicilio falso', 12345678),
(4, 'Paciente', 'tres', 30000000, 'masculino', 'Domicilio falso2', 246810);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesionalessalud`
--

CREATE TABLE `profesionalessalud` (
  `ID_Profesional` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Apellido` varchar(200) NOT NULL,
  `Rol` varchar(200) NOT NULL,
  `Especialidad` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesionalessalud`
--

INSERT INTO `profesionalessalud` (`ID_Profesional`, `Nombre`, `Apellido`, `Rol`, `Especialidad`) VALUES
(1, 'medico', 'numero uno', 'medico', 'cardiologia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `traslados`
--

CREATE TABLE `traslados` (
  `ID_internacion` int(11) NOT NULL,
  `ID_cama` int(11) NOT NULL,
  `ID_traslado` int(11) NOT NULL,
  `Fecha_traslado` date NOT NULL,
  `Motivo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `ID_paciente` int(11) NOT NULL,
  `ID_Profesional` int(11) NOT NULL,
  `Nro_turno` int(11) NOT NULL,
  `ObraSocial` varchar(200) NOT NULL DEFAULT 'Particular',
  `NumSocial` int(11) DEFAULT NULL,
  `Fecha` date NOT NULL,
  `Motivo` varchar(200) NOT NULL,
  `Es_tomado` tinyint(1) NOT NULL,
  `Estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`ID_paciente`, `ID_Profesional`, `Nro_turno`, `ObraSocial`, `NumSocial`, `Fecha`, `Motivo`, `Es_tomado`, `Estado`) VALUES
(2, 1, 1, 'DOSEP', 760910, '2025-06-12', 'Consulta', 0, 1),
(4, 1, 2, '', 0, '2025-07-18', 'Evaluación pre-cirugia', 0, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ala`
--
ALTER TABLE `ala`
  ADD PRIMARY KEY (`ID_ala`);

--
-- Indices de la tabla `antecedentes_paciente`
--
ALTER TABLE `antecedentes_paciente`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_paciente` (`ID_paciente`);

--
-- Indices de la tabla `antecendentes_paciente`
--
ALTER TABLE `antecendentes_paciente`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_paciente` (`ID_paciente`);

--
-- Indices de la tabla `atenciones`
--
ALTER TABLE `atenciones`
  ADD PRIMARY KEY (`ID_paciente`,`ID_Profesional`),
  ADD KEY `ID_paciente` (`ID_paciente`),
  ADD KEY `ID_Profesional` (`ID_Profesional`);

--
-- Indices de la tabla `camas`
--
ALTER TABLE `camas`
  ADD PRIMARY KEY (`ID_cama`),
  ADD KEY `ID_hab` (`ID_hab`);

--
-- Indices de la tabla `evaluacion_enfermeria`
--
ALTER TABLE `evaluacion_enfermeria`
  ADD PRIMARY KEY (`ID_eva`),
  ADD KEY `ID_internacion` (`ID_internacion`),
  ADD KEY `ID_Profesional` (`ID_Profesional`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`ID_hab`),
  ADD KEY `ID_ala` (`ID_ala`);

--
-- Indices de la tabla `informes`
--
ALTER TABLE `informes`
  ADD PRIMARY KEY (`Nro_historial`),
  ADD KEY `ID_paciente` (`ID_paciente`),
  ADD KEY `ID_Profesional` (`ID_Profesional`);

--
-- Indices de la tabla `internacion`
--
ALTER TABLE `internacion`
  ADD PRIMARY KEY (`ID_internacion`),
  ADD KEY `ID_paciente` (`ID_paciente`),
  ADD KEY `ID_cama` (`ID_cama`);

--
-- Indices de la tabla `medicina_paciente`
--
ALTER TABLE `medicina_paciente`
  ADD PRIMARY KEY (`ID_med`),
  ADD KEY `ID_paciente` (`ID_paciente`);

--
-- Indices de la tabla `obra_pacientes`
--
ALTER TABLE `obra_pacientes`
  ADD PRIMARY KEY (`ID_obra`),
  ADD KEY `ID_paciente` (`ID_paciente`);

--
-- Indices de la tabla `observaciones_enfermeria`
--
ALTER TABLE `observaciones_enfermeria`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_internacion` (`ID_internacion`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`ID_paciente`),
  ADD UNIQUE KEY `DNI` (`DNI`);

--
-- Indices de la tabla `profesionalessalud`
--
ALTER TABLE `profesionalessalud`
  ADD PRIMARY KEY (`ID_Profesional`);

--
-- Indices de la tabla `traslados`
--
ALTER TABLE `traslados`
  ADD PRIMARY KEY (`ID_traslado`),
  ADD KEY `ID_internacion` (`ID_internacion`),
  ADD KEY `ID_cama` (`ID_cama`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`Nro_turno`),
  ADD KEY `ID_paciente` (`ID_paciente`),
  ADD KEY `ID_Profesional` (`ID_Profesional`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ala`
--
ALTER TABLE `ala`
  MODIFY `ID_ala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `antecedentes_paciente`
--
ALTER TABLE `antecedentes_paciente`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `antecendentes_paciente`
--
ALTER TABLE `antecendentes_paciente`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `camas`
--
ALTER TABLE `camas`
  MODIFY `ID_cama` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `evaluacion_enfermeria`
--
ALTER TABLE `evaluacion_enfermeria`
  MODIFY `ID_eva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `ID_hab` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `informes`
--
ALTER TABLE `informes`
  MODIFY `Nro_historial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `internacion`
--
ALTER TABLE `internacion`
  MODIFY `ID_internacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `medicina_paciente`
--
ALTER TABLE `medicina_paciente`
  MODIFY `ID_med` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `obra_pacientes`
--
ALTER TABLE `obra_pacientes`
  MODIFY `ID_obra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `observaciones_enfermeria`
--
ALTER TABLE `observaciones_enfermeria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `ID_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `profesionalessalud`
--
ALTER TABLE `profesionalessalud`
  MODIFY `ID_Profesional` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `traslados`
--
ALTER TABLE `traslados`
  MODIFY `ID_traslado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `Nro_turno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `antecedentes_paciente`
--
ALTER TABLE `antecedentes_paciente`
  ADD CONSTRAINT `antecedentes_paciente_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`);

--
-- Filtros para la tabla `antecendentes_paciente`
--
ALTER TABLE `antecendentes_paciente`
  ADD CONSTRAINT `antecendentes_paciente_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `atenciones`
--
ALTER TABLE `atenciones`
  ADD CONSTRAINT `atenciones_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`),
  ADD CONSTRAINT `atenciones_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`);

--
-- Filtros para la tabla `camas`
--
ALTER TABLE `camas`
  ADD CONSTRAINT `camas_ibfk_1` FOREIGN KEY (`ID_hab`) REFERENCES `habitacion` (`ID_hab`);

--
-- Filtros para la tabla `evaluacion_enfermeria`
--
ALTER TABLE `evaluacion_enfermeria`
  ADD CONSTRAINT `evaluacion_enfermeria_ibfk_1` FOREIGN KEY (`ID_internacion`) REFERENCES `internacion` (`ID_internacion`),
  ADD CONSTRAINT `evaluacion_enfermeria_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`);

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`ID_ala`) REFERENCES `ala` (`ID_ala`);

--
-- Filtros para la tabla `informes`
--
ALTER TABLE `informes`
  ADD CONSTRAINT `informes_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`),
  ADD CONSTRAINT `informes_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`);

--
-- Filtros para la tabla `internacion`
--
ALTER TABLE `internacion`
  ADD CONSTRAINT `internacion_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`),
  ADD CONSTRAINT `internacion_ibfk_2` FOREIGN KEY (`ID_cama`) REFERENCES `camas` (`ID_cama`);

--
-- Filtros para la tabla `medicina_paciente`
--
ALTER TABLE `medicina_paciente`
  ADD CONSTRAINT `medicina_paciente_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`);

--
-- Filtros para la tabla `obra_pacientes`
--
ALTER TABLE `obra_pacientes`
  ADD CONSTRAINT `obra_pacientes_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`);

--
-- Filtros para la tabla `observaciones_enfermeria`
--
ALTER TABLE `observaciones_enfermeria`
  ADD CONSTRAINT `observaciones_enfermeria_ibfk_1` FOREIGN KEY (`ID_internacion`) REFERENCES `internacion` (`ID_internacion`);

--
-- Filtros para la tabla `traslados`
--
ALTER TABLE `traslados`
  ADD CONSTRAINT `traslados_ibfk_1` FOREIGN KEY (`ID_internacion`) REFERENCES `internacion` (`ID_internacion`),
  ADD CONSTRAINT `traslados_ibfk_2` FOREIGN KEY (`ID_cama`) REFERENCES `camas` (`ID_cama`);

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `pacientes` (`ID_paciente`),
  ADD CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`ID_Profesional`) REFERENCES `profesionalessalud` (`ID_Profesional`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
