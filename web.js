function saveTheData(event) {
    event.preventDefault();

    const Candy = event.target.candyName.value;
    const Description = event.target.description.value;
    const Price = event.target.price.value;
    const Quantity = event.target.quantity.value;

    let userDetails = {
        Candy,
        Description,
        Price,
        Quantity
    };

    // Store data in LocalStorage
    localStorage.setItem(Candy, JSON.stringify(userDetails));

    //  Show user details on screen
    showUserOnScreen(userDetails);

    axios.post("https://crudcrud.com/api/8caad7915aba4c6f8c997efd5c12201d/candyShop", userDetails)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/8caad7915aba4c6f8c997efd5c12201d/candyShop")
        .then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                showUserOnScreen(response.data[i]);
            }
        }).catch((err) => {
            console.log(err);
        });
});

function showUserOnScreen(user) {
    document.getElementById('candyName').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';

    const parentNode = document.getElementById('listitem');
    const childHTML = `<li id=${user._id}>${user.Candy}-${user.Description}${user.Price}-${user.Quantity}
    <button onClick="Buy1('${user._id}')"  id= 'buy1'>Buy1</button>
    <button onClick="Buy2('${user._id}')">Buy2</button>
    <button onClick="Buy3('${user._id}')">Buy3</button>
    </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}



