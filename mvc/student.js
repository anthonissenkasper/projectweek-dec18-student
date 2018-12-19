function onMouseDown(state, args) {
    return state + 1;
}

function onMouseDown2(state, args) {
    return { count: state.count + 1 };
}

function counter3() {
    function onMouseDown(state, args) { return { count: state.count + 1 }; }

    return { controller: { onMouseDown } };
}

function counter4() {
    function onMouseDown(state, args) {return { count: state.count + 1 };}

    function onKeyDown(state, args) {return { count: 0 };}

    return {controller: { onMouseDown, onKeyDown} };
}

function counter5() {
    function onMouseDown(state, args) {
        if(args.shift == true && state.count > 0){
            return {count: state.count-1}
        }
        else if(args.shift == false) {
            return {count: state.count+1}
        }
        else{
            return {count:0}
        }
    }

    function onKeyDown(state, args) {
        if(args.key == "0" || args.key == "ArrowDown"){
            return {count:0}
        }
        else if(args.key == "ArrowUp"|| args.key == "Space"){
            return{count: state.count+1}
        }
        else{
            return {count: state.count}
        }
    }

    return { controller: {onMouseDown, onKeyDown} };
}


function counter6() {
    function increment(state) {return{count:state.count+1};}

    function decrement(state) {
        if (state.count > 0) return {count: state.count - 1};
        else return{count:state.count};
    }

    function reset(state) {return {count: 0};}

    function onMouseDown(state, args){
        if(args.shift){
            if(state.count>0){
                return{count:state.count-1};
            }
            else{
                return{count:state.count}
            }
        }
        else{
            return{count:state.count+1};
        }
    }


    function onKeyDown(state, args){
        if(args.key === "0"){
            return {count:0};
        }
        else if(args.key === "ArrowDown"){
            if(state.count>0){
                return{count:state.count-1};
            }
            else{
                return{count:state.count}
            }
        }
        else if(args.key === "ArrowUp"){
            return{count:state.count+1};
        }
        else if(args.key === " "){
            return{count:state.count+1}
        }
        else return {count:state.count};
    }

    const controller = { onMouseDown, onKeyDown };
    const model = { increment, decrement, reset };
    return { controller, model };
}

function counter7() {
    function add(state, x){
        if (x>=0){
            return {count: state.count +x}
        }else{
            if(state.count > -x ){
                return {count: state.count +x}
            }else{
                return {count: state = 0}
            }
        }

    }
    function reset(state) {
        return {count: state = 0}
    }

    function onMouseDown(state, args) {
        if(args.ctrl){
            if(!args.shift){
                return add(state, 5);
            }else {
                return add(state, -5);
            }
        }else{
            if(!args.shift){
                return add(state, 1);
            }else {
                return add(state, -1);
            }
        }
    }


    function onKeyDown(state, args) {
        if(args.ctrl){
            if(args.key === "0"){
                return reset(state);
            }else if(args.key ==="ArrowUp" || args.key ===" "  ){
                return add(state,5);
            }else if(args.key ==="ArrowDown"){
                return add(state, -5)
            }else{
                return {count: state.count}
            }
        }else{
            if(args.key === "0"){
                return reset(state);
            }else if(args.key ==="ArrowUp" || args.key ===" "  ){
                return add(state,1);
            }else if(args.key ==="ArrowDown"){
                return add(state, -1)
            }else{
                return {count: state.count}
            }
        }
    }

    const controller = { onMouseDown, onKeyDown };
    const model = { add, reset };
    return { controller, model };
}

function chronometer(){

    // elapsedTime -> totaal verstreken tijd
    function timePassed(state, dt){
        return { elapsedTime: state.elapsedTime + dt}
    }

    function onTimerTick(state, dt){
        return { elapsedTime: state.elapsedTime + dt};
    }

    const controller = { onTimerTick };
    const model = { timePassed };
    return { controller, model };
}

function chronometer2() {

    function timePassed(state, dt){
        if( state.active === true){
            return {elapsedTime: state.elapsedTime + dt, active: state.active};
        } else {
            return {elapsedTime: state.elapsedTime, active: state.active};
        }
    }

    function toggle(state) {
        return { active: !state.active, elapsedTime: state.elapsedTime}
    }

    function reset(state) {
        return{ elapsedTime: 0, active: state.active}

    }

    function onTimerTick(state, dt) {
        return timePassed(state, dt);

    }

    function onKeyDown(state, args) {
        if( args.key === " "){
            return toggle(state);
        } else if( args.key === "0"){
            return reset(state);
        } else{
            return state;
        }
    }

    return {model: {timePassed, toggle, reset}, controller: {onTimerTick, onKeyDown}}

}

function circle() {
    function render(state) {
        let array = new Array({type: "circle", center: {x: 100, y: 100}, radius: 10, color: "red"});

        return array;
    }

    return{view: {render}}
}

function circle2() {
    function moveTo(state, position){
        let array = {position, position};
        return array;
    }

    function onMouseDown(state, args) {

        return moveTo(state, args.position);
    }

    function render(state){
        let array = new Array({type: "circle", center: state.position, radius: 10, color: "red"});

        return array;
    }

    return{model: {moveTo}, view: {render}, controller:{onMouseDown}}
}

function circle3() {
    function moveTo(state, position){
        let array = {position, position};
        return array;
    }

    function onMouseMove(state, args) {

        return moveTo(state, args.position);
    }

    function render(state){
        let array = new Array({type: "circle", center: state.position, radius: 10, color: "red"});

        return array;
    }

    return{model: {moveTo}, view: {render}, controller:{onMouseMove}}
}

function drawing(){
    function  moveTo(state, position){
        let dots = new Array();
        if(state.dots === null){state.dots = new Array();}
        for (let k in state.dots) {
            dots.push(state.dots[k]);
        }
        if(state.addMode) {
            dots.push({x: position.x, y: position.y});
            return {
                position: {x: position.x, y: position.y},
                dots: dots,
                addMode: state.addMode
            };
        }
        return {
            position: {x: position.x, y: position.y},
            dots: [],
            addMode: state.addMode
        };
    }

    function setAddMode(state, addMode){
        return {
            position: {x: state.position.x, y: state.position.y},
            dots: state.dots,
            addMode: state = addMode};
    }

    function onMouseMove(state,args){
        return moveTo(state, args.position);
    }

    function onMouseDown(state, args){
        return {
            position: {x: state.position.x, y: state.position.y},
            dots: state.dots,
            addMode: state = true};
    }

    function onMouseUp(state, args){
        return {
            position: {x: state.position.x, y: state.position.y},
            dots: state.dots,
            addMode: state = false};
    }

    function render(state){
        if(state.addMode){return [{type: "circle", center: {x:  state.position.x, y: state.position.y},radius: 2, color:  "red"}]}

        let result = Array();
        for (let i = 0; i < state.dots.length; i++) {
            result.push({type: "circle", center: {x:  state.dots[i].x, y: state.dots[i].y},radius: 2, color:  "green"});

        }
        result.push({type: "circle", center: {x:  state.position.x, y: state.position.y},radius: 5, color:  "red"});
        return result;
    }


    let model = {moveTo, setAddMode};
    let view = {render};
    let controller = {onMouseMove, onMouseDown, onMouseUp};
    return {model, controller, view};
}

function random() {
    function throwDie(state) {
        let  rng = state.rng
        rng =(4578 * rng ** 2 - 976161 * rng + 6156489) % 79729693;
        dieValue = rng % 6 + 1;
        return { rng, dieValue};
    }

    function onKeyDown(state,args) {
        if(args.key = " "){
            return throwDie(state);
        }
        else{
            return {rng};
        }
    }

    function render(state) {

        return  [ {type: "text", position: {x:50, y:50}, string: state.dieValue+""}];
    }

    return {model: {throwDie}, controller: {onKeyDown}, view:{render}};
}

function random2() {
    function  nextRandom(n) {
        return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
    }

    function throwDie(state) {
        let  rng = state.rng;
        rng =(4578 * rng ** 2 - 976161 * rng + 6156489) % 79729693;
        Grade = rng % 6 + 1;
        grade = 0;
        return [Grade,{rng, grade}];
    }

    function  generateGrade(state) {


    }

    function onKeyDown(state,args) {
        if(args.key = " "){
            return throwDie(state);
        }
        else{
            return {rng};
        }
    }
    function throwDie(state) {
        let  rng = state.rng;
        rng =(4578 * rng ** 2 - 976161 * rng + 6156489) % 79729693;
        Grade = rng % 6 + 1;
        grade = 0;
        return [Grade,{rng, grade}];
    }

    return {model: {nextRandom, throwDie, generateGrade}, controller: {onKeyDown}}}