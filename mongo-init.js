db.auth('root', 'example')
db = db.getSiblingDB('local')

db.createCollection("articles")
db.articles.insertOne({
    "id":1,
    "data":'<h1 style="background-color:Tomato;">Tomato</h1>\n' +
        '<h1 style="background-color:Orange;">Orange</h1>\n' +
        '<h1 style="background-color:DodgerBlue;">DodgerBlue</h1>\n' +
        '<h1 style="background-color:MediumSeaGreen;">MediumSeaGreen</h1>\n' +
        '<h1 style="background-color:Gray;">Gray</h1>\n' +
        '<h1 style="background-color:SlateBlue;">SlateBlue</h1>\n' +
        '<h1 style="background-color:Violet;">Violet</h1>\n' +
        '<h1 style="background-color:LightGray;">LightGray</h1>\n',
    "tags":"example"
})

db.articles.insertOne({
    "id":2,
    "data":'\n' +
        '<iframe width="750" height="750" src="https://www.youtube.com/embed/tgbNymZ7vqY">\n' +
        '</iframe>\n',
    "tags":"example"
})
