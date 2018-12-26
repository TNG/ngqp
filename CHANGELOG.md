# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.2.7"></a>
## [0.2.7](https://github.com/Airblader/ngqp/compare/v0.2.6...v0.2.7) (2018-12-26)



<a name="0.2.6"></a>
## [0.2.6](https://github.com/Airblader/ngqp/compare/v0.2.5...v0.2.6) (2018-12-26)


### Bug Fixes

* **scripts:** Clean up release targets ([b706777](https://github.com/Airblader/ngqp/commit/b706777))
* **scripts:** Make cd independent of command success ([7ee98f3](https://github.com/Airblader/ngqp/commit/7ee98f3))



<a name="0.2.5"></a>
## [0.2.5](https://github.com/Airblader/ngqp/compare/v0.2.4...v0.2.5) (2018-12-26)


### Bug Fixes

* **core:** Fix deserialization on non-multi controls ([4fdcfe1](https://github.com/Airblader/ngqp/commit/4fdcfe1))
* **docs:** Navigating by URL always needs to be non-merge ([c4787a4](https://github.com/Airblader/ngqp/commit/c4787a4))
* **docs:** Remove unnecessary dependency to [@ngqp](https://github.com/ngqp)/core from demo ([76ad096](https://github.com/Airblader/ngqp/commit/76ad096))
* **other:** Copy README and LICENSE on release ([04b2c8c](https://github.com/Airblader/ngqp/commit/04b2c8c))
* **other:** Deploy website on release ([f837240](https://github.com/Airblader/ngqp/commit/f837240))
* **other:** Fail on errors when building schematics ([4865d5f](https://github.com/Airblader/ngqp/commit/4865d5f))
* **other:** Improve release script ([91cb7f7](https://github.com/Airblader/ngqp/commit/91cb7f7))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/Airblader/ngqp/compare/v0.2.3...v0.2.4) (2018-12-25)


### Bug Fixes

* **core:** Set providers outside of forRoot ([131508b](https://github.com/Airblader/ngqp/commit/131508b))
* **other:** Fix travis config ([d2c1d08](https://github.com/Airblader/ngqp/commit/d2c1d08))
* **other:** Make scripts executable and let the shebang do its work ([b2435af](https://github.com/Airblader/ngqp/commit/b2435af))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/Airblader/ngqp/compare/v0.2.2...v0.2.3) (2018-12-25)


### Bug Fixes

* **core:** Move schematics-utilities to normal dependencies ([971cae4](https://github.com/Airblader/ngqp/commit/971cae4))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/Airblader/ngqp/compare/v0.2.1...v0.2.2) (2018-12-25)


### Bug Fixes

* **other:** Fix path to collections file ([90a61bb](https://github.com/Airblader/ngqp/commit/90a61bb))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/Airblader/ngqp/compare/v0.2.0...v0.2.1) (2018-12-25)


### Bug Fixes

* **other:** Fix schematics build script ([1cd8dfa](https://github.com/Airblader/ngqp/commit/1cd8dfa))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/Airblader/ngqp/compare/v0.1.1...v0.2.0) (2018-12-25)


### Bug Fixes

* **other:** Move collection file into correct location ([4518232](https://github.com/Airblader/ngqp/commit/4518232))


### Features

* **other:** Create release script ([3ed6e3e](https://github.com/Airblader/ngqp/commit/3ed6e3e))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/Airblader/ngqp/compare/v0.1.0...v0.1.1) (2018-12-25)



<a name="0.1.0"></a>
# [0.1.0](https://github.com/Airblader/ngqp/compare/v0.0.3...v0.1.0) (2018-12-25)


### Bug Fixes

* **core:** Assert that emptyOn isn't used in multi-mode. ([718c789](https://github.com/Airblader/ngqp/commit/718c789))
* **core:** Avoid buffering on the queue ([9c2a369](https://github.com/Airblader/ngqp/commit/9c2a369)), closes [#23](https://github.com/Airblader/ngqp/issues/23)
* **core:** Don't export default serializers ([51ca66e](https://github.com/Airblader/ngqp/commit/51ca66e))
* **core:** Export serializers ([cc7334f](https://github.com/Airblader/ngqp/commit/cc7334f))
* **core:** Improve typings ([eb588a0](https://github.com/Airblader/ngqp/commit/eb588a0))
* **core:** Listen only for input events ([38a609a](https://github.com/Airblader/ngqp/commit/38a609a))
* **core:** Make (de-)serializer only optional in builder functions ([d828073](https://github.com/Airblader/ngqp/commit/d828073))
* **core:** Make control properties readonly ([7dc56f3](https://github.com/Airblader/ngqp/commit/7dc56f3))
* **core:** Replace direct property access with a public get() method. ([70f1e62](https://github.com/Airblader/ngqp/commit/70f1e62))
* **core:** Require name to be set and validate it ([9c8722a](https://github.com/Airblader/ngqp/commit/9c8722a))
* **core:** serialize, deserialize and compareWith are now mandatory. ([2f43d27](https://github.com/Airblader/ngqp/commit/2f43d27))
* **core:** Throw error if queryParamGroup isn't set ([3c2e4b7](https://github.com/Airblader/ngqp/commit/3c2e4b7))
* **core:** Update selection of control value accessor ([865adaf](https://github.com/Airblader/ngqp/commit/865adaf))
* **core:** Use a forRoot method on the module to provide options. ([fce4ec2](https://github.com/Airblader/ngqp/commit/fce4ec2)), closes [#10](https://github.com/Airblader/ngqp/issues/10)
* **core:** Use model instead of serialized value for combineWith ([0dfd817](https://github.com/Airblader/ngqp/commit/0dfd817))
* **core:** Wrap (de-)serializers into try-catch. ([8ab0449](https://github.com/Airblader/ngqp/commit/8ab0449)), closes [#3](https://github.com/Airblader/ngqp/issues/3)
* **docs:** Change styling for Github icon a bit ([f843d23](https://github.com/Airblader/ngqp/commit/f843d23))
* **docs:** Consistently use [@ngqp](https://github.com/ngqp) instead of ngqp ([93ed9cb](https://github.com/Airblader/ngqp/commit/93ed9cb))
* **docs:** Don't wait for a tick in TestRouterAdapter#navigate ([a55ad5c](https://github.com/Airblader/ngqp/commit/a55ad5c))
* **docs:** Ensure that URL is set initially in TestRouterAdapter ([4ce6f5c](https://github.com/Airblader/ngqp/commit/4ce6f5c))
* **docs:** Remove null values from URL in TestRouterAdapter ([e41b19a](https://github.com/Airblader/ngqp/commit/e41b19a))
* **docs:** Update link to logo in README ([43e1ea6](https://github.com/Airblader/ngqp/commit/43e1ea6))
* **docs:** Updated headline description ([dba2b08](https://github.com/Airblader/ngqp/commit/dba2b08))
* **docs:** Use green badge for conventional commits ([1e61b69](https://github.com/Airblader/ngqp/commit/1e61b69))
* **docs:** Use hash routing for now due to GH pages limitations ([61cc019](https://github.com/Airblader/ngqp/commit/61cc019))
* **docs:** Yet another fix, adding ?sanitize=true. ([b19a81e](https://github.com/Airblader/ngqp/commit/b19a81e))
* **tests:** Remove yarn test from Travis for now ([ba59419](https://github.com/Airblader/ngqp/commit/ba59419))


### Features

* **core:** Added a directive to provide a control value accessor ([dc45c9a](https://github.com/Airblader/ngqp/commit/dc45c9a)), closes [#28](https://github.com/Airblader/ngqp/issues/28)
* **core:** Added an abstraction for the router access ([226bb25](https://github.com/Airblader/ngqp/commit/226bb25)), closes [#21](https://github.com/Airblader/ngqp/issues/21)
* **core:** Added CheckboxControlValueAccessor ([19df3e7](https://github.com/Airblader/ngqp/commit/19df3e7)), closes [#14](https://github.com/Airblader/ngqp/issues/14)
* **core:** Added combineWith option ([afeae98](https://github.com/Airblader/ngqp/commit/afeae98)), closes [#6](https://github.com/Airblader/ngqp/issues/6)
* **core:** Added debounceTime option for params ([da72932](https://github.com/Airblader/ngqp/commit/da72932)), closes [#4](https://github.com/Airblader/ngqp/issues/4)
* **core:** Added emptyOn and compareWith options ([0234ebf](https://github.com/Airblader/ngqp/commit/0234ebf))
* **core:** Added NumberControlValueAccessor ([5fcb4cf](https://github.com/Airblader/ngqp/commit/5fcb4cf)), closes [#14](https://github.com/Airblader/ngqp/issues/14)
* **core:** Added numericParam, booleanParam and customParam ([1d666d5](https://github.com/Airblader/ngqp/commit/1d666d5))
* **core:** Added patchValue and setValue for QueryParamGroup ([128c233](https://github.com/Airblader/ngqp/commit/128c233)), closes [#2](https://github.com/Airblader/ngqp/issues/2)
* **core:** Added RangeControlValueAccessor ([08259b8](https://github.com/Airblader/ngqp/commit/08259b8)), closes [#14](https://github.com/Airblader/ngqp/issues/14)
* **core:** Added support for multiple params ([44a9d69](https://github.com/Airblader/ngqp/commit/44a9d69)), closes [#5](https://github.com/Airblader/ngqp/issues/5)
* **core:** Added valueChanges to controls and group ([164eee1](https://github.com/Airblader/ngqp/commit/164eee1)), closes [#2](https://github.com/Airblader/ngqp/issues/2) [#2](https://github.com/Airblader/ngqp/issues/2) [#16](https://github.com/Airblader/ngqp/issues/16)
* **core:** Allow defining options per group ([bb15442](https://github.com/Airblader/ngqp/commit/bb15442)), closes [#10](https://github.com/Airblader/ngqp/issues/10)
* **core:** Allow defining replaceUrl globally ([7864ffe](https://github.com/Airblader/ngqp/commit/7864ffe)), closes [#10](https://github.com/Airblader/ngqp/issues/10)
* **core:** Implemented MultiSelectControlValueAccessorDirective ([bff5d3f](https://github.com/Airblader/ngqp/commit/bff5d3f)), closes [#14](https://github.com/Airblader/ngqp/issues/14) [#5](https://github.com/Airblader/ngqp/issues/5)
* **core:** Provide alias "stringParam" for "param". ([15ce1ee](https://github.com/Airblader/ngqp/commit/15ce1ee))
* **core:** Set replaceUrl: true by default ([6148a68](https://github.com/Airblader/ngqp/commit/6148a68)), closes [#10](https://github.com/Airblader/ngqp/issues/10)
* **docs:** Added a demo-browser component ([f4c3365](https://github.com/Airblader/ngqp/commit/f4c3365))
* **docs:** Added a first skeleton of a proper bootstrap demo app ([f994b25](https://github.com/Airblader/ngqp/commit/f994b25))
* **docs:** Added a TestRouterAdapter ([1ab4edc](https://github.com/Airblader/ngqp/commit/1ab4edc)), closes [#21](https://github.com/Airblader/ngqp/issues/21)
* **docs:** Added gitter badge ([bcac502](https://github.com/Airblader/ngqp/commit/bcac502))
* **docs:** Added history and back button to demonstrate replaceUrl ([d653c6c](https://github.com/Airblader/ngqp/commit/d653c6c))
* **docs:** Added link to Github ([8dc960c](https://github.com/Airblader/ngqp/commit/8dc960c))
* **docs:** Deploy ngqp-demo to GH Pages ([9cf2a08](https://github.com/Airblader/ngqp/commit/9cf2a08))
* **docs:** Show changes on param group ([7fcb598](https://github.com/Airblader/ngqp/commit/7fcb598))
* **other:** Added schematics support ([35b0e66](https://github.com/Airblader/ngqp/commit/35b0e66))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/Airblader/ngqp/compare/v0.0.2...v0.0.3) (2018-12-15)



<a name="0.0.2"></a>
## 0.0.2 (2018-12-15)
