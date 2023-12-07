<?php 
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Id");
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
// Obtiene el contenido JSON desde el cuerpo de la solicitud
$jsonData = file_get_contents('php://input');
// Datos estáticos para prueba
//$jsonData = '{"id": 1, "nombre": "Juan"}';
// Decodifica el JSON a un array de PHP
$data = json_decode($jsonData, true);
require_once "../modelos/Prestamo.php";
$prestamo=new Prestamo();

$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case 'GET':
        // Lógica para el método GET
        
        $id = isset($_GET['Id']) ? $_GET['Id'] : '';
		if($id !== ''){
			$op = 'mostrar';
		}else{
			$op = 'listar';
		}
        break;
    case 'POST':
        // Lógica para el método POST
        $op = 'insertar';
        $id = isset($data['Id']) ? $data['Id'] : '';
        $idLibro = isset($data['IdLibro']) ? $data['IdLibro'] : '';
        $idUsuario = isset($data['IdUsuario']) ? $data['IdUsuario'] : '';
        $fechaPrestamo = isset($data['FechaPrestamo']) ? $data['FechaPrestamo'] : '';
        $fechaDevolucion = isset($data['FechaDevolucion']) ? $data['FechaDevolucion'] : '';
        break;
    case 'PUT':
        // Lógica para el método PUT
        $op = 'actualizar';
        $id = isset($data['Id']) ? $data['Id'] : '';
        $idLibro = isset($data['IdLibro']) ? $data['IdLibro'] : '';
        $idUsuario = isset($data['IdUsuario']) ? $data['IdUsuario'] : '';
        $fechaPrestamo = isset($data['FechaPrestamo']) ? $data['FechaPrestamo'] : '';
        $fechaDevolucion = isset($data['FechaDevolucion']) ? $data['FechaDevolucion'] : '';
        break;
    case 'DELETE':
        // Lógica para el método DELETE
		$headers = getallheaders();
		$id = isset($headers['Id']) ? $headers['Id'] : '';
        $op = 'eliminar';
        // $id = isset($_GET['Id']) ? $_GET['Id'] : '';
        break;
    default:
        echo json_encode(["error" => "Método HTTP no válido"]);
        exit;
}




switch ($op){
	case 'insertar':
		$rspta=$prestamo->insertar($id, $idLibro,$idUsuario, $fechaPrestamo, $fechaDevolucion);
		echo json_encode($rspta ? ["mensaje" => "Prestamo registrado"] : ["error" => "Prestamo no se pudo registrar"]);					
		break;
	case 'actualizar':
		$rspta=$prestamo->editar($id, $idLibro,$idUsuario, $fechaPrestamo, $fechaDevolucion);
		echo json_encode($rspta ? ["mensaje" => "Prestamo actualizado"] : ["error" => "Prestamo no se pudo actualizar"]);
		break;
	case 'eliminar':
		$rspta = $prestamo->listarId($id);
		if ($rspta->num_rows > 0) {
			$rspta=$prestamo->eliminar($id);
			echo json_encode($rspta ? ["mensaje" => "Prestamo eliminado"] : ["error" => "El prestamo no se pudo eliminar"]);
		}else{
			echo json_encode(["mensaje" => "No hay registros"]);
		}
		break;
	case 'listar':
		$rspta = $prestamo->listar();
		if ($rspta->num_rows > 0) {
			$data = array();
			while ($row = $rspta->fetch_assoc()) {
				$data[] = $row;
			}
			$rspta->free();
			echo json_encode($data);
		}else{
			echo json_encode(["mensaje" => "No hay registros"]);
		}
		break;
	case 'mostrar':
		$rspta = $prestamo->listarId($id);
		if ($rspta->num_rows > 0) {
			$data = array();
			while ($row = $rspta->fetch_assoc()) {
				$data[] = $row;
			}
			$rspta->free();
			echo json_encode($data);
		}else{
			echo json_encode(["mensaje" => "No hay registros"]);
		}
		break;
	default:
		echo json_encode(["error" => "Operación no válida"]);
		break;
}
?>