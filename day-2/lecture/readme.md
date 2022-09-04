# http node.js

- HTTP -> browser and the server
- client and server

#### Some protocols are used for communicating b/w client and server

- three way handshake
  clien server
  mybrowser masaischool.com

c ----> s
express the intent to communicate
e.g. wave or call for auto
s ----> c
acknowledges the intent
e.g. nods his head, slows down, acknowledge that I will go where you want to go.
c ----> s
I want so and so
e.g. you give the location where you want to go.

#### TCP AND UDP

- TCP transmission control protocol
- UDP user diagram protocol

###### HTTP operates over TCP

- TCP -nothing will be lost,but there can be delay e.g youtube video, whatsapp message , email, slack message
- UDP - loss is fine, but there should not be delay e.g live stream,games like mili militia
- ZOOM uses both TCP and UDP

- 4GB file - huge file on server and client needs it (downloads) , it take time to download. why?
- It breaks down in small packets and that is being sent.
  like a sent, b sent, c sent ==================== a collected, b collected, c collected
- like chunks/pieces of data

###### http verbs -

what is verb : verb means action, that means actions performed using http
also called http methods

- GET - get data from server
- POST - add data to server
- PATCH - modify some data available on server
- PUT - replace the whole data with new data if ID available else create a new data with that ID
- DELETE - delete the data on  server

###### headers -
- other info (extra) with http verbs
- e.g.
    1. content-type:application/json
    2. token: bearer asdfjadkj;lkjd;l
- headers are on both sides response and request
- https + s (secure);

- what is callback function :- a function passed as an argument to another function

