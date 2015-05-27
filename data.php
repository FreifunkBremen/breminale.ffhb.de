<?php
/**
 * DECLARE CACHE
 */
$DEV = true;
$CACHE_PATH = '/tmp/breminale_ffhb_de.cache';
$CACHE = json_decode(file_get_contents($CACHE_PATH), true);
$CACHE_UPDATE_TIME = 10;
if(($CACHE['lastChange']+$CACHE_UPDATE_TIME) <= (time())){
	$CACHE['change'] = true;
	/**
	 * UPDATE CACHE:
	 */
	$CACHE['Iterator']++;
}


/**
 * JSON-OUTPUT-Variable
 */
$OUTPUT = array();
//DEV OUTPUT
if($DEV){
	$OUTPUT[time] = time();
	$OUTPUT[lastChange] = $CACHE['lastChange'];
}
/**
 * Convert:
 */
$OUTPUT[Iterator] = $CACHE['Iterator'];

/**
 * SAVE CACHE
 */
if($CACHE['change']){
	$CACHE['change'] = false;
	$CACHE['lastChange'] = time();
	file_put_contents($CACHE_PATH, json_encode($CACHE));
}
/**
 * JSON-OUTPUT
 */
echo json_encode($OUTPUT);
?>
