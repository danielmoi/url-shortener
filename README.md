# URL shortener Microservice

[freeCodeCamp Backend challenge 3/5](https://www.freecodecamp.com/challenges/url-shortener-microservice)

## API

```
GET /shorten/:url
```


---
## User stories:

1. User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

3. User Story: When I visit that shortened URL, it will redirect me to my original link.


----
## Example usage:

```
http://url-shortener-4000.herokuapp.com/shorten/http://google.com
```

----
## Example output:

```js
{
  data: {
    original_url: "http://google.com/",
    key: "d2nebv5",
    shortened_url: "http://url-shortener-4000.herokuapp.com/d2nebv5"
  }
}

```
