# My TypeScript Journey: Earned Badges 🏆

## Badges Overview

Here is a collection of badges I earned from completing Microsoft Learn's TypeScript modules:

1. **Getting Started with TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/ru-ru/Barvinko-7701/FZ3A5P6X?sharingId=1907B005CF3B90DB)
2. **Declare Variable Types in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/ru-ru/Barvinko-7701/K5MS5WEB?sharingId=1907B005CF3B90DB)
3. **Implement Interfaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/ru-ru/Barvinko-7701/3XGFZDRH?sharingId=1907B005CF3B90DB)
4. **Develop Typed Functions in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/ru-ru/Barvinko-7701/3XGF4UZH?sharingId=1907B005CF3B90DB)
5. **Declare and Instantiate Classes in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/ru-ru/Barvinko-7701/EJZD7DRP?sharingId=1907B005CF3B90DB)
6. **Generics in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/ru-ru/Barvinko-7701/K5MSPC4B?sharingId=1907B005CF3B90DB)
7. **Work with External Libraries in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/ru-ru/Barvinko-7701/N7UEV9NF?sharingId=1907B005CF3B90DB)
8. **Organize Code with Namespaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/ru-ru/Barvinko-7701/X2H4KZ9Y?sharingId=1907B005CF3B90DB)

## Reflections

**1. Getting Started with TypeScript /** Learned why TypeScript excels over JavaScript for web development, how to install and set it up.

**2. Declare Variable Types in TypeScript /** Learned to declare variables using primitive types, object types, and union and intersection types. They should be used to prevent type errors, as the larger the project, the harder it will be to find the cause of an error due to an object field receiving an unexpected value.

**3. Implement Interfaces in TypeScript /** Learned the reasons for using interfaces in TypeScript. Also learned how to declare, create, and extend them. We should define an interface to specify object types, but primarily for classes, to precisely track which fields and methods the class has, thus avoiding errors due to incorrectly seted access modifiers.

**4. Develop Typed Functions in TypeScript /** Learned why to use strict typing for functions. Experimented with functions with required, optional, default parameters, and rest parameters. Understood how to use function whith type aliases and interfaces. By specifying types, we once again safeguard the function from unexpected data. There is the ability to pass an indefinite number of parameters, which can make the code prepared for more unique events without encountering errors. It is also convenient to pass objects, immediately destructuring them, which eliminates code verbosity and makes it more readable.

**5. Declare and Instantiate Classes in TypeScript /** Learned Object-Oriented Programming in TypeScript, how to declare classes, fields, methods. How to specify modifiers and static properties of a class. Learned about inheritance and working with interfaces in classes. TypeScript представляет интерфейсы, которых нет в JavaScript, позволяя классам сохранять структуру. Статические поля и методы могут быть полезны для изменения состояния самого класса, в зависимости от того, что происходит со всеми экземплярами вместе, а не по отдельности.

**6. Generics in TypeScript /** Explored how to use generics, creating arrays, functions, classes, and their constraints in advance without defining them types  beforehand. This allows us to be adaptive to the received data while preserving the ability to track errors. Thus, we enable continuing the operation for those variables whose types we do not know precisely but have a general idea of what to expect, without exhaustively specifying all possibilities like literal types. Additionally, they help reduce code verbosity by decreasing the need to specify similar but slightly different sets of specified types.

**7. Work with External Libraries in TypeScript /** Learned how to work with modules in TS, import libraries, and find their adaptation for TS. Modules greatly aid in code organization and encapsulation, making it easier to read and write without accidentally altering existing code. Moreover, understanding the convenient installation of TypeScript-adapted libraries through npm is crucial, as it helps alleviate many search-related issues libraries.

**8. Organize Code with Namespaces in TypeScript /** Explored an alternative to modules - namespaces, how to encapsulate code using them in single and multiple files. This is a convenient way of segregating parts of code, implementing class instances, and working with them, which becomes crucial with a large number of program components being worked on by different developers. Additionally, namespaces allow encapsulation within themselves, facilitating better code separation and organization among different developers working on the same program component.