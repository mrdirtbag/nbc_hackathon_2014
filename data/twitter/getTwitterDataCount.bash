#!/bin/bash
TOTAL=$1
PAGINATION=TEST
total=0
for i in `seq 1 $TOTAL`;
do
	count=`./parseForTwitterCount.py $i`
        echo $count
done
