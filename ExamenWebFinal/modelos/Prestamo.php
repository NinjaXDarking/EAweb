<?php 
//Incluímos inicialmente la conexión a la base de datos
require "../config/Conexion.php";

Class Prestamo
{
	//Implementamos nuestro constructor
	public function __construct()
	{

	}

	//Implementamos un método para insertar registros
	public function insertar($id, $idLibro,$idUsuario, $fechaPrestamo, $fechaDevolucion )
	{
	
		// Preparar la consulta SQL con valores escapados
		$sql = "INSERT INTO prestamos (Id, IdLibro, IdUsuario, FechaPrestamo, FechaDevolucion)
		VALUES ('$id', '$idLibro', '$idUsuario', '$fechaPrestamo', '$fechaDevolucion')";
	
		// Llamar a la función EjecutarConsulta (asumo que existe)
		return EjecutarConsulta($sql);
	}

	//Implementamos un método para editar registros
	public function editar($Id, $IdLibro,$IdUsuario, $FechaPrestamo, $FechaDevolucion )
	{
		$sql="UPDATE prestamos SET Id='$Id', IdLibro='$IdLibro', IdUsuario='$IdUsuario', FechaPrestamo='$FechaPrestamo', FechaDevolucion='$FechaDevolucion' WHERE Id='$Id' ";
		return EjecutarConsulta($sql);
	}

	//Implementamos un método para eliminar registros
	public function eliminar($Id)
	{	$sql="DELETE FROM prestamos WHERE Id='$Id'";
		return EjecutarConsulta($sql);
	}

	//Implementar un método para mostrar los datos de un registro especifico
	public function mostrar($Id)
	{
		$sql="SELECT * FROM prestamos WHERE Id='$Id'";
		return EjecutarConsulta($sql);		
	}

	//Implementar un método para listar los registros
	public function listar()
	{
		$sql="SELECT * FROM prestamos";
		return EjecutarConsulta($sql);		
	}
	public function listarid($Id)
	{
		$sql="SELECT * FROM prestamos WHERE Id='$Id'";
		return EjecutarConsulta($sql);		
	}
	
}

?>