let nextPersonIndex = 0;

class Person
{
  constructor(id, name)
  {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory
{
  createPerson(name)
  {
      const person = new Person(nextPersonIndex, name);
      nextPersonIndex ++;
      return person;
  }
}