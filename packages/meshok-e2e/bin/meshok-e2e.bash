#!/usr/bin/env bash

MESHOK_E2E_PACKAGE_PATH=$(dirname "$(readlink -f "$0")")/..

appropriate_children_of_pid()
{
	local PID=${1}
	local CMD=$(ps -p ${PID} -o cmd=)

	local CHILDREN=$(ps -o pid= --ppid ${PID})

	for CHILDREN_PID in ${CHILDREN}; do
		appropriate_children_of_pid ${CHILDREN_PID}
	done

	if [[ ${CMD} == *http-server* ]] \
	|| [[ ${CMD} == *webpack-dev-server* ]] \
	|| [[ ${CMD} == *start.js* ]]
	then
		echo ${PID}
	fi
}

yarn run ${1} &

pushd ${MESHOK_E2E_PACKAGE_PATH}

yarn wait-on --timeout=60000 ${2}
yarn start

ERROR_LEVEL=$?

popd

CHILDREN=$(appropriate_children_of_pid $!)
read GRANDCHILD __ <<< ${CHILDREN}
echo PID to send Ctrl+C: ${GRANDCHILD}
kill -s INT ${GRANDCHILD}
wait $!

exit ${ERROR_LEVEL}
