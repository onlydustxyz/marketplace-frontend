# Chromatic reviews

[Chromatic](https://www.chromatic.com/) is a visual regression cloud tool that uses Storybook to check whether differences in component rendering.

Chromatic basically launches Storybook and takes a screenshot of a component for two commits and compares them.

In our case, Chromatic is integrated in our CI/CD pipeline, and it is required to review detected Storbybook changes in Chromatic in order
to merge a pull request.

If changes are detected, then the reviewer will have to review each change and accept it manually - to inspect further, it is possible to open the Storybooks of the two branches being compared:

![Chromatic view Storybook](./pictures/chromatic-view-storybook.png)

See [this paragraph](./making-a-component.html#storybook) for more info on how to use Storybook.


