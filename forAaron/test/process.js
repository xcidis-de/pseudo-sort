const fs = require('fs');
const path = require('path');
const {pipeline, Transform} = require("stream")
// const {Readable} = require("stream");
const {promisify} = require('bluebird');

const filename  = path.resolve(__dirname, '../easier.csv'); //Your filename here
const gig = 1024**3;
const chunk_size = 1024**2;
const {size} = fs.statSync('../easier.csv');
let start = parseInt(process.argv[2]);
let end = start + gig;

console.log(size);
if(!start){
    start = 0;
}

if(end>size){
    end = size;
}

// class MyStream extends Readable {
//     constructor(index){
//         this.start = index
//     }

//     _read(size){
//         let chunk = fs.read;
//         while(null !== (chunk = this.getNext(size))){
//             if(this.memory_monitor() || true){
//                 this.push(chunk);
//             }
//         }
//     }

//     _write(data){
//         //network requests.
//     }

//     getNext(size){
//         const chunk = fs.readFile('../easier.csv', {
//             //options...
//             start: this.start,
//             end: this.start + size,
//             encoding: 'UTF8'
//         });
//         this.start += size;
//         return chunk;
//     }

//     memory_monitor(){
//         //if memory under percentage return true
//         //try to check the buffer size.
//     }
// }


// const stream = fs.createReadStream(filename, {
//     encoding: 'UTF8',
//     start, //where in the file to start at, passed from process creator
//     end //start + 1 gig or to end of file
// });

// stream.on('data', (chunk)=>{
//     let chunks = '';
//     //decides when to send
//     //VVVVVVVVVVVVVVreplace with logic appropriate to matrix creation
//     //if matrix incomplete?
//     if(chunks.length < chunk_size){
//         chunks+= chunk //mutate chunk and combine
//     }else{
//         //network requests are stream based and can start sending from a new port.
//         //if memory issues arise, you will need to record the current index of bytes read
//         //and terminate the stream, clean the read buffer,
//         //and start the the readStream over with new start index
//         //requires network requests to know where these will be.
//     }
// })
// stream.on('end', ()=>{
//     //logs something;
// })


const myTransform = new Transform({
    writableObjectMode: true,
  
    transform(chunk, encoding, queue) {
      // Collect your chunks here  
      // Transform the chunk into something else.
      const data = chunk;
      //if your are sending to a browser after you create your matrix.
      //data = new Uint8Array(json.stringify(matrix).split('').map(c=>c.charCodeAt(0))).buffer;
      
      //if backend to backend
      const buffer = Buffer.from(JSON.stringify(data));
      console.log(buffer);
      // Push the data onto the readable queue.
      queue(null, buffer);
    }
  });

async function run(){
    try {
        await pipeline(
            fs.createReadStream(filename, {
                encoding: 'UTF8',
                start, //where in the file to start at, passed from process creator
                end //start + 1 gig or to end of file
            }),
            myTransform,
            //needs to be a stream based function. like a http write stream
            // fs.createWriteStream(new URL('127.0.0.1')),
            // (err)=>{
            //     console.log(err);
            // }
        );
    
    } catch(err){
        console.error(err);
    }
}

function yourMutateFunction(data){

}

function yourSendFunction(data){
    console.log(data);
}

run()