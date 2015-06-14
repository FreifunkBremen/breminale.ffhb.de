<?php
/**
 * Settings
 */
$DEV = true;
$CACHE_UPDATE_TIME = 10;
$CACHE_PATH = '/tmp/breminale_ffhb_de.cache';
i$FB_PAGE='Breminale';

$FB_URL = 'graph.facebook.com/v2.3/'.$FB_PAGE.'/feed';
$FB_APP_ID = '378325892362983';
$FB_APP_Secret = '00e8ad973e1599c013e7728ed749bbe2';
$FB_Token = '?fields=message'.
	'&limit=250'.
	'&since=1420070400'.
	'&access_token='.$FB_APP_ID.'|'.$FB_APP_Secret;
/**
 * DECLARE CACHE
 */
$CACHE = json_decode(file_get_contents($CACHE_PATH), true);
if(($CACHE['lastUpdate']+$CACHE_UPDATE_TIME) <= (time())){
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
			$CACHE['feed'][]=$item;
		}
	}
}



/**
 * JSON-OUTPUT-Variable
 */
$OUTPUT = array();
//DEV OUTPUT
if($DEV){
	$OUTPUT['time'] = time();
	$OUTPUT['lastUpdate'] = $CACHE['lastUpdate'];
}
/**
 * Convert:
 */
$OUTPUT['Iterator'] = $CACHE['Iterator'];
$OUTPUT['feed'] = $CACHE['feed'];

/**
 * SAVE CACHE
 */
if($CACHE['change']){
	$CACHE['change'] = false;
	$CACHE['lastUpdate'] = time();
	file_put_contents($CACHE_PATH, json_encode($CACHE));
}
/**
 * JSON-OUTPUT
 */
echo json_encode($OUTPUT);
?>
