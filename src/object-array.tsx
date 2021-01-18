/*
* Map a list of sanity objects to react components to present them
*/
export const renderObjectArray = (objects: any[], objectMap: { [o: string]: any }) =>
  objects.map((o) =>
    Object.keys(objectMap).find((k) => k === o._type)
      ? (() => {
          const { _key, _type, ...props } = o;
          const Cmp = objectMap[_type];
          return <Cmp key={_key} type={_type} {...props} />;
        })()
      : null
  );