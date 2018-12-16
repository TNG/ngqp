[![Build Status](https://travis-ci.org/Airblader/ngqp.svg?branch=master)](https://travis-ci.org/Airblader/ngqp)
[![npm version](https://badge.fury.io/js/%40ngqp%2Fcore.svg)](https://www.npmjs.com/@ngqp/core)
[![devDependency Status](https://david-dm.org/Airblader/ngqp/dev-status.svg?branch=master)](https://david-dm.org/Airblader/ngqp#info=devDependencies)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-green.svg)](https://conventionalcommits.org)
[![Gitter](https://img.shields.io/gitter/room/Airblader/ngqp.svg?style=flat-square)](https://gitter.im/ngqp)

# @ngqp – Declaratively synchronize form controls with the URL

<p align="center">
  <img width="auto" height="240" src="https://raw.githubusercontent.com/Airblader/ngqp/master/logo.svg?sanitize=true">
</p>

@ngqp makes it easy to synchronize form controls with query parameters in your URL by using a declarative approach. Examples
include pagination information or the current settings of filters in a data view. @ngqp is designed to resemble the Forms API
from `@angular/forms`, making it intuitive to work with.

# Installation

All you need is to `yarn add @ngqp/core` (or `npm install --save @ngqp/core`) and import the `QueryParamModule` into your app module:

```typescript
import { NgModule } from '@angular/core';
import { QueryParamModule } from '@ngqp/core';

@NgModule({
    imports: [
        QueryParamModule
    ],
})
export class AppModule {}
```

Make sure that your app is set up to use routing (i.e., using `RouterModule`).

# Usage

This section is a work in progress since @ngqp is still in an early development stage.

# Contributing

[Please see CONTRIBUTING.md][contributing].

# I want to know more

## Why should I care?

Angular's router system makes it easy to organize different views under different routes, but often the state of a specific
route is not reflected in the URL. This makes it impossible to bookmark or share them as on every new page load the user has
to set these states manually.

With @ngqp, you can easily synchronize the state of form controls such as input boxes, dropdowns or your own custom controls
with a query parameter on the current URL. This way the URL becomes the single source of truth for this information, which
allows users to share or bookmark these links and reload your page without having to worry about losing their current state.

## What can this be used for?

@ngqp will work with any kind of control, but the common scenario would be pagination (i.e., which page a user is on) or
filter settings (search query, selections, …)

---

[Licensed under the MIT License][license]

[license]: https://www.github.com/Airblader/ngqp/blob/master/LICENSE
[contributing]: https://www.github.com/Airblader/ngqp/blob/master/CONTRIBUTING.md