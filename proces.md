# Vue-course
Assignements for learning Vue.js

## First exercises
In the first exercises I did some basic editing of the DOM. Here I created my first Vue instances (view models) where data and methods are automatically connected to the DOM. By defining an element that vue can use with the `el: '#element'`, it automatically knows that everything written in the Vue instance can be used in the DOM HTML as well.

This makes it very easy to create reactive elements. Because functionality can be defined in the template / HTML directly and the real logic is defined in the Vue. This makes code pretty easy to read because both functionality and logic are seperated. There is no need to add extra listeners or create HTML nodes manually in Vanilla Javascript. I could, but it's not needed.

This doesn't mean that Vue always edits the DOM directly. It creates a copy of the HTML template that I created and adds all the data, methods, computed properties etc in a virtual DOM. The virtual DOM is kind of the middle man and will only render to the DOM when needed.

### The real exercise
In the end we created a game where we used all the basic knowledge of Vue. It was a simple game where the player fights against a monster and can reset the game when the player or monster dies. Each step is logged to the DOM.
![The game ](../vue-course/img/game.png)

## Theory
The most interesting part I learned from the theory bit, is the `vue-lifecycle`. There I learned what steps are initialized when a new Vue object is created. I didn't know there we're multiple hooks during those steps to tap into.
![Vue lifecycle sketchnotes ](../vue-course/img/vue-lifecycle.jpg)

## Second exercises
In the second block we are learning how to set up a development environment. This way we can get more out of Vue and are not limited to DOM restrictions, like case insensitivity.

### Vue CLI
To make development easy, Vue has their own CLI which can compile `.vue` files. It automatically sets up a server with `webpack`.

After installing it globally, I can `vue create` a new project in the folder where I want to set up my project.

### Working in modules
In the first exercises I worked directly in HTML. But with the CLI, I'm working with javascript files that are being compiled. This makes it pretty easy to work with modules like I did below:

```html
<template>
    <div class="container">
      <heading></heading>
      <hr>
      <servers></servers>
      <hr>
      <app-footer></app-footer>
    </div>
</template>

<script>
import Heading from './components/Heading';
import Servers from './components/Servers';
import AppFooter from './components/Footer';

export default {
    components: {
        'heading': Heading,
        'servers': Servers,
        'app-footer': AppFooter,
    }
}
</script>
```
Here I can create my own `<html-elements>`. There are imported from their respective files.