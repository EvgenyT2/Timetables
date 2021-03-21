# Timetables

## Simple solution for requesting latitude and longitude according to address input from HSL's geolocation API and requesting public transport route plan according to address.
## I encountered a problem with executing address HTTP requests at same time with route plan request in actions, didn't found quick solution, so here is simple solution of task.
## Problem was that all actions were executed at same time, so route planner action didn't get address before execution.
## Correct way to implement this task would probably be to create reducer, action, etc... for each request.
## Additionally didn't found solution how to convert HSL offered time format ("startTime": 1616328990000,) to readable time format. 
## Current implementation getting route plan only accordig to current time.