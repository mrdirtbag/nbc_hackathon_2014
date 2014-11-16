#!/usr/bin/python

import sys
import urllib
import json
from pprint import pprint

json_data=open('page' + str(sys.argv[1]) + '.json')

data = json.load(json_data)
#pprint(data)
json_data.close()

entities = data['views']['entities']['data']

print len(entities)
