<?php
include("../_config.php");
include("../_db-functions.php");

header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'salvar') {
            createOrUpdate();
        } else {
            getList();
        }
        break;
    case 'POST':
        createOrUpdate();
        break;
    default:
        if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'salvar') {
            createOrUpdate();
        } else {
            getList();
        }
        break;
}

function getList() {
    $con = dbConnect();
	$r = dbGetContent(
		mysqli_query($con, "SELECT id_cliente, nome_cliente, endereco_cliente, cidade_cliente, estado_cliente, `e-mail`, telefone_cliente, status_cliente FROM clientes ORDER BY nome_cliente, status_cliente ASC")
    );

    $rModif = [];
    foreach ($r as $k) {
        array_push($rModif, [
            'id'=> $k[0],
            'nome'=> $k[1],
            'endereco'=> $k[2],
            'cidade'=> $k[3],
            'estado'=> $k[4],
            'email'=> $k[5],
            'telefone'=> $k[6],
            'status'=> $k[7],
        ]);
    }

    $con->close();
    echo json_encode($rModif);
    return true;
}

function createOrUpdate() {
    // $data = json_decode(file_get_contents('php://input'), true);
    // $ret = $data;

    $data = [        
        'nome'=> $_GET['nome'],
        'telefone'=> $_GET['telefone'],
        'endereco'=> $_GET['endereco'],
        'cidade'=> $_GET['cidade'],
        'estado'=> $_GET['estado'],
        'email'=> $_GET['email'],
    ];

    if (isset($_GET['id'])) {
        $data['id'] = $_GET['id'];
    }

    if (array_key_exists('id', $data)) {
        $ret = update($data);
    } else {
        $ret = create($data);
    }

    echo json_encode(['success'=> $ret]);
    return true;
}

function update($data) {
    echo "update \n";
    echo "UPDATE clientes SET nome_cliente = '".$data['nome']."', endereco_cliente = '".$data['endereco']."', cidade_cliente = '".$data['cidade']."', estado_cliente = '".$data['estado']."', `e-mail` = '".$data['email']."', telefone_cliente = '".$data['telefone']."' WHERE id_cliente = '".$data['id']."';\n";
    $con = dbConnect();
	$r = mysqli_query($con, "UPDATE clientes SET nome_cliente = '".$data['nome']."', endereco_cliente = '".$data['endereco']."', cidade_cliente = '".$data['cidade']."', estado_cliente = '".$data['estado']."', `e-mail` = '".$data['email']."', telefone_cliente = '".$data['telefone']."' WHERE id_cliente = '".$data['id']."';");
    $con->close();
    return $r;
}

function create($data) {
    $con = dbConnect();
    $r = mysqli_query($con, "INSERT INTO clientes (nome_cliente, endereco_cliente, cidade_cliente, estado_cliente, `e-mail`, telefone_cliente) VALUES ('".$data['nome']."','".$data['endereco']."','".$data['cidade']."','".$data['estado']."','".$data['email']."','".$data['telefone']."');");
    $con->close();
    return $r;
}
