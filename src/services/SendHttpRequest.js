export function SendHttpRequest(type, method, data) {
    const BaseURL = 'http://localhost/reactBegin/store-sample/api/index.php';
    console.log('type', type, 'userData', data);
    let URL = BaseURL + '?tp=' + type;
    return fetch(URL, {
        method: method,
        body: JSON.stringify(data),
        header: data ? { 'Content-Type': 'application/json' } : {}
    })
        .then(response => {
            if (response.status >= 400) {
                return response.json().then(errResData => {
                    const error = new Error('something wrong');
                    error.data = errResData;
                    throw error;
                })
            }
            console.log('response', response);
            return response.json();
        });








    // let BaseURL = 'http://localhost/reactBegin/store-sample/api/index.php';
    // console.log('type', type, 'userData', userData);
    // debugger;
    // return new Promise((resolve, reject) => {


    // let promise = fetch(BaseURL)

    // return fetch(url, {
    //     method: method,
    //     body: JSON.stringify(data),
    //     header: data ? { 'Content-Type': 'application/json' } : {}
    // })
    //     .then(response => {
    //         if (response.status >= 400) {
    //             return response.json().then(errResData => {
    //                 const error = new Error('something wrong');
    //                 error.data = errResData;
    //                 throw error;
    //             })
    //         }
    //         console.log(response);
    //         return response.json();
    //     });

    // });
}