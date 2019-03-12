const fs = require('fs');
const {spawn} = require('child_process');

const gig = 1024**3;
const {size} = fs.statSync('../easier.csv');
const goal = Math.floor(size / gig) + 1;

console.log(size);
const child_spawn = {
    children: {},
    active: 0,
    process_max: 2,
    process_number: 0,
    generate: function(){
        if(this.active < this.process_max){
            //create child
            this.active++;
            this.process_number++;


            const child = spawn('node', [`${__dirname}/process.js`,  `${(this.process_number - 1) * gig}`],{
                detached: false
            })

            
            //leave this to handle broken text created by splitting
            child.stderr.on('error', (err)=>{
                console.log(err);
                //only collects text from the error
                //handling will need to be done in the process level
            })

            //if you log anything, probably useless
            child.stdout.on('data', (data)=>{
                console.log(data.toString());
            })

            //If you see this message it didn't error out.
            child.on('close', ()=>{
                console.log(`Process ${this.process_number}: complete`)
                this.active--;
            })

            this.children[`${this.process_number}`] = child;

        }

        if(this.process_number !== goal){
            //end if 5 have been completed
            setTimeout(this.generate.bind(this), 1000);
        }
        
    },
}


// child_spawn.generate();
