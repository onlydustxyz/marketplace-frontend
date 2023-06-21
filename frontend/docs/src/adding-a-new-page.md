# Adding a new page

## Page template

```typescript
export default function Page() {
  return <Background roundedBorders={BackgroundRoundedBorders.Full}>
	<div className="flex flex-col justify-center items-center text-greyscale-50">
	  // Rest of content here ...
	</div>
  </Background>
}
```

## Updating the router 

The routes variable in the App component defines the different routes of the application. It is structured as an array and includes routes for the impersonation page, projects page, terms and conditions page, payments page, login page, project details page, catch-all page, and error page.

These routes are defined using the useRoutes hook from the `react-router-dom` library. The routes are nested and can be accessed by navigating through the application. For example, the project details page has nested routes for the overview, contributors, and payments sub-pages.

Add the route to the `routes` object in `./frontend/src/App/index.tsx`:

```typescript
const routes = useRoutes([...]);
```
