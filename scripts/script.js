var t1 = null
var t2 = null

// var audio = new Audio('../assets/alarm.mp3')
var audio = new Audio('http://soundbible.com/grab.php?id=2197&type=mp3')

var blink_value = true
var data_audio = null
var data_start = false

var regex =  /[0-9][0-9]:[0-9][0-9]/;

function init_values(){
    document.getElementById('time-value').value = '00:00'
}

function is_time_value(time_value){
    return regex.test(time_value)
}

function add_seconds(signal, value = 30){
    time_value = document.getElementById('time-value').value
    seconds = convert_str2number(time_value)
    seconds = signal == '+' ? seconds += value : seconds -= value;
    if(seconds >= 0){
        time_value = convert_number2str(seconds)
        document.getElementById('time-value').value = time_value
    }
}

function convert_str2number(time_value){
    seconds = 0
    if(is_time_value(time_value)){
        values = time_value.split(":");
        seconds = Number(values[1]) + Number(values[0]) * 60
    }
    return seconds
}

function convert_number2str(seconds){
    minutes = '0' + Math.floor(seconds/60)
    seconds = '0' + (seconds - (60 * minutes))
    time_value = minutes.slice(-2) + ':' + seconds.slice(-2)
    return time_value
}

function start_count(){
    time_value = document.getElementById('time-value').value
    if(is_time_value(time_value)){
        if(convert_str2number(document.getElementById('time-value').value) > 0){
            t1 = setTimeout("start_count()", 1000)
            add_seconds('-', 1)
        }
        else{
            document.getElementById('time-value').value = '00:00'
            if(t1){
                clearTimeout(t1)
                t1 = null
                play_song()
            }
        }
    }
    else
        document.getElementById('time-value').value = '00:00'
}

function play_song(){
    if(!(data_audio)){
        audio.play()
        audio.loop = true
        data_audio = audio
        blink_color(true)
    }
}

function stop_song(){
    document.getElementById('body').style.backgroundColor = "black";
    document.getElementById('time-value').style.backgroundColor = "black"
    document.getElementById('time-value').value = '00:00'

    clearTimeout(t1)
    t1 = null
    clearTimeout(t2)
    t2 = null

    if(data_audio){
        audio.pause()

        data_audio = null
        blink_value = null
        data_start = false
    }

}

function blink_color(blink_parameter){
    color = {true: 'red',
             false: 'black'}

    document.getElementById('body').style.backgroundColor = color[blink_parameter]
    document.getElementById('time-value').style.backgroundColor = color[blink_parameter]
    blink_value = !blink_parameter

    t2 = setTimeout("blink_color(blink_value)", 500)
}



