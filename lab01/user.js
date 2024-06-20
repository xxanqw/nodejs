// user.js
const fs = require('fs');

const loadUser = () => {
    try {
        const dataBuffer = fs.readFileSync('user.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return {
            "FirstName": "Ivan",
            "LastName": "Potiienko",
            "Languages": []
        };
    }
};

const saveUser = (user) => {
    const dataJSON = JSON.stringify(user);
    fs.writeFileSync('user.json', dataJSON);
};

const addLanguage = (title, level) => {
    const user = loadUser();
    const duplicateLanguage = user.Languages.find((language) => language.title === title);

    if (!duplicateLanguage) {
        user.Languages.push({
            title: title,
            level: level
        });
        saveUser(user);
        console.log('Мову додано');
    } else {
        console.log('Мова вже існує');
    }
};

const removeLanguage = (title) => {
    const user = loadUser();
    const languagesToKeep = user.Languages.filter((language) => language.title !== title);

    if (user.Languages.length > languagesToKeep.length) {
        console.log('Мову видалено');
        user.Languages = languagesToKeep;
        saveUser(user);
    } else {
        console.log('Мова не знайдена');
    }
};

const listLanguages = () => {
    const user = loadUser();

    console.log('Ваші мови:');
    user.Languages.forEach((language) => {
        console.log(`${language.title}: ${language.level}`);
    });
};

const readLanguage = (title) => {
    const user = loadUser();
    const language = user.Languages.find((language) => language.title === title);

    if (language) {
        console.log(`${language.title}: ${language.level}`);
    } else {
        console.log('Мова не знайдена');
    }
};

module.exports = {
    addLanguage: addLanguage,
    removeLanguage: removeLanguage,
    listLanguages: listLanguages,
    readLanguage: readLanguage
};
