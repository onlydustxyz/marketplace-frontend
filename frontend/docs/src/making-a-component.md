# Making a component

## Separating presentation and logic

Components that have complex logic, queries, etc ... should be split in two files inside a dedicated folder: 
`index.tsx` for the logical part and `View.tsx` for the visual part.

Example:


`index.tsx`

```typescript
export default function Component() {
  const {data} = useQuery<T>(MY_QUERY);
  return <View items={data} />
}
```

`View.tsx`

```typescript
interface ComponentViewProps {
  data: T
}

export default function ComponentView({data} : ComponentViewProps) {
  return <div className="flex flex-row px-6 align-center">
           // ...
		 </div>
}
```

## Development process

### Storybook

It is highly encouraged to use Storybook while implementing the design of a component.

Storybook allows to display and implement a component in isolation. It is also possible to display several variants of a component - 
which makes it the ideal place to describe a design system.

This is easier to do if the component has been properly split between logic and presentation like above.

#### Interface

Storybook can be launched using the following command:

```
yarn storybook
```

This will open an interface (accessible by default [locally on the 6006 port](http://localhost:6006)).

For each component, a *Docs* section displays the generated documentation for the component :

![Storybook docs](./pictures/storybook-docs.png)

Then, there is a section for each story, with the relevant parameters that can be modified to see the variants of a component.

![Storybook story](./pictures/storybook-story.png)


#### Creating a story

A story should be named according to the `<COMPONENT_NAME>.stories.tsx` (e.g. `Button.stories.tsx`) and should be colocated with the `index.tsx` and `View.tsx` files.

## When to add a component to the `components` folder ?

The folder structure of the app follows what is known as a [Fractal structure](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af).

In other words, only add a component to the `components` folder when it is used in more than two pages or components.


