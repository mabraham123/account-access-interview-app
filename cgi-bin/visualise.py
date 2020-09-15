#!/usr/bin/env python2

import json
import cgi
import cgitb
cgitb.enable()
import subprocess

from family import *
from access_graph import *

dot = '"C:/Program Files (x86)/Graphviz2.38/bin/dot.exe"'


emptyresult='''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Title: AccessGraph Pages: 1 -->
<svg width="10pt" height="10pt"
 viewBox="0.00 0.00 10.00 10.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
</svg>'''

def get_access_graph_from_dict(data):
    AG = {}

    for k in data:
        v = data[k]
        AG[k] = { 'label': v['name'], 'type': v['type'], 'incoming': {} }
        c = 0
        if 'incoming' in v:
            for e in v['incoming']:
                c += 1
                prefix = ''
                if e['recovery']:
                    prefix = 'rec'
                AG[k]['incoming']["{}{}".format(prefix,c)] = e["needed"]
        if 'opensessions' in v:
            prefix = 'ses'
            for e in v['opensessions']:
                c += 1
                AG[k]['incoming']["{}{}".format(prefix,c)] = [e]

    return AccessGraph(AG)

def get_access_graph_from_json(data):
    return get_access_graph_from_dict(json.loads(data))

def run_dot(s):

    p = subprocess.Popen(dot+u' -Tsvg', shell=True,\
    stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    (stdout,stderr) = p.communicate(s)
    return stdout


form = cgi.FieldStorage()
print("Content-Type: image/svg+xml")
print("")

value=form.value



if form.value != "":
    #data = form['graph'].value
    #data=form.getvalue('graph')
    # data= form['graph']
    #data='{"Device: iphone":{"name":"iphone","type":"Device","ViewWhenLocked":"","incoming":[{"recovery":true,"needed":["Password: pwd1"]}]},"Password: pwd1":{"name":"pwd1","type":"Password","ViewWhenLocked":"","incoming":[],"strength":"average"}}'
    #data=form.getvalue('graph', "0")
    data=form.value[6:]

    try:
        AG = get_access_graph_from_json(data)
        print run_dot(AG.dotOutput())
        
    except:
        print(emptyresult)    
else:
    print(emptyresult)
