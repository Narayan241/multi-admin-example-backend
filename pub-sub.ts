class MyEvent<T> {
  private listeners: ((data: T) => void)[] = [];
  constructor(public name: string) {}

  addListener(listener: (data: T) => void) {
    this.listeners.push(listener);
  }

  fire(data: T) {
    this.listeners.forEach((listener) => {
      listener(data);
    });
  }
}

function createEvent<T>(name: string) {
  const listeners: ((data: T) => void)[] = [];

  return {
    getName() {
      return name;
    },
    setName(value: string) {
      name = value;
    },
    addListener(listener: (data: T) => void) {
      listeners.push(listener);
    },
    fire(data: T) {
      listeners.forEach((listener) => {
        listener(data);
      });
    },
  };
}

interface User {
  id: string;
  name: string;
  email: string;
}

const userCreatedEvent = createEvent<User>("user:created");

const user: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@gmail.com",
};
userCreatedEvent.addListener((user) => {
  console.log(`User created: ${user.name}`);
});

userCreatedEvent.addListener((user) => {
  console.log(`Sending email to ${user.email}`);
});

userCreatedEvent.addListener((user) => {
  console.log(`Logging user creation for ${user.name}`);
});

userCreatedEvent.fire(user);
