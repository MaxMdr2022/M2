// Crear un array vacío llamado 'toDoItems'
// Tu codigo acá:
var toDoItems = [];

// En la página 'index.html' hay un elemento span cuyo texto es 'Aplicación creada por:'.
// Usando querySelector seleccionar dicho span por su id ('createdBy') y luego usando innerHTML
// agregar tu nombre al final del texto actual. Ej: 'Aplicación creada por Franco'
// Tu código acá:

//document.querySelector("#createdBy").innerHTML = "Aplicación creada por Maxi";// otra forma de hacerlo:
var span = document.querySelector("#createdBy");

span.innerHTML = span.innerHTML + "Maxi"; // span.innerHTML = "Aplicacion creada por: "

// Crear una clase denominada 'ToDo' cuyo constructor debe recibir un único parámetro del tipo string
// con el nombre 'description' que será justamente la descripción del ToDo.
// Agregar dos propiedades a la clase:
// 1) 'description' : debe ser igual a la descripción pasada como parámetro al constructor
// 2) 'complete'    : debe setearse en false
// Ayuda: usar 'this' en el constructor

function ToDo (description) {
  // Tu código acá:
  this.description = description;
  this.complete = false;

}


// Agregar un método denominado 'completeToDo' al prototipo de la clase ToDo
// No requiere ningún argumento
// Debe setear el atributo 'complete' del ToDo en true

// Tu código acá:
ToDo.prototype.completeToDo = function (){

   this.complete = true;
  //this.complete = !this.complete
}


// Agregar dos parámetros a la función 'buildToDo':
//    1) Un objeto de la clase ToDo
//    2) Index numérico
//
// La función debe realizar lo siguiente:
//    1) Crear un elemento 'div' y asignárselo a una variable denominada 'toDoShell'
//    2) Asignarle a 'toDoShell' la clase 'toDoShell'
//    3) Crear un elemento 'span' y asignárselo a una variable denominada 'toDoText'
//    4) Utilizando el objeto toDo pasado como argumento, setear el 'toDoText' innerHTML
//       asignándole el valor de la propiedad 'description' del objeto ToDo.
//    5) Asignarle como id del 'toDoText' el valor 'index' recibido como argumento
//    6) En función del atributo 'complete' del objeto ToDo recibido como argumento:
//          - Si es true: asignarle a 'toDoText' la clase 'completeText'
//          - Si es false: no asignarle ninguna clase
//    7) Agregar 'toDoText' como hijo de 'toDoShell'
//    8) Devolver la variable toDoShell


function buildToDo(todo, index) {
  // Tu código acá:

  var toDoShell = document.createElement("div");//1

  toDoShell.className = "toDoShell"; //2 => <div class="toDoShell"> </div>

  var toDoText = document.createElement("span"); //3

  toDoText.innerHTML = todo.description;// 4 (en este paso le agregamos la informacion a todotext)

  toDoText.id = index;// 5

  if(todo.complete){ //6
    toDoText.className = "completeText";
  }

  toDoShell.appendChild(toDoText) // 7 meto el span dentro del div

  toDoText.addEventListener("click", completeToDo);//si alguien clickea invoca a completetodo

  return toDoShell; // 8
  /*
  cuendo invoco esta funcion lo que hago es crear un div con un span, cuando creo una nota, ejemplo:
  <div class="toDoShell"><span id=id>"comprar agua"</span></div>
  pero esto queda suelto, tengo que agregarlo al html
  */
}

// La función 'buildToDos' debe crear un array de objetos toDo y devolverlo
// Recibirá como parámetro un array de objetos ToDo
// Utilizar el método map usando la función previamente creada ('buildToDo')
// Devolver el nuevo array

function buildToDos(toDos) {
  // Tu código acá:

  let array = toDos.map(function(elementos,i){
    return buildToDo(elementos,i); // en la funcion buildToDo sus parametros serian: elementos = todo y i=index
  });

  return array;
  //otra forma simplificada(que es lo mismo):
  //return toDos.map(buildToDo);

  /*
  en esta funcion recivo un array que contiene varios objetos que contienen la info para poder convertirlos en divs  
  como los de arriba, y lo que hago es juntarlos y pushearlos a un nuevo array.ejemplo
  [{description:"comprar agua", complete:false},{description:"comprar te", complete:false}] y lo convierto en un array 
  con divs:
  [<div class="toDoShell"><span id=id>"comprar agua"</span></div>,<div class="toDoShell"><span id=id>"comprar te"</span></div> ]

  ahora lo que falta es meter esos divs al HTML.
  */
}


// La función 'displayToDos' se va a encargar de que se vean los toDo's en pantalla
//  1) Seleccionr el elemento cuyo id es 'toDoContainer' y almacenarlo en una variable denominada 'toDoContainer'
//  2) Setear el innerHTML de 'toDoContainer' como un string vacio ("")
//  3) Llamar a la función previemante creada 'buildToDos' pasándole como argumento el array toDoItems
//  4) Iterar sobre el resultado devuelto por la función 'buildToDos' e ir agregndo cada elemento a 'toDoContainer'
//  5) Al final de este archivo, antes de la línea que dice "NO CAMBIES NADA DE ACÁ PARA ABAJO" escribe una
//     línea para hacer el llamado a esta funcion (displayToDos)
//  6) Abrir o en el caso de ya tenerlo abierto, recargar, la página

function displayToDos() {
  // Tu código acá:

  var toDoContainer = document.querySelector("#toDoContainer"); //1

  toDoContainer.innerHTML = ""; //2

  let arr = buildToDos(toDoItems); //3  guardo en arr el arreglo con todos los divs

  arr.forEach(function (elemento) { // recorro el arreglo y "pusheo" o appendeo los divs 

    toDoContainer.appendChild(elemento);// voy metiendo los divs del arreglo en el div toDoContainer.
  });
}


// La función 'addToDo' agregará un nuevo ToDo al array 'toDoItems'
// [NOTA: Algunas cuestiones a tener en cuenta sobre el elemento 'input' de HTML (Ya que 'toDoInput' es un input)
// Todos los elementos input tienen una propiedad llamada 'value' que nos permite acceder al texto que se encuentre
// actualmente escrito dentro del input]
//  1) Crear un nuevo ToDo usando la clase ToDo y pasándole el valor del input 'toDoInput' como parámetro
//  2) Agregar el objeto ToDo recién creado al array toDoItems
//  3) Setear el valor del input toDoInput como un string vacio ("") (Esto se realiza para que en la vista se borre lo 
//   que se encontraba escrito)
//  4) Llamar a la función displayToDos para que se actualicen los toDos mostrados en pantalla

function addToDo() {
  // Tu código acá:

  let input = document.querySelector("#toDoInput");// guardo en input el div que es la caja donde se escriben las palabras
  //                                        ejemplo :"comprar agua" seria el valor que contiene esa caja contenedora(div)
  
  if(input.value !== ""){ // si el input no esta vacio, osea alguien escribio algo, por eje "comprar agua".

    let toDo = new ToDo(input.value);// creo un nuevo obj toDo y guardo el valor de la palabra q se escribio.
    toDoItems.push(toDo); // pusheo el obj al array todoitems
    input.value = ""; // limpio el input, la palabra ya no sale en la barra donde se escriben las palabras, pero queda guardado
    //                   en el array para mostrarse abajo de la pag.

    displayToDos(); // invoco a displaytodos para que muestre todos los elementos del array todoitems en la parte de abajo
    //                  de la pag.
  }
  
  
}

// Agregar un 'Event Listener' para que cada vez que el botón 'AGREGAR' sea clickeado
// se ejecute la función 'addToDo'
//   1) Seleccionar el elemento cuyo id es 'addButton'
//   2) Agregarle un 'click' event listener, pasándole la función 'addToDo' como callback

// Tu código acá:
// quiero que si hago click sobre el boton agregar se invoque la funcion addToDo y que agregue esos elementos
//busco en index.html el id del boton: id="addButton"

let agregar = document.querySelector("#addButton"); // tengo el boton en agregar, ahora tengo que hacer que funcione
agregar.addEventListener("click", addToDo);//eventListener se queda mirando el boton, y si hacen click, llama a addToDo.


// La función completeToDo se va a ejecutar cuando queramos completar un todo
// [NOTA: Algunas cuestiones a tener en cuenta
// Todo Event Listener recibe como parámetro el objeto 'event' conteniendo un montón de información que incluye
// el tipo del evento, que elemento fue el que lo llamó, los valores de dicho elemento, etc.
// En este paso vamos a utilizarlo para encontrar el index del item que disparó el evento (Esta parte ya se
// encuentra desarrollada pero está comentada dentro de la función por lo que va a ser necesario que la descomenten)]
//   1) Utilizando el index suministrdo, llamar a 'completeToDo' (Recuerden que habíamos creado dcho método en el
//      prototipo de la clase ToDo) sobre el elemento correspondiente del array toDoItems
//   2) Llamar a displayToDos para actualizar los elementos que se van a mostrar en pantalla
//   3) En la función 'buildToDo' agregar un 'click' event listener al elemento 'toDoText', pasándole
//      esta función como callback

function completeToDo(event) {
  // DESCOMENTAR LA SIGUIENTE LINEA
  const index = event.target.id;//va a estar mirando el id del elemento que se esta tocando
  // Tu código acá:
  // el event es el click, 
  // el event.target es el elemento que fue clickeado
  // el event.target.id es el id del elemento que fue clickeado

  toDoItems[index].completeToDo(); //1 lo que quiero es modificar el complete del elemento que es un obj que esta en false
  // toDoItems es el arreglo, index es el indice del elemento q clickee.

  displayToDos();//2 actualiza la pagina 

  //el 3 en la linea 78.
}

// Una vez que llegaste a este punto verificá que todos los tests pasen


// **********************************************EXTRA CREDITOS:********************************************** //

/*    Investigá sobre el tipo 'checkbox' del elemento input y realizar lo siguiente en la función 'buildToDo':
        a) Crer un checkbox en la función 'buildToDo'
        b) Asignarle como id a dicho checkbox el valor del index y quitar el id del index de toDoText
        c) Agregarle al checkbox el 'click' event listener de completeToDo y quitárle el event listener a toDoText
        d) Asignarle la clase 'completeCheckbox' al checkbox
        e) Dentro del bloque 'if' de la función buildToDo, si es true, setear el atributo 'checked' en true en el checkbox
        f) Agregar el checkbox sobre el elemento 'toDoShell'
*/
// ********************************************** ----------- ********************************************** //


// Acá debes insertar la llamada a 'displayToDos'


// ---------------------------- NO CAMBIES NADA DE ACÁ PARA ABAJO ----------------------------- //
if (typeof module !== 'undefined') {
  module.exports = {
    toDoItems: toDoItems,
    ToDo: ToDo,
    buildToDos: buildToDos,
    buildToDo: buildToDo,
    completeToDo: completeToDo,
    displayToDos: displayToDos,
    addToDo: addToDo
  };
}
