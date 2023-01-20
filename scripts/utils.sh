#!/bin/bash

LOG_FILE=$0.log

# Color
RED='\033[1;91m'
GREEN='\033[1;92m'
YELLOW='\033[1;93m'
BLUE='\033[1;94m'
MAGENTA='\033[1;95m'
CYAN='\033[1;96m'
NC='\033[0m'

function red {
    printf "${RED}$@${NC}\n"
}

function green {
    printf "${GREEN}$@${NC}\n"
}

function yellow {
    printf "${YELLOW}$@${NC}\n"
}

function blue {
    printf "${BLUE}$@${NC}\n"
}

function magenta {
    printf "${MAGENTA}$@${NC}\n"
}

function cyan {
    printf "${CYAN}$@${NC}\n"
}

# print a message on stderr, stdout needs to be kept for return values
# $* - messages to print
print() {
    echo >&2 $*
}

# print an ERROR log
# $* - messages to print
log_error() {
    print $(red "$*")
}

# print a WARNING log
# $* - messages to print
log_warning() {
    print $(yellow "$*")
}

# print a SUCCESS log
# $* - messages to print
log_success() {
    print $(green "$*")
}

# print an INFO log
# $* - messages to print
log_info() {
    print $(magenta "$*")
}

# print a command line
# $* - messages to print
log_command() {
    print $(cyan "> $*")
}

# print a red error message and exit
# $* - messages to print
exit_error() {
    [ $# -gt 0 ] && log_error $*
    exit 1
}

# print a green success message and exit
exit_success() {
    log_success "🎉 All done!"
    exit 0
}

# ask a yes/no question to the user
# $1 - question to ask
# Returns 0 (success) if answer is yes, 1 (error) if answer is no
ask() {
    msg=$1
    [[ $AUTO_YES == "true" ]] && return 0
    while true; do
        question=$(magenta "$msg ? [yn] ")
        read -p "$question" yn
        case $yn in
            [Yy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) print "Please answer yes or no.";;
        esac
    done
}

# print and execute a command
# $* - command line to execute
execute() {
    cmd=$*
    log_command $cmd
    eval 2>&1 $cmd | tee >&2 $LOG_FILE
    return ${PIPESTATUS[0]}
}

check_command() {
    command=$1
    which $command > /dev/null || exit_error "'$command' not found. Please install it first."
}
