window.addEventListener('message', function(event) {
    let data = event.data;
    if (data.coche == true) {
        $('.carhud').addClass("CocheIs");
        let kmhTop = localStorage.kmhTop;
        let kmhLeft = localStorage.kmhLeft;
        let fuelTop = localStorage.fuelTop;
        let fuelLeft = localStorage.fuelLeft;
        if (kmhTop) {
            $("#kmhdiv").css("top", kmhTop);
        }else{
            localStorage.setItem("kmhTop", "632.013916015625px");
            $("#kmhdiv").css("top", "632.013916015625px");
            console.log("first time using, ¡SET!");
        }
        if (kmhLeft) {
            $("#kmhdiv").css("left", kmhLeft);
        }else{
            localStorage.setItem("kmhLeft", "545.6597290039062px");
            $("#kmhdiv").css("left", "545.6597290039062px;");
            console.log("first time using, ¡SET!");
        }
        if (fuelTop) {
            $("#fueldiv").css("top", fuelTop)
        }else{
            localStorage.setItem("fuelTop", "632.013916015625px");
            $("#kmhdiv").css("top", "632.013916015625px");
            console.log("first time using, ¡SET!");
        }
        if (fuelLeft) {
            $("#fueldiv").css("left", fuelLeft);
        }else{
            localStorage.setItem("fuelLeft", "866.7708740234375px");
            $("#fueldiv").css("left", "866.7708740234375px");
            console.log("first time using, ¡SET!");
        }
        $("#kmhtexto").text(data.vel + " KM/H");
        $("#fueltexto").text(data.fue + " L");
    }else if(data.show == "editor") {
        let activeEditor = false;
        if(activeEditor){
           // activeEditor = false;
            closeEditor();
            activeEditor = false;
        }else{
            openEditor();
            activeEditor = true;
        }
    }else if(data.coche == false) {
        $(".carhud").removeClass("CocheIs");
    }
})
openEditor = function() {
    $("#kmhdiv").draggable({
        disabled: false
    });
    $("#fueldiv").draggable({
        disabled: false
    })
}
closeEditor = function() {
    $("#kmhdiv").draggable({
        disabled: true
    })
    $("#fueldiv").draggable({
        disabled: true
    })
    let kmhdiv = document.getElementById("kmhdiv");
    var kmh = offset(kmhdiv);
   // alert(kmhoffset.left+"\n"+kmhoffset.top);
   let fueldiv = document.getElementById("fueldiv");
   let fuel = offset(fueldiv);
   saveData(kmh, fuel);

}

document.onkeyup = function (data) {
    if (data.which == 27) {
      $.post('https://zeskCarhud/exit', JSON.stringify({}));
        closeEditor()
      return
    }
  };
function saveData(kmh, fuel) {
   /* $.post("http://zeskCarhud/saveData", JSON.stringify({
        kmhTop: kmh.top,
        kmhLeft: kmh.left,
        fuelTop: fuel.top,
        fuelLeft: fuel.left
    }));*/

    localStorage.setItem('kmhTop', kmh.top);
    localStorage.setItem('kmhLeft', kmh.left);
    localStorage.setItem('fuelTop', fuel.top);
    localStorage.setItem('fuelLeft', fuel.left);
    $.post("http://zeskCarhud/exit", JSON.stringify({}));
}
function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

// example use
/*var div = document.getElementById('kmhdiv');
var divOffset = offset(div);
document.write(divOffset.left+"\n"+divOffset.top);*/
