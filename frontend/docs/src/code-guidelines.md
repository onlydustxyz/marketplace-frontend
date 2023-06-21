# Code guidelines

## Custom hooks

Complex logic for a use case - particularly with complex `useEffect` calls - should be extracted in a [custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks).

See the React documentation about [when to use custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks#when-to-use-custom-hooks).

*Beware that custom hooks don't share state between components in which they are used* - in order to achieve this, you need to use a `Context`. 
See this [article by Kent C. Dodds](https://kentcdodds.com/blog/how-to-use-react-context-effectively) on the subject.

## Rule of three

>Two instances of similar code do not require refactoring, but when similar code is used three times, it should be extracted into a new procedure.

## Container and Presentational Components

It is a good idea to separate a component between an `index.tsx` and a `View.tsx` file.

[See more about this](./making-a-component.html#separating-presentation-and-logic)

## GraphQL and Apollo Client

### Colocate queries with components

Custom queries - those not provided out of the box by the code generation plugin with Hasura - should be created in a `queries.graphql` file colocated with the component.

The codegen will then automatically create hooks for these custom queries.
