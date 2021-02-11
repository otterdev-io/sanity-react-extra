# sanity-react-extra
Components for react-based frontends using sanity.io

## SanityImg
An image component that will create an image tag for your sanity image. If the groq query fetches the image dimensions:
- Setting width or height will set the other one according to image aspect ratio, ensuring no layout shift occurs during rendering. This helps page performance.
- srcSets will be set.

To easily fetch dimensions for an image, use the `withDimensions` function in your query:
```groq
import groq from "groq"
import { withDimensions } from "sanity-react-extra"

const query =  groq`*[] {
  ...,
  "image": ${withDimensions("image")}
}`
```

To use the component, you must provide an imageUrlBuilder, from @sanity/client or sanity-next-extra for example, as well as the image.
```jsx
import { SanityImg } from "sanity-react-extra"

  <SanityImg builder={imageUrlBuilder} image={image} 
    //optional, set width or height and the other one will keep aspect
    width={100}
    //optional, will keep aspect
    height={100}
    //optional
    className="image"
    //other img props
    alt="An image"
  />
```

## renderObjectArray
Used to render an array of objects. This is useful when your sanity schema for a page follows the 'page builder' pattern, where the page is built out of sections:
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

To render the schema, just provide components for each type:

```jsx

import { renderObjectArray } from "sanity-react-extra"

const Header = (props) => <nav>Header</nav>
const Body = (props) =><div>Body</div>

renderObjectArray(page.sections, {
  header: Header,
  body: Body,
  //or to inline the component:
  footer: useCallback((props)=><div>Footer</div>, [])
})
```
## rgba
Render a color picker color from `@sanity/color-input` to a string for use in css:
```js
import { rgba } from "sanity-react-extra"

rgba(color)

// = "rgba(1,0.2,0.3,0.1)"
```