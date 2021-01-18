# sanity-react-extra
Components for react-based frontends using sanity.io

## SanityImg
An image component that will create an image tag with the right aspect ratio and srcSets based on your input image.

It takes as input an image asset. For example the groq query:
```groq
  ...,
  "image": image.asset->,
```

To use the component, you must provide an imageUrlBuilder, from @sanity/client or @otterdev/sanity-next-extra for example, as well as the image.
```jsx
  <SanityImg builder={imageUrlBuilder} image={image} 
    //optional, set width or height and the other one will keep aspect
    width={100}
    //optional, will keep aspect
    height={100}
    //optional
    alt="An image"
    //optional
    className="image"
  />
```

## renderObjectArray
Used to render an array of objects. Useful when your sanity schema is a page broken into sections:
```js
{
 name: "page",
 type: "document",
 fields: [
   {
     name: "sections",
     title: "Sections",
     type: "array",
     of: [
        {type: "header"},
        {type: "body"},
        {type: "footer"},
     ]
   }
 ]
}
```

Provide components for each type:
```jsx
renderObjectArray(page.sections, {
  header: Header,
  body: (props)=><div>Body</div>,
  footer: Footer
})
```

## rgba
Render a color picker color to a string for use in css:
```js
rgba(color)

// = "rgba(1,0.2,0.3,0.1)"
```