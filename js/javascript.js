const sendData = function(url, method, data, callback) {
    axios({
  method: method, 
  url: url, 
  data: data
})
.then(response => {
    return callback(response.data);
})
.catch(error => {
    console.log(error)
})
};


const editData = (self) => {
    const tr = self.parentNode.parentNode;
    const name = tr.getElementsByClassName('name')[0]
    const innerName = tr.getElementsByClassName('innerName')[0]
    const age = tr.getElementsByClassName('age')[0]
    const innerAge = tr.getElementsByClassName('innerAge')[0]


   if (name.style.display == 'none'){
        name.style.display = 'inline';
        age.style.display = 'inline';

        innerName.style.display = 'none';
        innerAge.style.display = 'none';
    } else {

        sendData('/update', 'post', {id: tr.id, name: name.value, age: age.value}, (response) => {
            const data = response;
            const {age, name} = data;
            innerAge.innerText = age;
            innerName.innerText = name;
            console.log("update",name, age)
        })
       

        name.style.display = 'none';
        age.style.display = 'none';

        innerName.style.display = '';
        innerAge.style.display = '';
    }
};
const deleteData = (self) => {
    const tr = self.parentNode.parentNode;
    const trId = tr.id;
    const table = tr.parentNode;
    
    console.log(trId, tr, table)
    sendData('/delete', 'post', {id: trId}, (response) => {
        const {id} = response;
        console.log('delete', id)
        table.removeChild(document.getElementById(id));
    })
    

};
