<?php

// remove for production

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);



$url = 'http://api.geonames.org/srtm1JSON?formatted=true&lat=55&lng=55&username=kurcho&style=full';
// $url = 'http://api.geonames.org/srtm1JSON?lat' . $_REQUEST['lat'] . '&lng=' . $_REQUEST['lng'] . '&username=kurcho&style=full';


$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);
// echo $result;

curl_close($ch);

$decode = json_decode($result, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['lat'] = $decode['lat'];
$output['lng'] = $decode['lng'];
$output['srtm1'] = $decode['srtm1'];

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
// echo $output;

?>