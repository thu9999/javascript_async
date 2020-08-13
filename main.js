/**
 * Xử lý bất đồng bộ trong javasript
 * Giả sử có đoạn code như sau
 */
// setTimeout(() => {
//     console.log('First log');
// }, 0);

// console.log('Second log');


/**
 * Kết quả nhận được như sau
 * Second log
 * First log
 * Tại sao như vậy? Đó là do cơ chế bất đồng bộ trong js
 * Các task trong js được chia làm 2 loại: Đồng bộ và bất đồng bộ
 * Các task đồng bộ sẽ được lưu trữ ở execution stack và các task bất đồng bộ sẽ được lưu trữ ở message queue.
 * js ưu tiên xử lý các task trong execution stack trước. Khi nào các task ở đây được xử lý hết thì các task ở message queue sẽ được đưa lên excecution để xử lý
 * Các async task trong Js có thể kể đến như setTimeout, setInterval, promise, api call....
 */

 /**
  * Một số phương pháp xử lý bất đồng bộ trong javascript
  * 1. Callback
  * Từ es6 có thêm 
  * 2. Promise
  * 3. Async/Await
  * Ngoài ra còn lib rxjs rất mạnh trong xử lý bất đồng bộ
  * 4. rxjs
  */

/**
 * 1. Callback
 * Khi xử lý xong ta gọi hàm callback để xử lý bất đồng bộ
 * Ví dụ
 */
// function handlePrint(callback) {
//     setTimeout(() => {
//         console.log('First log');
//         callback();
//     }, 0);
// }

// handlePrint(() => {
//     console.log('Second log');
// });
/**
 * Kết quả nhận được
 * First log
 * Second log
 * Như vậy kết quả console đã in ra theo đúng thứ tự. Tuy nhiên callback sẽ dẫn tới một nhược điểm đó là 
 * nếu cần xử lý nhiều task tuần tự thì sẽ rơi vào callback hell
 * Ví dụ: Khi người dùng muốn chạy các tác vụ sau theo thứ tự
 * First->Second->Third
 * 
 */
// function firstTask(callback) {
//     setTimeout(() => {
//         console.log('First Task');
//         callback();
//     }, 3 * 1000); // 3s
// }

// function secondTask(callback) {
//     setTimeout(() => {
//         console.log('Second Task');
//         callback();
//     }, 2 * 1000); // 2s
// }

// function thirdTask(callback) {
//     setTimeout(() => {
//         console.log('Third Task');
//         callback();
//     }, 1 * 1000); // 1s
// }

// firstTask(() => {
//     secondTask(() => {
//         thirdTask(() => {
//             console.log('Done');
//         });
//     })
// })
// Như ta thấy nếu có thêm một vài async task cần thực hiện theo đúng thứ tự thì sẽ rất khó để quản lý và khó maintain


/**
 * 2. Promise
 * Promise nhận vào 2 tham số resolve và reject
 * Resolve sẽ trả về kết quả ở hàm callback trong then
 * reject returns a Promise object that is rejected
 */

 /**
  * Ví dụ :
  * Xử lý các task theo đúng trình tự Task A -> Task B -> Task C
  * Xử lý task A hết 3s, xử lý task B hết 2s, và xử lý task C hết 1s
  * Kết quả trả về trong hàm xử lý task A được dùng trong B và kết quả trả về trong task B được dùng cho task C
  */
//  function promiseA() {
//      return new Promise((resolve, reject) => {
//          setTimeout(() => {
//              console.log('Task A executed!')
//              resolve('A result')
//          }, 3 * 1000); // 3s
//      })
//  }

//  function promiseB(result) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(result);
//             console.log('Task B executed')
//             resolve('B Result')
//         }, 2 * 1000); // 2s
//     })
// }

// function promiseC(result) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(result)
//             console.log('Task C executed')
//             resolve('C result');
//         }, 1 * 1000); // 1s
//     })
// }

// promiseA().then(result => {
//     promiseB(result).then(result => {
//         promiseC(result).then(result => {
//             console.log(result)
//         })
//     })
// })
/**
 * Như vậy promise cũng có nhược điểm là promise hell
 * Use case phổ biến của promise 
 * giả sử có 1 request lấy id, rồi sau đó 1 request khác lấy id này để get detail
 */

 /**
  * 3. Sử dụng async/await
  */
async function getAPI() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Return data');
        }, 3 * 1000)
    });
    const data = await promise;
    console.log(data); 
}

getAPI(); // Return data after 3s

/**
 * 4. rxjs - reactive extension for javascript
 * Là 1 thư viện xử lý async trong javascript rất mạnh
 * Giả sử có 3 request A, B, C
 * Hai request A và B chạy song song và kết quả trả về của 2 request này được request C dùng để gọi api
 * nếu request A bị lỗi thì sẽ trự động retry 2 lần. Nếu sau 2 lần thử lại mà vẫn có lỗi thì sẽ dùng giá trị mặc định là defaultA
 * Nếu request B bị lỗi thì sẽ trả về kết quả mặc định là defaultB 
 */
forkJoin(
    requestA.pipe(
        retry(2),
        catchError(_ => of(defaultA))
    ),
    requestB.pipe(
        catchError(_ => of(defaultB))
    )
).pipe(
    switchMap([A, B] => requestC(A, B))
).subscribe();





