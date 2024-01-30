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

    axios.post("https://crudcrud.com/api/ea610a6669a74f929b413844a1dd3a58/buyYourFavCandy", userDetails)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/ea610a6669a74f929b413844a1dd3a58/buyYourFavCandy")
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
    const childHTML = `<li id=${user._id}>${user.Candy}-${user.Description}-${user.Price}-<span class="quantity">${user.Quantity}</span>
    <label for="buy1"><input type="button" onclick="buyCandy('${user._id}', '${user.Candy}', '${user.Description}', ${user.Price}, ${user.Quantity}, 1)" value="Buy 1"></label>
    <label for="buy2"><input type="button" onclick="buyCandy('${user._id}', '${user.Candy}', '${user.Description}', ${user.Price}, ${user.Quantity}, 2)" value="Buy 2"></label>
    <label for="buy3"><input type="button" onclick="buyCandy('${user._id}', '${user.Candy}', '${user.Description}', ${user.Price}, ${user.Quantity}, 3)" value="Buy 3"></label>
</li>`;

    parentNode.innerHTML += childHTML;
}


function buyCandy(id, candyName, Description, Price, availableQuantity, buyQuantity) {
    if (availableQuantity === 0) {
        alert(`Sorry, ${candyName} is not available.`);
        return;
    }

    const quantityToBuy = buyQuantity;

    if (quantityToBuy > availableQuantity) {
        alert(`Sorry, only ${availableQuantity} candies are available.`);
        return;
    }

    // Retrieve data from local storage
    let userDetails = JSON.parse(localStorage.getItem(candyName));

    // userDetails exists and initialize Quantity if not present
    userDetails = userDetails || {};
    userDetails.Quantity = userDetails.Quantity || availableQuantity;

    userDetails.Quantity -= buyQuantity;

    // Update local storage
    localStorage.setItem(candyName, JSON.stringify(userDetails));

    // Update screen
    const listItem = document.getElementById(id);
    const quantityElement = listItem.querySelector('.quantity');
    quantityElement.textContent = userDetails.Quantity;

    // Update CRUD API
    const updatedDetails = {
        Candy: candyName,
        Description,
        Price,
        Quantity: userDetails.Quantity
    };

    axios.put(`https://crudcrud.com/api/ea610a6669a74f929b413844a1dd3a58/buyYourFavCandy/${id}`, updatedDetails)
        .then((res) => {
            console.log("API Update Successful:", res);
        })
        .catch((err) => {
            console.error("API Update Error:", err);
        });
}
