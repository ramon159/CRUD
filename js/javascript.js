let test = 0;
const editData = (self) => {
    const tr = self.parentNode.parentNode;
    const name = tr.getElementsByClassName('name')[0]
    const age = tr.getElementsByClassName('age')[0]

   if (name.style.display == 'none'){
        name.style.display = 'block';
        age.style.display = 'block';
    } else {
        name.style.display = 'none';
        age.style.display = 'none';
    }
};
const deleteData = (self) => {
    trId = self.parentNode.parentNode.id
    console.log(trId)
};
