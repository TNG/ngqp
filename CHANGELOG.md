# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [12.0.0](https://github.com/TNG/ngqp/compare/v1.2.0...v12.0.0) (2021-05-20)


### ⚠ BREAKING CHANGES

* support Angular 12 and drop old versions

### Features

* support Angular 12 and drop old versions ([8045e1e](https://github.com/TNG/ngqp/commit/8045e1e1347a5d84d28a3f7ee3b67cfe2ff06210)), closes [#189](https://github.com/TNG/ngqp/issues/189)

## [1.2.0](https://github.com/TNG/ngqp/compare/v1.1.0...v1.2.0) (2021-01-08)


### Features

* support Angular 11 ([2c0971f](https://github.com/TNG/ngqp/commit/2c0971f612ff721b036e912d21b0bb45a9acc501))

## [1.1.0](https://github.com/TNG/ngqp/compare/v1.0.5...v1.1.0) (2020-11-03)


### Features

* **core:** added clearOnDestroy ([6928489](https://github.com/TNG/ngqp/commit/69284892adcf6da670a6ae345c89238f60392f35)), closes [#172](https://github.com/TNG/ngqp/issues/172)


### Bug Fixes

* **core:** allow QueryParamGroup#setValue to be called with null ([1c71733](https://github.com/TNG/ngqp/commit/1c71733347a038c439bc777727b6edd1ac1311f5)), closes [#172](https://github.com/TNG/ngqp/issues/172)

### [1.0.5](https://github.com/TNG/ngqp/compare/v1.0.4...v1.0.5) (2020-10-16)

### [1.0.4](https://github.com/TNG/ngqp/compare/v1.0.3...v1.0.4) (2020-10-09)


### Bug Fixes

* update standard-version to ^8.0.2 ([6ded983](https://github.com/TNG/ngqp/commit/6ded98383dcfef4026294e194b19d8ebae809a0c))

### [1.0.3](https://github.com/TNG/ngqp/compare/v1.0.2...v1.0.3) (2020-07-24)

<a name="1.0.2"></a>
## [1.0.2](https://github.com/TNG/ngqp/compare/v1.0.0...v1.0.2) (2020-05-13)


### Bug Fixes

* **core:** do not use unknown in QueryParamBuilder ([bd569d9](https://github.com/TNG/ngqp/commit/bd569d9))
* **core:** don't use forkJoin for empty values in multi params ([f7473a0](https://github.com/TNG/ngqp/commit/f7473a0)), closes [#148](https://github.com/TNG/ngqp/issues/148)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/TNG/ngqp/compare/v1.0.0...v1.0.1) (2020-01-16)


### Bug Fixes

* **core:** don't use forkJoin for empty values in multi params ([f7473a0](https://github.com/TNG/ngqp/commit/f7473a0)), closes [#148](https://github.com/TNG/ngqp/issues/148)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/TNG/ngqp/compare/v0.11.0...v1.0.0) (2019-05-24)


### Chores

* v1 ([4abe492](https://github.com/TNG/ngqp/commit/4abe492))


### BREAKING CHANGES

* v1



<a name="0.11.0"></a>
# [0.11.0](https://github.com/TNG/ngqp/compare/v0.10.0...v0.11.0) (2019-05-24)


### Bug Fixes

* **core:** Enable complete strict mode ([c3c0c54](https://github.com/TNG/ngqp/commit/c3c0c54))
* **core:** Enable strictPropertyInitialization ([f5c7262](https://github.com/TNG/ngqp/commit/f5c7262))
* **core:** Enforce strictNullChecks ([69ec667](https://github.com/TNG/ngqp/commit/69ec667))
* **core:** Improve typings involving null ([a8a47ae](https://github.com/TNG/ngqp/commit/a8a47ae))
* **core:** Make abstract constructor protected ([e98c601](https://github.com/TNG/ngqp/commit/e98c601))
* **core:** remove parameter's parent upon remove ([b70262e](https://github.com/TNG/ngqp/commit/b70262e)), closes [#120](https://github.com/TNG/ngqp/issues/120)
* **core:** Replace map() with proper type guard ([5808d4a](https://github.com/TNG/ngqp/commit/5808d4a))
* **core:** set parent of parameter when using add ([ba1403d](https://github.com/TNG/ngqp/commit/ba1403d)), closes [#120](https://github.com/TNG/ngqp/issues/120)
* **core:** Simplify type signature ([e90aa0e](https://github.com/TNG/ngqp/commit/e90aa0e))


### Chores

* prepare release v1 ([ca1971d](https://github.com/TNG/ngqp/commit/ca1971d)), closes [#32](https://github.com/TNG/ngqp/issues/32)


### Features

* **core:** support asynchronous deserializers ([428e266](https://github.com/TNG/ngqp/commit/428e266)), closes [#93](https://github.com/TNG/ngqp/issues/93)


### BREAKING CHANGES

* v1

Signed-off-by: Ingo Bürk <ingo.buerk@tngtech.com>



<a name="0.10.0"></a>
# [0.10.0](https://github.com/TNG/ngqp/compare/v0.9.0...v0.10.0) (2019-03-27)


### Bug Fixes

* **core:** Prefer unknown over any where possible ([62f357c](https://github.com/TNG/ngqp/commit/62f357c))
* **deps:** bump dependencies ([4ae172a](https://github.com/TNG/ngqp/commit/4ae172a))
* **deps:** pin rxjs version ([50ebf0d](https://github.com/TNG/ngqp/commit/50ebf0d))
* **deps:** reduce rxjs dependency to what Angular needs ([81336f4](https://github.com/TNG/ngqp/commit/81336f4))
* **docs:** Hide directive constructors from API docs ([dc628b6](https://github.com/TNG/ngqp/commit/dc628b6)), closes [#97](https://github.com/TNG/ngqp/issues/97)
* **scripts:** Sign release commits ([0bcff67](https://github.com/TNG/ngqp/commit/0bcff67))


### Features

* Adapt commitlint configuration to our project ([c91c440](https://github.com/TNG/ngqp/commit/c91c440))
* **core:** add support for partitioned parameters ([ad3f917](https://github.com/TNG/ngqp/commit/ad3f917)), closes [#90](https://github.com/TNG/ngqp/issues/90)
* **core:** run commitlint on Travis ([a1b5349](https://github.com/TNG/ngqp/commit/a1b5349))
* **other:** added commitlint and husky ([7022023](https://github.com/TNG/ngqp/commit/7022023))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/TNG/ngqp/compare/v0.8.0...v0.9.0) (2019-03-08)


### Bug Fixes

* **core:** Adjust name of variable (copy&paste error) ([6420b9e](https://github.com/TNG/ngqp/commit/6420b9e))
* **core:** Ignore changes in unrelated query parameters ([32b080e](https://github.com/TNG/ngqp/commit/32b080e)), closes [#81](https://github.com/TNG/ngqp/issues/81)
* **core:** Improve typing and support emptyOn for multi:true ([0e28c35](https://github.com/TNG/ngqp/commit/0e28c35)), closes [#92](https://github.com/TNG/ngqp/issues/92) [#27](https://github.com/TNG/ngqp/issues/27)
* **core:** Reword documentation ([644cc20](https://github.com/TNG/ngqp/commit/644cc20))
* **other:** Push only after release is published ([ecf709e](https://github.com/TNG/ngqp/commit/ecf709e))
* **other:** Update commit guidelines ([bcfd06e](https://github.com/TNG/ngqp/commit/bcfd06e))
* **travis:** Only trigger branch builds for master ([a579a4a](https://github.com/TNG/ngqp/commit/a579a4a))


### Features

* **core:** Added QueryParamDirective for standalone parameters ([05b48ca](https://github.com/TNG/ngqp/commit/05b48ca))
* **core:** Support changing the bound standalone parameter ([f1cdfeb](https://github.com/TNG/ngqp/commit/f1cdfeb))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/TNG/ngqp/compare/v0.7.2...v0.8.0) (2019-02-09)


### Bug Fixes

* **core:** Do not synchronize detached parameters ([1add8a8](https://github.com/TNG/ngqp/commit/1add8a8)), closes [#44](https://github.com/TNG/ngqp/issues/44)
* **core:** Fix typo in comment ([2d8313b](https://github.com/TNG/ngqp/commit/2d8313b))
* **docs:** Added documentation for QueryParamGroup #add / #remove ([985a96b](https://github.com/TNG/ngqp/commit/985a96b)), closes [#44](https://github.com/TNG/ngqp/issues/44)
* **docs:** Exclude test util from API docs ([93a5281](https://github.com/TNG/ngqp/commit/93a5281))
* **tests:** Added tests for QueryParamGroup#add / #remove ([085d120](https://github.com/TNG/ngqp/commit/085d120)), closes [#44](https://github.com/TNG/ngqp/issues/44)


### Features

* **core:** Allow changing name for queryParamName directive. ([ca6f87d](https://github.com/TNG/ngqp/commit/ca6f87d)), closes [#44](https://github.com/TNG/ngqp/issues/44)
* **core:** Dynamically add or remove parameters ([5c76c67](https://github.com/TNG/ngqp/commit/5c76c67)), closes [#44](https://github.com/TNG/ngqp/issues/44)



<a name="0.7.2"></a>
## [0.7.2](https://github.com/TNG/ngqp/compare/v0.7.1...v0.7.2) (2019-02-03)


### Bug Fixes

* **core:** Do not detect non-imperative navigations as synthetic ([9e7fdb4](https://github.com/TNG/ngqp/commit/9e7fdb4)), closes [#73](https://github.com/TNG/ngqp/issues/73)



<a name="0.7.1"></a>
## [0.7.1](https://github.com/Airblader/ngqp/compare/v0.7.0...v0.7.1) (2019-02-01)


### Bug Fixes

* **core:** Align event propagation with Forms API ([0529276](https://github.com/Airblader/ngqp/commit/0529276))
* **core:** Rework event handling of QueryParam(Group) ([a5f4d74](https://github.com/Airblader/ngqp/commit/a5f4d74)), closes [#67](https://github.com/Airblader/ngqp/issues/67)
* **core:** Use queryParamName instead of urlParam ([58a71a7](https://github.com/Airblader/ngqp/commit/58a71a7))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/TNG/ngqp/compare/v0.6.0...v0.7.0) (2019-01-15)


### Bug Fixes

* **docs:** Fix duplicate fragment ([00a5667](https://github.com/TNG/ngqp/commit/00a5667))


### Features

* **core:** New QueryParam creation syntax ([98fe148](https://github.com/TNG/ngqp/commit/98fe148))
* **docs:** Added noscript ([d33fa5d](https://github.com/TNG/ngqp/commit/d33fa5d))
* **docs:** Turn demo app into a PWA ([f570513](https://github.com/TNG/ngqp/commit/f570513)), closes [#30](https://github.com/TNG/ngqp/issues/30)



<a name="0.6.0"></a>
# [0.6.0](https://github.com/TNG/ngqp/compare/v0.5.1...v0.6.0) (2019-01-13)


### Bug Fixes

* **api-docs:** Remove GA ID ([a6352fb](https://github.com/TNG/ngqp/commit/a6352fb))
* **core:** Added internal documentation ([6ade19d](https://github.com/TNG/ngqp/commit/6ade19d))
* **core:** Deregister directive on destroy ([3ab996d](https://github.com/TNG/ngqp/commit/3ab996d)), closes [#53](https://github.com/TNG/ngqp/issues/53)
* **core:** Handle errors in navigation queue ([9dfaa92](https://github.com/TNG/ngqp/commit/9dfaa92))
* **core:** Improve cleanup behavior more ([0633526](https://github.com/TNG/ngqp/commit/0633526))
* **core:** Improve typings ([962bc32](https://github.com/TNG/ngqp/commit/962bc32))
* **core:** Only console.log error in dev mode ([ebc0d9d](https://github.com/TNG/ngqp/commit/ebc0d9d))
* **core:** Only require compareWith if emptyOn is provided ([d9f96e3](https://github.com/TNG/ngqp/commit/d9f96e3))
* **core:** Provide default comparator on custom params ([96985ca](https://github.com/TNG/ngqp/commit/96985ca)), closes [#59](https://github.com/TNG/ngqp/issues/59)
* **core:** Remove string shorthand syntax ([3f30355](https://github.com/TNG/ngqp/commit/3f30355)), closes [#63](https://github.com/TNG/ngqp/issues/63)
* **core:** Rename numericParam to numberParam ([ee2c473](https://github.com/TNG/ngqp/commit/ee2c473)), closes [#62](https://github.com/TNG/ngqp/issues/62)
* **core:** Rename valueChanges to controLValueChanges ([60ba6dd](https://github.com/TNG/ngqp/commit/60ba6dd)), closes [#54](https://github.com/TNG/ngqp/issues/54)
* **core:** Support using the same queryParamName multiple times ([1b74a5a](https://github.com/TNG/ngqp/commit/1b74a5a))
* **core:** Use OnChanges instead of OnInit ([cc7a558](https://github.com/TNG/ngqp/commit/cc7a558)), closes [#52](https://github.com/TNG/ngqp/issues/52)
* **demo:** Don't debounce in the getting started example ([60d8bd8](https://github.com/TNG/ngqp/commit/60d8bd8)), closes [#57](https://github.com/TNG/ngqp/issues/57)
* **docs:** Don't track fragment navigation as pageview ([73c58cf](https://github.com/TNG/ngqp/commit/73c58cf))
* **docs:** Don't track unnecessary event ([3d1a793](https://github.com/TNG/ngqp/commit/3d1a793))
* **docs:** Global configuration typo ([5229ba9](https://github.com/TNG/ngqp/commit/5229ba9))
* **docs:** Remove API docs tracking since it doesn't work ([448c51f](https://github.com/TNG/ngqp/commit/448c51f))
* **tests:** Change test name ([19d8180](https://github.com/TNG/ngqp/commit/19d8180))
* **tests:** Don't export test components ([e4ed111](https://github.com/TNG/ngqp/commit/e4ed111))
* **tests:** Pin versions due to broken [@angular-devkit](https://github.com/angular-devkit)/schematics release ([bbc9a66](https://github.com/TNG/ngqp/commit/bbc9a66))
* **tests:** Remove spec tsconfig file from angular.json ([de0d0e0](https://github.com/TNG/ngqp/commit/de0d0e0))


### Features

* **core:** Allow comparator to return a number ([78c8c4e](https://github.com/TNG/ngqp/commit/78c8c4e))
* **core:** Allow passing preserveFragment ([a94ccc6](https://github.com/TNG/ngqp/commit/a94ccc6)), closes [#39](https://github.com/TNG/ngqp/issues/39)
* **docs:** Track events for interaction ([1dfa9ba](https://github.com/TNG/ngqp/commit/1dfa9ba)), closes [#38](https://github.com/TNG/ngqp/issues/38)



<a name="0.5.1"></a>
## [0.5.1](https://github.com/TNG/ngqp/compare/v0.5.0...v0.5.1) (2019-01-06)


### Bug Fixes

* **core:** Allow combineWith returning null | undefined ([3bfc1b0](https://github.com/TNG/ngqp/commit/3bfc1b0))
* **core:** Do not serialize non-multi params into an array ([bf6c355](https://github.com/TNG/ngqp/commit/bf6c355))
* **core:** Don't expost "adapter" naming in API ([e0e875b](https://github.com/TNG/ngqp/commit/e0e875b))
* **core:** Export createEmptyOnDeserializer ([ca45e43](https://github.com/TNG/ngqp/commit/ca45e43))
* **core:** Improve typing definitions ([0d509d0](https://github.com/TNG/ngqp/commit/0d509d0))
* **core:** Remove typealias ([bab1e45](https://github.com/TNG/ngqp/commit/bab1e45))
* **core:** Removed QueryParamOptsInput ([63f83a5](https://github.com/TNG/ngqp/commit/63f83a5))
* **core:** Rename forRoot to withConfig and ensure defaults are set at least ([0f0b48d](https://github.com/TNG/ngqp/commit/0f0b48d)), closes [#41](https://github.com/TNG/ngqp/issues/41)
* **core:** Use interface instead of type alias ([4de02a4](https://github.com/TNG/ngqp/commit/4de02a4)), closes [#40](https://github.com/TNG/ngqp/issues/40)
* **docs:** Exclude schematics from docs ([e57e700](https://github.com/TNG/ngqp/commit/e57e700)), closes [#45](https://github.com/TNG/ngqp/issues/45)
* **docs:** Fix heading level ([f27f369](https://github.com/TNG/ngqp/commit/f27f369))
* **docs:** Fix linting error ([2ea841b](https://github.com/TNG/ngqp/commit/2ea841b))
* **docs:** Prevent line break in API docs link ([17f368e](https://github.com/TNG/ngqp/commit/17f368e))
* **docs:** Remove URL entirely if no parmas are set ([aba7bd1](https://github.com/TNG/ngqp/commit/aba7bd1))
* **README:** Rework README ([8c9d268](https://github.com/TNG/ngqp/commit/8c9d268))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/TNG/ngqp/compare/v0.4.2...v0.5.0) (2019-01-03)


### Bug Fixes

* **core:** Do not create an empty-on serializer if emptyOn wasn't given ([f394fa6](https://github.com/TNG/ngqp/commit/f394fa6))
* **core:** Fix list of built-in accessors ([2e39369](https://github.com/TNG/ngqp/commit/2e39369))
* **core:** Remove customParam and replace it with param ([60377e5](https://github.com/TNG/ngqp/commit/60377e5))
* **core:** Split accessors into one directive per file ([a0bde9b](https://github.com/TNG/ngqp/commit/a0bde9b))
* **core:** Use correct param name in shorthand syntax ([f526b61](https://github.com/TNG/ngqp/commit/f526b61))
* **core:** use multi property rather than checking value type ([781f009](https://github.com/TNG/ngqp/commit/781f009))
* **core:** Use proper type in accessor ([5d90b63](https://github.com/TNG/ngqp/commit/5d90b63))
* **docs:** Fix demo-browser in responsive case ([bbaf6e4](https://github.com/TNG/ngqp/commit/bbaf6e4))
* **docs:** Fix first TOC item ([0f566ad](https://github.com/TNG/ngqp/commit/0f566ad))
* **docs:** Fix fragment misalignment ([f02d26d](https://github.com/TNG/ngqp/commit/f02d26d))
* **docs:** Fix link to GitHub ([2f2675e](https://github.com/TNG/ngqp/commit/2f2675e))
* **docs:** Fix margin on fragment headings ([07c103e](https://github.com/TNG/ngqp/commit/07c103e))
* **docs:** Fix overflows on small screens ([e100621](https://github.com/TNG/ngqp/commit/e100621))
* **docs:** Fix typo ([c6b3a1e](https://github.com/TNG/ngqp/commit/c6b3a1e))
* **docs:** Improve responsiveness of example ([c6cd845](https://github.com/TNG/ngqp/commit/c6cd845))
* **docs:** Make demo-browser content overflow if necessary ([48f2da4](https://github.com/TNG/ngqp/commit/48f2da4))
* **docs:** Remove GitHub button for now ([aadad1b](https://github.com/TNG/ngqp/commit/aadad1b)), closes [#36](https://github.com/TNG/ngqp/issues/36)
* **docs:** Use PNG instead of SVG ([cfa25df](https://github.com/TNG/ngqp/commit/cfa25df))


### Features

* **docs:** Added Google Analytics ([aea857a](https://github.com/TNG/ngqp/commit/aea857a)), closes [#35](https://github.com/TNG/ngqp/issues/35)



<a name="0.4.2"></a>
## [0.4.2](https://github.com/TNG/ngqp/compare/v0.4.1...v0.4.2) (2018-12-30)


### Bug Fixes

* **docs:** Build API docs after demo project ([dec2d0f](https://github.com/TNG/ngqp/commit/dec2d0f))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/TNG/ngqp/compare/v0.4.0...v0.4.1) (2018-12-30)


### Bug Fixes

* **docs:** chmod +x script ([21e44c1](https://github.com/TNG/ngqp/commit/21e44c1))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/TNG/ngqp/compare/v0.3.2...v0.4.0) (2018-12-30)


### Bug Fixes

* **core:** Fix select accessor which didn't write the value in some cases ([91d4c8a](https://github.com/TNG/ngqp/commit/91d4c8a))
* **core:** Provide proper generic to ElementRef in accessors ([35a48be](https://github.com/TNG/ngqp/commit/35a48be))
* **docs:** Make fragment scrolling work ([5eea3ea](https://github.com/TNG/ngqp/commit/5eea3ea))
* **docs:** Phrasing ([2bffb73](https://github.com/TNG/ngqp/commit/2bffb73))
* **docs:** Remove line that was forgotten ([466c39c](https://github.com/TNG/ngqp/commit/466c39c))
* **scripts:** Push tags on release ([63d6358](https://github.com/TNG/ngqp/commit/63d6358))


### Features

* **docs:** Added GitHub widget ([0351f05](https://github.com/TNG/ngqp/commit/0351f05))
* **docs:** Skeleton for docs pages ([5d65a55](https://github.com/TNG/ngqp/commit/5d65a55))



<a name="0.3.2"></a>
## [0.3.2](https://github.com/TNG/ngqp/compare/v0.3.1...v0.3.2) (2018-12-27)


### Bug Fixes

* **core:** Do not consider undefined for emptyOn ([91a75ba](https://github.com/TNG/ngqp/commit/91a75ba))
* **docs:** Disable autocomplete in example ([d1d0a1b](https://github.com/TNG/ngqp/commit/d1d0a1b))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/TNG/ngqp/compare/v0.3.0...v0.3.1) (2018-12-27)


### Bug Fixes

* **schematics:** Fix schematics ([82987c7](https://github.com/TNG/ngqp/commit/82987c7))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/TNG/ngqp/compare/v0.2.8...v0.3.0) (2018-12-27)


### Bug Fixes

* **demo:** Remove console.log ([3dd2028](https://github.com/TNG/ngqp/commit/3dd2028))
* **docs:** Fix wording ([6ebdc96](https://github.com/TNG/ngqp/commit/6ebdc96))
* **docs:** Improve demo-browser styling ([52ec93a](https://github.com/TNG/ngqp/commit/52ec93a))
* **docs:** Improve responsiveness of landing page ([35bd383](https://github.com/TNG/ngqp/commit/35bd383))
* **docs:** Provide explanation of console elements in demo-browser ([a746ac3](https://github.com/TNG/ngqp/commit/a746ac3))
* **docs:** Update wording ([79a340d](https://github.com/TNG/ngqp/commit/79a340d))
* **readme:** [@ngqp](https://github.com/ngqp) -> ngqp ([6481613](https://github.com/TNG/ngqp/commit/6481613))
* **readme:** Mention "ng add" in instructions ([bad6c06](https://github.com/TNG/ngqp/commit/bad6c06))
* **schematics:** Try to infer the correct version to install ([5e0ab8b](https://github.com/TNG/ngqp/commit/5e0ab8b)), closes [#31](https://github.com/TNG/ngqp/issues/31)


### Features

* **docs:** Added benefits & attribution to ngx-bootstrap ([a1997c7](https://github.com/TNG/ngqp/commit/a1997c7))
* **docs:** Added first version of landing page ([a0de621](https://github.com/TNG/ngqp/commit/a0de621))
* **docs:** Added installation guide ([8037a39](https://github.com/TNG/ngqp/commit/8037a39))
* **docs:** Added versions table ([397635d](https://github.com/TNG/ngqp/commit/397635d))
* **docs:** Update to use new ngqp.io domain ([da0f162](https://github.com/TNG/ngqp/commit/da0f162))



<a name="0.2.8"></a>
## [0.2.8](https://github.com/TNG/ngqp/compare/v0.2.7...v0.2.8) (2018-12-26)


### Bug Fixes

* **scripts:** Explicitly add npm registry ([5e2e50c](https://github.com/TNG/ngqp/commit/5e2e50c))



<a name="0.2.7"></a>
## [0.2.7](https://github.com/TNG/ngqp/compare/v0.2.6...v0.2.7) (2018-12-26)



<a name="0.2.6"></a>
## [0.2.6](https://github.com/TNG/ngqp/compare/v0.2.5...v0.2.6) (2018-12-26)


### Bug Fixes

* **scripts:** Clean up release targets ([b706777](https://github.com/TNG/ngqp/commit/b706777))
* **scripts:** Make cd independent of command success ([7ee98f3](https://github.com/TNG/ngqp/commit/7ee98f3))



<a name="0.2.5"></a>
## [0.2.5](https://github.com/TNG/ngqp/compare/v0.2.4...v0.2.5) (2018-12-26)


### Bug Fixes

* **core:** Fix deserialization on non-multi controls ([4fdcfe1](https://github.com/TNG/ngqp/commit/4fdcfe1))
* **docs:** Navigating by URL always needs to be non-merge ([c4787a4](https://github.com/TNG/ngqp/commit/c4787a4))
* **docs:** Remove unnecessary dependency to [@ngqp](https://github.com/ngqp)/core from demo ([76ad096](https://github.com/TNG/ngqp/commit/76ad096))
* **other:** Copy README and LICENSE on release ([04b2c8c](https://github.com/TNG/ngqp/commit/04b2c8c))
* **other:** Deploy website on release ([f837240](https://github.com/TNG/ngqp/commit/f837240))
* **other:** Fail on errors when building schematics ([4865d5f](https://github.com/TNG/ngqp/commit/4865d5f))
* **other:** Improve release script ([91cb7f7](https://github.com/TNG/ngqp/commit/91cb7f7))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/TNG/ngqp/compare/v0.2.3...v0.2.4) (2018-12-25)


### Bug Fixes

* **core:** Set providers outside of forRoot ([131508b](https://github.com/TNG/ngqp/commit/131508b))
* **other:** Fix travis config ([d2c1d08](https://github.com/TNG/ngqp/commit/d2c1d08))
* **other:** Make scripts executable and let the shebang do its work ([b2435af](https://github.com/TNG/ngqp/commit/b2435af))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/TNG/ngqp/compare/v0.2.2...v0.2.3) (2018-12-25)


### Bug Fixes

* **core:** Move schematics-utilities to normal dependencies ([971cae4](https://github.com/TNG/ngqp/commit/971cae4))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/TNG/ngqp/compare/v0.2.1...v0.2.2) (2018-12-25)


### Bug Fixes

* **other:** Fix path to collections file ([90a61bb](https://github.com/TNG/ngqp/commit/90a61bb))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/TNG/ngqp/compare/v0.2.0...v0.2.1) (2018-12-25)


### Bug Fixes

* **other:** Fix schematics build script ([1cd8dfa](https://github.com/TNG/ngqp/commit/1cd8dfa))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/TNG/ngqp/compare/v0.1.1...v0.2.0) (2018-12-25)


### Bug Fixes

* **other:** Move collection file into correct location ([4518232](https://github.com/TNG/ngqp/commit/4518232))


### Features

* **other:** Create release script ([3ed6e3e](https://github.com/TNG/ngqp/commit/3ed6e3e))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/TNG/ngqp/compare/v0.1.0...v0.1.1) (2018-12-25)



<a name="0.1.0"></a>
# [0.1.0](https://github.com/TNG/ngqp/compare/v0.0.3...v0.1.0) (2018-12-25)


### Bug Fixes

* **core:** Assert that emptyOn isn't used in multi-mode. ([718c789](https://github.com/TNG/ngqp/commit/718c789))
* **core:** Avoid buffering on the queue ([9c2a369](https://github.com/TNG/ngqp/commit/9c2a369)), closes [#23](https://github.com/TNG/ngqp/issues/23)
* **core:** Don't export default serializers ([51ca66e](https://github.com/TNG/ngqp/commit/51ca66e))
* **core:** Export serializers ([cc7334f](https://github.com/TNG/ngqp/commit/cc7334f))
* **core:** Improve typings ([eb588a0](https://github.com/TNG/ngqp/commit/eb588a0))
* **core:** Listen only for input events ([38a609a](https://github.com/TNG/ngqp/commit/38a609a))
* **core:** Make (de-)serializer only optional in builder functions ([d828073](https://github.com/TNG/ngqp/commit/d828073))
* **core:** Make control properties readonly ([7dc56f3](https://github.com/TNG/ngqp/commit/7dc56f3))
* **core:** Replace direct property access with a public get() method. ([70f1e62](https://github.com/TNG/ngqp/commit/70f1e62))
* **core:** Require name to be set and validate it ([9c8722a](https://github.com/TNG/ngqp/commit/9c8722a))
* **core:** serialize, deserialize and compareWith are now mandatory. ([2f43d27](https://github.com/TNG/ngqp/commit/2f43d27))
* **core:** Throw error if queryParamGroup isn't set ([3c2e4b7](https://github.com/TNG/ngqp/commit/3c2e4b7))
* **core:** Update selection of control value accessor ([865adaf](https://github.com/TNG/ngqp/commit/865adaf))
* **core:** Use a forRoot method on the module to provide options. ([fce4ec2](https://github.com/TNG/ngqp/commit/fce4ec2)), closes [#10](https://github.com/TNG/ngqp/issues/10)
* **core:** Use model instead of serialized value for combineWith ([0dfd817](https://github.com/TNG/ngqp/commit/0dfd817))
* **core:** Wrap (de-)serializers into try-catch. ([8ab0449](https://github.com/TNG/ngqp/commit/8ab0449)), closes [#3](https://github.com/TNG/ngqp/issues/3)
* **docs:** Change styling for Github icon a bit ([f843d23](https://github.com/TNG/ngqp/commit/f843d23))
* **docs:** Consistently use [@ngqp](https://github.com/ngqp) instead of ngqp ([93ed9cb](https://github.com/TNG/ngqp/commit/93ed9cb))
* **docs:** Don't wait for a tick in TestRouterAdapter#navigate ([a55ad5c](https://github.com/TNG/ngqp/commit/a55ad5c))
* **docs:** Ensure that URL is set initially in TestRouterAdapter ([4ce6f5c](https://github.com/TNG/ngqp/commit/4ce6f5c))
* **docs:** Remove null values from URL in TestRouterAdapter ([e41b19a](https://github.com/TNG/ngqp/commit/e41b19a))
* **docs:** Update link to logo in README ([43e1ea6](https://github.com/TNG/ngqp/commit/43e1ea6))
* **docs:** Updated headline description ([dba2b08](https://github.com/TNG/ngqp/commit/dba2b08))
* **docs:** Use green badge for conventional commits ([1e61b69](https://github.com/TNG/ngqp/commit/1e61b69))
* **docs:** Use hash routing for now due to GH pages limitations ([61cc019](https://github.com/TNG/ngqp/commit/61cc019))
* **docs:** Yet another fix, adding ?sanitize=true. ([b19a81e](https://github.com/TNG/ngqp/commit/b19a81e))
* **tests:** Remove yarn test from Travis for now ([ba59419](https://github.com/TNG/ngqp/commit/ba59419))


### Features

* **core:** Added a directive to provide a control value accessor ([dc45c9a](https://github.com/TNG/ngqp/commit/dc45c9a)), closes [#28](https://github.com/TNG/ngqp/issues/28)
* **core:** Added an abstraction for the router access ([226bb25](https://github.com/TNG/ngqp/commit/226bb25)), closes [#21](https://github.com/TNG/ngqp/issues/21)
* **core:** Added CheckboxControlValueAccessor ([19df3e7](https://github.com/TNG/ngqp/commit/19df3e7)), closes [#14](https://github.com/TNG/ngqp/issues/14)
* **core:** Added combineWith option ([afeae98](https://github.com/TNG/ngqp/commit/afeae98)), closes [#6](https://github.com/TNG/ngqp/issues/6)
* **core:** Added debounceTime option for params ([da72932](https://github.com/TNG/ngqp/commit/da72932)), closes [#4](https://github.com/TNG/ngqp/issues/4)
* **core:** Added emptyOn and compareWith options ([0234ebf](https://github.com/TNG/ngqp/commit/0234ebf))
* **core:** Added NumberControlValueAccessor ([5fcb4cf](https://github.com/TNG/ngqp/commit/5fcb4cf)), closes [#14](https://github.com/TNG/ngqp/issues/14)
* **core:** Added numericParam, booleanParam and customParam ([1d666d5](https://github.com/TNG/ngqp/commit/1d666d5))
* **core:** Added patchValue and setValue for QueryParamGroup ([128c233](https://github.com/TNG/ngqp/commit/128c233)), closes [#2](https://github.com/TNG/ngqp/issues/2)
* **core:** Added RangeControlValueAccessor ([08259b8](https://github.com/TNG/ngqp/commit/08259b8)), closes [#14](https://github.com/TNG/ngqp/issues/14)
* **core:** Added support for multiple params ([44a9d69](https://github.com/TNG/ngqp/commit/44a9d69)), closes [#5](https://github.com/TNG/ngqp/issues/5)
* **core:** Added valueChanges to controls and group ([164eee1](https://github.com/TNG/ngqp/commit/164eee1)), closes [#2](https://github.com/TNG/ngqp/issues/2) [#2](https://github.com/TNG/ngqp/issues/2) [#16](https://github.com/TNG/ngqp/issues/16)
* **core:** Allow defining options per group ([bb15442](https://github.com/TNG/ngqp/commit/bb15442)), closes [#10](https://github.com/TNG/ngqp/issues/10)
* **core:** Allow defining replaceUrl globally ([7864ffe](https://github.com/TNG/ngqp/commit/7864ffe)), closes [#10](https://github.com/TNG/ngqp/issues/10)
* **core:** Implemented MultiSelectControlValueAccessorDirective ([bff5d3f](https://github.com/TNG/ngqp/commit/bff5d3f)), closes [#14](https://github.com/TNG/ngqp/issues/14) [#5](https://github.com/TNG/ngqp/issues/5)
* **core:** Provide alias "stringParam" for "param". ([15ce1ee](https://github.com/TNG/ngqp/commit/15ce1ee))
* **core:** Set replaceUrl: true by default ([6148a68](https://github.com/TNG/ngqp/commit/6148a68)), closes [#10](https://github.com/TNG/ngqp/issues/10)
* **docs:** Added a demo-browser component ([f4c3365](https://github.com/TNG/ngqp/commit/f4c3365))
* **docs:** Added a first skeleton of a proper bootstrap demo app ([f994b25](https://github.com/TNG/ngqp/commit/f994b25))
* **docs:** Added a TestRouterAdapter ([1ab4edc](https://github.com/TNG/ngqp/commit/1ab4edc)), closes [#21](https://github.com/TNG/ngqp/issues/21)
* **docs:** Added gitter badge ([bcac502](https://github.com/TNG/ngqp/commit/bcac502))
* **docs:** Added history and back button to demonstrate replaceUrl ([d653c6c](https://github.com/TNG/ngqp/commit/d653c6c))
* **docs:** Added link to Github ([8dc960c](https://github.com/TNG/ngqp/commit/8dc960c))
* **docs:** Deploy ngqp-demo to GH Pages ([9cf2a08](https://github.com/TNG/ngqp/commit/9cf2a08))
* **docs:** Show changes on param group ([7fcb598](https://github.com/TNG/ngqp/commit/7fcb598))
* **other:** Added schematics support ([35b0e66](https://github.com/TNG/ngqp/commit/35b0e66))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/TNG/ngqp/compare/v0.0.2...v0.0.3) (2018-12-15)



<a name="0.0.2"></a>
## 0.0.2 (2018-12-15)
