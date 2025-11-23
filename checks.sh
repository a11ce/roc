#!/bin/bash

run_check() {
    local success_msg="$1"
    shift

    local output
    output=$(FORCE_COLOR=1 "$@" 2>&1)
    local exit_code=$?

    if [ $exit_code -ne 0 ]; then
        # Show the captured output
        echo "$output"
        exit $exit_code
    else
        echo "$success_msg"
    fi
}

run_check "Format OK." pnpm format --log-level error
run_check "Typecheck OK." tsc
