<?php

function dbConnect(){
	$con  =  mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_DB);
	
	if(!$con){
		echo "<h2>Erro na conexao com a base dados...</h2>"; 
		echo "<h2> Erro " . mysqli_connect_errno() . ".</h2>";
		die();
	}
	$con->set_charset("utf8");
	return $con;
}

function dbGetContent($consulta){
	$i = 0;
	$tab = "";
	$results = [];

	while( $row = mysqli_fetch_array($consulta, MYSQLI_NUM) ) {
		array_push($results, $row);
	}

	return $results;
}

function dbScapeString($string) {
	return mysqli_real_escape_string($string);
}

function dbGetTable($tabela){
	$con = conectaDB();				
	$result  =  mysqli_query($con, "SELECT nome FROM ".$tabela);
	$retData  =  array();
	while( $row = mysqli_fetch_array($result, MYSQLI_NUM) ){
		$retData[] = $row[0];
	}
	echo json_encode($retData);
	$con->close();
}
