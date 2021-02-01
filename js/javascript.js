const sendData = function(url, method, data) {
    axios({
  method: method, 
  url: url, 
  data: data
})
.then(response => {
    console.log(response)
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
        sendData('/update', 'post', {id: tr.id, name: name.value, age: age.value})
        innerAge.innerText = age.value;
        innerName.innerText = name.value
        console.log(name.value, age.value)

        name.style.display = 'none';
        age.style.display = 'none';

        innerName.style.display = '';
        innerAge.style.display = '';
    }
};
const deleteData = (self) => {
    tr = self.parentNode.parentNode;
    trId = tr.id;
    table = tr.parentNode;
    
    console.log(trId, tr, table)
    sendData('/delete', 'post', {id: trId})
    
    table.removeChild(tr);
};
