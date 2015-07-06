<?php
/**
 * Settings
 */
$DEV = false;
$CACHE_UPDATE_TIME = 10000;
$CACHE_PATH = '/tmp/breminale_ffhb_de.cache';
$FB_PAGE='Breminale';

$FB_URL = 'graph.facebook.com/v2.3/'.$FB_PAGE.'/posts';
$FB_APP_ID = '378325892362983';
$FB_APP_Secret = '00e8ad973e1599c013e7728ed749bbe2';
$FB_Token = '?fields=message'.
	'&limit=250'.
	'&since=1415704271'.
	'&access_token='.$FB_APP_ID.'|'.$FB_APP_Secret;
/**
 * DECLARE CACHE
 */
$CACHE = json_decode(file_get_contents($CACHE_PATH), true);
if(($CACHE['lastUpdate']+$CACHE_UPDATE_TIME) <= (time()*1000)){
	$CACHE['change'] = true;
	/**
	 * UPDATE CACHE:
	 */
	$CACHE['Iterator']++;
	$CACHE['feed'] = array();
	$curl = curl_init();
	curl_setopt($curl,CURLOPT_URL,'https://'.$FB_URL.$FB_Token);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_BINARYTRANSFER, true);
	$request = json_decode(curl_exec($curl),true);
	curl_close($curl);
	$data = $request['data'];
	foreach ($data as $item) {
		if(isset($item['message'])){
			preg_match_all('/#(\w*[a-zA-Z_]+\w*)/',$item['message'], $matches, PREG_OFFSET_CAPTURE);
			if(count($matches[1]) > 0 ){
				$hashtags = $matches[1];
				$tags = array();
				foreach ($hashtags as $tag) {
					$tags[] = $tag[0];
				}
				$item['hashtags'] = $tags;
			}
			$item['created_time'] = strtotime($item['created_time'])*1000;
			$CACHE['feed'][]=$item;
		}
	}
	$CACHE['lastUpdate'] = time()*1000;
	$CACHE['today'] = mktime(0, 0, 0, date("m")  , date("d"), date("Y"))*1000;
}



/**
 * JSON-OUTPUT-Variable
 */
$OUTPUT = array();
$OUTPUT['time'] = time()*1000;
$OUTPUT['lastUpdate'] = $CACHE['lastUpdate'];
$OUTPUT['Iterator'] = $CACHE['Iterator'];
$OUTPUT['today'] = $CACHE['today'];
$OUTPUT['feed'] = $CACHE['feed'];
if($DEV){
	$OUTPUT['feed'][] = array(
		'id' => 'i348586768525834_959578534093318',
		'message' => 'Liebes Breminalevolk! Leider meldet der Deutsche Wetterdienst in Hamburg eine amtliche Warnung vor einsetzen, bis einsetzen. So doof das auch ist müssen wir an dieser Stelle den kunterbunten Spaß kurz unterbrechen und die Zelte aus Sicherheitsgründen schließen. Danke für euer Verständnis, wir melden sofort wenn es weitergeht. Haltet durch! ? Und wie nutzt ihr die Pause? #Breminale #Unwetter',
		'created_time' => mktime(2, 0, 0, date("m")  , date("d"), date("Y"))*1000,
		'hashtags' => array(
			'Breminale',
			'Unwetter'
		)
	);
	$OUTPUT['feed'][] = array(
		'id' => 'i348586768525834_959578534093318',
		'message' => 'Ihr Lieben, wir alle kennen ihn, den Schlaubi der alles besser weiß und den ganzen Spaß verdirbt. Also bleiben die Zelte weiterhin geschlossen, denn der Deutsche Wetterdeinst verlängert seine Warnung vor einsetzen bis einsetzten. #Breminale #Unwetter',
		'created_time' => mktime(1, 5, 0, date("m")  , date("d"), date("Y"))*1000,
		'hashtags' => array(
			'Breminale',
			'Unwetter'
		)
	);
	$OUTPUT['feed'][] = array(
		'id' => 'i348586768525834_959578534093318',
		'message' => 'Ihr tapferen Leute,
endlich ist es soweit! Der Deutsche Wetterdienst hebt seine Warnung auf und gönnt uns wieder unseren unbehinderten Spaß!  #Breminale #Wetter',
		'created_time' => mktime(3, 10, 0, date("m")  , date("d"), date("Y"))*1000,
		'hashtags' => array(
			'Breminale',
			'Wetter'
		)
	);
}
/**
 * SAVE CACHE
 */
if($CACHE['change']){
	$CACHE['change'] = false;
	$CACHE['lastUpdate'] = time()*1000;
	file_put_contents($CACHE_PATH, json_encode($CACHE));
}
/**
 * JSON-OUTPUT
 */
echo json_encode($OUTPUT);
?>
