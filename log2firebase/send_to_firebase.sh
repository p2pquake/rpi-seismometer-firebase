#!/bin/bash

SENSOR_LOG_DIR=/var/rpitmp

KEYWORD=`date -d '1 minute ago' '+%H:%M:'`
FILENAME=`date -d '1 minute ago' '+%Y%m%d-%H'`
RESULT=`egrep "^${KEYWORD}" ${SENSOR_LOG_DIR}/*${FILENAME}* | cut -d: -f4 | tr '\n' ',' | sed '$s/.$//'`

TIME=`date -d '1 minute ago' '+%H:%M'`
curl -X PUT -d "{ \"${TIME}\": [${RESULT}] }" https://p2pquake.firebaseio.com/sensors/current.json?access_token=${TOKEN} > /dev/null

