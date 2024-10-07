const express = require('express');
const app = express();
const PORT = 3004;

//Greeting the User
app.get('/greetings/:Jeremy', (req, res) => {
    const username = req.params.username;
    res.send(`Ah, welcome to the haunted house, ${Jeremy}... We've been expecting you.`);
});

//Rolling the Dice
app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number)) {
        res.send("You must specify a number... or the spirits will be displeased.");
    } else {
        const randomNumber = Math.floor(Math.random() * (number + 1));
        res.send(`The spirits have spoken! You rolled a ${randomNumber}. Beware what this means...`);
    }
});

//Haunted Collectibles
const hauntedCollectibles = [
    { name: 'cursed amulet', price: 13.13 },
    { name: 'haunted doll', price: 66.66 },
    { name: 'ancient grimoire', price: 99.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < hauntedCollectibles.length) {
        const item = hauntedCollectibles[index];
        res.send(`So, you desire the ${item.name}? For a mere ${item.price}, its dark power can be yours... if you dare.`);
    } else {
        res.send("This cursed item is not in stock. It may be lost in the shadows... Check back if you dare.");
    }
});

//Haunted House Marketplace
const hauntedShoes = [
    { name: "Spectral Sandals", price: 50, type: "sandal" },
    { name: "Ghastly Sneakers", price: 500, type: "sneaker" },
    { name: "Hexed Boots", price: 300, type: "boot" },
    { name: "Cursed Slippers", price: 30, type: "slipper" },
    { name: "Vampire Loafers", price: 25, type: "sandal" },
    { name: "Phantom Heels", price: 175, type: "heel" },
    { name: "Bewitched Boots", price: 1000, type: "boot" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = hauntedShoes;

    const minPrice = parseFloat(req.query['min-price']);
    const maxPrice = parseFloat(req.query['max-price']);
    const type = req.query.type;

    if (!isNaN(minPrice)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }

    if (!isNaN(maxPrice)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
    }

    if (filteredShoes.length > 0) {
        res.json(filteredShoes);
    } else {
        res.send("The cobbler's dark magic reveals no shoes for your request... perhaps you seek something that shouldn't be found.");
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});