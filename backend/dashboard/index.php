<?php
include("../_config.php");
include("../_db-functions.php");

header('Content-Type: application/json');

get();

function get() {
    $con = dbConnect();
	$r = dbGetContent(
		mysqli_query($con, "SELECT (SELECT COUNT(*) FROM emprestimos) as emprestimos, (SELECT COUNT(*) FROM livros) as livros, (SELECT COUNT(*) FROM clientes) as clientes, (SELECT COUNT(*) FROM funcionarios WHERE data_demissao_funcionario is NULL) as funcionarios, (SELECT COUNT(*) FROM funcionarios WHERE data_demissao_funcionario is not NULL) as funcionarios_inativo")
    );

    $rModif = [];
    foreach ($r as $k) {
        array_push($rModif, [
            'emprestimos'=> $k[0],
            'livros'=> $k[1],
            'clientes'=> $k[2],
            'funcionarios'=> $k[3],
            'funcionarios_inativo'=> $k[4],
        ]);
    }

    $con->close();
    echo json_encode($rModif[0]);
    return true;
}
