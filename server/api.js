const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

var ModsNumber = 0;

const getMods = () => {
    try {
        return axios.get('https://api.nusmods.com/v2/2022-2023/moduleList.json')
    } catch (error) {
        console.error(error)
    }
}

const countMods = async () => {
    const mods = getMods()
        .then(response => {
            console.log("Status code: ", response.status)
            if (response.data) {
                console.log(
                    `Got ${Object.entries(response.data).length} mods`
                )
                ModsNumber = Object.entries(response.data).length
            }
        })
        .catch(error => {
            console.log(error)
        })
}

countMods();

app.get('/api', (req, res) => {
    res.json({numberOfMods: ModsNumber});
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});