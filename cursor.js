// create instance of kinet with custom settings
var kinet = new Kinet({
    acceleration: 0.36,
    friction: 0.20,
    names: ["x", "y"],
  });
  
  // select circle element
  var circle = document.getElementById('circle');
  
  // set handler on kinet tick event
  kinet.on('tick', function(instances) {
    circle.style.transform = `translate3d(${ (instances.x.current) }px, ${ (instances.y.current) }px, 0) rotateX(${ (instances.x.velocity/2) }deg) rotateY(${ (instances.y.velocity/2) }deg)`;
  });
  

