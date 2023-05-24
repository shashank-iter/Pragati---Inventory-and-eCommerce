## Errors that we faced
- While using material tailwind `Select` element there was an error as its not the regular `select` element so we were not able to fetch its value and update in into the state to send it to database. We built another state for there select elements using AI.

- There was an error that the data being fectched from the database through the fetch data function was coming Asynrochously and we were not able to map it due to delay, we tried using useState to fix this but this ended up in 13k api requests to the server in few muniutes, the we delecared another useEffect and fixed it using that. 

- You can't directly call the function making an api call, you have to call it inside a useEffect or a function that is called inside a useEffect otherwise it will make infinite api calls to the server.

- You have to return the data coming from the api in the original function and then call it inside the useEffect otherwise it will return undefined and will give you error while mapping it.

- Regarding the 'index.js'(that re-export the individual components of that folder) files inside folders, it mainly takes named exports and exports them as named exports.
  - For example, 
    - there's a file named 'index.js' inside of a folder named 'components'.
    - the file 'index.js' exports the components of that folder.
    - if theres a component as 'funiTree.jsx', you need to export as `export const FuniTree`.
    - it can as well be exported as default as `export default FuniTree`, BUT exporting is as a named export is important for the `index.js` of this project to work as is.
    - if for some reason, you do need to export it as default ONLY(without exporting as named export), you can use `export {default as FuniTree} from "@/pages/testFolder/funiTree";` instead of `export * from "@/pages/testFolder/FuniTree";`
    - Finally, the ***SAFEST*** option is to export the components as named export as well as default export 💀
