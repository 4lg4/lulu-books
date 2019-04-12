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
		mysqli_query($con, "SELECT id_livro, nome_livro, autor_livro, ano_livro, genero_livro, editora_livro, status_livro FROM livros ORDER BY nome_livro ASC")
    );

    $rModif = [];
    foreach ($r as $k) {
        array_push($rModif, [
            'id'=> $k[0],
            'nome'=> $k[1],
            'autor'=> $k[2],
            'ano'=> $k[3],
            'genero'=> $k[4],
            'editora'=> $k[5],
            'status'=> $k[6],
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
        'autor'=> $_GET['autor'],
        'ano'=> $_GET['ano'],
        'genero'=> $_GET['genero'],
        'estado'=> $_GET['estado'],
        'editora'=> $_GET['editora'],
        'status'=> $_GET['status'],
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
    $r = mysqli_query($con, "UPDATE livros SET nome_livro = '".$data['nome']."', autor_livro = '".$data['autor']."', ano_livro = '".$data['ano']."', genero_livro = '".$data['genero']."', editora_livro = '".$data['editora']."', status_livro = '".$data['status']."' WHERE id_livro = '".$data['id']."';");
    $con->close();
    return $r;
}

function create($data) {
    $con = dbConnect();
    $r = mysqli_query($con, "INSERT INTO livros (nome_livro, autor_livro, ano_livro, genero_livro, editora_livro, status_livro) VALUES ('".$data['nome']."','".$data['autor']."','".$data['ano']."','".$data['genero']."','".$data['editora']."','".$data['status']."');");
    $con->close();
    return $r;
}
