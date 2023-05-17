## Errors that we faced
- While using material tailwind `Select` element there was an error as its not the regular `select` element so we were not able to fetch its value and update in into the state to send it to database. We built another state for there select elements using AI.

- There was an error that the data being fectched from the database through the fetch data function was coming Asynrochously and we were not able to map it due to delay, we tried using useState to fix this but this ended up in 13k api requests to the server in few muniutes, the we delecared another useEffect and fixed it using that. 

- You can't directly call the function making an api call, you have to call it inside a useEffect or a function that is called inside a useEffect otherwise it will make infinite api calls to the server.

- You have to return the data coming from the api in the original function and then call it inside the useEffect otherwise it will return undefined and will give you error while mapping it.