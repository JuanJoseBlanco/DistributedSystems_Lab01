#!/bin/bash

watch -n 1 "(date '+TIME:%H:%M:%S'; echo 'Server1' ; curl 192.168.1.188:3000; echo '' ;echo 'Server2' ; curl 192.168.1.168:3000 ; echo '') >> log.txt"
