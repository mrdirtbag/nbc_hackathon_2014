#!/usr/bin/python

import sys
import urllib
import json
from pprint import pprint

newpage=[] 

for page in range(1,57):

	json_data=open('page' + str(page) + '.json')

	data = json.load(json_data)
	json_data.close()

	newpage = newpage + data['views']['entities']['data']

with open('total.json','w') as outfile:
	json.dump(newpage, outfile)

