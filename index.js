
let deathCount = 26200;
var peopleData = [];

let chunks = 50;

$("document").ready(function(){
    $("#deathcount").html(deathCount.toLocaleString());
    /* for(let i = 0 ; i < deathCount ; i++){
        $("#cardWrapper").append('<div class="card">Lädt...</div>').appear(function(){
            console.log("here2")
        })
        
    }
    $(".card").appear(function(event) {
        // this element is now inside browser viewport
        console.log("here")
    }); */
    for(let i = 0 ; i < deathCount/chunks ; i++){
        
        let person = {};
        let female = Math.random() < 0.5;
        if(female){
            person.name = randArray(firstNamesF)+" "+randArray(lastNames)
            person.pronoun = "sie";
            person.pronoun2 = "ihr";
            person.Pronoun = "Sie";
            person.Pronoun2 = "Ihr";
        }else{
            person.name = randArray(firstNamesM)+" "+randArray(lastNames)
            person.pronoun = "er";
            person.pronoun2 = "sein";
            person.Pronoun = "Er";
            person.Pronoun2 = "Sein";
            
        }
        person.age = 100-Math.floor(80*Math.pow(Math.random(),2));
        if(person.age > 95){
            person.age -= Math.floor(Math.random()*10);
        }
        person.city = randArray(citys);
        siblingsAmount = Math.floor(Math.random()*4); 
        person.siblings = siblingsAmount
        for(let j = 0; j < siblingsAmount ; j++){
            if(j == 0){
                person.siblings+=" ("
            }
            if(Math.random() > 0.5){
                person.siblings += randArray(firstNamesF);
            }else{
                person.siblings += randArray(firstNamesM);
            }
            if(j+1 >= siblingsAmount){
                person.siblings += ")";
            }else{
                person.siblings += ", ";
            }
        }
        kidsAmount = Math.floor(Math.random()*4); 
        person.kids = kidsAmount
        for(let j = 0; j < kidsAmount ; j++){
            if(j == 0){
                person.kids+=" ("
            }
            if(Math.random() > 0.5){
                person.kids += randArray(firstNamesF);
            }else{
                person.kids += randArray(firstNamesM);
            }            
            if(j+1 >= kidsAmount){
                person.kids += ")";
            }else{
                person.kids += ", ";
            }
        }
        let data = [{
            "pronoun":person.pronoun,
            "pronoun2":person.pronoun2,
            "Pronoun":person.Pronoun,
            "Pronoun2":person.Pronoun2,
            "name":person.name,
            "firstcity":randArray(citys),
            "beruf":randArray(berufe),
            "beruf2":randArray(berufe),
            "hobby":randArray(hobbys)
        }];
        if(female){
            data[0].beruf += "in";
        }
        person.description = useTemplate(randArray(descriptions),data);
        
        peopleData.push(person);
    }
    
    let currCard = 0;
    let chunk = 0;
    addChunk();
    function addChunk(){
        $("#cardWrapper").append(useTemplate(document.getElementById("card").innerHTML,peopleData));
        chunk++;
        $("#percent").html(Math.floor((chunk/chunks)*100)+"% geladen");
        if(chunk < chunks){
            setTimeout(addChunk,1);
        }else{
            document.onscroll = checkScroll;
            return;
        }
        
    }
    
})


function checkScroll(){
    let percent = window.scrollY/($(document).height()-screen.height)*100;
    console.log(percent);
    if(percent > 100) percent = 100;
    $("#percent").html(percent.toFixed(2)+"%");
}

let berufe = ["Krankenpfleger","Lehrer","Pilot","Taucher","Soldat","Doktor","Professor","Sänger","Lehrer","Notar","Richter","Musiker","Künstler","Stahlarbeiter","Schauspieler","IT-Leiter","Webdesigner","Programmierer","Zugbegleiter","Schaffner","Versicherungsvertreter","Bankberater","Unternehmensberater","Pizzaliferant","Polizist","Busfahrer"];
let hobbys = ["Fischen","Fußball spielen","Schach","Skat","Ski fahren","Computerspiele spielen","Klavier spielen","Geige spielen","Singen","Basteln","Reiten","Kochen"]

let descriptions = [
    "{{name}} wuchs in einem Vorort von {{firstcity}} auf. Später arbeitete {{pronoun}} als {{beruf}}. {{Pronoun}} machte diesen Beruf sehr gern. {{Pronoun2}} liebstes Hobby war {{hobby}}.",
    "{{name}} wurde in {{firstcity}} geboren. {{Pronoun2}}e Mutter war {{beruf2}}in. Nach dem Schulabschluss wurde {{pronoun}} {{beruf}} . {{name}}s Lieblingshobby war {{hobby}}.",
    "{{firstcity}} war die Heimat von {{name}}. {{Pronoun}} arbeitete {{pronoun2}} ganzes Leben als {{beruf}}. Dieser Beruf war {{name}}s Leidenschaft. {{Pronoun2}}e Freitzeit verbrachte {{pronoun}} vor allem mit {{hobby}}.",
    "{{name}} kam aus {{firstcity}}. {{Pronoun}} arbeitete als {{beruf}}. {{pronoun}} mochte diesen Beruf nicht besonders. {{Pronoun2}}e Lieblingsbeschäftigung war es, sich mit der Famile zum {{hobby}} zu treffen.",
    "{{name}}s Wahl-Heimat ist {{firstcity}}. Nach der Schule arbeitete {{pronoun}} als {{beruf}}. {{Pronoun}} moche außerdem {{pronoun2}} Hobby: {{hobby}}.",
    "{{name}}s Familie kommt aus {{firstcity}}. {{Pronoun2}} Vater war {{beruf2}}. Mit {{pronoun2}}en Freunden traf sich {{name}} häufig zum {{hobby}}.",
]

function randArray(array){
    return array[Math.floor(Math.random()*array.length)]
}

useTemplate = function(template, data) {
    var i = 0,
    len = data.length,
    html = '';
    
    // Replace the {{XXX}} with the corresponding property
    function replaceWithData(data_bit) {
        var html_snippet, prop, regex;
        
        for (prop in data_bit) {
            regex = new RegExp('{{' + prop + '}}', 'g');
            html_snippet = (html_snippet || template).replace(regex, data_bit[prop]);
        }
        
        return html_snippet;
    }
    
    // Go through each element in the array and add the properties to the template
    for (; i < len; i++) {
        html += replaceWithData(data[i]);
    }
    
    // Give back the HTML to be added to the DOM
    return html;
};



(function ($) {
    var selectors = [];
    
    var checkBinded = false;
    var checkLock = false;
    var defaults = {
        interval: 250,
        force_process: false
    };
    var $window = $(window);
    
    var $priorAppeared = [];
    
    function isAppeared() {
        return $(this).is(':appeared');
    }
    
    function isNotTriggered() {
        return !$(this).data('_appear_triggered');
    }
    
    function process() {
        checkLock = false;
        
        for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
            var $appeared = $(selectors[index]).filter(isAppeared);
            
            $appeared
            .filter(isNotTriggered)
            .data('_appear_triggered', true)
            .trigger('appear', [$appeared]);
            
            if ($priorAppeared[index]) {
                var $disappeared = $priorAppeared[index].not($appeared);
                $disappeared
                .data('_appear_triggered', false)
                .trigger('disappear', [$disappeared]);
            }
            $priorAppeared[index] = $appeared;
        }
    }
    
    function addSelector(selector) {
        selectors.push(selector);
        $priorAppeared.push();
    }
    
    // ":appeared" custom filter
    $.expr.pseudos.appeared = $.expr.createPseudo(function (_arg) {
        return function (element) {
            var $element = $(element);
            
            if (!$element.is(':visible')) {
                return false;
            }
            
            var windowLeft = $window.scrollLeft();
            var windowTop = $window.scrollTop();
            var offset = $element.offset();
            var left = offset.left;
            var top = offset.top;
            
            if (top + $element.height() >= windowTop &&
            top - ($element.data('appear-top-offset') || 0) <= windowTop + $window.height() &&
            left + $element.width() >= windowLeft &&
            left - ($element.data('appear-left-offset') || 0) <= windowLeft + $window.width()) {
                return true;
            }
            return false;
        };
    });
    
    $.fn.extend({
        // watching for element's appearance in browser viewport
        appear: function (selector, options) {
            $.appear(this, options);
            return this;
        }
    });
    
    $.extend({
        appear: function (selector, options) {
            var opts = $.extend({}, defaults, options || {});
            
            if (!checkBinded) {
                var onCheck = function () {
                    if (checkLock) {
                        return;
                    }
                    checkLock = true;
                    
                    setTimeout(process, opts.interval);
                };
                
                $(window).scroll(onCheck).resize(onCheck);
                checkBinded = true;
            }
            
            if (opts.force_process) {
                setTimeout(process, opts.interval);
            }
            
            addSelector(selector);
        },
        // force elements's appearance check
        force_appear: function () {
            if (checkBinded) {
                process();
                return true;
            }
            return false;
        }
    });
}(function () {
    if (typeof module !== 'undefined') {
        // Node
        return require('jquery');
    }
    return jQuery;
}()));