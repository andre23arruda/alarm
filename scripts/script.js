function init_values(){
    document.getElementById('time-value').value = '00:00'
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
    values = time_value.split(":");
    seconds = Number(values[1]) + Number(values[0]) * 60
    return seconds
}

function convert_number2str(seconds){
    minutes = ('0' + Math.floor(seconds/60)).slice(-2)
    seconds = ('0' + (seconds - (60 * minutes))).slice(-2)
    time_value = minutes + ':' + seconds
    return time_value
}

function start_count(){
    document.getElementById('time-value').data_start = true
    if(document.getElementById('time-value').value !== '00:01' && document.getElementById('time-value').data_start == true){
        add_seconds('-', 1)
        setTimeout("start_count()", 1000)
    }
    else{
        add_seconds('-', 1)
        play_song()
        document.getElementById('time-value').data_start = false
    }
}

function play_song(){
    if(!(document.getElementById('button-start').data_audio)){
        audio = new Audio('../assets/alarm.mp3')
        audio.play()
        document.getElementById('button-start').data_audio = audio
        document.getElementById('body').data_color = true
        blink_color(true)
    }
}

function stop_song(){
    document.getElementById('body').style.backgroundColor = "black";
    document.getElementById('time-value').style.backgroundColor = "black"
    document.getElementById('time-value').value = '00:00'
    audio = document.getElementById('button-start').data_audio
    document.getElementById('button-start').data_audio = null
    document.getElementById('body').data_color = null
    document.getElementById('time-value').data_start = false
    if(audio)
        audio.pause()

}

function blink_color(blink_value){
    color = {true: 'red',
             false: 'black'}
    if(blink_value != null){
        document.getElementById('body').style.backgroundColor = color[blink_value]
        document.getElementById('time-value').style.backgroundColor = color[blink_value]
        document.getElementById('body').data_color = !blink_value
        setTimeout("blink_color(blink_color(document.getElementById('body').data_color))", 500)
    }
}



