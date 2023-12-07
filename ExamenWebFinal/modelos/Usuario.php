<?php 
//Incluímos inicialmente la conexión a la base de datos
require "../config/Conexion.php";

Class Usuario
{
	//Implementamos nuestro constructor
	public function __construct()
	{

	}

	//Implementamos un método para insertar registros
	public function insertar($Id, $Nombre,$Apellido, $Direccion, $NumeroTelefono, $Email )
	{
		$sql="INSERT INTO usuarios (Id,Nombre,Apellido,Direccion,NumeroTelefono,Email)
		VALUES ($Id, '$Nombre', '$Apellido', '$Direccion', '$NumeroTelefono', '$Email')";
		return EjecutarConsulta($sql);
	}

	//Implementamos un método para editar registros
	public function editar($Id, $Nombre, $Apellido, $Direccion, $NumeroTelefono, $Email )
	{
        $sql="UPDATE usuarios SET Id=$Id, Nombre='$Nombre', Apellido='$Apellido', Direccion='$Direccion', NumeroTelefono='$NumeroTelefono', Email='$Email' WHERE Id='$Id'";
		return EjecutarConsulta($sql);
    }
		

	// Implementamos un método para eliminar registros
	public function eliminar($Id)
	{	$sql="DELETE FROM usuarios WHERE Id='$Id'";
		return EjecutarConsulta($sql);
	}

	//Implementar un método para mostrar los datos de un registro especifico
	public function mostrar($Id)
	{
		$sql="SELECT * FROM usuarios WHERE Id='$Id'";
		return EjecutarConsulta($sql);		
	}

	//Implementar un método para listar los registros
	public function listar()
	{
		$sql="SELECT * FROM usuarios";
		return EjecutarConsulta($sql);		
	}
	public function listarid($Id)
	{
		$sql="SELECT * FROM usuarios WHERE Id='$Id'";
		return EjecutarConsulta($sql);		
	}
	
}

?>