#!/bin/bash
TOTAL=$1
let TOTAL+=4
PAGINATION=TEST
for i in `seq $1 $TOTAL`;
do
	page=`./parseForCursor.py $i`
	echo "page:" $page
	newfile="page"`expr $i + 1`".json"
	echo "newfile:" $newfile
	newurl="https://search-proxy.massrelevance.com/search.json?q=(%22el%20senor%20de%20los%20cielos%22)OR(%40srdeloscielostv)&filter.start=1411315146&filter.finish=1411919940&view.entities=true&view.entities.limit=120&view.entities.sort=created_at%20asc&view.entities.cursor="$page
	echo $newurl
	wget -O $newfile $newurl
        
done
