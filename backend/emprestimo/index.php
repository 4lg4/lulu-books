<?php
include("../_config.php");
include("../_db-functions.php");

header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'salvar') {
            createOrUpdate();
        } else if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'deletar') {
            delete();
        } else {
            getList();
        }
        break;
    case 'POST':
        createOrUpdate();
        break;
    case 'DELETE':
        delete();
        break;
    default:
        if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'salvar') {
            createOrUpdate();
        } else if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'deletar') {
            delete();
        } else {
            getList();
        }
        break;
}

function getList() {
    $con = dbConnect();
	$r = dbGetContent(
		mysqli_query($con, "SELECT e.id_emprestimo, e.id_livro, l.nome_livro, e.id_cliente, c.nome_cliente, e.id_funcionario, f.nome_funcionario, e.data_emprestimo FROM emprestimos e LEFT JOIN funcionarios f on f.id_funcionario = e.id_funcionario LEFT JOIN clientes c on c.id_cliente = e.id_cliente LEFT JOIN livros l on l.id_livro = e.id_livro ORDER BY c.nome_cliente, e.data_emprestimo ASC")
    );

    $rModif = [];
    foreach ($r as $k) {
        array_push($rModif, [
            'id'=> $k[0],
            'livroId'=> $k[1],
            'livroNome'=> $k[2],
            'clienteId'=> $k[3],
            'clienteNome'=> $k[4],
            'funcionarioId'=> $k[5],
            'funcionarioNome'=> $k[6],
            'emprestimo'=> $k[7],
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
        'livroId'=> $_GET['livroId'],
        'clienteId'=> $_GET['clienteId'],
        'funcionarioId'=> $_GET['funcionarioId'],
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
    $con = dbConnect();
    $r = mysqli_query($con, "UPDATE emprestimos SET nome_emprestimo = '".$data['nome']."', autor_emprestimo = '".$data['autor']."', ano_emprestimo = '".$data['ano']."', genero_emprestimo = '".$data['genero']."', editora_emprestimo = '".$data['editora']."', status_emprestimo = '".$data['status']."' WHERE id_emprestimo = '".$data['id']."';");
    $con->close();
    return $r;
}

function create($data) {
    $con = dbConnect();
    $r = mysqli_query($con, "INSERT INTO emprestimos (id_livro, id_cliente, id_funcionario, data_emprestimo) VALUES ('".$data['livroId']."','".$data['clienteId']."','".$data['funcionarioId']."','".date('Y-m-d H:i:s')."');");
    $con->close();
    return $r;
}

function delete() {
    $con = dbConnect();
    $r = mysqli_query($con, "DELETE FROM emprestimos WHERE id_emprestimo = '".$_GET['id']."'");
    $con->close();
//    return $r;
    echo json_encode(['success'=> true]);
    return true;
}
