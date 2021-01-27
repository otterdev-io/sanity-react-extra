# sanity-react-extra
Components for react-based frontends using sanity.io

## SanityImg
An image component that will create an image tag for your sanity image. If the query is enriched:
- Setting width or height will set the other one according to image aspect ratio, ensuring no layout shift occurs during rendering. This helps page performance.
- srcSets will be set.

To encrich your query, use the `withDimensions` function in your query:
```groq
import groq from "groq"
import { withDimensions } from "@otterdev/saity-react-extra"

const query =  groq`*[] {
  ...,
  "image": ${withDimensions("image")}
}`
```

To use the component, you must provide an imageUrlBuilder, from @sanity/client or @otterdev/sanity-next-extra for example, as well as the image.
```jsx
import { SanityImg } from "@otterdev/saity-react-extra"

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

import { renderObjectArray } from "@otterdev/saity-react-extra"

renderObjectArray(page.sections, {
  header: Header,
  body: (props)=><div>Body</div>,
  footer: Footer
})
```
## rgba
Render a color picker color from `@sanity/color-input` to a string for use in css:
```js
import { rgba } from "@otterdev/saity-react-extra"

rgba(color)

// = "rgba(1,0.2,0.3,0.1)"
```