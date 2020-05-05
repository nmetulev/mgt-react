# React wrapper for Microsoft Graph Toolkit

[![npm](https://img.shields.io/npm/v/mgt-react?style=for-the-badge)](https://www.npmjs.com/package/mgt-react) ![GitHub](https://img.shields.io/github/license/nmetulev/mgt-react?style=for-the-badge)

Use `mgt-react` to simplify usage of [Microsoft Graph Toolkit (mgt)](https://aka.ms/mgt) web components in React.

`mgt-react` extends [`wc-react`](https://github.com/nmetulev/wc-react) adding support for templates.

## Installation

```bash
npm install mgt-react
```

or

```bash
yarn add mgt-react
```

## Usage

Import `wrapMgt` at the top:

```tsx
import { wrapMgt } from 'mgt-react';
```

Create a new React component that wraps the mgt web component by calling the `wrapMgt` function and pass the tag name of the web component.

```tsx
const Person = wrapMgt('mgt-person');
```

You can now use `Person` anywhere in your JSX as if it were a regular React component.

```tsx
<Person personQuery="me" />
```

### Use properties instead of attributes

For example, you can set the `personDetails` property to an object:

```jsx
const App = (props) => {
  const personDetails = {
    displayName: 'Bill Gates',
  };

  return <Person personDetails={personDetails}></Person>;
};
```

### Register event handlers:

```jsx
const PeoplePicker = wrapMgt('mgt-people-picker');

const App = (props) => {
  handleSelectionChanged = (e) => {
    this.setState({ people: e.target.selectedPeople });
  };

  return <PeoplePicker selectionChanged={this.handleSelectionChanged} />;
};
```

All properties and events map exactly as they are defined on the web component.

### Templates

`mgt-react` allows you to leverage React for writing templates for mgt components.

> Note: You can learn more about [templating mgt components here](https://docs.microsoft.com/graph/toolkit/templates)

For example, to create a template to be used for rendering events in the `mgt-agenda` component, first define a component to be used for rendering an event:

```tsx
const MyEvent = (props: MgtTemplateProps) => {
  const { event } = props.dataContext;
  return <div>{event.subject}</div>;
};
```

Then use it as a child of the wrapped component and set the template prop to `event`

```tsx
const Agenda = wrapMgt('mgt-agenda');

const App = (props) => {
  return <Agenda>
    <MyEvent template="event">
  </Agenda>
}
```

The `template` prop allows you to specify which template to overwrite. In this case, the `MyEvent` component will be repeated for every event, and the `event` object will be passed as part of the `dataContext` prop.

## Why

If you've used web components in React, you know that proper interop between web components and React components requires a bit of extra work.

From [https://custom-elements-everywhere.com/](https://custom-elements-everywhere.com/):

> React passes all data to Custom Elements in the form of HTML attributes. For primitive data this is fine, but the system breaks down when passing rich data, like objects or arrays. In these instances you end up with stringified values like some-attr="[object Object]" which can't actually be used.

> Because React implements its own synthetic event system, it cannot listen for DOM events coming from Custom Elements without the use of a workaround. Developers will need to reference their Custom Elements using a ref and manually attach event listeners with addEventListener. This makes working with Custom Elements cumbersome.
