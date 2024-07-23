class CodeBuilder
{
  constructor(className)
  {
      this.fields = [];
      this.name = className;
  }

  addField(name)
  {
      this.fields.push(name);
      return this;
  }

  toString()
  {
      if (!this.fields.length) {
          return `class ${this.name} {\n}`;
      }
      const constructorBody = [];
      for (const i in this.fields) {
          const line = `    this.${this.fields[i]} = ${this.fields[i]};`;
          constructorBody.push(line);
      }
      
      return `class ${this.name} {\n` + 
      `  constructor(${this.fields.join(', ')}) {\n` +
      `${constructorBody.join('\n')}\n  }\n` +
      `}`
  }
}