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
		mysqli_query($con, "SELECT id_funcionario, nome_funcionario, endereco_funcionario, cidade_funcionario, estado_funcionario, cargo_funcionario, data_admissao_funcionario, data_demissao_funcionario FROM funcionarios ORDER BY nome_funcionario, data_demissao_funcionario ASC")
    );

    $rModif = [];
    foreach ($r as $k) {
        array_push($rModif, [
            'id'=> $k[0],
            'nome'=> $k[1],
            'endereco'=> $k[2],
            'cidade'=> $k[3],
            'estado'=> $k[4],
            'cargo'=> $k[5],
            'admissao'=> $k[6],
            'demissao'=> $k[7],
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
        'id'=> $_GET['id'],
        'nome'=> $_GET['nome'],
        'cargo'=> $_GET['cargo'],
        'endereco'=> $_GET['endereco'],
        'cidade'=> $_GET['cidade'],
        'estado'=> $_GET['estado'],
        'admissao'=> $_GET['admissao'],
        'demissao'=> $_GET['demissao'],
    ];

    if (array_key_exists('id', $data)) {
        $ret = update($data);
    } else {
        $ret = create($data);
    }

    echo json_encode(['success'=> $ret]);
    return true;
}

function update($data) {
    $con = dbConnect();
    $r = mysqli_query($con, "UPDATE funcionarios SET nome_funcionario = '".$data['nome']."', endereco_funcionario = '".$data['endereco']."', cidade_funcionario = '".$data['cidade']."', estado_funcionario = '".$data['estado']."', cargo_funcionario = '".$data['cargo']."', data_admissao_funcionario = '".$data['admissao']."', data_demissao_funcionario = '".$data['demissao']."' WHERE id_funcionario = '".$data['id']."';");
    $con->close();
    return $r;
}

function create($data) {
    $con = dbConnect();
    $r = mysqli_query($con, "INSERT INTO funcionarios (nome_funcionario, endereco_funcionario, cidade_funcionario, estado_funcionario, cargo_funcionario, data_admissao_funcionario, data_demissao_funcionario) VALUES ('".$data['nome']."','".$data['endereco']."','".$data['cidade']."','".$data['estado']."','".$data['cargo']."','".$data['admissao']."','".$data['demissao']."');");
    $con->close();
    return $r;
}
