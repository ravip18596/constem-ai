var timelog = {}, start_time, stop_time, total, curr_time, id, n,
    count = {
        'male': 0,
        'female': 0
    };
var rows;
function human(info) {
    this.sno = info[0];
    this.ts = info[1];
    this.gender = info[2];
    this.coordy = parseInt(info[3]);
    this.coordx = parseInt(info[4]);
    this.entered = (this.coordx === 0 && this.coordy === 0);
    this.exited = (this.coordx === 800 && this.coordy === 600);
    if (timelog[this.ts])
    {
        timelog[this.ts].push(this);
    } else {
        timelog[this.ts] = [this];
    }
}
;
function Upload() {
    if(id) {
        clearInterval(id);
    }
    console.log('In upload');
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:\(\)])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        console.log('Reading');
        var reader = new FileReader();
        reader.onload = function (e) {
//            console.log(e.target.result);
            rows = e.target.result.replace(/\"(\d+),(\d+)\"/gi, '$1,$2').split(/\r?\n|\r/);
//            console.log(rows);
            total = rows.length - 2;
            for (var i = 1; i <= total; i++) {
                var info = rows[i].split(",");
                if (i === 1) {
                    start_time = info[1];
                } else if (i === rows.length - 1) {
                    stop_time = info[1];
                }
                if (info.length > 4)
                    new human(info);
            }
            console.log('Read Successful');
            init();
            id = setInterval(draw, 1800);
        };
        reader.readAsText(fileUpload.files[0]);

    } else {
        alert("Please upload a valid CSV file.");
    }

}

function init() {
    console.log("In Init");

    // Init my Canvas Object ( Drawing Board)
    canvas = document.getElementById('mycanvas');
    // Every drawing board comes with a pen.
    pen = canvas.getContext('2d');
    // 2d parameters gives a pen which is capable of drawing in 2d ( x and y axis) 
    W = canvas.width;
    H = canvas.height;
    
    mmm = {
        x : 0,
        y : 25,
        w : 10,
        h : 10,  
    };
     f = {
        x : 0,
        y : 25,
        w : 10,
        h : 10,
    };
    
    count['male'] = 0;
    count['female'] = 0;
    n = 0;
    h = parseInt(start_time.substr(0, start_time.indexOf(":")));
    m = parseInt(start_time.substr(start_time.indexOf(":") + 1));
}

function draw() {
    console.log("In Draw");
    if (n < total) {
        hh = h.toString();
        mm = m.toString();
        if (m < 10)
            mm = '0' + mm;
        if (h < 10)
            hh = '0' + hh;
        curr_time = hh + ':' + mm;
        console.log(timelog[curr_time]);
        for (var i in timelog[curr_time]) {
            var person = timelog[curr_time][i];
            if (person.entered) {
                count[person.gender]++;
            } else if (person.exited) {
                count[person.gender]--;
            }
            if(person.gender=="male"){
                mmm.x= person.coordx;
                mmm.y = person.coordy + 25;
            }
            if(person.gender=="female"){
                f.x= person.coordx;
                f.y = person.coordy + 25;
            }
            n++;
        }
    } else {
        alert('The End');
        clearInterval(id);
        return;
    }
    m++;
    if (m > 59) {
        m = 0;
        h++;
    }
    pen.clearRect(0, 0, W, H);

    //Change the pen color

    pen.fillStyle = "white";
    // Draw a rectangle using pen
    // Draw the enemies using a for loop
    var tt = count['female']+count['male'];
    pen.font = "20px Arial";
//    pen.fillStyle = "white";
    pen.fillText("Time   - " + curr_time, 20, 20);
    pen.fillText("Male   - " + count['male'], 220, 20);
    pen.fillText("Female - " + count['female'],420 , 20);
    pen.fillText("Total - " + tt,620 , 20);
    pen.fillStyle="white";
    pen.fillRect(0,21,800,2);
    pen.fillStyle = "#82CAFA";
    pen.fillRect(mmm.x,mmm.y,mmm.w,mmm.h);
    pen.fillStyle = "pink";
    pen.fillRect(f.x,f.y,f.w,f.h);
    
}



