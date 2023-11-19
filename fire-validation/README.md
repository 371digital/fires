# Fire Validation

This package provides a set of validation to different types of data. It includes validators for various data types such as password, string, number, email, length, and more.

## Installation

```bash
fire add fire-validation
```

## Usage


### array

```javascript
import { FireValidation } from "371fire";

const schema = {
  users: {
    type: "array",
    fieldTitle: "Users",
  },
};
const props = {
  users: [],
};

const response = await FireValidation({ schema, props });
// {status: true}
```

### email

```javascript
import { FireValidation } from "371fire";

const schema = {
  mail: {
    type: "email",
    fieldTitle: "User Email",
  },
};
const props = {
  mail: "fire@371digital.com",
};

const response = await FireValidation({ schema, props });
// {status: true}
```

### id

```javascript
import { FireValidation } from "371fire";

const schema = {
  userId: {
    type: "id",
    fieldTitle: "User ID",
  },
};
const props = {
  userId: "641e1b102a3f81df18e5c859",
};

const response = await FireValidation({ schema, props });
// { status: true }
```

### isObject

```javascript
import { FireValidation } from "371fire";

const schema = {
  userData: {
    type: "isObject",
    fieldTitle: "User Data",
  },
};
const props = {
  userData: {
    name: "John",
    age: 30,
  },
};

const response = await FireValidation({ schema, props });
// { status: true }
```

### length

```javascript
import { FireValidation } from "371fire";

const schema = {
  username: {
    type: "string",
    typeOptions: { min: 4, max: 10 },
    fieldTitle: "Username",
  },
};
const props = {
  username: "john_doe",
};

const response = await FireValidation({ schema, props });
// { status: true }
```

### nestedSlug

```javascript
import { FireValidation } from "371fire";

const schema = {
  nestedPath: {
    type: "nestedSlug",
    fieldTitle: "Nested Path",
  },
};
const props = {
  nestedPath: "/parent/child/grandchild",
};

const response = await FireValidation({ schema, props });
// { status: true }
```

### number

```javascript
import { FireValidation } from "371fire";

const schema = {
  age: {
    type: "number",
    fieldTitle: "Age",
  },
};
const props = {
  age: 30,
};

const response = await FireValidation({ schema, props });
// { status: true }
```

### oneOf

```javascript
import { FireValidation } from "371fire";

const schema = {
  status: {
    type: "oneOf",
    typeOptions: ["active", "inactive", "pending"],
    fieldTitle: "Status",
  },
};
const props = {
  status: "active",
};

const response = await FireValidation({ schema, props });
// { status: true }
```

### password

```javascript
import { FireValidation } from "371fire";

const schema = {
  password: {
    type: "password",
    fieldTitle: "Şifre",
  },
};
const props = {
  password: "12346",
};

const response = await FireValidation({ schema, props });
// {status: true}
```

### required
``` javascript
import { FireValidation } from "371fire";

const schema = {
  username: {
    type: "required",
    fieldTitle: "Username"
  }
}
const props = {
  username: "john_doe"
}

const response = await FireValidation({ schema, props })
// { status: true }
```

### schema
```javascript
import { FireValidation } from "371fire";

const schema = {
  userData: {
    type: "schema",
    typeOptions: ["name", "age", "email"],
    fieldTitle: "User Data"
  }
}
const props = {
  userData: {
    name: "John",
    age: 30,
    email: "john@example.com"
  }
}

const response = await FireValidation({ schema, props })
// { status: true }
```

### slug
```javascript
import { FireValidation } from "371fire";

const schema = {
  slugValue: {
    type: "slug",
    fieldTitle: "Slug Value"
  }
}
const props = {
  slugValue: "valid-slug-example"
}

const response = await FireValidation({ schema, props })
// { status: true }
```

### string
```javascript
import { FireValidation } from "371fire";

const schema = {
  stringValue: {
    type: "string",
    fieldTitle: "String Value"
  }
}
const props = {
  stringValue: "Hello World"
}

const response = await FireValidation({ schema, props })
// { status: true }
```

### version
```javascript
import { FireValidation } from "371fire";

const schema = {
  appVersion: {
    type: "version",
    fieldTitle: "App Version"
  }
}
const props = {
  appVersion: "1.0.0"
}

const response = await FireValidation({ schema, props })
// { status: true }
```