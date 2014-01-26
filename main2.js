/**
 * Proyecto: Bogotá en Bola
 * Por: Javier Moreno (basado en idea gráfica de Miguel Olaya (@juglardelzipa))
 * http://finiterank.com/notas | @bluelephant
 * 20-25 de Mayo de 2012
*/

var grafoBogota = function(){
    var sys;
    return {
	init:function(){

	    // Primer menú de datos

	    $('#poblacion, #area, #suelourbano, #homicidiosdiez, #homicidiosonce').click(function(){ 
		$('div.active').removeClass('active');
		$(this).addClass('active');
		$('#source').text("");
		if($(this).attr('id')=="homicidiosdiez" || $(this).attr('id')=="homicidiosonce"){
		    $('#source').append('Aporte porcentual por localidad al total anual en la ciudad. Fuente: <a href="http://www.ceacsc.gov.co/index.php?option=com_docman&task=doc_download&gid=107&Itemid=197">CEACSC</a> (pdf)');
		} else {
		    $('#source').append('Aporte porcentual por localidad al total de la ciudad.');
		}
		grafoBogota.transformadorAbsolutos($(this).attr('id'));});

	    $('#pobresencuesta, #pobresmodelo, #indigentesmodelo').click(function(){
		$('div.active').removeClass('active');
		$(this).addClass('active');
		$('#source').text("");
		$('#source').append('Aporte porcentual por localidad al total de la ciudad.');
		grafoBogota.transformadorPorcentuales($(this).attr('id'),"poblacion");});

	    $('#telefono, #computador, #internet').click(function(){
		$('div.active').removeClass('active');
		$(this).addClass('active'); 
		$('#source').text("");
		$('#source').append('Aporte porcentual por localidad al total de la ciudad.');
		grafoBogota.transformadorPorcentuales($(this).attr('id'),"hogares");});
	   
	    // Segundo menú de datos


	    $('#pobres_encuesta_relativo, #pobres_relativo, #indigentes_relativo, #telefono_relativo, #computador_relativo, #internet_relativo').click(function(){
		$('div.active').removeClass('active');
		$(this).addClass('active');
		$('#source').text("");
		$('#source').append('Porcentaje sobre el total en la localidad.');
		grafoBogota.transformadorPorcentajeRelativo($(this).attr('title'));});


	    $('#tasa_homicidios_diez, #tasa_homicidios_once').click(function(){
		$('div.active').removeClass('active');
		$(this).addClass('active');
		 $('#source').text("");
		$('#source').append('Número de homicidios por 100 Khab (por localidad). Fuente: <a href="http://www.ceacsc.gov.co/index.php?option=com_docman&task=doc_download&gid=107&Itemid=197">CEACSC</a> (pdf)');
		grafoBogota.transformadorTasaHomicidios($(this).attr('title'));});

	    $('#analfabetismo').click(function(){
		$('div.active').removeClass('active');
		$('#analfabetismo').addClass('active'); 
		$('#source').text("");
		$('#source').append('Porcentaje por localidad de la población analfabeta mayor de 15 años. El más alto es en Usme: 3.6%');
		grafoBogota.transformadorAnalfabetismo();});


	    // Botones especiales

	    $('#otromenu').click(function(){
		if($('div.boton2').is(":hidden")) {
		    $('div.boton2').slideDown("slow");
		    $('div.boton').slideUp("slow");
		    $('#otromenu').text("Principal");
		    $('#ocultar').text("Ocultar menú");
		} else {
		    $('div.boton').slideDown("slow");
		    $('div.boton2').slideUp("slow");
		    $('#otromenu').text("Más datos");
		    $('#ocultar').text("Ocultar menú");
		}
	    });

	    $('#ocultar').click(function(){
		if($('div.boton').is(":hidden") && $('div.boton2').is(":hidden")) {
		    $('div.boton').slideDown("slow");
		    $("#otromenu").slideDown("slow");
		    $('#otromenu').text("Más datos");
		    $('#ocultar').text("Ocultar menú");
		} else {
		    $('div.boton').slideUp("slow");
		    $('div.boton2').slideUp("slow");
		    $("#otromenu").slideUp("slow");
		    $('#ocultar').text("Ver menú");
		}
	    });
	    
	    // Inicializar el generador del grafo, que llamamos sys.

	    sys = arbor.ParticleSystem({friction:0.1, stiffness: 200, repulsion:700, gravity:true, fsp: 60, dt: 0.08, precision: 1.0});
	    grafoBogota.cargarDatos();
	    sys.renderer = Generador();
	},  /* end init */ 
	cargarDatos:function(){
	    $.ajax({
		type: "GET",
		url: "datos.csv",
		dataType: "text",
		success: function(data) {grafoBogota.surtirGrafo(data);}
	    });
	},
	surtirGrafo:function(allText){
	    var allTextLines = allText.split(/\r\n|\n/);
	    
	    // Nodos
	    
	    for(var i=1; i<allTextLines.length; i++){
		var data = allTextLines[i].split(',');
		sys.addNode(data[0], {
		    radio: 30, 
		    label: data[1], 
		    area: parseFloat(data[2]), 
		    suelourbano: parseFloat(data[3]),
		    poblacion: parseFloat(data[4])/1000,
		    pobresencuesta: parseFloat(data[5]),
		    pobresmodelo: parseFloat(data[6]),
		    indigentesmodelo: parseFloat(data[7]),
		    telefono: parseFloat(data[8]),
		    computador: parseFloat(data[9]),
		    internet: parseFloat(data[10]),
		    hogares: parseFloat(data[11]),
		    homicidiosdiez: parseFloat(data[12]),
		    homicidiosonce: parseFloat(data[13]),
		    analfabetismo: parseFloat(data[14])
		});
	    }
	    
	    // Vértices

	    sys.addEdge('1','2');
	    sys.addEdge('1','11');
	    sys.addEdge('2','3');
	    sys.addEdge('2','12');
	    sys.addEdge('2','13')
	    sys.addEdge('3','4')
	    sys.addEdge('3','13');
	    sys.addEdge('3','14');
	    sys.addEdge('3','15');
	    sys.addEdge('3','17');
	    sys.addEdge('4','5');
	    sys.addEdge('4','15');
	    sys.addEdge('4','18');
	    sys.addEdge('5','6');
	    sys.addEdge('5','18');
	    sys.addEdge('5','19');
	    sys.addEdge('5','20');
	    sys.addEdge('6','8');
	    sys.addEdge('6','15');
	    sys.addEdge('6','16');
	    sys.addEdge('6','18');
	    sys.addEdge('6','19');
	    sys.addEdge('7','8');
	    sys.addEdge('7','19');
	    sys.addEdge('8','9');
	    sys.addEdge('8','16');
	    sys.addEdge('9','10');
	    sys.addEdge('9','13');
	    sys.addEdge('9','16');
	    sys.addEdge('10','11');
	    sys.addEdge('10','12');
	    sys.addEdge('10','13');
	    sys.addEdge('11','12');
	    sys.addEdge('12','13');
	    sys.addEdge('13','14');
	    sys.addEdge('13','16');
	    sys.addEdge('14','15');
	    sys.addEdge('14','16');
	    sys.addEdge('15','18');
	    
	},

	// Transformadores

	transformadorDensidad:function(){
	    sys.eachNode(function(node,pt){
		var r = 0.5 * Math.sqrt((node.data.poblacion * 1000 / node.data.area) / Math.PI);
		sys.tweenNode(node, 2, {radio: r});
	    });
	},

	transformadorAbsolutos:function(tipo){
	    var total=0;

	    sys.eachNode(function(node,pt){
		total = total + node.data[tipo];
	    });

	    sys.eachNode(function(node,pt){
		var area = 1000 * (100 * node.data[tipo] / total);
		var r = Math.sqrt( area / Math.PI);
		sys.tweenNode(node, 2, {radio: r});
	    });
	},

	transformadorPorcentuales:function(tipo,referencia){

	    var total=0;

	    sys.eachNode(function(node,pt){
		total = total + ( node.data[tipo] * node.data[referencia] / 100 );
	    });

	    sys.eachNode(function(node,pt){
		var a = node.data[tipo] * node.data[referencia] / 100;
		var area = 1000 * (100 * a / total);
		var r = Math.sqrt( area / Math.PI);
		sys.tweenNode(node, 2, {radio: r});
	    });
	},
	transformadorPorcentajeRelativo:function(tipo){
	    sys.eachNode(function(node,pt){
		var area = 100 * node.data[tipo];
		var r = Math.sqrt( area / Math.PI);
		sys.tweenNode(node, 2, {radio: r});
	    });
	},
	transformadorTasaHomicidios:function(year){
	    sys.eachNode(function(node,pt){
		var area = .1 * (node.data[year] / (node.data.poblacion / 100000));
		var r = Math.sqrt( area / Math.PI);
		sys.tweenNode(node, 2, {radio: r});
	    });
	},
	transformadorAnalfabetismo:function(){
	    sys.eachNode(function(node,pt){
		var area = 200 * node.data.analfabetismo;
		var r = Math.sqrt( area / Math.PI);
		sys.tweenNode(node, 2, {radio: r});
	    });
	}
	
    } /* End return */

}(); /* End grafoBogota */



// Generador del grafo

var Generador = function(){
    var canvas = document.getElementById("viewport");
    var dom = $("#viewport");
    
    //Screen size
    var cWidth = canvas.width = window.innerWidth;
    var cHeight = canvas.height = window.innerHeight;
    
    var ctx = canvas.getContext('2d');
    var particleSystem;
    
    //var gfx = arbor.Graphics(canvas);

    return{

	init:function(system){
	    
	    particleSystem = system;
	    particleSystem.screenSize(cWidth, cHeight);
            particleSystem.screenPadding(100);

	    this.initMouseHandling();

	    $(window).resize(this.windowsized);
	},
	windowsized:function(){

	    cWidth = window.innerWidth;
	    cHeight = window.innerHeight;
			
	    particleSystem.screenSize(cWidth, cHeight);
	},
	redraw:function(){
	    ctx.fillStyle = "white";
            ctx.fillRect(0,0, cWidth, cHeight);

	    // Draw Edges

	    particleSystem.eachEdge(function(edge, pt1, pt2){
		 // edge: {source:Node, target:Node, length:#, data:{}}
		 // pt1:  {x:#, y:#}  source position in screen coords
		 // pt2:  {x:#, y:#}  target position in screen coords
		 
		 // draw a line from pt1 to pt2
		ctx.strokeStyle = "rgba(0,0,0, .333)";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(pt1.x, pt1.y);
		ctx.lineTo(pt2.x, pt2.y);
		ctx.stroke();
             });

	    // Draw Nodes

	    particleSystem.eachNode(function(node, pt){
		// node: {mass:#, p:{x,y}, name:"", data:{}}
		// pt:   {x:#, y:#}  node position in screen coords
		

		var r=node.data.radio;

		ctx.beginPath();
		ctx.arc(pt.x, pt.y, r, 0, 2 * Math.PI, false);
		ctx.fillStyle = "gold";
		ctx.fill();

		ctx.font="11px Helvetica";
		ctx.textAlign = "center";

		ctx.textBaseline = "middle";
		ctx.fillStyle="black";
		ctx.fillText(node.name, pt.x, pt.y);

		ctx.fillStyle="red";
		ctx.fillText(node.data.label, pt.x, pt.y+10);
            }); 

	}, // End redraw.

	initMouseHandling:function(){
            // no-nonsense drag and drop (thanks springy.js)
            var dragged = null;
	    var cercano = null;
            // set up a handler object that will initially listen for mousedowns then
            // for moves and mouseups while dragging
            var handler = {
		clicked:function(e){
		    var pos = $(canvas).offset();
		    _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);
		    dragged = particleSystem.nearest(_mouseP);
		    
		    if (dragged && dragged.node !== null ){
			// while we're dragging, don't let physics move the node
			dragged.node.fixed = true
		    }

		    $(canvas).bind('mousemove', handler.dragged)
		    $(window).bind('mouseup', handler.dropped)

		    return false
		},
		dragged:function(e){
		    var pos = $(canvas).offset();
		    var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
		    
		    if (dragged && dragged.node !== null){
			var p = particleSystem.fromScreen(s)
			dragged.node.p = p
		    }

		    return false
		},

		dropped:function(e){
		    if (dragged===null || dragged.node===undefined) return
		    if (dragged.node !== null) dragged.node.fixed = false
		    dragged.node.tempMass = 1000
		    dragged = null
		    $(canvas).unbind('mousemove', handler.dragged)
		    $(window).unbind('mouseup', handler.dropped)
		    _mouseP = null
		    return false
		}		
            }
        
        // start listening
	    $(canvas).mousedown(handler.clicked);
	}

    } // End return

} /* End Generador */

jQuery(function($){
    grafoBogota.init();
})

