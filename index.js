var Stomp = require('stompjs');
var prompt = require('prompt');


  var schema = {
    properties: {
      agents: {
        pattern: /^[0-9\s\-]+$/,
        message: 'Enter number of agents',
        required: true
      },
      tps: {
        pattern: /^[0-9\s\-]+$/,
        message: 'Enter number for transactions per second',
        required: true
      }
    }
  };


prompt.start();

 prompt.get(schema, function (err, result) {
    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('  agents: ' + result.agents);
    console.log('  tps: ' + result.tps);

var client = Stomp.overWS('ws://192.168.0.108:15674/ws');

client.connect('guest', 'guest', function(frame) {
  console.log('connected to Stomp');

  client.subscribe('/queue/myqueue', function(message) {
    console.log("received message " + message.body);

    // once we get a message, the client disconnects
    client.disconnect();
  });
  
  console.log ('sending a message');
  client.send('/queue/myqueue', {}, 'Hello, node.js!');
});


  });
  
  



