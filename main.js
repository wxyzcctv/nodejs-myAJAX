window.jQuery = function(nodeOrSelector){
    let nodes = {}
    nodes.addClass = function(){}
    nodes.html = function(){}
    return nodes
}

window.jQuery.ajax = function({url,method,body,successFn,failFn,headers}){
    
    let request = new XMLHttpRequest()
    request.open(method,url)                          //设置请求的第一部分的内容
    for(let key in headers){
        let value = headers[key]
        request.setRequestHeader(key,value)
    }
    // 将传入设置headers的内容进行循环遍历，遍历一个对象使用for in循环。
    request.onreadystatechange = ()=>{              //监听这个对象的状态码是否发生变化
        // 一旦状态发生改变，这个函数的代码段的位置可以在任何位置
        if(request.readyState === 4){
            if(request.status >= 200 && request.status<=300){
                successFn.call(undefined,request.responseText)
            }else if(request.status >= 400){
                failFn.call(undefined,request)
            }
        }
    }
    request.send(body)             //设置第四部分的内容
}

function f1(){}
function f2(){}
myButton.addEventListener('click', (e)=>{
    window.jQuery.ajax({
        url:'/xxx',
        method:'post',
        headers:{
            'content-type':'application/x-www-form-urlencoded',
            'frank':'18'
        },
        successFn:(e) => {
            f1.call(undefined,e)
            f2.call(undefined,e)
             console.log(e) 
        },
        failFn:(e)=>{
            console.log(e.status)
            console.log(e.responseText)
        }
    })
})