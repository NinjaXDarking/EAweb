<?php 
require_once "global.php";//importa el archivo global para usar sus metodos si tiene 

$conexion = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);//$conexion para la base de datos

mysqli_query( $conexion, 'SET NAMES "'.DB_ENCODE.'"');//uft8 para decodificar

//Si tenemos un posible error en la conexión lo mostramos
if (mysqli_connect_errno())
{
	printf("Falló conexión a la base de datos: %s\n",mysqli_connect_error());
	exit();
}
//Ejecutar consulta insert, update, delete, select
	function EjecutarConsulta($sql)
	{
		global $conexion;

		try {
			$query = $conexion->query($sql);
			return $query;
		} catch (Exception $ex) {
			return false;
		}
		
	}

	function LimpiarCadena($str)
	{
		global $conexion;
		$str = mysqli_real_escape_string($conexion,trim($str));
		return htmlspecialchars($str);
	}

?>