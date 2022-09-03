import mongoose from "mongoose";
const { Schema } = mongoose;

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");

  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Missing name entry"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String,
  });

  const Fruit = mongoose.model("Fruit", fruitSchema);



  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
  })
  const Person = mongoose.model("Person", personSchema)
  const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Great fruit"
  })
  pineapple.save()

  const person = new Person({
    name: "John",
    age: 37,
    favoriteFruit: pineapple
  })

  await person.save()
  const people = await Person.find()
  console.log(people)

  // fruitsCollection(Fruit)

  Fruit.find((err, fruits) => {
    if(err) {
      console.log(err)
    } else {
      fruits.map(fruit => console.log(fruit.name))
      mongoose.connection.close()
    }
  })

  Fruit.updateOne({_id: 'enter id here'}, {name: "Peach"}, (err) => {
    err ? console.log(err) : console.log("Successfully updated the document.")
  })
//name or Id
  Fruit.deleteOne({name: "enter your name here"}, (err) => {
    err ? console.log(err) : console.log("Successfully deleted the document.")
  })

  Person.deleteMany({name: "John"}, (err) => {
    err ? console.log(err) : console.log("Successfully deleted the document.")
  })
};

const fruitsCollection = (Fruit) => {
  const kiwi = new Fruit({
    name: "Kiwi",
    score: 10,
    review: "The best fruit!"
  })

  const orange = new Fruit({
    name: "Orange",
    score: 4,
    review: "Too sour for me"
  })

  const banana = new Fruit({
    name: "Banana",
    score: 3,
    review: "weird texture"
  })

  Fruit.insertMany([kiwi, orange, banana], (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log("Sucessfully saved all the fruits to the fruitsDB")
    }
  })
}

main().catch(console.error);

