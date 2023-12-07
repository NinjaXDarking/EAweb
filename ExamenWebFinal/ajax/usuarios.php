<?php 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');
// Obtiene el contenido JSON desde el cuerpo de la solicitud
$jsonData = file_get_contents('php://input');
// Datos estáticos para prueba
//$jsonData = '{"id": 1, "nombre": "Juan"}';
// Decodifica el JSON a un array de PHP
$data = json_decode($jsonData, true);
require_once "../modelos/Usuario.php";
$usuario=new Usuario();
$op = isset($_GET['op']) ? $_GET['op'] : '';
$id = isset($data['Id']) ? $data['Id'] : '';
$Nombre = isset($data['Nombre']) ? $data['Nombre'] : '';
$Apellido = isset($data['Apellido']) ? $data['Apellido'] : '';
$Direccion = isset($data['Direccion']) ? $data['Direccion'] : '';
$NumeroTelefono = isset($data['NumeroTelefono']) ? $data['NumeroTelefono'] : '';
$Email = isset($data['Email']) ? $data['Email'] : '';

switch ($op){
	case 'insertar':
		
		
			$rspta=$usuario->insertar($id, $Nombre,$Apellido, $Direccion, $NumeroTelefono, $Email);
			echo json_encode($rspta ? ["mensaje" => "Prestamo registrado"] : ["error" => "Prestamo no se pudo registrar"]);
			
			break;
			

		case 'actualizar':
			$rspta=$usuario->editar($id, $Nombre,$Apellido, $Direccion, $NumeroTelefono, $Email);
			echo json_encode($rspta ? ["mensaje" => "Prestamo actualizado"] : ["error" => "Prestamo no se pudo actualizar"]);
		
			break;

			case 'eliminar':
				$rspta=$usuario->eliminar($id);
				echo json_encode($rspta ? ["mensaje" => "Prestamo eliminado"] : ["error" => "El prestamo no se pudo eliminar"]);
			
				break;

	   case 'listar':
			$rspta = $usuario->listar();
			// Verifica si se obtuvieron resultados
			if ($rspta->num_rows > 0) 
			{
				// Inicializa un array para almacenar los resultados
				$data = array();
		
				// Obtiene cada fila como un array asociativo
				while ($row = $rspta->fetch_assoc()) {
					$data[] = $row;
				}
		
				// Libera la memoria de los resultados
				$rspta->free();
		
			// Devuelve el array de datos en Json
			echo json_encode($data);
		    }
			else
			{
				echo json_encode(["mensaje" => "No hay registros"]);
			}

			break;

		case 'listarId':
				$rspta = $usuario->listarId($id);
				// Verifica si se obtuvieron resultados
				if ($rspta->num_rows > 0) 
				{
					// Inicializa un array para almacenar los resultados
					$data = array();
			
					// Obtiene cada fila como un array asociativo
					while ($row = $rspta->fetch_assoc()) {
						$data[] = $row;
					}
			
					// Libera la memoria de los resultados
					$rspta->free();
			
				// Devuelve el array de datos en Json
				echo json_encode($data);
				}
				else
				{
					echo json_encode(["mensaje" => "No hay registros"]);
				}
	
				break;
		
		default:
				echo json_encode(["error" => "Operación no válida"]);
				break;
}
?>